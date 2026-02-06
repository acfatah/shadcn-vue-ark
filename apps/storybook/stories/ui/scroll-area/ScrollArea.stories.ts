import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { ScrollArea } from '@/components/ui/scroll-area'
import { registryItem } from '@/components/ui/scroll-area/_registry'

import ScrollAreaDefaultStory from './ScrollAreaDefaultStory.vue'
import ScrollAreaDefaultSource from './ScrollAreaDefaultStory.vue?raw'

const meta = {
  title: 'Components/ScrollArea',
  component: ScrollArea.Root,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },
  },
} satisfies Meta<typeof ScrollArea.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: ScrollAreaDefaultSource,
      },
    },
  },

  render: args => ({
    components: { ScrollAreaDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <ScrollAreaDefaultStory v-bind="args" />
    `,
  }),
}
