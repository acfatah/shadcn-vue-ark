import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { RangeCalendar } from '@/components/ui/range-calendar'
import { registryItem } from '@/components/ui/range-calendar/_registry'

import RangeCalendarDefaultStory from './RangeCalendarDefaultStory.vue'
import RangeCalendarDefaultSource from './RangeCalendarDefaultStory.vue?raw'

const meta = {
  title: 'Components/RangeCalendar',
  component: RangeCalendar.Root,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },
  },
} satisfies Meta<typeof RangeCalendar.Root>

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
