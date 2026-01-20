import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import {
  CheckboxControl,
  CheckboxGroup,
  CheckboxHiddenInput,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxRoot,
} from '@/components/ui/checkbox'
import { registryItem } from '@/components/ui/checkbox/_registry'

import CheckboxDefaultStory from './CheckboxDefaultStory.vue'
import CheckboxDefaultSource from './CheckboxDefaultStory.vue?raw'

const meta = {
  title: 'Components/Checkbox',
  component: CheckboxRoot,
  subcomponents: {
    CheckboxControl,
    CheckboxGroup,
    CheckboxHiddenInput,
    CheckboxIndicator,
    CheckboxLabel,
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
    invalid: false,
    disabled: false,
    loading: false,
  },

  argTypes: {
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
} satisfies Meta<typeof CheckboxRoot>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: CheckboxDefaultSource,
      },
    },
  },

  render: args => ({
    components: { CheckboxDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <CheckboxDefaultStory v-bind="args" />
    `,
  }),
}
