import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { Progress } from '@/components/ui/progress'
import { registryItem } from '@/components/ui/progress/_registry'

import ProgressDefaultStory from './ProgressDefaultStory.vue'
import ProgressDefaultSource from './ProgressDefaultStory.vue?raw'

const meta: Meta<typeof Progress> = {
  title: 'Components/UI/Progress',
  component: Progress,
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
