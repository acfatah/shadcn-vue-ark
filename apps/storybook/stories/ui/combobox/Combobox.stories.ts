import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { Combobox } from '@/components/ui/combobox'
import { registryItem } from '@/components/ui/combobox/_registry'

import ComboboxDefaultStory from './ComboboxDefaultStory.vue'
import ComboboxDefaultSource from './ComboboxDefaultStory.vue?raw'
import ComboboxUsingPopoverAndCommandStory from './ComboboxUsingPopoverAndCommandStory.vue'
import ComboboxUsingPopoverAndCommandSource from './ComboboxUsingPopoverAndCommandStory.vue?raw'

const meta = {
  title: 'Components/Combobox',
  component: Combobox.Root,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },
  },
} satisfies Meta<typeof Combobox.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: ComboboxDefaultSource,
      },
    },
  },

  render: args => ({
    components: { ComboboxDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <ComboboxDefaultStory v-bind="args" />
    `,
  }),
}

export const UsingPopoverAndCommand: Story = {
  parameters: {
    docs: {
      source: {
        code: ComboboxUsingPopoverAndCommandSource,
      },
    },
  },

  render: args => ({
    components: { ComboboxUsingPopoverAndCommandStory },

    setup() {
      return { args }
    },

    template: html`
      <ComboboxUsingPopoverAndCommandStory v-bind="args" />
    `,
  }),
}
