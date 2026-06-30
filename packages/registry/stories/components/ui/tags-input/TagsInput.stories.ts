import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { expect, userEvent, waitFor, within } from 'storybook/test'

import { TagsInput } from '@/components/ui/tags-input'
import { registryItem } from '@/components/ui/tags-input/_registry'

import { boolArg, classArg } from '../../../_helpers/args'
import { docsRoot } from '../../../_helpers/docs-root'
import { renderRaw } from '../../../_helpers/render'
import TagsInputDefaultStory from './TagsInputDefaultStory.vue'
import TagsInputDefaultSource from './TagsInputDefaultStory.vue?raw'
import TagsInputWithListbox from './TagsInputWithListbox.vue'
import TagsInputWithListboxSource from './TagsInputWithListbox.vue?raw'

const meta = {
  title: 'Components/UI/TagsInput',
  component: docsRoot(TagsInput.Root, 'TagsInput.Root'),
  subcomponents: {
    'TagsInput.Input': TagsInput.Input,
    'TagsInput.Control': TagsInput.Control,
    'TagsInput.Item': TagsInput.Item,
    'TagsInput.ItemText': TagsInput.ItemText,
    'TagsInput.ItemPreview': TagsInput.ItemPreview,
    'TagsInput.ItemInput': TagsInput.ItemInput,
    'TagsInput.ItemDelete': TagsInput.ItemDelete,
  },
  tags: ['autodocs'],

  argTypes: {
    asChild: boolArg('Render the child element as the root (polymorphic).'),
    addOnPaste: boolArg(),
    allowDuplicates: boolArg(),
    allowOverflow: boolArg(),
    autoFocus: boolArg(),
    blurBehavior: { control: 'text' },
    defaultInputValue: { control: 'text' },
    defaultValue: { control: 'object' },
    delimiter: { control: 'text' },
    disabled: boolArg(),
    editable: boolArg(),
    form: { control: 'text' },
    id: { control: 'text' },
    ids: { control: 'object' },
    inputValue: { control: 'text' },
    invalid: boolArg(),
    max: { control: 'number' },
    maxLength: { control: 'number' },
    modelValue: { control: 'object' },
    name: { control: 'text' },
    placeholder: { control: 'text' },
    readOnly: boolArg(),
    required: boolArg(),
    sanitizeValue: { control: false },
    translations: { control: 'object' },
    validate: { control: false },
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
} satisfies Meta<typeof TagsInput.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  ...renderRaw(TagsInputDefaultStory, TagsInputDefaultSource),

  // Core flow: typing a value and pressing Enter commits a new tag chip.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByPlaceholderText('Fruits...')

    await userEvent.type(input, 'Cherry{enter}')
    await waitFor(() => expect(canvas.getByText('Cherry')).toBeInTheDocument())
  },
}

export const WithListbox: Story = {
  ...renderRaw(TagsInputWithListbox, TagsInputWithListboxSource, {
    description: 'Pair the tags input with a listbox of suggestions.',
  }),
}
