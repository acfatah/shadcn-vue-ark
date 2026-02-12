import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { InputGroup } from '@/components/ui/input-group'
import { registryItem } from '@/components/ui/input-group/_registry'

import InputGroupDefaultStory from './InputGroupDefaultStory.vue'
import InputGroupDefaultSource from './InputGroupDefaultStory.vue?raw'

const meta = {
  title: 'Components/InputGroup',
  component: InputGroup.Root,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },
  },
} satisfies Meta<typeof InputGroup.Root>

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
