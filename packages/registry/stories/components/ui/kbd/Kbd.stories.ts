import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { Kbd } from '@/components/ui/kbd'
import { registryItem } from '@/components/ui/kbd/_registry'

import KbdDefaultStory from './KbdDefaultStory.vue'
import KbdDefaultSource from './KbdDefaultStory.vue?raw'

const meta: Meta<typeof Kbd> = {
  title: 'Components/UI/Kbd',
  component: Kbd,
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
        code: KbdDefaultSource,
      },
    },
  },

  render: args => ({
    components: { KbdDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <KbdDefaultStory v-bind="args" />
    `,
  }),
}
