import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { ButtonGroup } from '@/components/ui/button-group'
import { registryItem } from '@/components/ui/button-group/_registry'

import { classArg, selectArg } from '../../../_helpers/args'
import { docsRoot } from '../../../_helpers/docs-root'
import { renderRaw } from '../../../_helpers/render'
import ButtonGroupDefaultStory from './ButtonGroupDefaultStory.vue'
import ButtonGroupDefaultSource from './ButtonGroupDefaultStory.vue?raw'

const meta = {
  title: 'Components/UI/ButtonGroup',
  component: docsRoot(ButtonGroup.Root, 'ButtonGroup.Root'),
  subcomponents: {
    'ButtonGroup.Text': ButtonGroup.Text,
    'ButtonGroup.Separator': ButtonGroup.Separator,
  },
  tags: ['autodocs'],

  args: {
    orientation: 'horizontal',
  },

  argTypes: {
    orientation: selectArg(['horizontal', 'vertical'], 'horizontal'),
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
} satisfies Meta<typeof ButtonGroup.Root>

export default meta
type Story = StoryObj<typeof meta>

// Non-interactive layout, so no play; matrix + a11y only.
export const Default: Story = {
  ...renderRaw(ButtonGroupDefaultStory, ButtonGroupDefaultSource),
}
