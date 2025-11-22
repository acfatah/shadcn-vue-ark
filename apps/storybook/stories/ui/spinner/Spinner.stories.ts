import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { html } from 'common-tags'

import { Spinner } from '@/components/ui/spinner'
import metadata from '@/components/ui/spinner/metadata'
import SpinnerDefaultSource from './SpinnerDefault.vue?raw'

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: metadata.description,
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
