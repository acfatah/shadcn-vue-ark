import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { Progress } from '@/components/ui/progress'
import { registryItem } from '@/components/ui/progress/_registry'

import { boolArg, classArg, selectArg } from '../../../_helpers/args'
import { renderRaw } from '../../../_helpers/render'
import ProgressDefaultStory from './ProgressDefaultStory.vue'
import ProgressDefaultSource from './ProgressDefaultStory.vue?raw'
import ProgressDemoStory from './ProgressDemoStory.vue'
import ProgressDemoSource from './ProgressDemoStory.vue?raw'

const meta = {
  title: 'Components/UI/Progress',
  component: Progress,
  tags: ['autodocs'],

  argTypes: {
    defaultValue: { control: 'number' },
    modelValue: { control: 'number' },
    min: { control: 'number' },
    max: { control: 'number' },
    orientation: selectArg(['horizontal', 'vertical'], 'horizontal'),
    locale: { control: 'text' },
    asChild: boolArg('Render the child element as the root (polymorphic).'),
    formatOptions: { control: 'object' },
    translations: { control: false },
    id: { control: 'text' },
    ids: { control: 'object' },
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
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

// Non-interactive (no user-driven flow), so no play; matrix + a11y only.
export const Default: Story = {
  ...renderRaw(ProgressDefaultStory, ProgressDefaultSource),
}

export const Demo: Story = {
  ...renderRaw(ProgressDemoStory, ProgressDemoSource),
}
