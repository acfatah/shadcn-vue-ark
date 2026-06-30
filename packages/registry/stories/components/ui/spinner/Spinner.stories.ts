import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { Spinner } from '@/components/ui/spinner'
import { registryItem } from '@/components/ui/spinner/_registry'

import { classArg } from '../../../_helpers/args'
import { renderRaw } from '../../../_helpers/render'
import SpinnerDefaultStory from './SpinnerDefaultStory.vue'
import SpinnerDefaultSource from './SpinnerDefaultStory.vue?raw'
import SpinnerDemoStory from './SpinnerDemoStory.vue'
import SpinnerDemoSource from './SpinnerDemoStory.vue?raw'

const meta = {
  title: 'Components/UI/Spinner',
  component: Spinner,
  tags: ['autodocs'],

  argTypes: {
    class: classArg('Size the spinner via utility classes (e.g. `size-6`).'),
  },

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },

    a11y: { test: 'error' },
  },
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  ...renderRaw(SpinnerDefaultStory, SpinnerDefaultSource),
}

export const Demo: Story = {
  ...renderRaw(SpinnerDemoStory, SpinnerDemoSource),
}
