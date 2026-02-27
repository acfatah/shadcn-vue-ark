import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { DropdownMenu } from '@/components/ui/dropdown-menu'
import { registryItem } from '@/components/ui/dropdown-menu/_registry'

import DropdownMenuDefaultStory from './DropdownMenuDefaultStory.vue'
import DropdownMenuDefaultSource from './DropdownMenuDefaultStory.vue?raw'
import LeftDropdownMenuStory from './LeftDropdownMenuStory.vue'
import LeftDropdownMenuSource from './LeftDropdownMenuStory.vue?raw'

const meta = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu.Root,
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
} satisfies Meta<typeof DropdownMenu.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    align: 'start',
    side: 'bottom',
  },
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

export const Left: Story = {
  name: 'Opens Left',
  args: {
    align: 'center',
    side: 'left',
  },
  parameters: {
    docs: {
      source: {
        code: LeftDropdownMenuSource,
      },
    },
  },

  render: args => ({
    components: { LeftDropdownMenuStory },

    setup() {
      return { args }
    },

    template: html`
      <LeftDropdownMenuStory v-bind="args" />
    `,
  }),
}
