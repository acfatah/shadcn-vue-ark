import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { NumberInput } from '@/components/ui/number-input'
import { registryItem } from '@/components/ui/number-input/_registry'

import NumberInputCurrencyStory from './NumberInputCurrencyStory.vue'
import NumberInputCurrencySource from './NumberInputCurrencyStory.vue?raw'
import NumberInputDecimalStory from './NumberInputDecimalStory.vue'
import NumberInputDecimalSource from './NumberInputDecimalStory.vue?raw'
import NumberInputDefaultStory from './NumberInputDefaultStory.vue'
import NumberInputDefaultSource from './NumberInputDefaultStory.vue?raw'
import NumberInputPercentageStory from './NumberInputPercentageStory.vue'
import NumberInputPercentageSource from './NumberInputPercentageStory.vue?raw'

const meta = {
  title: 'Components/UI/NumberInput',
  component: NumberInput.Root,
  subcomponents: {
    'NumberInput.Control': NumberInput.Control,
    'NumberInput.Input': NumberInput.Input,
    'NumberInput.Increment': NumberInput.Increment,
    'NumberInput.Decrement': NumberInput.Decrement,
  },
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },
  },
} satisfies Meta<typeof NumberInput.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: NumberInputDefaultSource,
      },
    },
  },

  render: args => ({
    components: { NumberInputDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <NumberInputDefaultStory v-bind="args" />
    `,
  }),
}

export const Decimal: Story = {
  parameters: {
    docs: {
      source: {
        code: NumberInputDecimalSource,
      },
    },
  },

  render: args => ({
    components: { NumberInputDecimalStory },

    setup() {
      return { args }
    },

    template: html`
      <NumberInputDecimalStory v-bind="args" />
    `,
  }),
}

export const Currency: Story = {
  parameters: {
    docs: {
      source: {
        code: NumberInputCurrencySource,
      },
    },
  },

  render: args => ({
    components: { NumberInputCurrencyStory },

    setup() {
      return { args }
    },

    template: html`
      <NumberInputCurrencyStory v-bind="args" />
    `,
  }),
}

export const Percentage: Story = {
  parameters: {
    docs: {
      source: {
        code: NumberInputPercentageSource,
      },
    },
  },

  render: args => ({
    components: { NumberInputPercentageStory },

    setup() {
      return { args }
    },

    template: html`
      <NumberInputPercentageStory v-bind="args" />
    `,
  }),
}
