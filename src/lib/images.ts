import { createImageUrlBuilder } from '@sanity/image-url';
import type { ImageAsset } from '../types';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';

export function getImageUrl(
  image: ImageAsset | undefined,
  width = 1200,
): string | undefined {
  if (!image) return undefined;
  if (image.url) return image.url;
  if (!image.assetRef || !projectId) return undefined;

  return createImageUrlBuilder({ projectId, dataset })
    .image(image.assetRef)
    .width(width)
    .fit('max')
    .auto('format')
    .url();
}
