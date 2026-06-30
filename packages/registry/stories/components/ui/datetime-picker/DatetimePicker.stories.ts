import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { expect, screen, userEvent, within } from 'storybook/test'

import { DatetimePicker } from '@/components/ui/datetime-picker'
import { registryItem } from '@/components/ui/datetime-picker/_registry'

import { boolArg, classArg, selectArg } from '../../../_helpers/args'
import { docsRoot } from '../../../_helpers/docs-root'
import { renderRaw } from '../../../_helpers/render'
import DatetimePicker24hStory from './DatetimePicker24hStory.vue'
import DatetimePicker24hSource from './DatetimePicker24hStory.vue?raw'
import DatetimePickerDefaultStory from './DatetimePickerDefaultStory.vue'
import DatetimePickerDefaultSource from './DatetimePickerDefaultStory.vue?raw'

const meta = {
  title: 'Components/UI/DatetimePicker',
  component: docsRoot(DatetimePicker.Root, 'DatetimePicker.Root'),
  subcomponents: {
    'DatetimePicker.Trigger': DatetimePicker.Trigger,
    'DatetimePicker.Content': DatetimePicker.Content,
    'DatetimePicker.TimeScroll': DatetimePicker.TimeScroll,
  },
  tags: ['autodocs'],

  argTypes: {
    modelValue: { control: false },
    defaultValue: { control: false },
    layout: { control: 'text' },
    placeholder: { control: 'text' },
    formatOptions: { control: 'object' },
    locale: { control: 'text' },
    hourCycle: { control: 'number' },
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
      // KNOWN-BUG: SDL-017 - the picker's internal Popover.Content host
      // (role=dialog) wraps the calendar with no accessible name. Component
      // defect (logged, not fixed); disable only this rule.
      config: { rules: [{ id: 'aria-dialog-name', enabled: false }] },
    },
  },
} satisfies Meta<typeof DatetimePicker.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  ...renderRaw(DatetimePickerDefaultStory, DatetimePickerDefaultSource),

  // Core flow: the trigger opens a teleported calendar + time picker (queried
  // via `screen`). Selection needs both date and time, so the play asserts the
  // panel opens and renders day cells (their aria-labels start "Choose ...",
  // which also disambiguates them from the "15"/"30" time-scroll entries).
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await userEvent.click(canvas.getByRole('button'))
    const days = await screen.findAllByRole('button', { name: /^Choose / })
    expect(days.length).toBeGreaterThan(0)
  },
}

export const TwentyFourHour: Story = {
  ...renderRaw(DatetimePicker24hStory, DatetimePicker24hSource, {
    description: 'Use a 24-hour clock with `hourCycle: 24`.',
  }),
}
