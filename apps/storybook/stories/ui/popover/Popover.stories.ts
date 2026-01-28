import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { Popover } from '@/components/ui/popover'
import { registryItem } from '@/components/ui/popover/_registry'

import PopoverDefaultStory from './PopoverDefaultStory.vue'
import PopoverDefaultSource from './PopoverDefaultStory.vue?raw'

const meta = {
  title: 'Components/Popover',
  component: Popover.Root,
  tags: ['autodocs'],

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
