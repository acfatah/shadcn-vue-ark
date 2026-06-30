import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { expect, userEvent, waitFor, within } from 'storybook/test'

import { Calendar } from '@/components/ui/calendar'
import { registryItem } from '@/components/ui/calendar/_registry'

import { boolArg, classArg, selectArg } from '../../../_helpers/args'
import { docsRoot } from '../../../_helpers/docs-root'
import { renderRaw } from '../../../_helpers/render'
import CalendarDefaultStory from './CalendarDefaultStory.vue'
import CalendarDefaultSource from './CalendarDefaultStory.vue?raw'

const meta = {
  title: 'Components/UI/Calendar',
  component: docsRoot(Calendar.Root, 'Calendar.Root'),
  subcomponents: {
    'Calendar.Header': Calendar.Header,
    'Calendar.Heading': Calendar.Heading,
    'Calendar.PrevButton': Calendar.PrevButton,
    'Calendar.NextButton': Calendar.NextButton,
    'Calendar.Grid': Calendar.Grid,
    'Calendar.GridHead': Calendar.GridHead,
    'Calendar.GridBody': Calendar.GridBody,
    'Calendar.GridRow': Calendar.GridRow,
    'Calendar.HeadCell': Calendar.HeadCell,
    'Calendar.Cell': Calendar.Cell,
    'Calendar.CellTrigger': Calendar.CellTrigger,
  },
  tags: ['autodocs'],

  argTypes: {
    closeOnSelect: boolArg(),
    createCalendar: { control: false },
    defaultFocusedValue: { control: false },
    defaultOpen: boolArg(),
    defaultValue: { control: false },
    defaultView: selectArg(['day', 'month', 'year'], 'day'),
    disabled: boolArg(),
    fixedWeeks: boolArg('Always render six week rows.'),
    focusedValue: { control: false },
    format: { control: false },
    id: { control: 'text' },
    ids: { control: 'object' },
    isDateUnavailable: { control: false },
    locale: { control: 'text' },
    max: { control: false },
    maxSelectedDates: { control: 'number' },
    maxView: selectArg(['day', 'month', 'year'], 'year'),
    min: { control: false },
    minView: selectArg(['day', 'month', 'year'], 'day'),
    modelValue: { control: false },
    name: { control: 'text' },
    numOfMonths: { control: 'number' },
    open: boolArg(),
    openOnClick: boolArg(),
    outsideDaySelectable: boolArg(),
    parse: { control: false },
    placeholder: { control: false },
    positioning: { control: 'object' },
    readOnly: boolArg(),
    selectionMode: selectArg(['single', 'multiple', 'range'], 'single'),
    showWeekNumbers: boolArg(),
    startOfWeek: { control: 'number' },
    timeZone: { control: 'text' },
    translations: { control: 'object' },
    view: selectArg(['day', 'month', 'year'], 'day'),
    inline: boolArg('Render the calendar inline (no popover).'),
    invalid: boolArg(),
    required: boolArg(),
    class: classArg(),
    layout: { control: 'text' },
  },

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },

    a11y: { test: 'error' },
  },
} satisfies Meta<typeof Calendar.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  ...renderRaw(CalendarDefaultStory, CalendarDefaultSource),

  // Core flow: clicking a day cell selects it (data-selected). The month is
  // pinned to June 2026 in the story, so "20" is unambiguous.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await userEvent.click(canvas.getByText('20'))
    await waitFor(() =>
      expect(canvas.getByText('20')).toHaveAttribute('data-selected'))
  },
}

export const Disabled: Story = {
  args: { disabled: true },
  ...renderRaw(CalendarDefaultStory, CalendarDefaultSource, {
    description: 'Disable the whole calendar with `disabled`.',
  }),
}
