import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { Sidebar } from '@/components/ui/sidebar'
import { registryItem } from '@/components/ui/sidebar/_registry'

import SidebarDefaultStory from './SidebarDefaultStory.vue'
import SidebarDefaultSource from './SidebarDefaultStory.vue?raw'

const meta = {
  title: 'Components/Sidebar',
  component: Sidebar.Root,
  tags: ['autodocs'],

  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: registryItem.description,
      },
    },
  },
} satisfies Meta<typeof Sidebar.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: SidebarDefaultSource,
      },
    },
  },

  render: args => ({
    components: { SidebarDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <SidebarDefaultStory v-bind="args" />
    `,
  }),
}
