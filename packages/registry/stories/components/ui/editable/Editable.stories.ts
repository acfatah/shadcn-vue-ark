import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { expect, userEvent, waitFor, within } from 'storybook/test'

import { Editable } from '@/components/ui/editable'
import { registryItem } from '@/components/ui/editable/_registry'

import { boolArg, classArg, selectArg } from '../../../_helpers/args'
import { docsRoot } from '../../../_helpers/docs-root'
import { renderRaw } from '../../../_helpers/render'
import EditableDefaultStory from './EditableDefaultStory.vue'
import EditableDefaultSource from './EditableDefaultStory.vue?raw'

const meta = {
  title: 'Components/UI/Editable',
  component: docsRoot(Editable.Root, 'Editable.Root'),
  subcomponents: {
    'Editable.Area': Editable.Area,
    'Editable.CancelTrigger': Editable.CancelTrigger,
    'Editable.Control': Editable.Control,
    'Editable.EditTrigger': Editable.EditTrigger,
    'Editable.Input': Editable.Input,
    'Editable.Label': Editable.Label,
    'Editable.Preview': Editable.Preview,
    'Editable.SubmitTrigger': Editable.SubmitTrigger,
  },
  tags: ['autodocs'],

  argTypes: {
    asChild: boolArg('Render the child element as the root (polymorphic).'),
    activationMode: selectArg(['focus', 'dblclick', 'click', 'none'], 'focus'),
    autoResize: boolArg(),
    defaultEdit: boolArg(),
    defaultValue: { control: 'text' },
    disabled: boolArg(),
    edit: boolArg(),
    finalFocusEl: { control: false },
    form: { control: 'text' },
    id: { control: 'text' },
    ids: { control: 'object' },
    invalid: boolArg(),
    maxLength: { control: 'number' },
    modelValue: { control: 'text' },
    name: { control: 'text' },
    placeholder: { control: 'text' },
    readOnly: boolArg(),
    required: boolArg(),
    selectOnFocus: boolArg(),
    submitMode: { control: 'text' },
    translations: { control: 'object' },
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
} satisfies Meta<typeof Editable.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  ...renderRaw(EditableDefaultStory, EditableDefaultSource),

  // Core flow: Edit reveals the input, type a new value, Save commits it back
  // into the preview.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await userEvent.click(canvas.getByRole('button', { name: /edit/i }))
    const input = canvas.getByRole('textbox')
    await userEvent.clear(input)
    await userEvent.type(input, 'Updated text')
    // Ark labels the SubmitTrigger "submit" (overrides the "Save" button text).
    await userEvent.click(canvas.getByRole('button', { name: /submit/i }))

    await waitFor(() => expect(canvas.getByText('Updated text')).toBeInTheDocument())
  },
}
