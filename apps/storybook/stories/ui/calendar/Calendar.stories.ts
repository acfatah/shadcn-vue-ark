import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { Calendar } from '@/components/ui/calendar'
import { registryItem } from '@/components/ui/calendar/_registry'

import CalendarDefaultStory from './CalendarDefaultStory.vue'
import CalendarDefaultSource from './CalendarDefaultStory.vue?raw'

const meta = {
  title: 'Components/Calendar',
  component: Calendar.Root,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },
  },
} satisfies Meta<typeof Calendar.Root>

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
