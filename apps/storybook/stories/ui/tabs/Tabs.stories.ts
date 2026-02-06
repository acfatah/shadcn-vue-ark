import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { Tabs } from '@/components/ui/tabs'
import { registryItem } from '@/components/ui/tabs/_registry'

import TabsDefaultStory from './TabsDefaultStory.vue'
import TabsDefaultSource from './TabsDefaultStory.vue?raw'

const meta = {
  title: 'Components/Tabs',
  component: Tabs.Root,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },
  },
} satisfies Meta<typeof Tabs.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: TabsDefaultSource,
      },
    },
  },

  render: args => ({
    components: { TabsDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <TabsDefaultStory v-bind="args" />
    `,
  }),
}
