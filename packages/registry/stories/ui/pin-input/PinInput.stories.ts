import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { PinInput } from '@/components/ui/pin-input'
import { registryItem } from '@/components/ui/pin-input/_registry'

import PinInputDefaultStory from './PinInputDefaultStory.vue'
import PinInputDefaultSource from './PinInputDefaultStory.vue?raw'

const meta = {
  title: 'Components/PinInput',
  component: PinInput.Root,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },
  },
} satisfies Meta<typeof PinInput.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: PinInputDefaultSource,
      },
    },
  },

  render: args => ({
    components: { PinInputDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <PinInputDefaultStory v-bind="args" />
    `,
  }),
}
