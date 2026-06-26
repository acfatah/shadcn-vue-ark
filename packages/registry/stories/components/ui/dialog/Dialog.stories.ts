import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { Dialog } from '@/components/ui/dialog'
import { registryItem } from '@/components/ui/dialog/_registry'

import { docsRoot } from '../../../_helpers/docs-root'
import DialogDefaultStory from './DialogDefaultStory.vue'
import DialogDefaultSource from './DialogDefaultStory.vue?raw'

const meta: Meta<typeof Dialog.Root> = {
  title: 'Components/UI/Dialog',
  component: docsRoot(Dialog.Root, 'Dialog.Root'),
  subcomponents: {
    'Dialog.Trigger': Dialog.Trigger,
    'Dialog.Content': Dialog.Content,
    'Dialog.ScrollContent': Dialog.ScrollContent,
    'Dialog.Overlay': Dialog.Overlay,
    'Dialog.Header': Dialog.Header,
    'Dialog.Footer': Dialog.Footer,
    'Dialog.Title': Dialog.Title,
    'Dialog.Description': Dialog.Description,
    'Dialog.Close': Dialog.Close,
  },
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
