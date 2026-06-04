import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { Progress } from '@/components/ui/progress'
import { registryItem } from '@/components/ui/progress/_registry'

import ProgressDefaultStory from './ProgressDefaultStory.vue'
import ProgressDefaultSource from './ProgressDefaultStory.vue?raw'

const meta = {
  title: 'Components/Progress',
  component: Progress.Root,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },
  },
} satisfies Meta<typeof Progress.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: ProgressDefaultSource,
      },
    },
  },

  render: args => ({
    components: { ProgressDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <ProgressDefaultStory v-bind="args" />
    `,
  }),
}
