import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'steps',
  title: 'Steps',

  description: html`
    A multi-step navigation component used to guide users through a sequence
    of steps such as forms, wizards, or onboarding flows.

    References:
    - Headless API: https://ark-ui.com/docs/components/steps
  `,

  dependencies: [
    '@ark-ui/vue',
    '@vueuse/core',
  ],
} satisfies RegistryItem

export default registryItem
