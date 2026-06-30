import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { Skeleton } from '@/components/ui/skeleton'
import { registryItem } from '@/components/ui/skeleton/_registry'

import { classArg } from '../../../_helpers/args'
import { renderRaw } from '../../../_helpers/render'
import SkeletonDefaultStory from './SkeletonDefaultStory.vue'
import SkeletonDefaultSource from './SkeletonDefaultStory.vue?raw'
import SkeletonDemoStory from './SkeletonDemoStory.vue'
import SkeletonDemoSource from './SkeletonDemoStory.vue?raw'

const meta = {
  title: 'Components/UI/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],

  argTypes: {
    class: classArg('Size and shape the placeholder via utility classes.'),
  },

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },

    a11y: { test: 'error' },
  },
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  ...renderRaw(SkeletonDefaultStory, SkeletonDefaultSource),
}

export const Demo: Story = {
  ...renderRaw(SkeletonDemoStory, SkeletonDemoSource),
}
