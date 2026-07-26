export interface ProjectVideoEmbed {
  provider: 'instagram' | 'youtube';
  url: string;
}

const youtubeIdPattern = /^[\w-]{11}$/;
const instagramIdPattern = /^[\w-]+$/;

export const parseProjectVideoUrl = (
  value: string | undefined,
): ProjectVideoEmbed | undefined => {
  if (!value) return undefined;

  try {
    const url = new URL(value);
    if (!['http:', 'https:'].includes(url.protocol)) return undefined;

    const host = url.hostname.toLowerCase().replace(/^www\./, '');
    const path = url.pathname.split('/').filter(Boolean);

    if (host === 'youtu.be') {
      const videoId = path[0];
      if (videoId && youtubeIdPattern.test(videoId)) {
        return {
          provider: 'youtube',
          url: `https://www.youtube-nocookie.com/embed/${videoId}`,
        };
      }
    }

    if (host === 'youtube.com' || host === 'm.youtube.com') {
      const videoId =
        url.pathname === '/watch'
          ? url.searchParams.get('v')
          : ['embed', 'live', 'shorts'].includes(path[0] ?? '')
            ? path[1]
            : undefined;

      if (videoId && youtubeIdPattern.test(videoId)) {
        return {
          provider: 'youtube',
          url: `https://www.youtube-nocookie.com/embed/${videoId}`,
        };
      }
    }

    if (host === 'instagram.com') {
      const type = path[0] === 'reels' ? 'reel' : path[0];
      const postId = path[1];

      if (
        type &&
        ['p', 'reel', 'tv'].includes(type) &&
        postId &&
        instagramIdPattern.test(postId)
      ) {
        return {
          provider: 'instagram',
          url: `https://www.instagram.com/${type}/${postId}/embed/`,
        };
      }
    }
  } catch {
    return undefined;
  }

  return undefined;
};
