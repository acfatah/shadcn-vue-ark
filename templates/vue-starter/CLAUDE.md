# shadcn-vue-ark starter - agent guide

> SCOPE: This is a standalone Vue 3 SPA scaffolded from shadcn-vue-ark.
> It is NOT the monorepo. There are no `apps/` or `packages/` workspaces.
> Run all scripts from this project root. Monorepo rules (Storybook, registry
> authoring, `@antfu/eslint-config`) do NOT apply here.

## What this project is

A single-page Vue 3 application that CONSUMES the shadcn-vue-ark component
registry. You build an app here; you do not author the component library.

Stack: Vue 3 + Vue Router, Tailwind CSS v4, Ark UI, VueUse. Runtime and package
manager: Bun.

## Project structure

```text
src/
├── pages/      # route components
├── router/     # vue-router config + nprogress loading bar (index.ts)
├── layouts/    # layout components
├── lib/        # utils.ts (cn()), fetch.ts (useFetch wrapper)
├── styles/     # global.css, fonts.css, nprogress.css
├── components/ # your components; ui/ is filled by the shadcn CLI
└── assets/
```

The `@/*` alias maps to `./src/*` (in `tsconfig.app.json` and `vite.config.ts`).

## Commands

Run everything from this project root with `bun`:

- `bun dev` - dev server (Vite) at `localhost:5173`
- `bun build` - `vue-tsc -b && vite build`
- `bun preview` - preview the production build
- `bun typecheck` - `vue-tsc --noEmit`
- `bun lint` / `bun format` - ESLint check / autofix
  (also `lint:changed`, `lint:staged`, `format:changed`, `format:staged`)
- `bun ui <add|list|find|info|status> [component]` - manage UI components

## Getting UI components

Use the CLI instead of hand-writing components:

```bash
bun ui add button    # wraps: shadcn@latest add acfatah/shadcn-vue-ark/button
```

Components land in `src/components/ui` per `components.json` (style `new-york`,
icons `lucide-vue-next`). Do NOT hand-author registry-style component folders
(`_registry.ts`, `types.ts`, `variant.ts`) here; that is a monorepo concern.

## ESLint

This project uses `@acfatah/eslint-preset` via `eslint.config.ts` (NOT
`@antfu/eslint-config`). Fix lint last with `bun format [files]`.

## Environment

Copy `.env.example` to `.env`. The app expects:

- `VITE_PAGE_TITLE`
- `VITE_API_URL`

## First-run setup (fresh scaffold)

Only if you copied the starter template into a new, un-gitted project (skip if
you pulled these rules into an existing project):

```bash
bun update
find . -type f -name '.keep' -delete
git init && git add -A && git commit -m "Initial commit" --no-verify
bunx --bun simple-git-hooks
```

## Code style

Shared with the wider project, restated so this file is self-contained:

- Two-space indent, single quotes, alphabetized imports.
- Empty line before `return`; `function` declarations for top-level functions.
- Vue components PascalCase; composables camelCase; `lib/` utilities kebab-case.
- Conventional commit messages (enforced by commitlint). No emojis.

## Do not

- Reference monorepo-only concepts: Storybook, registry authoring, Ark type
  decoupling/resync, `registry:build`, `packages/registry`.
- Assume a test runner exists. This template ships no `test` script; add one
  (for example Vitest) before running `bun test`.
