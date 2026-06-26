import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { Skeleton } from '@/components/ui/skeleton'
import { registryItem } from '@/components/ui/skeleton/_registry'

import SkeletonDefaultStory from './SkeletonDefaultStory.vue'
import SkeletonDefaultSource from './SkeletonDefaultStory.vue?raw'

const meta: Meta<typeof Skeleton> = {
  title: 'Components/UI/Skeleton',
  component: Skeleton,
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
        code: SkeletonDefaultSource,
      },
    },
  },

  render: args => ({
    components: { SkeletonDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <SkeletonDefaultStory v-bind="args" />
    `,
  }),
}
