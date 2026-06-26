import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { Field } from '@/components/ui/field'
import { registryItem } from '@/components/ui/field/_registry'

import { docsRoot } from '../../../_helpers/docs-root'
import FieldCheckboxStory from './FieldCheckboxStory.vue'
import FieldCheckboxSource from './FieldCheckboxStory.vue?raw'
import FieldDefaultStory from './FieldDefaultStory.vue'
import FieldDefaultSource from './FieldDefaultStory.vue?raw'
import FieldTextareaStory from './FieldTextareaStory.vue'
import FieldTextareaSource from './FieldTextareaStory.vue?raw'

const meta: Meta<typeof Field.Root> = {
  title: 'Components/UI/Field',
  component: docsRoot(Field.Root, 'Field.Root'),
  subcomponents: {
    'Field.RootProvider': Field.RootProvider,
    'Field.Group': Field.Group,
    'Field.Label': Field.Label,
    'Field.RequiredIndicator': Field.RequiredIndicator,
    'Field.Input': Field.Input,
    'Field.Textarea': Field.Textarea,
    'Field.Checkbox': Field.Checkbox,
    'Field.Title': Field.Title,
    'Field.Description': Field.Description,
    'Field.Error': Field.Error,
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
}

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
