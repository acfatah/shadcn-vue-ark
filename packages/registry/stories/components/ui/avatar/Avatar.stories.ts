import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { Avatar } from '@/components/ui/avatar'
import { registryItem } from '@/components/ui/avatar/_registry'

import { boolArg, classArg, selectArg } from '../../../_helpers/args'
import { docsRoot } from '../../../_helpers/docs-root'
import { renderRaw } from '../../../_helpers/render'
import AvatarDefaultStory from './AvatarDefaultStory.vue'
import AvatarDefaultSource from './AvatarDefaultStory.vue?raw'
import AvatarDemoStory from './AvatarDemoStory.vue'
import AvatarDemoSource from './AvatarDemoStory.vue?raw'
import AvatarSizesStory from './AvatarSizesStory.vue'
import AvatarSizesSource from './AvatarSizesStory.vue?raw'

const meta = {
  title: 'Components/UI/Avatar',
  component: docsRoot(Avatar.Root, 'Avatar.Root'),
  subcomponents: {
    'Avatar.Group': Avatar.Group,
    'Avatar.Image': Avatar.Image,
    'Avatar.Fallback': Avatar.Fallback,
  },
  tags: ['autodocs'],

  args: {
    shape: 'round',
    size: 'md',
    asChild: false,
  },

  argTypes: {
    shape: selectArg(['round', 'square'], 'round'),
    size: selectArg(['sm', 'md', 'lg', 'xl'], 'md'),
    asChild: boolArg('Render the child element as the root (polymorphic).'),
    id: { control: 'text' },
    ids: { control: 'object' },
    class: classArg(),
  },

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },

    a11y: { test: 'error' },
  },
} satisfies Meta<typeof Avatar.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  ...renderRaw(AvatarDefaultStory, AvatarDefaultSource),
}

export const Sizes: Story = {
  ...renderRaw(AvatarSizesStory, AvatarSizesSource, {
    parameters: { controls: { exclude: ['size'] } },
  }),
}

export const Demo: Story = {
  ...renderRaw(AvatarDemoStory, AvatarDemoSource),
}
