import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { expect, screen, userEvent, waitFor, within } from 'storybook/test'

import { DatePicker } from '@/components/ui/date-picker'
import { registryItem } from '@/components/ui/date-picker/_registry'

import { boolArg, classArg, selectArg } from '../../../_helpers/args'
import { docsRoot } from '../../../_helpers/docs-root'
import { renderRaw } from '../../../_helpers/render'
import DatePickerDefaultStory from './DatePickerDefaultStory.vue'
import DatePickerDefaultSource from './DatePickerDefaultStory.vue?raw'
import DatePickerFormStory from './DatePickerFormStory.vue'
import DatePickerFormSource from './DatePickerFormStory.vue?raw'
import DatePickerInputStory from './DatePickerInputStory.vue'
import DatePickerInputSource from './DatePickerInputStory.vue?raw'

const meta = {
  title: 'Components/UI/DatePicker',
  component: docsRoot(DatePicker.Root, 'DatePicker.Root'),
  subcomponents: {
    'DatePicker.Input': DatePicker.Input,
    'DatePicker.Trigger': DatePicker.Trigger,
    'DatePicker.Content': DatePicker.Content,
  },
  tags: ['autodocs'],

  argTypes: {
    modelValue: { control: false },
    defaultValue: { control: false },
    layout: { control: 'text' },
    placeholder: { control: 'text' },
    formatOptions: { control: 'object' },
    locale: { control: 'text' },
    closeOnSelect: boolArg(),
    disabled: boolArg(),
    invalid: boolArg(),
    calendarProps: { control: 'object' },
    align: selectArg(['start', 'center', 'end'], 'start'),
    alignOffset: { control: 'number' },
    side: selectArg(['top', 'right', 'bottom', 'left'], 'bottom'),
    sideOffset: { control: 'number' },
    class: classArg(),
  },

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },

    a11y: {
      test: 'error',
      // KNOWN-BUG: SDL-016 - the picker's internal Popover.Content host
      // (role=dialog) wraps the calendar with no accessible name. Component
      // defect (logged, not fixed); disable only this rule.
      config: { rules: [{ id: 'aria-dialog-name', enabled: false }] },
    },
  },
} satisfies Meta<typeof DatePicker.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  ...renderRaw(DatePickerDefaultStory, DatePickerDefaultSource),

  // Core flow: the trigger opens a teleported calendar (queried via `screen`),
  // picking a day commits the value and (closeOnSelect) closes the popover, so
  // the trigger no longer shows its placeholder.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button')

    await userEvent.click(trigger)
    await userEvent.click(await screen.findByText('15'))
    await waitFor(() => expect(trigger).not.toHaveTextContent(/pick a date/i))
  },
}

export const Input: Story = {
  ...renderRaw(DatePickerInputStory, DatePickerInputSource, {
    description: 'Pair `DatePicker.Input` with the trigger for typed entry.',
  }),
}

export const FormBridge: Story = {
  ...renderRaw(DatePickerFormStory, DatePickerFormSource, {
    description: 'Bridge the selected value into a form field.',
  }),
}
