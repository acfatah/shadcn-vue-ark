import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { expect, userEvent, waitFor, within } from 'storybook/test'

import { PinInput } from '@/components/ui/pin-input'
import { registryItem } from '@/components/ui/pin-input/_registry'

import { boolArg, classArg, selectArg } from '../../../_helpers/args'
import { docsRoot } from '../../../_helpers/docs-root'
import { renderRaw } from '../../../_helpers/render'
import PinInputDefaultStory from './PinInputDefaultStory.vue'
import PinInputDefaultSource from './PinInputDefaultStory.vue?raw'

const meta = {
  title: 'Components/UI/PinInput',
  component: docsRoot(PinInput.Root, 'PinInput.Root'),
  subcomponents: {
    'PinInput.Group': PinInput.Group,
    'PinInput.Slot': PinInput.Slot,
    'PinInput.HiddenInput': PinInput.HiddenInput,
    'PinInput.Separator': PinInput.Separator,
  },
  tags: ['autodocs'],

  argTypes: {
    autoFocus: boolArg(),
    autoSubmit: boolArg(),
    blurOnComplete: boolArg(),
    count: { control: 'number' },
    defaultValue: { control: 'object' },
    disabled: boolArg(),
    form: { control: 'text' },
    id: { control: 'text' },
    ids: { control: 'object' },
    invalid: boolArg(),
    mask: boolArg('Obscure the entered characters.'),
    modelValue: { control: 'object' },
    name: { control: 'text' },
    otp: boolArg('Set autocomplete to one-time-code.'),
    pattern: { control: 'text' },
    placeholder: { control: 'text' },
    readOnly: boolArg(),
    required: boolArg(),
    sanitizeValue: { control: false },
    selectOnFocus: boolArg(),
    translations: { control: 'object' },
    type: selectArg(['numeric', 'alphanumeric', 'alphabetic'], 'numeric'),
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
} satisfies Meta<typeof PinInput.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  ...renderRaw(PinInputDefaultStory, PinInputDefaultSource),

  // Core flow: typing fills the slots left to right (Ark advances focus).
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const slots = canvas.getAllByRole('textbox')

    await userEvent.click(slots[0]!)
    await userEvent.keyboard('123')
    await waitFor(() => expect(slots[0]).toHaveValue('1'))
  },
}
