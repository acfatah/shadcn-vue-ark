import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { ButtonGroup } from '@/components/ui/button-group'
import { registryItem } from '@/components/ui/button-group/_registry'

import ButtonGroupDefaultStory from './ButtonGroupDefaultStory.vue'
import ButtonGroupDefaultSource from './ButtonGroupDefaultStory.vue?raw'

const meta = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup.Root,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },
  },
} satisfies Meta<typeof ButtonGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: ButtonGroupDefaultSource,
      },
    },
  },

  render: args => ({
    components: { ButtonGroupDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <ButtonGroupDefaultStory v-bind="args" />
    `,
  }),
}
