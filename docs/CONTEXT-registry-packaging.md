# CONTEXT: Registry packaging model

How a component is packaged for the GitHub-native shadcn registry, and the one
rule that keeps it from drifting: **do not list composables or libs in a
component's `_registry.ts` `files[]`** - they are resolved automatically.

Verified against `shadcn@4.11.0`.

## TL;DR

- A `registry:ui` item's own source files are added automatically.
- Its npm `dependencies` and `registryDependencies` are discovered automatically
  from the `import` statements.
- Composables (`src/composables/*`) and libs (`src/lib/*`) are their own registry
  items, pulled in via the auto-discovered `registryDependencies`.
- So `_registry.ts` `files[]` is only for **non-scanned extras** (rare). Never put
  a `src/composables/*` or `src/lib/*` path there. The build fails if you do.

## How an item is assembled (`bun registry build`)

`build-ui-registry.ts` walks each `src/components/ui/<name>/` folder:

| Input | Becomes |
|---|---|
| Every file in the component folder (`*.vue`, `index.ts`, `types.ts`, ...) | an item `file` (added automatically) |
| `_registry.ts` `title` / `description` / `dependencies` | item metadata |
| `_registry.ts` `files[]` | extra files appended as-is (see the rule below) |
| `import` statements in each file (scanned by `get-file-dependecies.ts`) | `dependencies` (npm) + `registryDependencies` (other items) |

Import-to-`registryDependencies` mapping:

| Import | Generated `registryDependency` |
|---|---|
| `@/composables/useForwardPropsEmits` | `acfatah/shadcn-vue-ark/useForwardPropsEmits` |
| `@/lib/utils` | `acfatah/shadcn-vue-ark/utils-lib` |
| `@/components/ui/input/types` | `acfatah/shadcn-vue-ark/input` |

Naming: composables stay bare camelCase; libs get a `-lib` suffix; UI components
are kebab-case of the folder name.

## Why composables/libs do not go in `files[]`

Each composable/lib is published as its own item
(`useForwardPropsEmits` -> `registry:file`, `utils-lib` -> `registry:lib`, ...) by
`build-composables-registry.ts` / `build-lib-registry.ts`.

When a consumer runs `shadcn add acfatah/shadcn-vue-ark/<component>`, shadcn v4
`resolveRegistryItems` **walks the component's `registryDependencies` and flattens
their files into the install**. So the composable already arrives through the
dependency graph. Listing it in `files[]` as well double-ships the same file (and
goes stale when the component stops importing it).

This is the v3-era pattern from when the registry served `public/r/*.json`. It is
no longer correct.

## The rule (enforced)

- `_registry.ts` `files[]`: omit it unless the component needs a file that the
  scanner cannot see. Today the only example is `sonner`, which ships a
  component-local `styles.css` with an explicit `registry:file` type.
- Never list `src/composables/*` or `src/lib/*` in `files[]`.

`build-ui-registry.ts` throws at build time if a `files[]` entry matches
`^src/(composables|lib)/`, for example:

```text
kbd/_registry.ts: 'src/composables/dynamic.ts' is auto-resolved via
registryDependencies; remove it from files[] (see docs/CONTEXT-registry-packaging.md).
```

The CI drift gate (`bun registry build` + `git diff --exit-code`) keeps the
committed `registry.json` in sync.

## Adding a new component

1. Author the component under `src/components/ui/<name>/`; import composables via
   `@/composables/*` and `cn` via `@/lib/utils` as usual.
2. In `_registry.ts` set only `type` / `name` / `title` / `description`, plus
   `dependencies` for any npm package **not** in the
   `get-file-dependecies.ts` whitelist (for example `tw-animate-css`).
3. Run `bun registry build` and confirm the new item's `registryDependencies`
   lists the composables/libs you imported.
