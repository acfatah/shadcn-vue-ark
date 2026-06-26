import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { Checkbox, variant } from '@/components/ui/checkbox'
import { registryItem } from '@/components/ui/checkbox/_registry'

import { docsRoot } from '../../../_helpers/docs-root'
import CheckboxDefaultStory from './CheckboxDefaultStory.vue'
import CheckboxDefaultSource from './CheckboxDefaultStory.vue?raw'

const meta: Meta<typeof Checkbox.Root> = {
  title: 'Components/UI/Checkbox',
  component: docsRoot(Checkbox.Root, 'Checkbox.Root'),
  subcomponents: {
    'Checkbox.Content': Checkbox.Content,
    'Checkbox.Label': Checkbox.Label,
    'Checkbox.Description': Checkbox.Description,
    'Checkbox.Control': Checkbox.Control,
    'Checkbox.Indicator': Checkbox.Indicator,
    'Checkbox.HiddenInput': Checkbox.HiddenInput,
    'Checkbox.RootProvider': Checkbox.RootProvider,
    'Checkbox.Group': Checkbox.Group,
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
    variant: 'default',
  },

  argTypes: {
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    variant: {
      control: { type: 'select' },
      options: Object.keys(variant),
    },
  },
}

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
