import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import OverviewDefaultStory from './OverviewDefaultStory.vue'
import OverviewDefaultSource from './OverviewDefaultStory.vue?raw'

const meta = {
  title: 'Examples/Overview',
  component: OverviewDefaultStory,
  tags: ['autodocs'],
} satisfies Meta<typeof OverviewDefaultStory>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    layout: 'padded',
    docs: {
      source: {
        code: OverviewDefaultSource,
      },
    },
  },

  render: args => ({
    components: { OverviewDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <OverviewDefaultStory v-bind="args" />
    `,
  }),
}
