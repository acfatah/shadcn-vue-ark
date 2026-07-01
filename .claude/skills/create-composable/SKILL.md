---
name: create-composable
description: Author a Vue composable in packages/registry/src/composables following project conventions (camelCase file matching a named export, full TS types, JSDoc). Use when adding a new composable to the registry. Composables are auto-resolved via registryDependencies, never listed in a component's _registry.ts files[].
---

# Create composable

Create a Vue composable in `packages/registry/src/composables/` following project
conventions. Use `camelCase` for the file name (e.g. `useExample.ts`).

## Conventions

- File name: `camelCase` matching the export name (e.g. `useForwardProps.ts`)
- Function name: `camelCase` prefixed with `use` (e.g. `useForwardProps`)
- Export as named export (not default)
- Full TypeScript - define generics and return types explicitly
- No side-effectful imports (no auto-importing from VueUse unless necessary)

## Pattern

```ts
import type { Ref } from 'vue'
import { computed, toValue } from 'vue'

/**
 * Brief description of what this composable does.
 *
 * @param input - description of the parameter
 * @returns description of the return value
 */
export function useExample<T>(input: Ref<T> | T) {
  const value = computed(() => toValue(input))

  return {
    value,
  }
}
```

## Existing composables (do not duplicate)

- `useForwardPropsEmits.ts` - combines prop forwarding + emit-to-prop conversion (`useForwardPropsEmits`)
- `useForwardProps.ts` - forward props to child respecting declared defaults (`useForwardProps`)
- `useForwardExpose.ts` - forward `$el` and exposed values to parent (`useForwardExpose`)
- `useEmitsAsProps.ts` - convert emits to `onXXX` handler props (`useEmitAsProps`)
- `useRenderStrategy.ts` - lazy mount / unmount-on-exit config provider
- `dynamic.ts` - polymorphic component wrapper, renders first child with merged props (`Dynamic`)
- `createContext.ts` - typed provide/inject factory (`createContext<T>`)
- `unrefElement.ts` - extract DOM element from component instance or ref
- `cleanProps.ts` - remove undefined values from objects
- `runIfFn.ts` - conditionally invoke a function or return value as-is

## Steps

1. Determine if an existing composable or VueUse utility covers the need.
2. Create the file in `packages/registry/src/composables/`.
3. Write the composable with full TypeScript types and a JSDoc comment.
4. Do NOT add the composable to any `_registry.ts` `files[]`. Composables are
   their own registry items; a component that imports `@/composables/{name}`
   gets it auto-resolved via `registryDependencies` at build time. Listing it in
   `files[]` makes the build throw. See `docs/CONTEXT-registry-packaging.md`.
5. Run `bun run format src/composables/{file}` from inside `packages/registry`
   when done.

## Notes

- Prefer `computed()` over `watchEffect()` for derived reactive values.
- Use `toValue()` (Vue 3.3+) instead of `unref()` to handle both refs and
  plain values.
- Use `context7` to verify Vue Composition API patterns and VueUse utilities.
