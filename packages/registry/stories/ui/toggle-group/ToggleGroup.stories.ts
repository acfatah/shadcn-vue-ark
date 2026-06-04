import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { ToggleGroup } from '@/components/ui/toggle-group'
import { registryItem } from '@/components/ui/toggle-group/_registry'

import ToggleGroupDefaultStory from './ToggleGroupDefaultStory.vue'
import ToggleGroupDefaultSource from './ToggleGroupDefaultStory.vue?raw'

const meta = {
  title: 'Components/ToggleGroup',
  component: ToggleGroup.Root,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },
  },
} satisfies Meta<typeof ToggleGroup.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: ToggleGroupDefaultSource,
      },
    },
  },

  render: args => ({
    components: { ToggleGroupDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <ToggleGroupDefaultStory v-bind="args" />
    `,
  }),
}
