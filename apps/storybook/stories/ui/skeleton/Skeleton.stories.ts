import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { Skeleton } from '@/components/ui/skeleton'
import { registryItem } from '@/components/ui/skeleton/_registry'

import SkeletonDefaultStory from './SkeletonDefaultStory.vue'
import SkeletonDefaultSource from './SkeletonDefaultStory.vue?raw'

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton.Root,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },
  },
} satisfies Meta<typeof Skeleton.Root>

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
