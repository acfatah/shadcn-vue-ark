import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { TagsInput } from '@/components/ui/tags-input'
import { registryItem } from '@/components/ui/tags-input/_registry'

import { docsRoot } from '../../../_helpers/docs-root'
import TagsInputDefaultStory from './TagsInputDefaultStory.vue'
import TagsInputDefaultSource from './TagsInputDefaultStory.vue?raw'
import TagsInputWithListbox from './TagsInputWithListbox.vue'
import TagsInputWithListboxSource from './TagsInputWithListbox.vue?raw'

const meta: Meta<typeof TagsInput.Root> = {
  title: 'Components/UI/TagsInput',
  component: docsRoot(TagsInput.Root, 'TagsInput.Root'),
  subcomponents: {
    'TagsInput.Input': TagsInput.Input,
    'TagsInput.Control': TagsInput.Control,
    'TagsInput.Item': TagsInput.Item,
    'TagsInput.ItemText': TagsInput.ItemText,
    'TagsInput.ItemPreview': TagsInput.ItemPreview,
    'TagsInput.ItemInput': TagsInput.ItemInput,
    'TagsInput.ItemDelete': TagsInput.ItemDelete,
  },
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

export const WithListbox: Story = {
  parameters: {
    docs: {
      source: {
        code: TagsInputWithListboxSource,
      },
    },
  },

  render: args => ({
    components: { TagsInputWithListbox },

    setup() {
      return { args }
    },

    template: html`
      <TagsInputWithListbox v-bind="args" />
    `,
  }),
}
