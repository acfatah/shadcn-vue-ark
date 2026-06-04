import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { DatetimePicker } from '@/components/ui/datetime-picker'
import { registryItem } from '@/components/ui/datetime-picker/_registry'

import DatetimePicker24hStory from './DatetimePicker24hStory.vue'
import DatetimePicker24hSource from './DatetimePicker24hStory.vue?raw'
import DatetimePickerDefaultStory from './DatetimePickerDefaultStory.vue'
import DatetimePickerDefaultSource from './DatetimePickerDefaultStory.vue?raw'

const meta = {
  title: 'Components/DatetimePicker',
  component: DatetimePicker.Root,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },
  },
} satisfies Meta<typeof DatetimePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: DatetimePickerDefaultSource,
      },
    },
  },

  render: args => ({
    components: { DatetimePickerDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <DatetimePickerDefaultStory v-bind="args" />
    `,
  }),
}

export const TwentyFourHour: Story = {
  parameters: {
    docs: {
      source: {
        code: DatetimePicker24hSource,
      },
    },
  },

  render: args => ({
    components: { DatetimePicker24hStory },

    setup() {
      return { args }
    },

    template: html`
      <DatetimePicker24hStory v-bind="args" />
    `,
  }),
}
