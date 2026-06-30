import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { Card } from '@/components/ui/card'
import { registryItem } from '@/components/ui/card/_registry'

import { boolArg, classArg } from '../../../_helpers/args'
import { docsRoot } from '../../../_helpers/docs-root'
import { renderRaw } from '../../../_helpers/render'
import CardDefaultStory from './CardDefaultStory.vue'
import CardDefaultSource from './CardDefaultStory.vue?raw'
import CardDemoStory from './CardDemoStory.vue'
import CardDemoSource from './CardDemoStory.vue?raw'

const meta = {
  title: 'Components/UI/Card',
  component: docsRoot(Card.Root, 'Card.Root'),
  subcomponents: {
    'Card.Header': Card.Header,
    'Card.Title': Card.Title,
    'Card.Description': Card.Description,
    'Card.Content': Card.Content,
    'Card.Footer': Card.Footer,
    'Card.Action': Card.Action,
  },
  tags: ['autodocs'],

  args: {
    asChild: false,
  },

  argTypes: {
    asChild: boolArg('Render the child element as the root (polymorphic).'),
    class: classArg(),
  },

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },

    a11y: { test: 'error' },
  },
} satisfies Meta<typeof Card.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  ...renderRaw(CardDefaultStory, CardDefaultSource),
}

export const Demo: Story = {
  ...renderRaw(CardDemoStory, CardDemoSource),
}
