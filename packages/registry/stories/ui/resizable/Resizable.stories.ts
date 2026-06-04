import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import {
  Resizable,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { registryItem } from '@/components/ui/resizable/_registry'

import ResizableDefaultStory from './ResizableDefaultStory.vue'
import ResizableDefaultSource from './ResizableDefaultStory.vue?raw'

const meta = {
  title: 'Components/Resizable',
  component: Resizable.PanelGroup,
  subcomponents: {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  },
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },
  },
} satisfies Meta<typeof Resizable.PanelGroup>

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
