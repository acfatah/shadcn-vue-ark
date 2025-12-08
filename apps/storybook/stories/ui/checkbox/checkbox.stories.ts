import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { html } from 'common-tags'

import {
  CheckboxControl,
  CheckboxGroup,
  CheckboxHiddenInput,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxRoot,
  CheckboxRootProvider,
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
    CheckboxRootProvider,
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
} satisfies Meta<typeof CheckboxRoot>

export default meta
type Story = StoryObj<typeof CheckboxRoot>

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
