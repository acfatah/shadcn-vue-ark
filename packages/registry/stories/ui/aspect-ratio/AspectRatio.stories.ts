import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { registryItem } from '@/components/ui/aspect-ratio/_registry'

import AspectRatioDefaultStory from './AspectRatioDefaultStory.vue'
import AspectRatioDefaultSource from './AspectRatioDefaultStory.vue?raw'

const meta = {
  title: 'Components/AspectRatio',
  component: AspectRatio,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },
  },
} satisfies Meta<typeof AspectRatio>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: AspectRatioDefaultSource,
      },
    },
  },

  render: args => ({
    components: { AspectRatioDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <AspectRatioDefaultStory v-bind="args" />
    `,
  }),
}
