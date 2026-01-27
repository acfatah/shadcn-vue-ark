import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { DropdownMenu } from '@/components/ui/dropdown-menu'
import { registryItem } from '@/components/ui/dropdown-menu/_registry'

import DropdownMenuDefaultStory from './DropdownMenuDefaultStory.vue'
import DropdownMenuDefaultSource from './DropdownMenuDefaultStory.vue?raw'

const meta = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu.Root,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },
  },
} satisfies Meta<typeof DropdownMenu.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: DropdownMenuDefaultSource,
      },
    },
  },

  render: args => ({
    components: { DropdownMenuDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <DropdownMenuDefaultStory v-bind="args" />
    `,
  }),
}
