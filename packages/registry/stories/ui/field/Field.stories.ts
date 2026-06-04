import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import {
  FieldDescription,
  FieldError,
  FieldInput,
  FieldLabel,
  FieldRequiredIndicator,
  FieldRoot,
} from '@/components/ui/field'
import { registryItem } from '@/components/ui/field/_registry'

import FieldCheckboxStory from './FieldCheckboxStory.vue'
import FieldCheckboxSource from './FieldCheckboxStory.vue?raw'
import FieldDefaultStory from './FieldDefaultStory.vue'
import FieldDefaultSource from './FieldDefaultStory.vue?raw'
import FieldTextareaStory from './FieldTextareaStory.vue'
import FieldTextareaSource from './FieldTextareaStory.vue?raw'

const meta = {
  title: 'Components/Field',
  component: FieldRoot,
  subcomponents: {
    FieldLabel,
    FieldInput,
    FieldDescription,
    FieldError,
    FieldRequiredIndicator,
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
    required: true,
    invalid: false,
    disabled: false,
  },

  argTypes: {
    required: { control: 'boolean' },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof FieldRoot>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: FieldDefaultSource,
      },
    },
  },

  render: args => ({
    components: { FieldDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <FieldDefaultStory v-bind="args" />
    `,
  }),
}

export const Textarea: Story = {
  parameters: {
    docs: {
      source: {
        code: FieldTextareaSource,
      },
    },
  },

  render: args => ({
    components: { FieldTextareaStory },

    setup() {
      return { args }
    },

    template: html`
      <FieldTextareaStory v-bind="args" />
    `,
  }),
}

/**
 * Simplified Checkbox components
 *
 * See `Checkbox` component for more granular usage.
 */
export const Checkbox: Story = {
  parameters: {
    docs: {
      source: {
        code: FieldCheckboxSource,
      },
    },
  },

  render: args => ({
    components: { FieldCheckboxStory },

    setup() {
      return { args }
    },

    template: html`
      <FieldCheckboxStory v-bind="args" />
    `,
  }),
}
