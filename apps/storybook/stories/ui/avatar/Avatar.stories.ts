import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import {
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
  AvatarRoot,
} from '@/components/ui/avatar'
import { registryItem } from '@/components/ui/avatar/_registry'

import AvatarDefaultStory from './AvatarDefaultStory.vue'
import AvatarDefaultSource from './AvatarDefaultStory.vue?raw'

const meta = {
  title: 'Components/Avatar',
  component: AvatarRoot,
  subcomponents: {
    AvatarImage,
    AvatarFallback,
    AvatarGroup,
  },
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },
  },
} satisfies Meta<typeof AvatarRoot>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: AvatarDefaultSource,
      },
    },
  },

  render: args => ({
    components: { AvatarDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <AvatarDefaultStory v-bind="args" />
    `,
  }),
}
