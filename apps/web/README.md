# apps/web

Documentation site for [shadcn-vue-ark](../../README.md), built with Astro and
Starlight. Content lives in `src/content/docs/`.

## Commands

Run from this directory:

| Command         | Action                                      |
| :-------------- | :------------------------------------------ |
| `bun dev`       | Start the local dev server                  |
| `bun build`     | Build the production site to `./dist/`      |
| `bun preview`   | Preview the production build locally        |
| `bun lint`      | Lint with ESLint (`@acfatah/eslint-preset`) |
| `bun typecheck` | Type-check with `tsc --noEmit`              |

The registry is consumed via the `packages.registry/` Vite alias (mapped to
`../../packages/registry/src/` in `astro.config.mjs`).
