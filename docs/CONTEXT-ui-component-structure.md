# UI Component Structure & Patterns

Reusable AI agent context for creating or improving components in
`packages/registry/src/components/ui/`. Optimized for precision -- assumes
familiarity with Vue 3, TypeScript, Tailwind CSS, and component libraries.

---

## Component Categories

There are four distinct component patterns. Identify which category a new
component falls into before starting.

> **Two independent decisions.** A component's *rendering technique* (which
> Category below) is separate from its *export shape* (flat exports vs a
> `namespace.ts` with dot-notation). Pick the technique by how the component
> renders; pick the export shape by the rule in
> [Namespace vs flat exports](#namespace-vs-flat-exports). Kbd, for example,
> renders with the Category 3 technique (`ark.kbd` + `PolymorphicProps`) but
> uses the Category 1 export shape (flat `Kbd` / `KbdGroup`, no namespace).

### Category 1: Simple Component (single element, may have CVA variants)

Examples: Button, Badge, Spinner, Separator, Input, Kbd

A simple component is fundamentally **one element**. It may ship an optional
auxiliary sibling (e.g. a `Group` layout wrapper) and still stay flat: keep the
component's own name as the primary export (`Kbd`, not `KbdRoot`), export the
sibling flat (`KbdGroup`), and do **not** add a `namespace.ts`. See
[Namespace vs flat exports](#namespace-vs-flat-exports).

```
components/ui/button/
├── Button.vue
├── _registry.ts
├── index.ts
├── types.ts
└── variant.ts        # only if using CVA variants
```

### Category 2: Complex Ark UI Component (multi-part, headless)

Examples: FileUpload, Accordion, Checkbox, Dialog, Select

```
components/ui/file-upload/
├── FileUploadRoot.vue
├── FileUploadDropzone.vue
├── FileUploadTrigger.vue
├── FileUploadLabel.vue
├── FileUploadItem.vue
├── FileUploadItemGroup.vue
├── FileUploadItemPreview.vue
├── FileUploadItemPreviewImage.vue
├── FileUploadItemName.vue
├── FileUploadItemSizeText.vue
├── FileUploadItemDeleteTrigger.vue
├── FileUploadClearTrigger.vue
├── FileUploadHiddenInput.vue
├── FileUploadContextProvider.vue  # only if bridging Ark context
├── _registry.ts
├── index.ts
├── namespace.ts
├── types.ts
└── context.ts        # only if custom injection is needed
```

### Category 3: Non-Ark Multi-Part Component (ark.div + PolymorphicProps)

Examples: Card, Alert, Description

These are multi-part layout components not backed by an Ark UI headless
component. They use `ark.div` (or `ark.section`, etc.) from `@ark-ui/vue` for
polymorphic rendering and manually set `data-scope`/`data-part` attributes.

```
components/ui/card/
├── CardRoot.vue
├── CardHeader.vue
├── CardTitle.vue
├── CardDescription.vue
├── CardContent.vue
├── CardFooter.vue
├── CardAction.vue
├── _registry.ts
├── index.ts
├── namespace.ts
└── types.ts
```

Key differences from Category 2:
- Import `ark` from `@ark-ui/vue` (not a specific component subpath).
- Each part ships a per-part interface in `types.ts` that inlines `asChild`
  (a faithful 1:1 copy of Ark's `PolymorphicProps`, no `@ark-ui`/`@zag` type
  import); the `.vue` extends it (see the `types.ts` pattern below and
  `docs/CONTEXT-component-types-definition.md`).
- Must manually add `data-scope` and `data-part` attributes.
- No `useForwardPropsEmits` -- just `reactiveOmit` and `v-bind="delegatedProps"`.
- Some Category 3 components add CVA on top: Alert renders via `ark.div` yet
  ships `variant.ts` and an `AlertVariants` type in `types.ts`.

```ts
// card/types.ts -- `asChild` inlined from @ark-ui/vue@5.37.0 `PolymorphicProps`.
// Faithful 1:1 copy -- re-sync by hand when upgrading @ark-ui/vue.

export interface CardHeaderProps {
  asChild?: boolean
}
```

```vue
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { ark } from '@ark-ui/vue'
import { reactiveOmit } from '@vueuse/core'

import { cn } from '@/lib/utils'

import type { CardHeaderProps } from './types'

interface Props extends CardHeaderProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <ark.div
    data-scope="card"
    data-part="header"
    v-bind="delegatedProps"
    :class="cn('...classes...', props.class)"
  >
    <slot />
  </ark.div>
</template>
```

### Category 4: Third-Party Library Wrapper

Examples: Sonner (wraps `vue-sonner`), DataTable (wraps `@tanstack/vue-table`)

These wrap an external non-Ark library with project-consistent styling. They may
include a `styles.css` for custom CSS properties or `@utility` definitions that
Tailwind cannot express.

```
components/ui/sonner/
├── Sonner.vue
├── _registry.ts
├── index.ts
├── types.ts
├── variant.ts
└── styles.css        # custom CSS properties and @utility definitions
```

Key differences:
- Import the third-party component, not Ark UI.
- May need `styles.css` for CSS custom properties (colors, tokens) and
  `@utility` rules that extend Tailwind.
- `variant.ts` may export helper functions (e.g., `defaultToastClasses()`) in
  addition to the CVA definition.
- Props extend the third-party library's type (e.g., `ToasterProps`).

```vue
<script lang="ts" setup>
import type { ToasterProps } from 'vue-sonner'

import { reactiveOmit } from '@vueuse/core'
import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
  XIcon,
} from 'lucide-vue-next'
import { computed } from 'vue'
import { Toaster as Sonner } from 'vue-sonner'

import { cn } from '@/lib/utils'

import { defaultToastClasses } from './variant'

const props = defineProps<ToasterProps>()
const delegatedProps = reactiveOmit(props, 'class', 'toastOptions')

const toastOptions = computed<ToasterProps['toastOptions']>(() => ({
  duration: 5000,
  closeButton: true,
  closeButtonPosition: 'top-right',
  ...props.toastOptions,
  classes: {
    ...defaultToastClasses(),
    ...props.toastOptions?.classes,
  },
}))
</script>

<template>
  <Sonner
    :class="cn('toaster group', props.class)"
    :toast-options="toastOptions"
    v-bind="delegatedProps"
  >
    <template #success-icon>
      <CircleCheckIcon class="size-4" />
    </template>
    <template #info-icon>
      <InfoIcon class="size-4" />
    </template>
    <template #warning-icon>
      <TriangleAlertIcon class="size-4" />
    </template>
    <template #error-icon>
      <OctagonXIcon class="size-4" />
    </template>
    <template #loading-icon>
      <div>
        <Loader2Icon class="size-4 animate-spin" />
      </div>
    </template>
    <template #close-icon>
      <XIcon class="size-4" />
    </template>
  </Sonner>
</template>
```

`sonner/types.ts` only re-exports the CVA variant type:

```ts
import type { VariantProps } from 'class-variance-authority'

import type { sonnerVariants } from './variant'

export type SonnerVariants = VariantProps<typeof sonnerVariants>
```

`styles.css` example -- defines custom color tokens and `@utility` rules:

```css
@theme inline {
  --color-success: var(--success);
  --color-success-foreground: var(--success-foreground);
}

@utility border-success {
  border-color: var(--success-border);
}

:root {
  --success: oklch(97.9% 0.022 160.2);
  --success-foreground: oklch(55.2% 0.166 146.6);
  --success-border: oklch(91.2% 0.043 159.1);
}

.dark {
  --success: oklch(21.1% 0.05 157.4);
  --success-foreground: oklch(86.4% 0.17 157.8);
  --success-border: oklch(28.1% 0.065 157.6);
}
```

---

## Namespace vs flat exports

Whether a component gets a `namespace.ts` (dot-notation `Foo.Root`, `Foo.Part`)
or **flat exports** is decided by composition, **not** by how many `.vue` files
it has.

**The test:** *Is there a single element that IS the component and is usable on
its own?*

- **Yes → flat exports.** The component is fundamentally one element. Keep its
  own name as the primary export (`Kbd`, `Button`) — never rename it to `Root` —
  and do **not** add a `namespace.ts`. An optional auxiliary sibling (a `Group`
  layout wrapper, etc.) does **not** change this: export it flat too
  (`KbdGroup`). This is the Category 1 shape.
- **No → `namespace.ts` with `Root`/parts.** The component only exists as the
  composition of its parts — none of them is "the component" on its own
  (Card, FileUpload, Select, Dialog). These are the Category 2 and 3 composed
  widgets, and every part lives under the namespace via dot-notation.

Concretely: a `Group` wrapper is not enough to justify a namespace. Kbd has two
`.vue` files (`Kbd.vue` + `KbdGroup.vue`) yet stays flat, because `<Kbd>` is a
complete, standalone element and `<KbdGroup>` is just optional layout.

---

## File-by-File Patterns

### types.ts

Defines all props and emits interfaces. Never define types inline in `.vue`
files.

**Ark UI backed component** -- types are **decoupled** from Ark. No `.vue`,
`types.ts`, or `context.ts` under `ui/` imports a *type* from `@ark-ui/vue` or
`@zag-js`. Each `types.ts` is a faithful 1:1 hand-copy of Ark's prop / emit /
detail surface, stamped with its provenance; runtime *value* imports (the Ark
component itself) stay. See `docs/CONTEXT-component-types-definition.md` for the
rule and `docs/CONTEXT-component-types-resync.md` for the upgrade process.

```ts
// Types extracted from @ark-ui/vue@5.37.0 (re-exports @zag-js/file-upload@1.x).
// Faithful 1:1 copy -- re-sync by hand when upgrading @ark-ui/vue.
//
// No type import from `@ark-ui/vue` or `@zag-js`. Only non-Ark external types
// are allowed (e.g. `import type { ComputedRef } from 'vue'`); detail payload
// types are hand-copied locally too.

export interface FileAcceptDetails { files: File[] }
// ...FileChangeDetails, FileRejectDetails, etc. -- all copied locally

export interface FileUploadRootProps {
  asChild?: boolean
  accept?: Record<string, string[]> | FileMimeType | FileMimeType[]
  maxFiles?: number
  // ...every Ark prop, exact type, with JSDoc @default annotations
}

export interface FileUploadRootEmits {
  'update:acceptedFiles': [files: File[]]
  'fileAccept': [details: FileAcceptDetails]
  'fileChange': [details: FileChangeDetails]
  'fileReject': [details: FileRejectDetails]
}

// Sub-part interfaces -- minimal, usually just asChild
export interface FileUploadDropzoneProps {
  asChild?: boolean
  disableClick?: boolean
}

export interface FileUploadItemProps {
  asChild?: boolean
  file: File
}
```

Keep one blank line between every top-level declaration and between
JSDoc-annotated members (the blank-line spacing convention; see
`docs/CONTEXT-apply-spacing-pattern.md`, with `menubar/types.ts` as the
exemplar).

**CVA variant component** -- derive variant types from the variant definition:

```ts
import type { VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'

import type { buttonVariants } from './variant'

export interface ButtonProps {
  class?: HTMLAttributes['class']
  asChild?: boolean
  disabled?: boolean
  size?: ButtonVariants['size']
  variant?: ButtonVariants['variant']
}

export type ButtonVariants = VariantProps<typeof buttonVariants>
```

### variant.ts

Only for components with CVA variants. Export named variant maps and the
composed `cva()` function:

```ts
import { cva } from 'class-variance-authority'

export const variant = {
  default: `bg-primary text-primary-foreground shadow-xs hover:bg-primary/90`,
  destructive: `bg-destructive text-white shadow-xs hover:bg-destructive/90`,
  outline: `border border-border bg-background shadow-xs hover:bg-accent`,
  // ...
}

export const size = {
  sm: `h-8 gap-1.5 rounded-md px-3`,
  md: `h-9 px-4 py-2`,
  lg: `h-10 rounded-md px-6`,
}

export const buttonVariants = cva(
  `inline-flex items-center justify-center rounded-md text-sm font-medium ...`,
  {
    variants: { variant, size },
    defaultVariants: { variant: 'default', size: 'md' },
  },
)
```

### Vue Component (.vue)

Every `.vue` file follows an identical script-setup skeleton.

**Root component (with emits):**

```vue
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { FileUpload } from '@ark-ui/vue/file-upload'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

import type { FileUploadRootEmits, FileUploadRootProps } from './types'

interface Props extends FileUploadRootProps {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits<FileUploadRootEmits>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps, emit)
</script>

<template>
  <FileUpload.Root
    v-bind="forwardedProps"
    :class="cn('flex flex-col gap-4', props.class)"
  >
    <slot />
  </FileUpload.Root>
</template>
```

**Sub-part component (no emits):**

```vue
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { FileUpload } from '@ark-ui/vue/file-upload'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

import type { FileUploadDropzoneProps } from './types'

interface Props extends FileUploadDropzoneProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <FileUpload.Dropzone
    v-bind="forwardedProps"
    :class="cn(
      `flex flex-col items-center justify-center gap-2 rounded-lg border-2
       border-dashed border-border bg-background p-8 text-center`,
      'hover:border-ring/50 hover:bg-accent/50',
      'data-dragging:border-ring data-dragging:bg-accent/50',
      'data-disabled:pointer-events-none data-disabled:opacity-50',
      `focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none`,
      props.class,
    )"
  >
    <slot />
  </FileUpload.Dropzone>
</template>
```

**Component with default slot content (icons, etc.):**

```vue
<template>
  <FileUpload.ItemDeleteTrigger v-bind="forwardedProps" :class="cn(...)">
    <slot>
      <XIcon class="size-4" />
    </slot>
  </FileUpload.ItemDeleteTrigger>
</template>
```

### Key conventions in .vue files

| Pattern | Rule |
|---|---|
| Import order | 1. `type` imports, 2. external packages, 3. `@/` aliases, 4. `./` relative |
| Props class | Always add `class?: HTMLAttributes['class']` via a local `interface Props` that extends the type from `types.ts` |
| Delegated props | `reactiveOmit(props, 'class')` to strip `class` before forwarding. Omit additional non-Ark props as needed (e.g., `['class', 'hideArrow', 'showCloseButton']`). |
| Forwarding | `useForwardPropsEmits(delegatedProps, emit)` for root; `useForwardPropsEmits(delegatedProps)` for sub-parts |
| Class composition | Always use `cn()`. Pass multi-line template literals for base classes, separate strings for state/pseudo classes, `props.class` last. |
| Ark UI import | `import { ComponentName } from '@ark-ui/vue/component-name'` (tree-shakeable deep import) |
| Data attributes | Ark UI components provide their own. For custom (non-Ark) components, add `data-scope="{name}"` and `data-part="{part}"`. |
| `withDefaults` | Only on root components or components with default values; sub-parts use plain `defineProps<Props>()`. |
| `defineOptions` | Use `defineOptions({ inheritAttrs: false })` when manually spreading `$attrs` (e.g., Dialog/Popover content components that wrap an Ark Positioner). |

### namespace.ts

Groups all sub-components into a single namespace object for dot-notation usage
(`FileUpload.Root`, `FileUpload.Dropzone`, etc.):

```ts
import FileUploadClearTrigger from './FileUploadClearTrigger.vue'
import FileUploadDropzone from './FileUploadDropzone.vue'
// ... all other sub-components

export const FileUpload = {
  /** FileUploadRoot component */
  Root: FileUploadRoot,
  /** FileUploadDropzone component */
  Dropzone: FileUploadDropzone,
  // ... every sub-component with a JSDoc comment
}
```

### index.ts

Flat re-exports for tree-shaking and named imports:

**Complex component:**

```ts
export { useFileUploadContext } from './context'
export { default as FileUploadClearTrigger } from './FileUploadClearTrigger.vue'
export { default as FileUploadDropzone } from './FileUploadDropzone.vue'
// ... all sub-components as named exports
export { FileUpload } from './namespace'
```

**Simple component:**

```ts
export { default as Button } from './Button.vue'
export * from './types'
export { buttonVariants, size, variant } from './variant'
```

**Simple component with an optional sibling** (flat, no namespace -- the primary
component keeps its own name):

```ts
export { default as Kbd } from './Kbd.vue'
export { default as KbdGroup } from './KbdGroup.vue'
```

### context.ts

Uses the project's `createContext` composable to share state with descendant
sub-components via Vue's `provide/inject`.

**Options context** -- when the root component passes simple options (e.g.,
`hideArrow` on Tooltip):

```ts
import type { ComputedRef } from 'vue'

import { createContext } from '@/composables/createContext'

export interface TooltipOptions {
  hideArrow?: boolean
}

export const [TooltipOptionsProvider, useTooltipOptions]
  = createContext<ComputedRef<TooltipOptions>>('TooltipOptions')
```

The root component provides via `TooltipOptionsProvider(computed(...))`, and
descendant components consume via `useTooltipOptions()`.

**Ark context bridge** -- when descendant components need access to the Ark UI
component's full context (e.g., FileUpload's `acceptedFiles`, `open()`,
`clearFiles()`):

```ts
// context.ts
import type { UseFileUploadContext } from '@ark-ui/vue/file-upload'

import { createContext } from '@/composables/createContext'

export const [FileUploadProvider, useFileUploadContext]
  = createContext<UseFileUploadContext>('FileUploadContext')
```

This requires a thin bridge component that captures Ark's context and provides
it through the custom channel. The bridge **must be a child** of the Ark Root
component — Ark's `useFileUploadContext()` reads from Vue's provide/inject, so
calling it in the same component that renders `<FileUpload.Root>` would fail
(the Ark Root hasn't provided its context yet at that point).

The bridge can be a separate `ContextProvider.vue` file or inlined in Root via
`defineComponent`. Either way:

```vue
<!-- FileUploadContextProvider.vue -->
<script setup lang="ts">
import { useFileUploadContext as useArkFileUploadContext } from '@ark-ui/vue/file-upload'

import { FileUploadProvider } from './context'

const fileUploadContext = useArkFileUploadContext()
FileUploadProvider(fileUploadContext)
</script>

<template>
  <slot />
</template>
```

The Root component wraps its slot content with the ContextProvider:

```vue
<!-- FileUploadRoot.vue (template only) -->
<template>
  <FileUpload.Root v-bind="forwardedProps" :class="cn('...', props.class)">
    <FileUploadContextProvider>
      <slot />
    </FileUploadContextProvider>
  </FileUpload.Root>
</template>
```

Consumers then access the Ark context anywhere in the tree via
`useFileUploadContext()`. Export the consumer hook from `index.ts`.

Do **not** create a separate `Context.vue` component that wraps Ark's
`<Component.Context v-slot>` -- the `context.ts` + `ContextProvider.vue` pattern
is preferred because it is composable-based, more type-safe, and allows
augmenting the context (see Select for an example that adds `loading`,
`invalid`, and `nativeInvalid` to Ark's context).

### _registry.ts

Authored metadata only. The registry build (`bun registry build`, run in
`packages/registry`) scans the component's imports and auto-derives the rest:
the component's own files, its `registryDependencies`, and most npm
`dependencies`. A typical `_registry.ts` therefore sets just `type`, `name`,
`title`, `description`, and any npm `dependencies` the scanner cannot infer.

```ts
import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'file-upload',
  title: 'File Upload',

  description: html`
    A component for uploading files with drag and drop support.

    References:
    - Headless API: https://ark-ui.com/docs/components/file-upload
  `,

  // npm packages the scanner can't infer. `tw-animate-css` is off-whitelist so
  // it must be listed; `@ark-ui/vue`, `@vueuse/core`, and `lucide-vue-next`
  // are whitelisted and would be auto-added from imports.
  dependencies: [
    '@ark-ui/vue',
    '@vueuse/core',
    'lucide-vue-next',
    'tw-animate-css',
  ],
} satisfies RegistryItem

export default registryItem
```

No `files[]` and no `registryDependencies`: both are derived. Listing a
`src/composables/*` or `src/lib/*` path in `files[]` **throws at build** -- they
ship as their own registry items via auto-discovered `registryDependencies`.

`files[]` is only for non-source assets the scanner can't see. The sole example
today is `sonner`, which adds its `styles.css`:

```ts
  files: [
    {
      path: 'src/components/ui/sonner/styles.css',
      type: 'registry:file',
      target: 'src/components/ui/sonner/styles.css',
    },
  ],
```

Hand-list `registryDependencies` only when a dependency is composed at runtime
rather than statically imported (e.g. `date-picker` lists
`['button', 'calendar', 'popover']`). Bare names normalize to
`acfatah/shadcn-vue-ark/<name>` addresses at build.

**Registry field reference:**

| Field | Required | Description |
|---|---|---|
| `type` | Yes | Always `'registry:ui'` |
| `name` | Yes | Kebab-case component name, matches directory name |
| `title` | Yes | Human-readable title |
| `description` | Yes | Uses `html` tagged template from `common-tags`. Include links to Ark UI docs, shadcn/ui docs, or other references. |
| `dependencies` | No | npm packages the scanner can't auto-add. Whitelisted imports (`@ark-ui/vue`, `@vueuse/core`, `lucide-vue-next`, `@tanstack/vue-table`, ...) and their peers merge in automatically; you only *need* off-whitelist packages (`tw-animate-css`, `@internationalized/date`, `@iconify/vue`, `class-variance-authority`). By convention authors still list the component's direct deps. |
| `registryDependencies` | No | Auto-discovered from `@/` imports. Hand-list only runtime-composed deps the scanner can't infer (e.g. `date-picker` -> `['button', 'calendar', 'popover']`). Bare names normalize to `<namespace>/<name>`. |
| `files` | No | Only for non-source assets the scanner can't see (today just `sonner/styles.css`). **Never** list `src/composables/*` or `src/lib/*` -- the build throws. |

---

## Registry build & validation

The registry is **GitHub-native**: a single `packages/registry/registry.json`
(there is no `public/r/` dir) consumed directly from the repo. Consumers install
with `shadcn add acfatah/shadcn-vue-ark/<name>`.

After adding or changing a component, from `packages/registry`:

```bash
bun registry build   # rescans imports, regenerates registry.json
```

Commit the regenerated `registry.json` alongside your source. CI
(`.github/workflows/registry.yml`) rebuilds, fails on drift via
`git diff --exit-code`, then runs `shadcn@4 registry validate`.

What the build derives automatically (so you do not hand-maintain it):

| Derived | Rule |
|---|---|
| `files[]` | Every file in the component folder (except `_registry.ts`) is added as `registry:ui`. |
| `dependencies` | Whitelisted npm imports (and their peers) auto-merge, then union with any you hand-list. |
| `registryDependencies` | `@/composables/X` -> `<ns>/X`, `@/lib/X` -> `<ns>/X-lib`, `@/components/ui/<name>/...` -> `<ns>/<name>`. |
| addresses | Bare `registryDependencies` names normalize to `<namespace>/<name>` (default namespace `acfatah/shadcn-vue-ark`). |

See also: `docs/CONTEXT-registry-packaging.md` (packaging model and the
no-composables-in-`files[]` rule) and `docs/CONTEXT-github-registry.md`
(GitHub install addressing and the `shadcn` CLI).

---

## Positioning Abstraction Pattern

Components with floating/popover behavior (Tooltip, Popover, HoverCard,
DropdownMenu, Combobox, Select) share a positioning abstraction that maps
Radix-style `side`/`align` props to Ark UI's `positioning` object.

**Props added to the Root component:**

```ts
interface Props extends PopoverRootProps {
  align?: 'start' | 'center' | 'end'
  alignOffset?: number
  side?: 'top' | 'right' | 'bottom' | 'left'
  sideOffset?: number
}
```

**Computed positioning object in the Root component:**

```ts
const props = withDefaults(defineProps<Props>(), {
  align: 'center',
  alignOffset: 0,
  side: 'bottom',
  sideOffset: 4,
})

const delegatedProps = reactiveOmit(props, [
  'align',
  'alignOffset',
  'positioning',
  'side',
  'sideOffset',
])

// `Placement` is hand-copied into `./types` (decoupled from Ark), not derived
// from Ark's positioning type, e.g.:
//   import type { Placement, PopoverRootProps } from './types'
// Root positioning components also set `defineOptions({ inheritAttrs: false })`
// and spread `$attrs` manually.

const positioning = computed(() => {
  const placement = (props.align === 'center'
    ? props.side
    : `${props.side}-${props.align}`) as Placement

  return {
    ...props.positioning,
    gutter: props.positioning?.gutter ?? props.sideOffset,
    offset: props.positioning?.offset ?? (props.alignOffset
      ? { crossAxis: props.alignOffset }
      : undefined),
    placement: props.positioning?.placement ?? placement,
  }
})
```

**Template usage:**

```vue
<template>
  <Popover.Root v-bind="forwardedProps" :positioning="positioning">
    <slot />
  </Popover.Root>
</template>
```

Key rules:
- `side`/`align`/`sideOffset`/`alignOffset` must be omitted from
  `delegatedProps` via `reactiveOmit` (they are not Ark props).
- The original `positioning` prop must also be omitted and merged manually.
- Default: `side: 'bottom'`, `align: 'center'`, `sideOffset: 4`,
  `alignOffset: 0`.
- The user can still pass a raw `positioning` object to override everything.

---

## Scope Prop Pattern

The Button component accepts a `scope` prop that dynamically sets `data-scope`.
This allows other components to embed Button internals while applying their own
scoped styles.

```ts
// types.ts
export interface ButtonProps {
  scope?: string
  // ...
}
```

```vue
<!-- Button.vue -->
<component
  :is="props.asChild ? Dynamic : 'button'"
  :data-scope="props.scope"
  v-bind="forwardedProps"
  :class="cn(buttonVariants({ variant, size }), props.class)"
>
  <slot />
</component>
```

Usage by another component (e.g., SidebarMenuButton):

```vue
<Button scope="sidebar" variant="ghost" size="sm">
  <!-- Styles can now target [data-scope="sidebar"] instead of [data-scope="button"] -->
</Button>
```

Use this pattern when a component is designed to be visually reused inside
another component's styling context.

---

## useForwardExpose Pattern

Use `useForwardExpose()` when a wrapper component needs to expose its child
component's template ref to the parent. This is common in Select, ContextMenu,
and Command sub-components where parent components need programmatic access.

```vue
<script setup lang="ts">
import { useForwardExpose } from '@/composables/useForwardExpose'
import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'

// ... other imports and props setup

const forwardedProps = useForwardPropsEmits(delegatedProps)
useForwardExpose()
</script>

<template>
  <Select.Item v-bind="forwardedProps" :class="cn(...)">
    <slot />
  </Select.Item>
</template>
```

Call `useForwardExpose()` with no arguments. It automatically exposes the
component's root element ref. Use it when the Ark UI component needs ref access
for focus management, scroll positioning, or measurement.

---

## v-model / Two-Way Binding

Ark UI components use `update:*` emit conventions for two-way binding. The emit
name varies per component:

| Component | v-model emit | Payload | Other `update:*` emits |
|---|---|---|---|
| FileUpload | `update:acceptedFiles` | `File[]` | -- |
| Accordion | `update:modelValue` | `string[]` | -- |
| Dialog | `update:open` | `boolean` | -- |
| Checkbox | `update:checked` | `CheckedState` (`boolean \| 'indeterminate'`) | -- |
| Checkbox (group) | `update:modelValue` | `string[]` | -- |
| Select | `update:modelValue` | `string[]` | `update:open`, `update:highlightedValue` |
| Combobox | `update:modelValue` | `string[]` | `update:open`, `update:inputValue`, `update:highlightedValue` |

Define `update:*` emits in the `RootEmits` interface in `types.ts`:

```ts
export interface FileUploadRootEmits {
  'update:acceptedFiles': [files: File[]]
  'fileAccept': [details: FileAcceptDetails]
  // ...
}
```

The `useForwardPropsEmits(delegatedProps, emit)` composable automatically
converts emits to `onUpdate:*` props and forwards them to the Ark UI component,
enabling `v-model:acceptedFiles` on the wrapper.

---

## Animation Conventions

Animations use `tw-animate-css` utility classes. Add `tw-animate-css` to
`dependencies` in `_registry.ts` when using these.

**Enter animations (unconditional):**

```
animate-in fade-in-0 slide-in-from-bottom-2
```

**State-driven animations (open/close):**

```
data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95
data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95
```

**Common animation combinations:**

| Use case | Classes |
|---|---|
| List item entering | `animate-in fade-in-0 slide-in-from-bottom-2` |
| Overlay open/close | `data-[state=open]:animate-in data-[state=open]:fade-in-0` / `data-[state=closed]:animate-out data-[state=closed]:fade-out-0` |
| Dialog/popover open | `data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95` |
| Dialog/popover close | `data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95` |
| Transition duration | `duration-200` (add to element, not to animation classes) |

---

## Storybook Stories

Every component must have a corresponding story in
`packages/registry/stories/components/ui/{component-name}/`.

### Story directory structure

```
packages/registry/stories/components/ui/button/
├── Button.stories.ts          # Meta + story exports
├── DemoStory.vue              # Template the Default export renders (name is per-component)
├── VariantStory.vue           # One *Story.vue per visual variant
├── SizeStory.vue
└── WithIconStory.vue
```

Every `*.vue` must be imported by the `.stories.ts` (no orphans) and paired with
a `?raw` import for the docs source panel.

### Story file (.stories.ts) skeleton

```ts
import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { FileUpload } from '@/components/ui/file-upload'
import { registryItem } from '@/components/ui/file-upload/_registry'

import FileUploadDefaultStory from './FileUploadDefaultStory.vue'
import FileUploadDefaultSource from './FileUploadDefaultStory.vue?raw'

const meta = {
  title: 'Components/UI/FileUpload',
  component: FileUpload.Root,         // Root component for complex, or Component for simple
  tags: ['autodocs'],

  args: {
    disabled: false,
    maxFiles: 5,
  },

  argTypes: {
    disabled: { control: 'boolean' },
    maxFiles: { control: 'number' },
  },

  parameters: {
    docs: {
      description: {
        component: registryItem.description,  // Reuse _registry.ts description
      },
    },
  },
} satisfies Meta<typeof FileUpload.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: FileUploadDefaultSource,        // ?raw import for source display
      },
    },
  },

  render: args => ({
    components: { FileUploadDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <FileUploadDefaultStory v-bind="args" />
    `,
  }),
}
```

### Story conventions

- `title` must be `Components/UI/<PascalName>` and meta must include
  `tags: ['autodocs']`.
- A `Default` export is required. The template it renders is named per-component
  (e.g. Button's `Default` renders `DemoStory.vue`), not a fixed
  `{Component}DefaultStory.vue`.
- Import source via the `?raw` suffix; every `*Story.vue` you render needs a
  paired `?raw` import, and no `*.vue` may be left unimported (orphan).
- Reuse `registryItem.description` from `_registry.ts` for docs description --
  the one home for component prose.
- `meta.component` is the main component (Root for complex, the component itself
  for simple).
- Each visual variant gets its own `*Story.vue` file and story export; a `Demo`
  export, if present, must be last.
- For CVA variant components, add `argTypes` with `control: { type: 'select' }`
  listing all variant/size options. Keep `argTypes` in sync with the
  component's real props (drift is the named #1 failure mode).

See `docs/CONTEXT-story-driven-components.md` for the story-first authoring
workflow.

### Story contract (CI-enforced)

Structural checks live in `packages/registry/stories/__checks__/` and run in
the `unit` Vitest project (`bun run test`):

- `story-shape.test.ts` enforces the 7 conventions above (title prefix,
  `autodocs` tag, single `Default` export, description from
  `registryItem.description`, no orphan `*.vue`, paired `?raw`, `Demo` last).
- `argtypes-drift.test.ts` asserts a story's `argTypes` keys match the
  component's real props.

Enforcement is **wave-gated** by `stories/__checks__/conformant.ts`. That list
is **empty today**, so both checks are report-only (`console.warn`) for every
component and never fail CI yet. A component becomes blocking once its kebab
name is added to `CONFORMANT`. Separately, the `new-component-story` CI job
**does** hard-fail any PR that adds a `ui/*/_registry.ts` without a matching
story dir.

### Story testing (browser mode)

`packages/registry/vitest.config.ts` defines two projects:

- `unit` -- happy-dom unit tests plus the `__checks__` contract guards.
- `storybook` -- every `*.stories.ts` run as a browser test (render + `play()`
  + a11y) in headless Chromium via Playwright (`@storybook/addon-vitest`).

Commands (from `packages/registry`):

```bash
bun run test            # unit + story-contract checks
bun run test:stories    # browser mode: render + play + a11y
bunx playwright install --with-deps chromium   # one-time, for test:stories
bun run typecheck:stories                       # vue-tsc -p tsconfig.stories.json
```

a11y is report-only by default (`.storybook/preview.ts` sets
`a11y.test: 'todo'`, scoped to `body` for Teleported overlays); promote a clean
component's meta to `'error'` to make axe violations fail. Defects found while
authoring stories go in `docs/story-defect-log.md` (story work is additive --
log, do not fix). `stories/tsconfig.json` exists only so the IDE (Volar)
resolves `@/*`; the authoritative CLI check is `typecheck:stories` against the
root `tsconfig.stories.json`.

---

## Styling Rules

- All styling via Tailwind CSS utility classes.
- `cn()` (from `@/lib/utils`) for class composition -- always use it, never
  concatenate class strings manually.
- State styles use Ark UI `data-*` attributes: `data-disabled:`, `data-dragging:`,
  `data-invalid:`, `data-highlighted:`.
- Focus styles: `focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none`.
- Disabled styles: `data-disabled:pointer-events-none data-disabled:opacity-50`
  (Ark) or `disabled:pointer-events-none disabled:opacity-50` (native).
- Dark mode via `dark:` prefix where needed.
- Design tokens from Tailwind theme: `border`, `ring`, `accent`, `muted-foreground`,
  `primary`, `destructive`, etc.

---

## Anti-Patterns to Avoid

| Anti-pattern | Correct approach |
|---|---|
| Using `data-slot` attribute | Use `data-scope` + `data-part` instead |
| Defining prop types inline in `.vue` files | Define in `types.ts` and import |
| Defining CVA variants inline in `.vue` files | Define in `variant.ts` and import |
| Skipping `reactiveOmit` for `class` | Always `reactiveOmit(props, 'class')` before forwarding |
| Concatenating class strings manually | Always use `cn()` |
| Importing from `@ark-ui/vue` barrel | Use deep imports: `@ark-ui/vue/file-upload` |
| Using `useForwardProps` for components with emits | Use `useForwardPropsEmits` (handles both) |
| Adding `withDefaults` to sub-part components with no defaults | Use plain `defineProps<Props>()` |
| Missing `namespace.ts` for composed multi-part widgets | Always create for *composed* Category 2/3 widgets -- not single-element components that merely ship a helper sibling |
| Adding `namespace.ts` or renaming the primary component to `Root` for a single-element component (e.g. Kbd) | Keep flat exports and the component's own name; only composed widgets get a namespace (see [Namespace vs flat exports](#namespace-vs-flat-exports)) |
| Missing `_registry.ts` | Every component needs one |
| Hand-listing auto-derived `registryDependencies` or own source files | The build scans imports; only hand-list runtime-composed deps and off-whitelist npm packages |
| Listing `src/composables/*` or `src/lib/*` in `_registry.ts` `files[]` | Build error -- they ship as their own registry items via auto-discovered `registryDependencies` |
| Importing a *type* from `@ark-ui/vue` or `@zag-js` in `types.ts`/`context.ts`/`.vue` | Hand-copy a faithful 1:1 interface into `types.ts` (decoupling rule) |
| Using `inheritAttrs: true` (default) when wrapping with Positioner | Add `defineOptions({ inheritAttrs: false })` and spread `$attrs` manually |

---

## Composable Imports

| Composable | Path | When to use |
|---|---|---|
| `useForwardPropsEmits` | `@/composables/useForwardPropsEmits` | Root components with emits, or any component forwarding props |
| `useForwardProps` | `@/composables/useForwardProps` | Components forwarding props without emits (rarely needed directly) |
| `useEmitsAsProps` | `@/composables/useEmitsAsProps` | Converting emits to props (used internally by `useForwardPropsEmits`) |
| `useForwardExpose` | `@/composables/useForwardExpose` | Exposing child component refs to parent (Select, Command sub-components) |
| `createContext` | `@/composables/createContext` | Provide/inject pattern for component options |
| `Dynamic` | `@/composables/dynamic` | `asChild` rendering (polymorphic components) |
| `cn` | `@/lib/utils` | Tailwind class merging |

---

## Quick Reference: Creating a New Component

1. Identify the component category (1-4).
2. Create `components/ui/{name}/`.
3. Create `types.ts` with props/emits interfaces.
4. Create `variant.ts` if using CVA.
5. Create `.vue` files following the skeleton for the identified category.
6. Create `context.ts` if root needs to share state with descendants.
7. Create `namespace.ts` if multi-part (Category 2 or 3).
8. Create `index.ts` with exports.
9. Create `_registry.ts` with metadata (`type`/`name`/`title`/`description` and
   any off-whitelist npm `dependencies`); the build derives the rest.
10. Create Storybook story in `packages/registry/stories/components/ui/{name}/`
    (title `Components/UI/{Pascal}`, `tags: ['autodocs']`, a `Default` export).
11. Run `bun run format packages/registry/src/components/ui/{name}`.
12. From `packages/registry`, run `bun registry build` and commit the updated
    `registry.json`; run `bun run test` and `bun run test:stories`.
