import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { InputOTP } from '@/components/ui/input-otp'
import { registryItem } from '@/components/ui/input-otp/_registry'

import InputOTPDefaultStory from './InputOTPDefaultStory.vue'
import InputOTPDefaultSource from './InputOTPDefaultStory.vue?raw'

const meta = {
  title: 'Components/InputOTP',
  component: InputOTP.Root,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },
  },
} satisfies Meta<typeof InputOTP.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: InputOTPDefaultSource,
      },
    },
  },

  render: args => ({
    components: { InputOTPDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <InputOTPDefaultStory v-bind="args" />
    `,
  }),
}
