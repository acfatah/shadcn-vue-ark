---
name: create-component
description: Author a new UI component in packages/registry/src/components/ui end to end (directory layout, decoupled types.ts, variant.ts, context.ts, namespace.ts, _registry.ts, index.ts, then a Storybook story). Use when creating or scaffolding a new registry component, or any of its sub-files (namespace.ts, context.ts, props/emits interfaces, _registry.ts manifest).
---

# Creating new UI components

Patterns and conventions for authoring a component in
`packages/registry/src/components/ui/<name>/`. This file is the orchestrator;
the focused sub-step playbooks live in `references/` (read them when you reach
that step).

| Sub-step | Reference |
|---|---|
| `namespace.ts` (dotted export) | `references/namespace.md` |
| `context.ts` (shared state) | `references/context.md` |
| `_registry.ts` (manifest) | `references/registry.md` |
| `Props`/`Emits` interfaces | `references/props-emits.md` |

## Directory structure

```text
components/ui/{component-name}/
├── {ComponentName}.vue        (simple components)
├── {ComponentName}Root.vue    (complex components)
├── {ComponentName}Item.vue    (if applicable)
├── {ComponentName}Content.vue (if applicable)
├── {ComponentName}Trigger.vue (if applicable)
├── index.ts
├── types.ts
├── variant.ts                 (if using CVA variants)
├── context.ts                 (complex components with shared state)
├── namespace.ts               (complex components)
└── _registry.ts
```

## 1. Vue component structure

```vue
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { {ArkComponent} } from '@ark-ui/vue/{ark-component}'
import { reactiveOmit } from '@vueuse/core'
import { cn } from '@/lib/utils'
// Import useForwardProps or useForwardPropsEmits as needed

interface Props {
  class?: HTMLAttributes['class']
  // Add other props as needed
}

const props = withDefaults(defineProps<Props>(), {
  // Set default values if needed
})

const delegatedProps = reactiveOmit(props, 'class')
// useForwardProps for components without emits
// useForwardPropsEmits for components with emits
</script>

<template>
  <{ArkComponent}.{Part}
    data-scope="{component-name-kebab}"
    data-part="{part-name-kebab}"
    v-bind="forwardedProps"
    :class="cn('{default-classes}', props.class)"
  >
    <slot />
  </{ArkComponent}.{Part}>
</template>
```

For non-Ark components, add `data-scope` (component name, kebab-case) and
`data-part` (sub-element role, kebab-case) attributes. Replace any legacy
`data-slot` with `data-scope` / `data-part`.

For the full `Props`/`Emits` scaffolding (Ark-backed vs native-wrapper cases),
see `references/props-emits.md`.

## 2. Component types

- **Simple** (Button, Badge, Spinner, Separator): single `.vue`, optional
  `variant.ts`, types in `types.ts`.
- **Complex** (Accordion, Checkbox, RadioGroup, Field): multiple part `.vue`
  files, a Root container, `namespace.ts`, often `context.ts`.

## 3. Variant handling

For variant-driven components (Button, Badge) create `variant.ts`:

```ts
// variant.ts
import { cva } from 'class-variance-authority'

export const variant = { default: `...`, secondary: `...`, destructive: `...`, outline: `...` }
export const size = { sm: `...`, md: `...`, lg: `...` }

export const {componentName}Variants = cva('{base-classes}', {
  variants: { variant, size },
  defaultVariants: { variant: 'default', size: 'md' },
})
```

```ts
// types.ts (variant types)
import type { VariantProps } from 'class-variance-authority'

import type { {componentName}Variants } from './variant'

export type {ComponentName}Variants = VariantProps<typeof {componentName}Variants>
```

For richer prop surfaces, types are DECOUPLED from Ark: never import a type from
`@ark-ui/vue` or `@zag-js`. Hand-write a faithful 1:1 copy of Ark's surface in
`types.ts`, stamped with the version it was copied from, then extend it:

```ts
// types.ts
// Types extracted from @ark-ui/vue@5.37.0 (re-exports @zag-js/select@1.x).
// Faithful 1:1 copy - re-sync by hand when upgrading @ark-ui/vue.
import type { HTMLAttributes } from 'vue'

export type CollectionItem = any

export interface SelectRootProps<T extends CollectionItem = CollectionItem> {
  // ... reproduce Ark's prop surface verbatim
}

export interface SelectProps extends SelectRootProps<CollectionItem> {
  align?: 'start' | 'center' | 'end'
  class?: HTMLAttributes['class']
  invalid?: boolean
  loading?: boolean
  side?: 'top' | 'right' | 'bottom' | 'left'
}
```

`asChild` for polymorphic parts is inlined as `asChild?: boolean` (do not import
`PolymorphicProps`). See `docs/CONTEXT-component-types-definition.md` for the
decoupling rules and the `resync-component-types` skill for re-syncing after an
Ark upgrade.

## 4. Injection pattern (context.ts)

Complex components that share Root state with descendants use a `context.ts`
(`createContext` provide/inject). Full pattern and Tooltip example:
`references/context.md`.

## 5. index.ts export pattern

Simple:

```ts
export { default as {ComponentName} } from './{ComponentName}.vue'
export * from './types'
export { {componentName}Variants, variant } from './variant'
```

Complex:

```ts
export { {ComponentName} } from './namespace'
export { default as {ComponentName}Root } from './{ComponentName}Root.vue'
export { default as {ComponentName}Content } from './{ComponentName}Content.vue'
export { default as {ComponentName}Item } from './{ComponentName}Item.vue'
// ... other sub-components
export * from './types'
```

## 6. namespace.ts pattern

Complex components expose a dotted `Foo.Root` / `Foo.Part` namespace object and
re-export it from `index.ts`. Full RadioGroup template: `references/namespace.md`.

## 7. _registry.ts pattern

Each component has a metadata-only manifest. Files and `import`-derived
dependencies are scanned automatically. NEVER list `src/composables/*` or
`src/lib/*` in `files[]` (the build throws). Any custom CSS the component needs
(a `@utility` class, `@keyframes`, or a `--animate-*` / theme token) ships via
`cssVars` + `css` so it installs with the component - never hardcode it in
`src/styles/global.css`. Full pattern (including the self-sufficiency and
Storybook-parity rules): `references/registry.md` and
`docs/CONTEXT-registry-packaging.md`.

## 8. Import conventions

- Ark UI components: `@ark-ui/vue/{component-name}`
- Ark UI base element (runtime value): `import { ark } from '@ark-ui/vue'` (e.g.
  `<ark.button>`). Do NOT import `PolymorphicProps` as a type; inline
  `asChild?: boolean` in `types.ts`
- Vue utilities: `@vueuse/core` (e.g. `reactiveOmit`)
- Class name utils: `import { cn } from '@/lib/utils'`
- Composables: `@/composables/useForwardPropsEmits`, `@/composables/useForwardProps`,
  `@/composables/useForwardExpose`, `@/composables/createContext`
- Dynamic/asChild: `import { Dynamic } from '@/composables/dynamic'`
- Icons: `lucide-vue-next`

## 9. Styling conventions

- Tailwind CSS v4 + `cn()` for class composition
- `data-scope` / `data-part` for styling context
- Responsive prefixes where needed; consistent focus and state styles

## 10. Type safety

- TypeScript throughout; define types in `types.ts`, not inline
- `VariantProps` from class-variance-authority for variant types
- Types decoupled from Ark (see section 3); inline `asChild?: boolean` for
  `ark.*` primitives
- `HTMLAttributes` from Vue for the `class` prop type

## Step-by-step

1. Create `components/ui/{component-name}/`
2. Decide simple vs complex
3. Create `types.ts` (`references/props-emits.md` for the interfaces)
4. Create `variant.ts` if it has CVA variants
5. Create the `.vue` files
6. Create `context.ts` if it needs shared state (`references/context.md`)
7. Create `index.ts`
8. Create `namespace.ts` if complex (`references/namespace.md`)
9. Create `_registry.ts` (`references/registry.md`)
10. Author a Storybook story: use the `create-component-story` skill (registry
    bar: static CSF3 meta, `renderRaw`, drift-checked `argTypes`, per-archetype
    `play()`, a11y gate, `conformant.ts` opt-in). Not done until the story passes
    `check:argtypes`, `typecheck:stories`, `test:stories`, and `storybook:build`.
11. Run `bun run format {component-directory}` (from inside `packages/registry`)
    as the final task.

## Best practices

- Follow Ark UI accessibility guidelines; use `context7` for Ark/shadcn docs
- Keep components composable; use `cn()` consistently; forward props for
  attribute delegation
- Add JSDoc comments in namespace files; include proper data attributes
