import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { Toggle } from '@/components/ui/toggle'
import { registryItem } from '@/components/ui/toggle/_registry'

import ToggleDefaultStory from './ToggleDefaultStory.vue'
import ToggleDefaultSource from './ToggleDefaultStory.vue?raw'

const meta = {
  title: 'Components/Toggle',
  component: Toggle.Root,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },
  },
} satisfies Meta<typeof Toggle.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: ToggleDefaultSource,
      },
    },
  },

  render: args => ({
    components: { ToggleDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <ToggleDefaultStory v-bind="args" />
    `,
  }),
}
