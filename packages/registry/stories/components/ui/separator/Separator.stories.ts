import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { Separator } from '@/components/ui/separator'
import { registryItem } from '@/components/ui/separator/_registry'

import { boolArg, classArg, selectArg } from '../../../_helpers/args'
import { renderRaw } from '../../../_helpers/render'
import SeparatorDefaultStory from './SeparatorDefaultStory.vue'
import SeparatorDefaultSource from './SeparatorDefaultStory.vue?raw'
import SeparatorDemoStory from './SeparatorDemoStory.vue'
import SeparatorDemoSource from './SeparatorDemoStory.vue?raw'

const meta = {
  title: 'Components/UI/Separator',
  component: Separator,
  tags: ['autodocs'],

  args: {
    orientation: 'horizontal',
    decorative: true,
  },

  argTypes: {
    orientation: selectArg(['horizontal', 'vertical'], 'horizontal'),
    decorative: boolArg('Decorative separators are hidden from the a11y tree.'),
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
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  ...renderRaw(SeparatorDefaultStory, SeparatorDefaultSource),
}

export const Demo: Story = {
  ...renderRaw(SeparatorDemoStory, SeparatorDemoSource),
}
