import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { InputGroup } from '@/components/ui/input-group'
import { registryItem } from '@/components/ui/input-group/_registry'

import { docsRoot } from '../../../_helpers/docs-root'
import InputGroupDefaultStory from './InputGroupDefaultStory.vue'
import InputGroupDefaultSource from './InputGroupDefaultStory.vue?raw'

const meta: Meta<typeof InputGroup.Root> = {
  title: 'Components/UI/InputGroup',
  component: docsRoot(InputGroup.Root, 'InputGroup.Root'),
  subcomponents: {
    'InputGroup.Addon': InputGroup.Addon,
    'InputGroup.Text': InputGroup.Text,
    'InputGroup.Button': InputGroup.Button,
    'InputGroup.Input': InputGroup.Input,
    'InputGroup.Textarea': InputGroup.Textarea,
  },
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: InputGroupDefaultSource,
      },
    },
  },

  render: args => ({
    components: { InputGroupDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <InputGroupDefaultStory v-bind="args" />
    `,
  }),
}
