import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { registryItem } from '@/components/ui/aspect-ratio/_registry'

import { boolArg, classArg } from '../../../_helpers/args'
import { renderRaw } from '../../../_helpers/render'
import AspectRatioDefaultStory from './AspectRatioDefaultStory.vue'
import AspectRatioDefaultSource from './AspectRatioDefaultStory.vue?raw'
import AspectRatioGhostBorderStory from './AspectRatioGhostBorderStory.vue'
import AspectRatioGhostBorderSource from './AspectRatioGhostBorderStory.vue?raw'
import AspectRatioVariantStory from './AspectRatioVariantStory.vue'
import AspectRatioVariantSource from './AspectRatioVariantStory.vue?raw'

const meta = {
  title: 'Components/UI/AspectRatio',
  component: AspectRatio,
  tags: ['autodocs'],

  args: {
    ratio: 16 / 9,
  },

  argTypes: {
    ratio: { control: { type: 'number' }, description: 'Width / height ratio, e.g. `16 / 9`.' },
    as: { control: 'text', description: 'The element to render (`div` by default).' },
    asChild: boolArg('Render the child element as the inner node (polymorphic).'),
    class: classArg(),
  },

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },

    a11y: { test: 'error' },
  },
} satisfies Meta<typeof AspectRatio>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  ...renderRaw(AspectRatioDefaultStory, AspectRatioDefaultSource),
}

export const Ratios: Story = {
  ...renderRaw(AspectRatioVariantStory, AspectRatioVariantSource),
}

export const GhostBorder: Story = {
  ...renderRaw(AspectRatioGhostBorderStory, AspectRatioGhostBorderSource, {
    description:
      'Frames an image with the `border-ghost` utility: a crisp 1px edge that '
      + 'stays legible over any content via `mix-blend` in light and dark.',
  }),
}
