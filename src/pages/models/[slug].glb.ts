import type { APIRoute, GetStaticPaths } from 'astro';
import { getSiteContent } from '../../lib/content';

interface Props {
  url: string;
}

export const getStaticPaths = (async () => {
  const { projects } = await getSiteContent();

  return projects.flatMap((project) =>
    project.model3d
      ? [
          {
            params: { slug: project.slug },
            props: { url: project.model3d.url },
          },
        ]
      : [],
  );
}) satisfies GetStaticPaths;

export const GET: APIRoute<Props> = async ({ props }) => {
  const response = await fetch(props.url);

  if (!response.ok) {
    throw new Error(`Unable to fetch 3D model: ${response.status}`);
  }

  return new Response(await response.arrayBuffer(), {
    headers: {
      'Content-Type': 'model/gltf-binary',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
