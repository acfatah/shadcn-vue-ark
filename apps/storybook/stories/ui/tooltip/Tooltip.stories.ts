import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { Tooltip } from '@/components/ui/tooltip'
import { registryItem } from '@/components/ui/tooltip/_registry'

import TooltipDefaultStory from './TooltipDefaultStory.vue'
import TooltipDefaultSource from './TooltipDefaultStory.vue?raw'

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip.Root,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },
  },
} satisfies Meta<typeof Tooltip.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: TooltipDefaultSource,
      },
    },
  },

  render: args => ({
    components: { TooltipDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <TooltipDefaultStory v-bind="args" />
    `,
  }),
}
