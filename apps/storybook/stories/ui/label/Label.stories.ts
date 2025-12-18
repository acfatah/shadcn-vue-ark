import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { html } from 'common-tags'

import { Label } from '@/components/ui/label'
import { registryItem } from '@/components/ui/label/_registry'
import LabelDefaultStory from './LabelDefaultStory.vue'
import LabelDefaultSource from './LabelDefaultStory.vue?raw'

const meta = {
  title: 'Components/Label',
  component: Label,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },
  },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: LabelDefaultSource,
      },
    },
  },

  render: args => ({
    components: { LabelDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <LabelDefaultStory v-bind="args" />
    `,
  }),
}
