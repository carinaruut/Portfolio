# Astro + Sanity Portfolio Starter

A small, statically generated portfolio starter built with Astro, strict TypeScript, Sanity, Tailwind CSS, and DaisyUI. It runs with local mock content by default, so a Sanity project is not required to get started.

## Prerequisites

- Node.js 22.12 or newer
- pnpm 11 or newer (`corepack enable` can install pnpm)
- A free Sanity account when you are ready to use the CMS

## Install and run the site

```sh
pnpm install
cp .env.example .env
pnpm dev
```

Open `http://localhost:4321`. Mock content is enabled by default.

## Connect Sanity

1. Create a project and a public `production` dataset at [sanity.io/manage](https://www.sanity.io/manage), or choose an existing project.
2. Copy `.env.example` to `.env` if you have not already done so.
3. Add the project ID to both `PUBLIC_SANITY_PROJECT_ID` and `SANITY_STUDIO_PROJECT_ID`.
4. Keep `PUBLIC_SANITY_DATASET` and `SANITY_STUDIO_DATASET` set to your dataset name.
5. Keep `PUBLIC_USE_MOCK_DATA=true` until you have added your initial content.

The duplicated project and dataset variables are intentional: Astro only exposes browser-safe variables prefixed with `PUBLIC_`, while Sanity Studio uses `SANITY_STUDIO_` variables.

```env
PUBLIC_USE_MOCK_DATA=true
PUBLIC_SANITY_PROJECT_ID=your-project-id
PUBLIC_SANITY_DATASET=production
PUBLIC_SANITY_API_VERSION=2026-07-24

SANITY_STUDIO_PROJECT_ID=your-project-id
SANITY_STUDIO_DATASET=production
```

This starter expects a public Sanity dataset and does not use tokens or authentication. If Sanity settings are missing or content cannot be fetched, the Astro build prints a warning and falls back to mock content.

## Run Sanity Studio

After adding the `SANITY_STUDIO_` environment variables:

```sh
pnpm studio
```

Open `http://localhost:3333`. The first run may ask you to sign in to Sanity and add the local Studio URL as an allowed CORS origin.

The Profile entry is configured as a singleton. Create it first, then add categories and projects.

## Manage content

### Add a category

1. Open **Project category** in Studio.
2. Create a document, enter its title and description, and click **Generate** beside the slug.
3. Publish the category.

### Add a project

1. Open **Project** and create a document.
2. Complete the required fields and generate the slug.
3. Select a published category and add at least one technology or tag.
4. Upload the main image and provide meaningful alternative text.
5. Add optional gallery images, links, and featured status, then publish.

Images uploaded through Studio are stored and served by Sanity. Gallery images and the main image each support alternative text.

### Select related projects

Use **Related projects** in a project document to select up to three project references. If none are selected, the site automatically shows up to three other projects in the same category.

## Switch from mocks to Sanity

Once the Profile document and your content are published, change:

```env
PUBLIC_USE_MOCK_DATA=false
```

Restart `pnpm dev`. Pages continue using the same content-access layer; no page code needs to change. Dynamic project and category pages are generated from the selected data source during the build.

## Quality checks and build

```sh
pnpm check
pnpm build
pnpm preview
```

The production site is written to `dist/`. The default Astro output is fully static.

## Main structure

```text
src/
├── components/       Reusable Astro UI
├── data/             Typed mock content
├── layouts/          Shared page and SEO shell
├── lib/content/      Mock/Sanity content access and GROQ
├── pages/            Static and dynamic routes
├── styles/           Tailwind and DaisyUI setup
└── types/            Shared content types
studio/
├── schemaTypes/      Sanity document schemas
├── sanity.config.ts  Studio and singleton structure
└── sanity.cli.ts     CLI project settings
```
