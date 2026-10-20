# Explicatio

A research discovery and reading application that helps people explore scientific
studies through accessible summaries, topic browsing, and audio.

## Features

- Browse research studies and explore study details and categories.
- Discover content through Browse and Pulse screens.
- Sign in and access a personal dashboard.
- Explore a development Test Lab for interactive study experiences.
- Pipeline code for research discovery, summaries, review, images, and audio.
- Subscription integration code and database migrations.

## Stack

React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, React Query, and Framer Motion,
with Supabase authentication and data integration.

## Run locally

Use Node.js 22 or later.

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Before starting, set `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` to your
own Supabase project's URL and browser-safe publishable/anonymous key. The app
initializes its authentication client at startup, so this configuration is required.
The development server configuration is in `vite.config.ts`.

Provider and billing integrations require additional server-side credentials as
listed in `.env.example`. Never put service-role keys, provider secrets, or payment
secrets in `VITE_*` variables or commit them to Git.

## Checks

```bash
npm run build
npm run lint
npx tsc --noEmit -p tsconfig.app.json
```

### Current validation results

The production build passes. The standalone TypeScript check currently reports
three errors (a chart type import, the `replaceAll` library target, and extra props
passed to a Browse control). Lint reports 17 errors and 17 warnings. The dependency
audit reports 35 vulnerabilities (6 moderate and 29 high). These are outstanding
maintenance tasks; publication is not a claim of production readiness.

The npm lockfile was refreshed, and Base UI is pinned to the original local
version, 1.3.0, so a clean install does not select an incompatible newer release.

## Project structure

- `src/pages/` — application screens
- `src/components/` — interface components
- `src/contexts/` — authentication and shared state
- `src/integrations/` — service clients
- `src/pipeline/` — content discovery and processing code
- `src/server/` — server integration code
- `supabase/` — functions and database migrations
- `public/` — media and static assets
- `explicatio-video/` — product showcase composition

## Status

This is a work-in-progress portfolio snapshot from the local Explicatio project.
Source code for an integration does not mean the corresponding service is deployed
or configured. Some experiences use local content; authentication and live backend
features require your own service setup. This repository does not deploy services,
run the research pipeline, or activate billing automatically.

The snapshot excludes local credentials, generated builds, and installed dependencies.
