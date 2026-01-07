import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { html } from 'common-tags'

import { Card } from '@/components/ui/card'
import { registryItem } from '@/components/ui/card/_registry'
import CardDefaultStory from './CardDefaultStory.vue'
import CardDefaultSource from './CardDefaultStory.vue?raw'

const meta = {
  title: 'Components/Card',
  component: Card.Root,
  subcomponents : {
    'Card.Header': Card.Header,
    'Card.Title': Card.Title,
    'Card.Description': Card.Description,
    'Card.Content': Card.Content,
    'Card.Footer': Card.Footer,
    'Card.Action': Card.Action,
  },
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: CardDefaultSource,
      },
    },
  },

  render: args => ({
    components: { CardDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <CardDefaultStory v-bind="args" />
    `,
  }),
}
