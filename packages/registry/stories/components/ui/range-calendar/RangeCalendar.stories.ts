import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { expect, userEvent, waitFor, within } from 'storybook/test'

import { RangeCalendar } from '@/components/ui/range-calendar'
import { registryItem } from '@/components/ui/range-calendar/_registry'

import { boolArg, classArg, selectArg } from '../../../_helpers/args'
import { docsRoot } from '../../../_helpers/docs-root'
import { renderRaw } from '../../../_helpers/render'
import RangeCalendarDefaultStory from './RangeCalendarDefaultStory.vue'
import RangeCalendarDefaultSource from './RangeCalendarDefaultStory.vue?raw'

const meta = {
  title: 'Components/UI/RangeCalendar',
  component: docsRoot(RangeCalendar.Root, 'RangeCalendar.Root'),
  subcomponents: {
    'RangeCalendar.Header': RangeCalendar.Header,
    'RangeCalendar.Heading': RangeCalendar.Heading,
    'RangeCalendar.PrevButton': RangeCalendar.PrevButton,
    'RangeCalendar.NextButton': RangeCalendar.NextButton,
    'RangeCalendar.Grid': RangeCalendar.Grid,
    'RangeCalendar.GridHead': RangeCalendar.GridHead,
    'RangeCalendar.GridBody': RangeCalendar.GridBody,
    'RangeCalendar.GridRow': RangeCalendar.GridRow,
    'RangeCalendar.HeadCell': RangeCalendar.HeadCell,
    'RangeCalendar.Cell': RangeCalendar.Cell,
    'RangeCalendar.CellTrigger': RangeCalendar.CellTrigger,
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
    selectionMode: selectArg(['single', 'multiple', 'range'], 'range'),
    showWeekNumbers: boolArg(),
    startOfWeek: { control: 'number' },
    timeZone: { control: 'text' },
    translations: { control: 'object' },
    view: selectArg(['day', 'month', 'year'], 'day'),
    inline: boolArg('Render the calendar inline (no popover).'),
    invalid: boolArg(),
    required: boolArg(),
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
} satisfies Meta<typeof RangeCalendar.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  ...renderRaw(RangeCalendarDefaultStory, RangeCalendarDefaultSource),

  // Core flow: clicking a day starts a fresh range selection, so the clicked
  // day becomes the selected anchor. Two months render (June/July 2026), so
  // "15" appears twice; the first is June.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const firstFifteenth = () => canvas.getAllByText('15')[0]!

    await userEvent.click(firstFifteenth())
    await waitFor(() =>
      expect(firstFifteenth()).toHaveAttribute('data-selected'))
  },
}
