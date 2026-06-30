import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { InputGroup } from '@/components/ui/input-group'
import { registryItem } from '@/components/ui/input-group/_registry'

import { boolArg, classArg } from '../../../_helpers/args'
import { docsRoot } from '../../../_helpers/docs-root'
import { renderRaw } from '../../../_helpers/render'
import InputGroupDefaultStory from './InputGroupDefaultStory.vue'
import InputGroupDefaultSource from './InputGroupDefaultStory.vue?raw'

const meta = {
  title: 'Components/UI/InputGroup',
  component: docsRoot(InputGroup.Root, 'InputGroup.Root'),
  subcomponents: {
    'InputGroup.Addon': InputGroup.Addon,
    'InputGroup.Text': InputGroup.Text,
    'InputGroup.Button': InputGroup.Button,
    'InputGroup.Input': InputGroup.Input,
    'InputGroup.Textarea': InputGroup.Textarea,
  },
  tags: ['autodocs'],

  argTypes: {
    asChild: boolArg('Render the child element as the root (polymorphic).'),
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
} satisfies Meta<typeof InputGroup.Root>

export default meta
type Story = StoryObj<typeof meta>

// Non-interactive layout, so no play; matrix + a11y only.
export const Default: Story = {
  ...renderRaw(InputGroupDefaultStory, InputGroupDefaultSource),
}
