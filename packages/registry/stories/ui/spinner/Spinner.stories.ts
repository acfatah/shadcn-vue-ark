import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { Spinner } from '@/components/ui/spinner'
import { registryItem } from '@/components/ui/spinner/_registry'

import SpinnerDefaultSource from './SpinnerDefaultStory.vue?raw'

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },
  },
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: SpinnerDefaultSource,
      },
    },
  },

  render: args => ({
    components: { Spinner },

    setup() {
      return { args }
    },

    template: html`
      <Spinner v-bind="args" />
    `,
  }),
}
