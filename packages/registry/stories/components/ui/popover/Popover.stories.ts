import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { Popover } from '@/components/ui/popover'
import { registryItem } from '@/components/ui/popover/_registry'

import PopoverDefaultStory from './PopoverDefaultStory.vue'
import PopoverDefaultSource from './PopoverDefaultStory.vue?raw'
import PopoverPlacementStory from './PopoverPlacementStory.vue'
import PopoverPlacementSource from './PopoverPlacementStory.vue?raw'

const meta = {
  title: 'Components/UI/Popover',
  component: Popover.Root,
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
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: PopoverDefaultSource,
      },
    },
  },

  render: args => ({
    components: { PopoverDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <PopoverDefaultStory v-bind="args" />
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
        code: PopoverPlacementSource,
      },
    },
  },

  render: args => ({
    components: { PopoverPlacementStory },

    setup() {
      return { args }
    },

    template: html`
      <PopoverPlacementStory v-bind="args" />
    `,
  }),
}
