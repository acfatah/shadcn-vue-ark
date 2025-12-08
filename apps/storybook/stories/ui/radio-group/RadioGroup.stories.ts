import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { html } from 'common-tags'

import {
  RadioGroupDescription,
  RadioGroupIndicator,
  RadioGroupItem,
  RadioGroupItemContent,
  RadioGroupItemControl,
  RadioGroupItemDescription,
  RadioGroupItemHiddenInput,
  RadioGroupItems,
  RadioGroupItemText,
  RadioGroupLabel,
  RadioGroupRoot,
  RadioGroupRootProvider,
} from '@/components/ui/radio-group'
import { registryItem } from '@/components/ui/radio-group/_registry'

import RadioGroupBasicStory from './RadioGroupBasicStory.vue'
import RadioGroupBasicSource from './RadioGroupBasicStory.vue?raw'
import RadioGroupDefaultStory from './RadioGroupDefaultStory.vue'
import RadioGroupDefaultSource from './RadioGroupDefaultStory.vue?raw'

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroupRoot,
  subcomponents: {
    RadioGroupRoot,
    RadioGroupLabel,
    RadioGroupDescription,
    RadioGroupItems,
    RadioGroupItem,
    RadioGroupItemControl,
    RadioGroupItemContent,
    RadioGroupItemText,
    RadioGroupItemDescription,
    RadioGroupItemHiddenInput,
    RadioGroupIndicator,
    RadioGroupRootProvider,
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
    disabled: false,
    orientation: 'vertical',
  },

  argTypes: {
    // required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    orientation: {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical'],
    },
  },
} satisfies Meta<typeof RadioGroupRoot>

export default meta
type Story = StoryObj<typeof RadioGroupRoot>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: RadioGroupDefaultSource,
      },
    },
  },

  render: args => ({
    components: { RadioGroupDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <RadioGroupDefaultStory v-bind="args" />
    `,
  }),
}

export const Basic: Story = {
  parameters: {
    docs: {
      source: {
        code: RadioGroupBasicSource,
      },
    },
  },

  render: args => ({
    components: { RadioGroupBasicStory },

    setup() {
      return { args }
    },

    template: html`
      <RadioGroupBasicStory v-bind="args" />
    `,
  }),
}
