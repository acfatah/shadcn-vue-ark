import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { Badge } from '@/components/ui/badge'
import { registryItem } from '@/components/ui/badge/_registry'

import { boolArg, classArg, selectArg } from '../../../_helpers/args'
import { renderRaw } from '../../../_helpers/render'
import AsChildStory from './AsChildStory.vue'
import AsChildSource from './AsChildStory.vue?raw'
import BadgeDefaultStory from './BadgeDefaultStory.vue'
import BadgeDefaultSource from './BadgeDefaultStory.vue?raw'
import DemoStory from './DemoStory.vue'
import DemoSource from './DemoStory.vue?raw'
import OverflowStory from './OverflowStory.vue'
import OverflowSource from './OverflowStory.vue?raw'
import VariantsStory from './VariantsStory.vue'
import VariantsSource from './VariantsStory.vue?raw'

const meta = {
  title: 'Components/UI/Badge',
  component: Badge,
  tags: ['autodocs'],

  args: {
    variant: 'default',
    asChild: false,
  },

  argTypes: {
    variant: selectArg(['default', 'secondary', 'destructive', 'outline'], 'default'),
    asChild: boolArg('Render the child element as the badge (polymorphic).'),
    class: classArg(),
  },

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },

    // Badge passes axe clean, so it is promoted from the global 'todo' to a
    // blocking gate: any future a11y regression reds CI.
    a11y: { test: 'error' },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  ...renderRaw(BadgeDefaultStory, BadgeDefaultSource),
}

export const Variants: Story = {
  ...renderRaw(VariantsStory, VariantsSource, {
    parameters: { controls: { exclude: ['variant'] } },
  }),
}

export const Overflow: Story = {
  ...renderRaw(OverflowStory, OverflowSource, {
    description: 'A badge clips overflowing content; its container controls wrapping.',
  }),
}

export const AsChild: Story = {
  ...renderRaw(AsChildStory, AsChildSource, {
    description: 'Use the `asChild` prop to render the badge as a different element, such as a link.',
  }),
}
AsChild.storyName = '`asChild` prop'

export const Demo: Story = {
  ...renderRaw(DemoStory, DemoSource),
}
