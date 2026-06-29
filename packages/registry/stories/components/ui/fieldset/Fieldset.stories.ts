import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { Fieldset } from '@/components/ui/fieldset'
import { registryItem } from '@/components/ui/fieldset/_registry'

import { docsRoot } from '../../../_helpers/docs-root'
import FieldsetDefaultStory from './FieldsetDefaultStory.vue'
import FieldsetDefaultSource from './FieldsetDefaultStory.vue?raw'

const meta: Meta<{ disabled: boolean, invalid: boolean, required: boolean }> = {
  title: 'Components/UI/Fieldset',
  component: docsRoot(Fieldset.Root, 'Fieldset.Root'),
  subcomponents: {
    'Fieldset.Legend': Fieldset.Legend,
    'Fieldset.Content': Fieldset.Content,
    'Fieldset.Group': Fieldset.Group,
    'Fieldset.Description': Fieldset.Description,
    'Fieldset.Error': Fieldset.Error,
    'Fieldset.Separator': Fieldset.Separator,
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
