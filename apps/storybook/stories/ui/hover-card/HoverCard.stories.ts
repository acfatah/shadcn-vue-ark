import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { HoverCard } from '@/components/ui/hover-card'
import { registryItem } from '@/components/ui/hover-card/_registry'

import HoverCardDefaultStory from './HoverCardDefaultStory.vue'
import HoverCardDefaultSource from './HoverCardDefaultStory.vue?raw'
import HoverCardPlacementStory from './HoverCardPlacementStory.vue'
import HoverCardPlacementSource from './HoverCardPlacementStory.vue?raw'

const meta = {
  title: 'Components/HoverCard',
  component: HoverCard.Root,
  tags: ['autodocs'],

  argTypes: {
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
    },

    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
    },
  },

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },
  },
} satisfies Meta<typeof HoverCard.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: HoverCardDefaultSource,
      },
    },
  },

  render: args => ({
    components: { HoverCardDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <div class="flex items-center justify-center">
        <HoverCardDefaultStory v-bind="args" />
      </div>
    `,
  }),
}

export const Placement: Story = {
  name: 'Custom Placement',
  args: {
    align: 'center',
    side: 'right',
  },
  parameters: {
    docs: {
      source: {
        code: HoverCardPlacementSource,
      },
    },
  },

  render: args => ({
    components: { HoverCardPlacementStory },

    setup() {
      return { args }
    },

    template: html`
      <HoverCardPlacementStory v-bind="args" />
    `,
  }),
}
