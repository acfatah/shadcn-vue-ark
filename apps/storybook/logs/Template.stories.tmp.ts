import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { html } from 'common-tags'

import { TEMPLATE } from '@/components/ui/TEMPLATE'
import { registryItem } from '@/components/ui/TEMPLATE/_registry'
import TEMPLATEDefaultStory from './TEMPLATEDefaultStory.vue'
import TEMPLATEDefaultSource from './TEMPLATEDefaultStory.vue?raw'

const meta = {
  title: 'Components/TEMPLATE',
  component: TEMPLATE.Root,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },
  },
} satisfies Meta<typeof TEMPLATE.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: TEMPLATEDefaultSource,
      },
    },
  },

  render: args => ({
    components: { TEMPLATEDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <TEMPLATEDefaultStory v-bind="args" />
    `,
  }),
}
