import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { Alert } from '@/components/ui/alert'
import { registryItem } from '@/components/ui/alert/_registry'

import { docsRoot } from '../../../_helpers/docs-root'
import AlertDefaultStory from './AlertDefaultStory.vue'
import AlertDefaultSource from './AlertDefaultStory.vue?raw'

const meta: Meta<typeof Alert.Root> = {
  title: 'Components/UI/Alert',
  component: docsRoot(Alert.Root, 'Alert.Root'),
  subcomponents: {
    'Alert.Title': Alert.Title,
    'Alert.Description': Alert.Description,
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
