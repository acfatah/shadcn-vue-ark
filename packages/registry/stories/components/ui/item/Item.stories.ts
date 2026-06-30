import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { Item } from '@/components/ui/item'
import { registryItem } from '@/components/ui/item/_registry'

import { boolArg, classArg, selectArg } from '../../../_helpers/args'
import { docsRoot } from '../../../_helpers/docs-root'
import { renderRaw } from '../../../_helpers/render'
import ItemDefaultStory from './ItemDefaultStory.vue'
import ItemDefaultSource from './ItemDefaultStory.vue?raw'
import ItemDemoStory from './ItemDemoStory.vue'
import ItemDemoSource from './ItemDemoStory.vue?raw'
import ItemVariantsStory from './ItemVariantsStory.vue'
import ItemVariantsSource from './ItemVariantsStory.vue?raw'

const meta = {
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

  args: {
    asChild: false,
  },

  argTypes: {
    variant: selectArg(['default', 'outline', 'muted'], 'default'),
    size: selectArg(['default', 'sm'], 'default'),
    as: { control: 'text', description: 'The element to render (`div` by default).' },
    asChild: boolArg('Polymorphic escape hatch; prefer `as` for this component.'),
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
} satisfies Meta<typeof Item.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  ...renderRaw(ItemDefaultStory, ItemDefaultSource),
}

export const Variants: Story = {
  ...renderRaw(ItemVariantsStory, ItemVariantsSource, {
    parameters: { controls: { exclude: ['variant'] } },
  }),
}

export const Demo: Story = {
  ...renderRaw(ItemDemoStory, ItemDemoSource),
}
