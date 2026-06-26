import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { Resizable } from '@/components/ui/resizable'
import { registryItem } from '@/components/ui/resizable/_registry'

import { docsRoot } from '../../../_helpers/docs-root'
import ResizableDefaultStory from './ResizableDefaultStory.vue'
import ResizableDefaultSource from './ResizableDefaultStory.vue?raw'

const meta: Meta<typeof Resizable.PanelGroup> = {
  title: 'Components/UI/Resizable',
  component: docsRoot(Resizable.PanelGroup, 'Resizable.PanelGroup'),
  subcomponents: {
    'Resizable.Panel': Resizable.Panel,
    'Resizable.Handle': Resizable.Handle,
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
        code: ResizableDefaultSource,
      },
    },
  },

  render: args => ({
    components: { ResizableDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <ResizableDefaultStory v-bind="args" />
    `,
  }),
}
