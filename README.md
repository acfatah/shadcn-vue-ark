# shadcn-vue-ark

Implementation of [shadcn/ui][1] components as a registry, using Vue 3 and
[Ark UI][2]. Headless, accessible behavior from Ark UI (built on Zag.js state
machines); styling with Tailwind CSS v4.

Inspired by the [shadcn-vue][3] project.

> [!NOTE]
> Beta. The install contract below is stable; component APIs may still change.

## Requirements

- A Vue 3 project with Tailwind CSS v4 and a `components.json`. Run
  `bunx --bun shadcn@latest init`, or start from the
  [`vue-starter`](templates/vue-starter) template, which is preconfigured.
- `shadcn` CLI v4 or newer (GitHub-address registries require v4+).
- The `@/*` path alias mapped to your `src/` directory (see [Aliases](#aliases)).

## Install

This is a GitHub-native registry: components install straight from this repo by
`owner/repo/item` address, with no extra registry configuration.

1. Run the one-time project setup (base `components.json`, theme styles, fonts,
   and the `cn()` util):

   ```bash
   bunx --bun shadcn@latest add acfatah/shadcn-vue-ark/project-setup
   ```

2. Add components by name:

   ```bash
   bunx --bun shadcn@latest add acfatah/shadcn-vue-ark/button
   bunx --bun shadcn@latest add acfatah/shadcn-vue-ark/dialog
   ```

`npx shadcn@latest add ...` works the same way if you are not using Bun.

### Aliases

Every component imports composables via `@/composables/*` and the `cn()` util
via `@/lib/utils`. Your project must map the `@/*` alias to `src/*`, for example
in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

`@/composables` is not a default shadcn alias; it resolves through this generic
`@/*` mapping, so keep it in place.

### Pinning a version

Installs track the repository default branch. Once a release is tagged, append a
ref for reproducibility:

```bash
bunx --bun shadcn@latest add acfatah/shadcn-vue-ark/button#v0.1.0-beta.1
```

## Components

Browse the source under
[`packages/registry/src/components/ui`](packages/registry/src/components/ui), or
list items from the CLI:

```bash
bunx --bun shadcn@latest list acfatah/shadcn-vue-ark
```

| Category | Source | Count | Emitted `type` |
|---|---|---|---|
| UI components | `src/components/ui/*` | 63 | `registry:ui` |
| Top-level components | `src/components/*.vue` | 2 | `registry:component` |
| Blocks | `src/components/blocks/*` | 3 | `registry:block` |
| Layouts | `src/components/layouts/*` | 1 | `registry:block` |
| Composables | `src/composables/*.ts` | 10 | `registry:file` |
| Libs | `src/lib/*.ts` | 5 | `registry:lib` |

The generated `registry.json` contains 84 top-level items:
63 `registry:ui`, 10 `registry:file`, 2 `registry:component`,
4 `registry:block` (3 blocks + 1 layout), 5 `registry:lib`.

Note: layouts emit `registry:block`, not a distinct `registry:layout` type;
composables emit `registry:file`, not a hook type.

### UI components (63)

```text
accordion, alert, aspect-ratio, avatar, badge, breadcrumb, button,
button-group, calendar, card, carousel, checkbox, collapsible, combobox,
command, context-menu, data-table, date-picker, datetime-picker, description,
dialog, drawer, dropdown-menu, editable, empty, field, fieldset, file-upload,
hover-card, input, input-group, item, kbd, label, menubar, navigation-menu,
number-input, pagination, pin-input, popover, progress, radio-group,
range-calendar, resizable, scroll-area, select, separator, sheet, sidebar,
skeleton, slider, sonner, spinner, steps, switch, table, tabs, tags-input,
time-picker, timeline, toggle, toggle-group, tooltip
```

- Blocks: `data-table-custom`, `data-table-default`, `tanstack-data-table`.
- Layout: `sidebar-07`.
- Top-level: `DarkModeToggle`, `FullscreenToggle`.

## Development

The sections below are for working on the registry itself. A Bun-powered
monorepo; see [`CLAUDE.md`](CLAUDE.md) for conventions.

- [Bun](https://bun.sh) is required (scripts use `bun` / `bunx --bun`).
- The component library, registry build CLI, and Storybook all live in
  `packages/registry/`. Run the contributor scripts below (`bun storybook`,
  `bun registry:build`, `bun typecheck`, `bun test`) from that directory.

```bash
bun install                                  # install (repo root)
cd packages/registry && bun storybook        # component workshop
cd packages/registry && bun registry build   # rebuild registry.json
```

## Directory structure

```text
packages/registry/
  src/
    cli/                  # registry build CLI (commander, entry index.ts)
      index.ts            # #!/usr/bin/env bun, registers the `build` command
      commands/build/     # build pipeline (see "Registry build")
    components/
      ui/                 # 63 UI component folders (one per item)
      blocks/             # 3 blocks
      layouts/            # 1 layout
      DarkModeToggle.vue  # 2 top-level components
      FullscreenToggle.vue
      _registry.ts        # declares the 2 top-level components
    composables/          # 10 camelCase composables + index.ts barrel
    lib/                  # 5 kebab-case utilities (cn, format-bytes, ...)
    styles/               # global.css + fonts/nprogress (+ v4 variant)
    themes.ts             # 21 shadcn themes (data asset)
    base-colors.ts        # 4 grayscale base colors derived from themes
    index.ts              # intentionally EMPTY (0 bytes)
  stories/                # Storybook stories, helpers, checks
    components/{ui,blocks,layouts}/
    examples/overview/
    __checks__/           # story-shape + argtypes-drift unit tests
    _helpers/             # docsRoot() autodocs helper
    tailwind-viewports.ts
  public/stories/         # GENERATED story bundles (committed)
  registry.json           # GENERATED registry manifest (committed)
  .storybook/             # main.ts, preview.ts, global.css, vitest.setup.ts
  vite.config.ts          # used by the Storybook builder
  vitest.config.ts        # two projects: unit + storybook
  eslint.config.ts
  tsconfig.json
  tsconfig.stories.json
```

## Scripts

All live in `packages/registry/package.json`; run them from that directory.

### Registry build

| Script | Command | Purpose |
|---|---|---|
| `registry` | `bun src/cli/index.ts` | The CLI entry (`build` subcommand). |
| `registry:build` | `bun registry build` | Generate `registry.json` + bundles. |

### Storybook

| Script | Command | Purpose |
|---|---|---|
| `storybook` | `bunx --bun storybook dev --port 6066` | Run dev server. |
| `storybook:build` | `bunx --bun storybook build` | Build static Storybook. |
| `storybook:clear-cache` | `rm -rf node_modules/.cache/storybook` | Clear cache. |

### Lint / format

| Script | Command | Purpose |
|---|---|---|
| `lint` | `bunx --bun eslint` | Lint the package. |
| `lint:changed` | git diff -> `eslint` | Lint changed + untracked files. |
| `lint:staged` | `eslint $(git diff --cached ...)` | Lint staged files. |
| `lint:inspect` | `bunx --bun eslint --inspect-config` | Open config inspector. |
| `format` | `bunx --bun eslint --fix` | Lint and autofix. |
| `format:changed` | git diff -> `eslint --fix` | Autofix changed + untracked. |
| `format:staged` | `eslint --fix ... && git add` | Autofix and re-stage. |

### Typecheck

| Script | Command | Purpose |
|---|---|---|
| `typecheck` | `vue-tsc --noEmit` | Canonical Vue-aware typecheck. |
| `typecheck:tsgo` | `tsgo --noEmit` | Faster `tsgo` variant. |
| `typecheck:stories` | `vue-tsc -p tsconfig.stories.json` | Typecheck stories. |

Never pass `--bun` to `vue-tsc`: it degrades to a `.vue`-blind `tsc` run and
floods with `TS2307` errors.

### Test

| Script | Command | Purpose |
|---|---|---|
| `test` | `vitest --run --project=unit` | Run unit specs (`happy-dom`). |
| `test:watch` | `vitest --project=unit` | Unit specs in watch mode. |
| `test:stories` | `vitest --run --project=storybook` | Stories as browser tests. |
| `test:stories:watch` | `vitest --project=storybook` | Story browser tests, watch. |

## Registry build

`bun run registry:build` (equivalent to `bun registry build`, which runs
`bun src/cli/index.ts build`) does two things:

1. Generates `packages/registry/registry.json` (the manifest).
2. Builds story bundles into `public/stories/` (see Storybook section).

`registry.json` is GENERATED. Do not hand-edit it.

### Pipeline

`buildRegistry(namespace)` runs six sub-builders in parallel, concatenates,
then sorts deterministically (items by `name`; each item's `dependencies`,
`registryDependencies`, and `files` sorted) so the committed `registry.json`
stays stable for the CI drift check.

| Sub-builder | Crawls | Emits |
|---|---|---|
| `build-ui-registry.ts` | each `src/components/ui/<name>/` folder | `registry:ui` |
| `build-components-registry.ts` | `src/components/_registry.ts` | `registry:component` |
| `build-blocks-registry.ts` | `src/components/blocks/<name>/` | `registry:block` |
| `build-layouts-registry.ts` | `src/components/layouts/<name>/` | `registry:block` |
| `build-composables-registry.ts` | `composables/index.ts` re-exports | `registry:file` |
| `build-lib-registry.ts` | non-spec `src/lib/*.ts` | `registry:lib` |

For UI items, `files[]` is auto-derived by crawling the folder (every
non-`_registry.ts` file becomes an entry; numbered backups matching `\.\d+\.`
are skipped), and `registryDependencies` are auto-discovered by scanning each
file's imports (see below).

### Build flags

| Flag | Default |
|---|---|
| `-n, --name <name>` | repo-root `name` (`@acfatah/shadcn-vue-ark`) |
| `-h, --homepage <homepage>` | repo-root `homepage` |
| `-u, --registry-namespace <ns>` | `REGISTRY_NAMESPACE`, else the default |

| Env var | Effect |
|---|---|
| `REGISTRY_NAMESPACE` | `owner/repo` prefix for `registryDependencies`. |

Default for `REGISTRY_NAMESPACE`: `acfatah/shadcn-vue-ark`.

Note: `REGISTRY_URL` in `.env.example` is stale. It points at a `public/r`
output that this CLI does not produce and that nothing reads. The registry is
GitHub-native; there is no per-item `public/r/*.json` server.

### Two `registry.json` files

- The repo-root `registry.json` (name `shadcn-vue-ark`) is the consumer entry.
  It `include`s this package's manifest and adds two hand-authored items
  (`project-setup`, `agent-rules`).
- This CLI only writes the package-level `packages/registry/registry.json`
  (name `@acfatah/shadcn-vue-ark`). It never writes the root file.

### Auto-discovered `registryDependencies`

The scanner (`get-file-dependecies.ts`, filename intentionally as-is) parses
`.vue` and `.ts` imports and splits them:

- npm packages on a 13-entry whitelist (e.g. `@ark-ui/vue`, `@vueuse/core`,
  `clsx`, `tailwind-merge`, `lucide-vue-next`) go to `dependencies` (with their
  peer deps). Non-whitelisted npm packages must be declared manually in
  `_registry.ts` `dependencies`.
- `@/...` imports that resolve to a registry item go to `registryDependencies`.

All `registryDependency` values below are prefixed with the namespace
`acfatah/shadcn-vue-ark/` (omitted in the table for width).

| Import | registryDependency (after the namespace prefix) |
|---|---|
| `@/composables/useForwardPropsEmits` | `useForwardPropsEmits` |
| `@/lib/utils` | `utils-lib` |
| `@/components/ui/input/types` | `input` |

Rule: a component's `_registry.ts` `files[]` must NEVER list any
`src/composables/*` or `src/lib/*` path. Those are published as their own
registry items and arrive via `registryDependencies`; listing them double-ships
the file and goes stale. The UI builder throws if it sees one.

## Authoring a component

A UI component lives in `src/components/ui/<name>/`. Folder anatomy:

| File | Role |
|---|---|
| `<Name>.vue` / `<Name>Root.vue` ... | The component (or its parts). |
| `types.ts` | Hand-written props/emits/context interfaces. |
| `variant.ts` | CVA variants (`cva(...)`). |
| `context.ts` | provide/inject state for complex components. |
| `namespace.ts` | Dotted-export object (e.g. `Accordion.Root`). |
| `_registry.ts` | shadcn metadata only (see below). |
| `index.ts` | Re-exports (flat parts + namespace). |

Key rules:

- `_registry.ts` declares only metadata: `type`, `name`, `title`,
  `description`, `dependencies`, and optional `cssVars`/`css`/`tailwind`.
  `files[]` and `registryDependencies` are auto-derived for UI items (do NOT
  list composables/lib in `files[]`).
- Namespace pattern: complex components export a PascalCase object mapping
  dotted accessors to parts (49 UI folders have a `namespace.ts`).
- Types are decoupled from Ark: no `.vue`/`types.ts`/`context.ts` imports a
  TYPE from `@ark-ui/vue` or `@zag-js`. Each `types.ts` is a faithful 1:1
  hand-written copy stamped with the Ark version it was copied from (currently
  `@ark-ui/vue@5.37.0`). Runtime VALUE imports from Ark are allowed.

For the full walkthrough see
[`packages/registry/CLAUDE.md`](packages/registry/CLAUDE.md) and the
[`docs/`](docs/) directory, especially
[`docs/CONTEXT-ui-component-structure.md`](docs/CONTEXT-ui-component-structure.md),
[`docs/CONTEXT-component-types-definition.md`](docs/CONTEXT-component-types-definition.md),
[`docs/CONTEXT-component-types-resync.md`](docs/CONTEXT-component-types-resync.md),
and [`docs/CONTEXT-registry-packaging.md`](docs/CONTEXT-registry-packaging.md).

## Storybook and story bundles

Run Storybook:

```bash
bun storybook        # dev server on port 6066
bun storybook:build  # static build
```

- Framework: `@storybook/vue3-vite` with `vue-component-meta` docgen; addons
  `addon-docs`, `addon-a11y`, `addon-vitest`.
- Stories live in `stories/components/{ui,blocks,layouts}/<name>/`, each as a
  `<Name>.stories.ts` plus one or more `*Story.vue` files. There are 62 UI
  story folders (every UI component except `data-table`, whose story lives
  under `stories/components/blocks/data-table/`), plus `blocks` and `layouts`
  stories and an `examples/overview`.
- `_helpers/docsRoot()` relabels the autodocs primary ArgTypes tab to the
  dotted public name (e.g. `Card.Root` instead of `CardRoot`).

### Story bundle pipeline

`bun run registry:build` also runs `buildStoriesBundles()`, which emits one
self-contained `public/stories/<name>.json` per UI component that has stories
(62 bundles), plus `public/stories/index.json` (a flat array of names). Each
bundle is shaped `{ name, type: 'registry:stories', files: [...] }`, with the
`@/.../_registry` alias rewritten to a relative `./_registry` import and the
shadcn schema wiring stripped. These bundles are committed.

Note: CI drift-checks only `packages/registry/registry.json`, not
`public/stories/*`, so story bundles can drift from a fresh build without
failing CI. Rebuild before committing.

## Theming and styling

- `src/styles/global.css` is the canonical stylesheet: imports `tailwindcss`,
  `tw-animate-css`, fonts, and nprogress; OKLch tokens throughout; dark mode
  via `@custom-variant dark (&:is(.dark *))` plus a `.dark` token block; tokens
  mapped to Tailwind `--color-*` via `@theme inline`. It is wired into
  Storybook through `.storybook/global.css` (which also imports the sonner
  variant styles).
- `src/styles/v4.global.css` is an alternate variant (different breakpoints,
  extra `--destructive-foreground` token). It has no importer; `global.css` is
  the active one.
- `src/themes.ts` exports `THEMES` (21 shadcn themes, each with
  `cssVars.light`/`cssVars.dark` in OKLch). `src/base-colors.ts` derives
  `BASE_COLORS` (the 4 grayscale bases: `neutral`, `stone`, `zinc`, `gray`).
  The `_legacy-*.ts` files are pre-OKLch reference data.

## Composables and lib

- `src/composables/` (camelCase, 10 non-spec modules + `index.ts` barrel):
  `cleanProps`, `createContext`, `Dynamic` (from `dynamic.ts`), `runIfFn`,
  `unrefElement`, `useEmitAsProps` (from `useEmitsAsProps.ts`, note the export
  is singular), `useForwardExpose`, `useForwardProps`, `useForwardPropsEmits`,
  `useRenderStrategy` (module/registry name; its barrel exports are
  `RenderStrategyPropsProvider` and `useRenderStrategyProps`). The barrel also
  re-exports `mergeProps` from `@zag-js/core`. The dir also holds 2 colocated
  `.spec.ts` files (`runIfFn.spec.ts`, `useForwardProps.spec.ts`).
- `src/lib/` (kebab-case): `cn` (from `utils.ts`, `twMerge(clsx(...))`),
  `formatBytes`, `toDateValue`/`fromDateValue` (internationalized-date),
  `toBooleanValue`, `useFetch` (requires `VITE_API_URL`).

`src/index.ts` is intentionally empty. The package is consumed through the
`"./*": "./src/*"` subpath export (e.g. `@/lib/utils`) and the registry, not a
root barrel.

## Testing and typecheck

Vitest has two projects (`vitest.config.ts`):

- `unit`: `happy-dom`, runs `**/*.{test,spec}.*` (excludes stories). Covers 4
  `src/` specs (`format-bytes`, `to-boolean-value`, `runIfFn`,
  `useForwardProps`) plus the `stories/__checks__/*.test.ts` shape and
  argtypes-drift guards.
- `storybook`: Playwright/chromium browser mode via `@storybook/addon-vitest`;
  runs every `*.stories.ts` as a render + play + a11y test.

Typecheck with `bun typecheck` (`vue-tsc --noEmit`, the canonical Vue-aware
check). Do not pass `--bun` to `vue-tsc` (see Scripts).

## Conventions and contributing

- Code style: 2-space indent, single quotes, alphabetized imports, blank line
  before `return`, top-level `function` declarations. ESLint via
  `@antfu/eslint-config` (through `@acfatah/eslint-preset`).
- Naming: Vue components PascalCase, composables camelCase, `lib/` utilities
  kebab-case.
- Commits: conventional with a mandatory scope, e.g. `feat(registry): ...`.
- Docs style: ~80-col lines, concise bullets, fenced code with explicit
  language, backticks around commands/paths/identifiers, no emojis, no en/em
  dashes.

See [`CLAUDE.md`](CLAUDE.md),
[`packages/registry/CLAUDE.md`](packages/registry/CLAUDE.md), and the
[`docs/`](docs/) directory for full contributor guidance.

## License

[MIT](LICENSE) (c) Achmad F. Ibrahim.

[1]: https://ui.shadcn.com/
[2]: https://ark-ui.com/
[3]: https://github.com/shadcn/shadcn-vue
