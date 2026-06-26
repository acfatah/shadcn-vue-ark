import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { Timeline } from '@/components/ui/timeline'
import { registryItem } from '@/components/ui/timeline/_registry'

import { docsRoot } from '../../../_helpers/docs-root'
import TimelineDefault from './TimelineDefaultStory.vue'
import TimelineDefaultSource from './TimelineDefaultStory.vue?raw'
import TimelineHorizontal from './TimelineHorizontalStory.vue'
import TimelineHorizontalSource from './TimelineHorizontalStory.vue?raw'
import TimelineReversed from './TimelineReversedStory.vue'
import TimelineReversedSource from './TimelineReversedStory.vue?raw'
import TimelineStatus from './TimelineStatusStory.vue'
import TimelineStatusSource from './TimelineStatusStory.vue?raw'

const meta: Meta<typeof Timeline.Root> = {
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
    orientation: {
      control: { type: 'select' },
      options: ['vertical', 'horizontal'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'vertical' },
      },
    },

    reversed: {
      control: { type: 'boolean' },
      description: 'Reverses the visual layout direction. The consumer is responsible for providing data in the desired order.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },

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
        code: TimelineDefaultSource,
      },
    },
  },

  render: args => ({
    components: { TimelineDefault },

    setup() {
      return { args }
    },

    template: html`
      <TimelineDefault v-bind="args" />
    `,
  }),
}

export const WithStatus: Story = {
  parameters: {
    docs: {
      source: {
        code: TimelineStatusSource,
      },
    },
  },

  render: args => ({
    components: { TimelineStatus },

    setup() {
      return { args }
    },

    template: html`
      <TimelineStatus v-bind="args" />
    `,
  }),
}

export const Horizontal: Story = {
  parameters: {
    controls: {
      exclude: ['orientation'],
    },
    docs: {
      source: {
        code: TimelineHorizontalSource,
      },
    },
  },

  render: args => ({
    components: { TimelineHorizontal },

    setup() {
      return { args }
    },

    template: html`
      <TimelineHorizontal v-bind="args" />
    `,
  }),
}

export const Reversed: Story = {
  args: {
    reversed: true,
  },

  parameters: {
    controls: {
      exclude: ['reversed'],
    },
    docs: {
      source: {
        code: TimelineReversedSource,
      },
      description: {
        story: `
Items listed in reverse chronological order. The "reversed" prop, only reverses
the visual layout direction (flex-col-reverse / flex-row-reverse), not the data
order.`,
      },
    },
  },

  render: args => ({
    components: { TimelineReversed },

    setup() {
      return { args }
    },

    template: html`
      <TimelineReversed v-bind="args" />
    `,
  }),
}
