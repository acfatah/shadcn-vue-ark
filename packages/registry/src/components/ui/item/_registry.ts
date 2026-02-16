import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'item',
  title: 'Item',

  description: html`
    A versatile component that you can use to display any content.

    The Item component is a straightforward flex container that can house nearly
    any type of content. Use it to display a title, description, and actions.
    Group it with the ItemGroup component to create a list of items.

    You can pretty much achieve the same result with the div element and some
    classes, but I've built this so many times that I decided to create a
    component for it. Now I use it all the time.

    References:
    - shadcn/ui: https://ui.shadcn.com/docs/components/item
  `,

  dependencies: [
    '@ark-ui/vue',
    '@vueuse/core',
    'class-variance-authority',
    'reka-ui',
  ],

  files: [
    {
      path: 'src/composables/useForwardPropsEmits.ts',
      type: 'registry:file',
      target: 'src/composables/useForwardPropsEmits.ts',
    },
    {
      path: 'src/lib/utils.ts',
      type: 'registry:file',
      target: 'src/lib/utils.ts',
    },
  ],
} satisfies RegistryItem

export default registryItem
