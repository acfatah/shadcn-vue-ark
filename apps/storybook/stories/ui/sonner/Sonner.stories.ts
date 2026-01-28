import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { Toaster } from '@/components/ui/sonner'
import { registryItem } from '@/components/ui/sonner/_registry'

import SonnerDefaultStory from './SonnerDefaultStory.vue'
import SonnerDefaultSource from './SonnerDefaultStory.vue?raw'

const meta = {
  title: 'Components/Sonner',
  component: Toaster,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },
  },
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: SonnerDefaultSource,
      },
    },
  },

  render: args => ({
    components: { SonnerDefaultStory, Toaster },

    setup() {
      return { args }
    },

    template: html`
      <Teleport to="body">
        <Toaster />
      </Teleport>
      <SonnerDefaultStory v-bind="args" />
    `,
  }),
}
