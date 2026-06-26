import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { Calendar } from '@/components/ui/calendar'
import { registryItem } from '@/components/ui/calendar/_registry'

import { docsRoot } from '../../../_helpers/docs-root'
import CalendarDefaultStory from './CalendarDefaultStory.vue'
import CalendarDefaultSource from './CalendarDefaultStory.vue?raw'

const meta: Meta<typeof Calendar.Root> = {
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
        code: CalendarDefaultSource,
      },
    },
  },

  render: args => ({
    components: { CalendarDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <CalendarDefaultStory v-bind="args" />
    `,
  }),
}
