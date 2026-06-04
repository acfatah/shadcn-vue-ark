import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { Steps } from '@/components/ui/steps'
import { registryItem } from '@/components/ui/steps/_registry'

import StepsDefaultStory from './StepsDefaultStory.vue'
import StepsDefaultSource from './StepsDefaultStory.vue?raw'

const meta = {
  title: 'Components/Steps',
  component: Steps.Root,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },
  },
} satisfies Meta<typeof Steps.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: StepsDefaultSource,
      },
    },
  },

  render: args => ({
    components: { StepsDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <StepsDefaultStory v-bind="args" />
    `,
  }),
}
