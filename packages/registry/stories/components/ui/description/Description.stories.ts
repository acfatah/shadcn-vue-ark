import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { Description } from '@/components/ui/description'
import { registryItem } from '@/components/ui/description/_registry'

import { boolArg, classArg } from '../../../_helpers/args'
import { renderRaw } from '../../../_helpers/render'
import DescriptionDefaultStory from './DescriptionDefaultStory.vue'
import DescriptionDefaultSource from './DescriptionDefaultStory.vue?raw'
import DescriptionDemoStory from './DescriptionDemoStory.vue'
import DescriptionDemoSource from './DescriptionDemoStory.vue?raw'

const meta = {
  title: 'Components/UI/Description',
  component: Description,
  tags: ['autodocs'],

  args: {
    asChild: false,
  },

  argTypes: {
    asChild: boolArg('Render the child element as the description (polymorphic).'),
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
} satisfies Meta<typeof Description>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  ...renderRaw(DescriptionDefaultStory, DescriptionDefaultSource),
}

export const Demo: Story = {
  ...renderRaw(DescriptionDemoStory, DescriptionDemoSource),
}
