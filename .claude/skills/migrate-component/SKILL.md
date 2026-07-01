---
name: migrate-component
description: Update an existing packages/registry/src/components/ui component to the current authoring conventions (data-scope/data-part attributes, typed Props interface, cva moved to variant.ts, namespace.ts, _registry.ts, alphabetized imports). Use when migrating or porting a component from shadcn React/Vue or older registry conventions, without changing its behavior.
---

# Migrate component from shadcn React or Vue

Update one or more components in `packages/registry/src/components/ui/` to
conform to the current conventions. Use the `create-component` skill for the
target patterns before starting.

## Current conventions to enforce

### 1. Data attributes

Replace `data-slot` with the two-attribute pattern:

```diff
- data-slot="trigger"
+ data-scope="accordion" data-part="trigger"
```

- `data-scope` = component name in kebab-case (matches the Ark UI component name
  or a custom name for non-Ark components)
- `data-part` = the sub-element role in kebab-case

### 2. Props interface

Move inline prop types to a typed `Props` interface if not already done:

```diff
- defineProps<{ class?: HTMLAttributes['class']; size?: 'sm' | 'md' }>()
+ interface Props {
+   class?: HTMLAttributes['class']
+   size?: 'sm' | 'md'
+ }
+ defineProps<Props>()
```

### 3. Variant definitions

If a component has `cva()` variants defined inline in the `.vue` file, move them
to dedicated `variant.ts` and import them:

```diff
- // inside Button.vue
- const buttonVariants = cva(...)
+ // in index.ts
+ export const buttonVariants = cva(...)
```

### 4. Namespace exports

If a complex component has no `namespace.ts`, create one (see the
`create-component` skill, `references/namespace.md`). If `index.ts` does not
re-export the namespace object, add it.

### 5. _registry.ts

If `_registry.ts` is missing or outdated, create or update it (see the
`create-component` skill, `references/registry.md`).

### 6. Import order

Ensure imports follow the project's alphabetized order (enforced by ESLint):
1. Type imports (`import type ...`)
2. External packages
3. Internal aliases (`@/...`)
4. Relative imports (`./...`)

## Steps

1. Read all `.vue` files and `index.ts` in the given component directory.
2. Identify which conventions above are violated.
3. Apply fixes file by file, smallest change first.
4. If a `namespace.ts` is missing, follow `references/namespace.md` in the
   `create-component` skill.
5. If `_registry.ts` is missing or stale, follow `references/registry.md` in the
   `create-component` skill.
6. Run `bun run format {component-directory}` (from inside `packages/registry`)
   as the final step.
7. Run `bun run typecheck` from `packages/registry` to verify no type errors.

## Notes

- Do not change component behavior - only update structure and naming.
- Use `context7` to verify Ark UI prop names before renaming.
- If unsure whether a `data-scope` name is correct, use the Ark UI component
  name (kebab-case) and cross-check sibling components in
  `src/components/ui/*`. Parts are styled inline with Tailwind, not via
  `data-scope` selectors in `global.css`.
