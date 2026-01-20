import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { Description } from '@/components/ui/description'
import { registryItem } from '@/components/ui/description/_registry'

import DescriptionDefaultStory from './DescriptionDefaultStory.vue'
import DescriptionDefaultSource from './DescriptionDefaultStory.vue?raw'

const meta = {
  title: 'Components/Description',
  component: Description,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },
  },
} satisfies Meta<typeof Description>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: DescriptionDefaultSource,
      },
    },
  },

  render: args => ({
    components: { DescriptionDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <DescriptionDefaultStory v-bind="args" />
    `,
  }),
}
