import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { Item } from '@/components/ui/item'
import { registryItem } from '@/components/ui/item/_registry'

import ItemDefaultStory from './ItemDefaultStory.vue'
import ItemDefaultSource from './ItemDefaultStory.vue?raw'

const meta = {
  title: 'Components/Item',
  // @ts-expect-error TS2559
  component: Item,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },
  },
} satisfies Meta<typeof Item>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: ItemDefaultSource,
      },
    },
  },

  render: args => ({
    components: { ItemDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <ItemDefaultStory v-bind="args" />
    `,
  }),
}
