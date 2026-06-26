import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'
import { expect, userEvent, within } from 'storybook/test'

import { TimePicker } from '@/components/ui/time-picker'
import { registryItem } from '@/components/ui/time-picker/_registry'

import { docsRoot } from '../../../_helpers/docs-root'
import TimePickerDefaultStory from './TimePickerDefaultStory.vue'
import TimePickerDefaultSource from './TimePickerDefaultStory.vue?raw'

const meta: Meta<typeof TimePicker.Root> = {
  title: 'Components/UI/TimePicker',
  component: docsRoot(TimePicker.Root, 'TimePicker.Root'),
  subcomponents: {
    'TimePicker.Trigger': TimePicker.Trigger,
    'TimePicker.Content': TimePicker.Content,
  },
  tags: ['autodocs'],

  args: {
    hourCycle: 12,
    step: 5,
  },

  argTypes: {
    hourCycle: {
      control: 'inline-radio',
      options: [12, 24],
    },
    step: { control: 'number' },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
    placeholder: { control: 'text' },

    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
    },
    alignOffset: { control: 'number' },

    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
    },
    sideOffset: { control: 'number' },
  },

  render: args => ({
    components: { TimePickerDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <TimePickerDefaultStory v-bind="args" />
    `,
  }),

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
      source: {
        code: TimePickerDefaultSource,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const body = within(document.body)

    const trigger = canvas.getByRole('button')
    await userEvent.click(trigger)

    const hourList = await body.findByRole('listbox', { name: 'Hour' })
    await userEvent.click(within(hourList).getByRole('option', { name: '09' }))

    const minuteList = body.getByRole('listbox', { name: 'Minute' })
    await userEvent.click(within(minuteList).getByRole('option', { name: '30' }))

    const periodList = body.getByRole('listbox', { name: 'Period (AM/PM)' })
    await userEvent.click(within(periodList).getByRole('option', { name: 'PM' }))

    await expect(trigger).toHaveTextContent('09:30 PM')
    await expect(
      within(hourList).getByRole('option', { name: '09' }),
    ).toHaveAttribute('aria-selected', 'true')
  },
}

export const HourCycle24: Story = {
  name: '24-Hour',
  args: {
    hourCycle: 24,
    defaultValue: '14:30',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const body = within(document.body)

    const trigger = canvas.getByRole('button')
    await expect(trigger).toHaveTextContent('14:30')

    await userEvent.click(trigger)
    await body.findByRole('listbox', { name: 'Hour' })

    // No AM/PM column in 24-hour mode.
    expect(body.queryByRole('listbox', { name: 'Period (AM/PM)' })).toBeNull()

    const hourList = body.getByRole('listbox', { name: 'Hour' })
    await userEvent.click(within(hourList).getByRole('option', { name: '09' }))

    await expect(trigger).toHaveTextContent('09:30')
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: '09:30',
  },
}

export const Invalid: Story = {
  args: {
    invalid: true,
    defaultValue: '09:30',
  },
}

export const CustomStep: Story = {
  name: '15-Minute Step',
  args: {
    step: 15,
  },
}
