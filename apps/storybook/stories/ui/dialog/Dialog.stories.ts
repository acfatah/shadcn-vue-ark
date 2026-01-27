import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { Dialog } from '@/components/ui/dialog'
import { registryItem } from '@/components/ui/dialog/_registry'

import DialogDefaultStory from './DialogDefaultStory.vue'
import DialogDefaultSource from './DialogDefaultStory.vue?raw'

const meta = {
  title: 'Components/Dialog',
  component: Dialog.Root,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },
  },
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: DialogDefaultSource,
      },
    },
  },

  render: args => ({
    components: { DialogDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <DialogDefaultStory v-bind="args" />
    `,
  }),
}
