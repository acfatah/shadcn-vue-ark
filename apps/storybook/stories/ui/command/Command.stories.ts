import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { Command } from '@/components/ui/command'
import { registryItem } from '@/components/ui/command/_registry'

import CommandDefaultStory from './CommandDefaultStory.vue'
import CommandDefaultSource from './CommandDefaultStory.vue?raw'

const meta = {
  title: 'Components/Command',
  component: Command.Root,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },
  },
} satisfies Meta<typeof Command.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: CommandDefaultSource,
      },
    },
  },

  render: args => ({
    components: { CommandDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <CommandDefaultStory v-bind="args" />
    `,
  }),
}
