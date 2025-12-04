import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { html } from 'common-tags'

import { Input } from '@/components/ui/input'
import { registryItem } from '@/components/ui/input/_registry'
import InputDefaultStory from './InputDefaultStory.vue'
import InputDefaultSource from './InputDefaultStory.vue?raw'
import TextareaInputStory from './TextareaInputStory.vue'
import TextareaInputSource from './TextareaInputStory.vue?raw'

const meta = {
  title: 'Components/Input',
  subcomponents: {
    InputLabel: Input.Label,
    InputDescription: Input.Description,
    TextInput: Input.Text,
    TextareaInput: Input.Textarea,
  },
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },
  },

  args: {
    // required: true,
    // invalid: false,
    disabled: false,
  },

  argTypes: {
    // required: { control: 'boolean' },
    // invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<Record<string, any>>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: InputDefaultSource,
      },
    },
  },

  render: args => ({
    components: { InputDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <InputDefaultStory v-bind="args" />
    `,
  }),
}

export const Textarea: Story = {
  parameters: {
    docs: {
      source: {
        code: TextareaInputSource,
      },
    },
  },

  render: args => ({
    components: { TextareaInputStory },

    setup() {
      return { args }
    },

    template: html`
      <TextareaInputStory v-bind="args" />
    `,
  }),
}
