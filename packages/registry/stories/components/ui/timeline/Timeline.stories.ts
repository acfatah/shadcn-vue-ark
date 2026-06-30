import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { Timeline } from '@/components/ui/timeline'
import { registryItem } from '@/components/ui/timeline/_registry'

import { boolArg, classArg, selectArg } from '../../../_helpers/args'
import { docsRoot } from '../../../_helpers/docs-root'
import { renderRaw } from '../../../_helpers/render'
import TimelineDefaultStory from './TimelineDefaultStory.vue'
import TimelineDefaultSource from './TimelineDefaultStory.vue?raw'
import TimelineHorizontalStory from './TimelineHorizontalStory.vue'
import TimelineHorizontalSource from './TimelineHorizontalStory.vue?raw'
import TimelineReversedStory from './TimelineReversedStory.vue'
import TimelineReversedSource from './TimelineReversedStory.vue?raw'
import TimelineStatusStory from './TimelineStatusStory.vue'
import TimelineStatusSource from './TimelineStatusStory.vue?raw'

const meta = {
  title: 'Components/UI/Timeline',
  component: docsRoot(Timeline.Root, 'Timeline.Root'),
  subcomponents: {
    'Timeline.Item': Timeline.Item,
    'Timeline.Connector': Timeline.Connector,
    'Timeline.Separator': Timeline.Separator,
    'Timeline.Indicator': Timeline.Indicator,
    'Timeline.Content': Timeline.Content,
    'Timeline.Title': Timeline.Title,
    'Timeline.Description': Timeline.Description,
  },
  tags: ['autodocs'],

  args: {
    orientation: 'vertical',
    reversed: false,
  },

  argTypes: {
    size: selectArg(['sm', 'md', 'lg'], 'md'),
    orientation: selectArg(['vertical', 'horizontal'], 'vertical'),
    reversed: boolArg('Reverses the visual layout only; provide data in the desired order.'),
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
} satisfies Meta<typeof Timeline.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  ...renderRaw(TimelineDefaultStory, TimelineDefaultSource),
}

export const WithStatus: Story = {
  ...renderRaw(TimelineStatusStory, TimelineStatusSource),
}

export const Horizontal: Story = {
  ...renderRaw(TimelineHorizontalStory, TimelineHorizontalSource, {
    parameters: { controls: { exclude: ['orientation'] } },
  }),
}

export const Reversed: Story = {
  args: { reversed: true },
  ...renderRaw(TimelineReversedStory, TimelineReversedSource, {
    description: 'Items in reverse visual order. `reversed` flips layout direction only, not data order.',
    parameters: { controls: { exclude: ['reversed'] } },
  }),
}
