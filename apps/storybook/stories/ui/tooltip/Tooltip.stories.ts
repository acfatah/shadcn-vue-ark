import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { Tooltip } from '@/components/ui/tooltip'
import { registryItem } from '@/components/ui/tooltip/_registry'

import TooltipDefaultStory from './TooltipDefaultStory.vue'
import TooltipDefaultSource from './TooltipDefaultStory.vue?raw'
import TooltipPlacementStory from './TooltipPlacementStory.vue'
import TooltipPlacementSource from './TooltipPlacementStory.vue?raw'

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip.Root,
  tags: ['autodocs'],

  argTypes: {
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
    },

    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
    },
  },

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

export const Placement: Story = {
  name: 'Custom Placement',
  args: {
    align: 'center',
    side: 'right',
  },
  parameters: {
    docs: {
      source: {
        code: TooltipPlacementSource,
      },
    },
  },

  render: args => ({
    components: { TooltipPlacementStory },

    setup() {
      return { args }
    },

    template: html`
      <TooltipPlacementStory v-bind="args" />
    `,
  }),
}
