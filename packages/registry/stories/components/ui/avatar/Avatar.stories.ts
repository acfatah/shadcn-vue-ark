import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { Avatar } from '@/components/ui/avatar'
import { registryItem } from '@/components/ui/avatar/_registry'

import { docsRoot } from '../../../_helpers/docs-root'
import AvatarDefaultStory from './AvatarDefaultStory.vue'
import AvatarDefaultSource from './AvatarDefaultStory.vue?raw'

const meta: Meta<typeof Avatar.Root> = {
  title: 'Components/UI/Avatar',
  component: docsRoot(Avatar.Root, 'Avatar.Root'),
  subcomponents: {
    'Avatar.Group': Avatar.Group,
    'Avatar.Image': Avatar.Image,
    'Avatar.Fallback': Avatar.Fallback,
  },
  tags: ['autodocs'],

  argTypes: {
    shape: {
      control: 'inline-radio',
      options: ['round', 'square'],
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg', 'xl'],
    },
  },

  args: {
    shape: 'round',
    size: 'md',
  },

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
