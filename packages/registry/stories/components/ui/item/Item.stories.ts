import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { Item } from '@/components/ui/item'
import { registryItem } from '@/components/ui/item/_registry'

import { docsRoot } from '../../../_helpers/docs-root'
import ItemDefaultStory from './ItemDefaultStory.vue'
import ItemDefaultSource from './ItemDefaultStory.vue?raw'

const meta: Meta<typeof Item.Root> = {
  title: 'Components/UI/Item',
  component: docsRoot(Item.Root, 'Item.Root'),
  subcomponents: {
    'Item.Group': Item.Group,
    'Item.Header': Item.Header,
    'Item.Media': Item.Media,
    'Item.Content': Item.Content,
    'Item.Title': Item.Title,
    'Item.Description': Item.Description,
    'Item.Actions': Item.Actions,
    'Item.Footer': Item.Footer,
    'Item.Separator': Item.Separator,
  },
  tags: ['autodocs'],

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
