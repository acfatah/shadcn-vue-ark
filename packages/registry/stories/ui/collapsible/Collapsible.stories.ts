import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { Collapsible } from '@/components/ui/collapsible'
import { registryItem } from '@/components/ui/collapsible/_registry'

import CollapsibleDefaultStory from './CollapsibleDefaultStory.vue'
import CollapsibleDefaultSource from './CollapsibleDefaultStory.vue?raw'

const meta = {
  title: 'Components/Collapsible',
  component: Collapsible.Root,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },
  },
} satisfies Meta<typeof Collapsible.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: CollapsibleDefaultSource,
      },
    },
  },

  render: args => ({
    components: { CollapsibleDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <CollapsibleDefaultStory v-bind="args" />
    `,
  }),
}
