import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'description',
  title: 'Description',

  description: html`
    Provide additional information or context. Typically used to elaborate on an
    input, title, or heading, offering users more insight into the content or
    purpose.

    It is usually derived as other component such as <code>Input.Description</code>,
    <code>Select.Description</code>, etc. to maintain consistent styling across
    the UI. The differences come from the <code>data-scope</code> and
    <code>data-part</code> attributes assigned to each component.
  `,

  dependencies: [
    '@vueuse/core',
  ],

  files: [
    {
      path: 'src/composables/dynamic.ts',
      type: 'registry:file',
      target: 'src/composables/dynamic.ts',
    },
    {
      path: 'src/composables/use-forward-props.ts',
      type: 'registry:file',
      target: 'src/composables/use-forward-props.ts',
    },
    {
      path: 'src/lib/utils.ts',
      type: 'registry:file',
      target: 'src/lib/utils.ts',
    },
  ],
} satisfies RegistryItem

export default registryItem
