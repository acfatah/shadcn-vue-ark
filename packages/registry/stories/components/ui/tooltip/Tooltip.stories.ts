import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { Tooltip } from '@/components/ui/tooltip'
import { registryItem } from '@/components/ui/tooltip/_registry'

import { docsRoot } from '../../../_helpers/docs-root'
import TooltipDefaultStory from './TooltipDefaultStory.vue'
import TooltipDefaultSource from './TooltipDefaultStory.vue?raw'
import TooltipPlacementStory from './TooltipPlacementStory.vue'
import TooltipPlacementSource from './TooltipPlacementStory.vue?raw'

const meta: Meta<typeof Tooltip.Root> = {
  title: 'Components/UI/Tooltip',
  component: docsRoot(Tooltip.Root, 'Tooltip.Root'),
  subcomponents: {
    'Tooltip.Trigger': Tooltip.Trigger,
    'Tooltip.Content': Tooltip.Content,
    'Tooltip.Arrow': Tooltip.Arrow,
    'Tooltip.Provider': Tooltip.Provider,
  },
  tags: ['autodocs'],

  argTypes: {
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
    },
    alignOffset: { control: 'number' },

    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
    },
    sideOffset: { control: 'number' },
  },

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },
  },
}

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
    alignOffset: 0,
    side: 'right',
    sideOffset: 4,
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
