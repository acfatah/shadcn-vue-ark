import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { RangeCalendar } from '@/components/ui/range-calendar'
import { registryItem } from '@/components/ui/range-calendar/_registry'

import { docsRoot } from '../../../_helpers/docs-root'
import RangeCalendarDefaultStory from './RangeCalendarDefaultStory.vue'
import RangeCalendarDefaultSource from './RangeCalendarDefaultStory.vue?raw'

const meta: Meta<typeof RangeCalendar.Root> = {
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

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: RangeCalendarDefaultSource,
      },
    },
  },

  render: args => ({
    components: { RangeCalendarDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <RangeCalendarDefaultStory v-bind="args" />
    `,
  }),
}
