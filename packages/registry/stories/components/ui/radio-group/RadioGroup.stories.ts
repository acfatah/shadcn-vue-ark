import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { RadioGroup } from '@/components/ui/radio-group'
import { registryItem } from '@/components/ui/radio-group/_registry'

import { docsRoot } from '../../../_helpers/docs-root'
import RadioGroupBasicStory from './RadioGroupBasicStory.vue'
import RadioGroupBasicSource from './RadioGroupBasicStory.vue?raw'
import RadioGroupCardsStory from './RadioGroupCardsStory.vue'
import RadioGroupCardsSource from './RadioGroupCardsStory.vue?raw'
import RadioGroupDefaultStory from './RadioGroupDefaultStory.vue'
import RadioGroupDefaultSource from './RadioGroupDefaultStory.vue?raw'
import RadioGroupWithDescriptionStory from './RadioGroupWithDescriptionStory.vue'
import RadioGroupWithDescriptionSource from './RadioGroupWithDescriptionStory.vue?raw'

const meta: Meta<typeof RadioGroup.Root> = {
  title: 'Components/UI/RadioGroup',
  component: docsRoot(RadioGroup.Root, 'RadioGroup.Root'),
  subcomponents: {
    'RadioGroup.Label': RadioGroup.Label,
    'RadioGroup.Description': RadioGroup.Description,
    'RadioGroup.Items': RadioGroup.Items,
    'RadioGroup.Item': RadioGroup.Item,
    'RadioGroup.ItemControl': RadioGroup.ItemControl,
    'RadioGroup.Indicator': RadioGroup.Indicator,
    'RadioGroup.ItemContent': RadioGroup.ItemContent,
    'RadioGroup.ItemText': RadioGroup.ItemText,
    'RadioGroup.ItemDescription': RadioGroup.ItemDescription,
    'RadioGroup.ItemHiddenInput': RadioGroup.ItemHiddenInput,
    'RadioGroup.RootProvider': RadioGroup.RootProvider,
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
}

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
