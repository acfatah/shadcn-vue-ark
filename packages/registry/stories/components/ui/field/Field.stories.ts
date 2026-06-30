import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { expect, userEvent, within } from 'storybook/test'

import { Field } from '@/components/ui/field'
import { registryItem } from '@/components/ui/field/_registry'

import { boolArg, classArg } from '../../../_helpers/args'
import { docsRoot } from '../../../_helpers/docs-root'
import { renderRaw } from '../../../_helpers/render'
import FieldCheckboxStory from './FieldCheckboxStory.vue'
import FieldCheckboxSource from './FieldCheckboxStory.vue?raw'
import FieldDefaultStory from './FieldDefaultStory.vue'
import FieldDefaultSource from './FieldDefaultStory.vue?raw'
import FieldTextareaStory from './FieldTextareaStory.vue'
import FieldTextareaSource from './FieldTextareaStory.vue?raw'

const meta = {
  title: 'Components/UI/Field',
  component: docsRoot(Field.Root, 'Field.Root'),
  subcomponents: {
    'Field.RootProvider': Field.RootProvider,
    'Field.Group': Field.Group,
    'Field.Label': Field.Label,
    'Field.RequiredIndicator': Field.RequiredIndicator,
    'Field.Input': Field.Input,
    'Field.Textarea': Field.Textarea,
    'Field.Checkbox': Field.Checkbox,
    'Field.Title': Field.Title,
    'Field.Description': Field.Description,
    'Field.Error': Field.Error,
  },
  tags: ['autodocs'],

  args: {
    required: true,
    invalid: false,
    disabled: false,
  },

  argTypes: {
    required: boolArg(),
    invalid: boolArg(),
    disabled: boolArg(),
    readOnly: boolArg(),
    asChild: boolArg('Render the child element as the root (polymorphic).'),
    target: { control: 'text' },
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
} satisfies Meta<typeof Field.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  ...renderRaw(FieldDefaultStory, FieldDefaultSource),

  // Core flow: the field's input accepts text.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByPlaceholderText('Max Leiter')

    await userEvent.type(input, 'maxleiter')
    await expect(input).toHaveValue('maxleiter')
  },
}

export const Textarea: Story = {
  ...renderRaw(FieldTextareaStory, FieldTextareaSource),
}

export const Checkbox: Story = {
  ...renderRaw(FieldCheckboxStory, FieldCheckboxSource, {
    description: 'Use `Field.Checkbox` for a simplified checkbox field.',
  }),
}
