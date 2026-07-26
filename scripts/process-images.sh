#!/usr/bin/env bash

set -euo pipefail

input_dir="${1:-assets}"
watermark="${2:-assets/watermark/watermark.png}"
output_dir="${3:-assets/processed}"

if ! command -v magick >/dev/null 2>&1; then
  printf '%s\n' 'ImageMagick is required but the magick command was not found.' >&2
  exit 1
fi

if [[ ! -f "$watermark" ]]; then
  printf 'Watermark not found: %s\n' "$watermark" >&2
  exit 1
fi

mkdir -p "$output_dir"

temp_dir="$(mktemp -d)"
trap 'rm -rf "$temp_dir"' EXIT

shopt -s nullglob
source_images=("$input_dir"/*.png)

if (( ${#source_images[@]} == 0 )); then
  printf 'No PNG images found in %s\n' "$input_dir" >&2
  exit 1
fi

processed=0

for source in "${source_images[@]}"; do
  [[ "$source" == "$watermark" ]] && continue

  read -r image_width image_height < <(
    magick identify -format '%w %h\n' "$source"
  )

  watermark_width=$((image_width * 24 / 100))

  magick "$watermark" \
    -resize "${watermark_width}x" \
    -channel A -evaluate multiply 0.18 +channel \
    -background none -rotate -25 \
    "$temp_dir/watermark.png"

  read -r mark_width mark_height < <(
    magick identify -format '%w %h\n' "$temp_dir/watermark.png"
  )

  cell_width=$((mark_width * 2))
  cell_height=$((mark_height * 2))

  magick -size "${cell_width}x${cell_height}" xc:none \
    "$temp_dir/watermark.png" -geometry +0+0 -composite \
    "$temp_dir/watermark.png" \
    -geometry "+${mark_width}+${mark_height}" -composite \
    "$temp_dir/tile.png"

  magick -size "${image_width}x${image_height}" \
    "tile:$temp_dir/tile.png" \
    "$temp_dir/pattern.png"

  filename="$(basename "$source" .png)"
  magick "$source" "$temp_dir/pattern.png" \
    -compose over -composite \
    -strip -quality 82 \
    "$output_dir/$filename.webp"

  processed=$((processed + 1))
done

printf 'Processed %d images into %s\n' "$processed" "$output_dir"
