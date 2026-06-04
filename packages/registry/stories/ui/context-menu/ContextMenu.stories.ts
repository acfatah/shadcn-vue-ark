import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { ContextMenu } from '@/components/ui/context-menu'
import { registryItem } from '@/components/ui/context-menu/_registry'

import ContextMenuDefaultStory from './ContextMenuDefaultStory.vue'
import ContextMenuDefaultSource from './ContextMenuDefaultStory.vue?raw'

const meta = {
  title: 'Components/ContextMenu',
  component: ContextMenu.Root,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },
  },
} satisfies Meta<typeof ContextMenu.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: ContextMenuDefaultSource,
      },
    },
  },

  render: args => ({
    components: { ContextMenuDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <ContextMenuDefaultStory v-bind="args" />
    `,
  }),
}
