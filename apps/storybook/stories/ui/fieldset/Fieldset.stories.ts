import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import {
  FieldsetDescription,
  FieldsetError,
  FieldsetGroup,
  FieldsetLegend,
  FieldsetRoot,
  FieldsetSeparator,
} from '@/components/ui/fieldset'
import { registryItem } from '@/components/ui/fieldset/_registry'

import FieldsetDefaultStory from './FieldsetDefaultStory.vue'
import FieldsetDefaultSource from './FieldsetDefaultStory.vue?raw'

const meta = {
  title: 'Components/Fieldset',
  component: FieldsetRoot,
  subcomponents: {
    FieldsetLegend,
    FieldsetGroup,
    FieldsetDescription,
    FieldsetError,
    FieldsetSeparator,
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
} satisfies Meta<typeof FieldsetRoot>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: FieldsetDefaultSource,
      },
    },
  },

  render: args => ({
    components: { FieldsetDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <FieldsetDefaultStory v-bind="args" />
    `,
  }),
}
