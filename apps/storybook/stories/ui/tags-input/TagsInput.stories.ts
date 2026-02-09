import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { TagsInput } from '@/components/ui/tags-input'
import { registryItem } from '@/components/ui/tags-input/_registry'

import TagsInputDefaultStory from './TagsInputDefaultStory.vue'
import TagsInputDefaultSource from './TagsInputDefaultStory.vue?raw'

const meta = {
  title: 'Components/TagsInput',
  component: TagsInput.Root,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },
  },
} satisfies Meta<typeof TagsInput.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: TagsInputDefaultSource,
      },
    },
  },

  render: args => ({
    components: { TagsInputDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <TagsInputDefaultStory v-bind="args" />
    `,
  }),
}
