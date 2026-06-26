import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { Empty } from '@/components/ui/empty'
import { registryItem } from '@/components/ui/empty/_registry'

import { docsRoot } from '../../../_helpers/docs-root'
import EmptyBackgroundStory from './EmptyBackgroundStory.vue'
import EmptyBackgroundSource from './EmptyBackgroundStory.vue?raw'
import EmptyDefaultStory from './EmptyDefaultStory.vue'
import EmptyDefaultSource from './EmptyDefaultStory.vue?raw'
import EmptyOutlineStory from './EmptyOutlineStory.vue'
import EmptyOutlineSource from './EmptyOutlineStory.vue?raw'

// TODO: AvatarStory
// TODO: AvatarGroupStory
// TODO: InputGroupStory

const meta: Meta<typeof Empty.Root> = {
  title: 'Components/UI/Empty',
  component: docsRoot(Empty.Root, 'Empty.Root'),
  subcomponents: {
    'Empty.Header': Empty.Header,
    'Empty.Media': Empty.Media,
    'Empty.Content': Empty.Content,
    'Empty.Title': Empty.Title,
    'Empty.Description': Empty.Description,
  },
  tags: ['autodocs'],

  parameters: {
    layout: 'fullscreen',
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
        code: EmptyDefaultSource,
      },
    },
  },

  render: args => ({
    components: { EmptyDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <EmptyDefaultStory v-bind="args" />
    `,
  }),
}

export const Outline: Story = {
  parameters: {
    docs: {
      source: {
        code: EmptyOutlineSource,
      },
    },
  },

  render: args => ({
    components: { EmptyOutlineStory },

    setup() {
      return { args }
    },

    template: html`
      <EmptyOutlineStory v-bind="args" />
    `,
  }),
}

export const Background: Story = {
  parameters: {
    docs: {
      source: {
        code: EmptyBackgroundSource,
      },
    },
  },

  render: args => ({
    components: { EmptyBackgroundStory },

    setup() {
      return { args }
    },

    template: html`
      <EmptyBackgroundStory v-bind="args" />
    `,
  }),
}
