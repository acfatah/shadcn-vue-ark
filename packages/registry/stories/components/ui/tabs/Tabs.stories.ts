import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { Tabs } from '@/components/ui/tabs'
import { registryItem } from '@/components/ui/tabs/_registry'

import { docsRoot } from '../../../_helpers/docs-root'
import TabsDefaultStory from './TabsDefaultStory.vue'
import TabsDefaultSource from './TabsDefaultStory.vue?raw'
import TabsUnderlineStory from './TabsUnderlineStory.vue'
import TabsUnderlineSource from './TabsUnderlineStory.vue?raw'

const meta: Meta<typeof Tabs.Root> = {
  title: 'Components/UI/Tabs',
  component: docsRoot(Tabs.Root, 'Tabs.Root'),
  subcomponents: {
    'Tabs.List': Tabs.List,
    'Tabs.Trigger': Tabs.Trigger,
    'Tabs.Indicator': Tabs.Indicator,
    'Tabs.Content': Tabs.Content,
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

export const Underline: Story = {
  parameters: {
    docs: {
      source: {
        code: TabsUnderlineSource,
      },
    },
  },

  render: args => ({
    components: { TabsUnderlineStory },

    setup() {
      return { args }
    },

    template: html`
      <TabsUnderlineStory v-bind="args" />
    `,
  }),
}
