import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { Empty } from '@/components/ui/empty'
import { registryItem } from '@/components/ui/empty/_registry'

import { boolArg, classArg } from '../../../_helpers/args'
import { docsRoot } from '../../../_helpers/docs-root'
import { renderRaw } from '../../../_helpers/render'
import EmptyBackgroundStory from './EmptyBackgroundStory.vue'
import EmptyBackgroundSource from './EmptyBackgroundStory.vue?raw'
import EmptyDefaultStory from './EmptyDefaultStory.vue'
import EmptyDefaultSource from './EmptyDefaultStory.vue?raw'
import EmptyOutlineStory from './EmptyOutlineStory.vue'
import EmptyOutlineSource from './EmptyOutlineStory.vue?raw'

const meta = {
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

  args: {
    asChild: false,
  },

  argTypes: {
    asChild: boolArg('Render the child element as the root (polymorphic).'),
    class: classArg(),
  },

  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: registryItem.description,
      },
    },

    a11y: { test: 'error' },
  },
} satisfies Meta<typeof Empty.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  ...renderRaw(EmptyDefaultStory, EmptyDefaultSource),
}

export const Outline: Story = {
  ...renderRaw(EmptyOutlineStory, EmptyOutlineSource),
}

export const Background: Story = {
  ...renderRaw(EmptyBackgroundStory, EmptyBackgroundSource),
}
