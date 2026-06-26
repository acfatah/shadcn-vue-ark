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

import RadioGroupBasicStory from './RadioGroupBasicStory.vue'
import RadioGroupBasicSource from './RadioGroupBasicStory.vue?raw'
import RadioGroupCardsStory from './RadioGroupCardsStory.vue'
import RadioGroupCardsSource from './RadioGroupCardsStory.vue?raw'
import RadioGroupDefaultStory from './RadioGroupDefaultStory.vue'
import RadioGroupDefaultSource from './RadioGroupDefaultStory.vue?raw'
import RadioGroupWithDescriptionStory from './RadioGroupWithDescriptionStory.vue'
import RadioGroupWithDescriptionSource from './RadioGroupWithDescriptionStory.vue?raw'

const meta = {
  title: 'Components/UI/RadioGroup',
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
        component: 'A set of radio buttons where only one option can be selected at a time.',
      },
    },
  },

  args: {
    disabled: false,
    invalid: false,
    required: true,
    orientation: 'vertical',
  },

  argTypes: {
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
    required: { control: 'boolean' },
    orientation: {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical'],
    },
  },
} satisfies Meta<typeof RadioGroupRoot>

export default meta
type Story = StoryObj<typeof meta>

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

export const WithDescription: Story = {
  parameters: {
    docs: {
      source: {
        code: RadioGroupWithDescriptionSource,
      },
    },
  },

  render: args => ({
    components: { RadioGroupWithDescriptionStory },

    setup() {
      return { args }
    },

    template: html`
      <RadioGroupWithDescriptionStory v-bind="args" />
    `,
  }),
}

export const Cards: Story = {
  parameters: {
    docs: {
      source: {
        code: RadioGroupCardsSource,
      },
    },
  },

  render: args => ({
    components: { RadioGroupCardsStory },

    setup() {
      return { args }
    },

    template: html`
      <RadioGroupCardsStory v-bind="args" />
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
