import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { DatePicker } from '@/components/ui/date-picker'
import { registryItem } from '@/components/ui/date-picker/_registry'

import DatePickerDefaultStory from './DatePickerDefaultStory.vue'
import DatePickerDefaultSource from './DatePickerDefaultStory.vue?raw'
import DatePickerFormStory from './DatePickerFormStory.vue'
import DatePickerFormSource from './DatePickerFormStory.vue?raw'

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker.Root,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },
  },
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: DatePickerDefaultSource,
      },
    },
  },

  render: args => ({
    components: { DatePickerDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <DatePickerDefaultStory v-bind="args" />
    `,
  }),
}

export const FormBridge: Story = {
  parameters: {
    docs: {
      source: {
        code: DatePickerFormSource,
      },
    },
  },

  render: args => ({
    components: { DatePickerFormStory },

    setup() {
      return { args }
    },

    template: html`
      <DatePickerFormStory v-bind="args" />
    `,
  }),
}
