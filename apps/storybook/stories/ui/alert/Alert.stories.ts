import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { html } from 'common-tags'

import { Alert } from '@/components/ui/alert'
import { registryItem } from '@/components/ui/alert/_registry'
import AlertDefaultStory from './AlertDefaultStory.vue'
import AlertDefaultSource from './AlertDefaultStory.vue?raw'

const meta = {
  title: 'Components/Alert',
  component: Alert.Root,
  subcomponents: {
    'AlertDescription': Alert.Description,
    'AlertTitle': Alert.Title,
  },
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },
  },
} satisfies Meta<typeof Alert.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: AlertDefaultSource,
      },
    },
  },

  render: args => ({
    components: { AlertDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <AlertDefaultStory v-bind="args" />
    `,
  }),
}
