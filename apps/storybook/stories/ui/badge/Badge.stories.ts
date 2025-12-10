import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { html } from 'common-tags'

import { Badge } from '@/components/ui/badge'
import { registryItem } from '@/components/ui/spinner/_registry'
import BadgeDefaultStory from './BadgeDefaultStory.vue'
import BadgeDefaultSource from './BadgeDefaultStory.vue?raw'

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: BadgeDefaultSource,
      },
    },
  },

  render: args => ({
    components: { BadgeDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <BadgeDefaultStory v-bind="args" />
    `,
  }),
}
