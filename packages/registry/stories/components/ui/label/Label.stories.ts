import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { Label } from '@/components/ui/label'
import { registryItem } from '@/components/ui/label/_registry'

import { boolArg, classArg } from '../../../_helpers/args'
import { renderRaw } from '../../../_helpers/render'
import LabelDefaultStory from './LabelDefaultStory.vue'
import LabelDefaultSource from './LabelDefaultStory.vue?raw'
import LabelDemoStory from './LabelDemoStory.vue'
import LabelDemoSource from './LabelDemoStory.vue?raw'

const meta = {
  title: 'Components/UI/Label',
  component: Label,
  tags: ['autodocs'],

  args: {
    asChild: false,
  },

  argTypes: {
    as: { control: 'text', description: 'The element to render (`label` by default).' },
    asChild: boolArg('Render the child element as the label (polymorphic).'),
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
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  ...renderRaw(LabelDefaultStory, LabelDefaultSource),
}

export const Demo: Story = {
  ...renderRaw(LabelDemoStory, LabelDemoSource, {
    description: 'Associate a label with a control via `for` / `id`.',
  }),
}
