# Astro + Sanity Portfolio Starter

A statically generated portfolio built with Astro, strict TypeScript, Sanity, Tailwind CSS, and DaisyUI. Portfolio content and media are managed in Sanity.

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

Open `http://localhost:4321` after replacing the placeholders in `.env` with your Sanity project settings.

## Connect Sanity

```env
PUBLIC_SANITY_PROJECT_ID=your_project_id
PUBLIC_SANITY_DATASET=production
PUBLIC_SANITY_API_VERSION=YYYY-MM-DD

SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production
```

## Run Sanity Studio

```sh
pnpm studio
```

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
