import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import {
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuRoot,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@/components/ui/navigation-menu'
import { registryItem } from '@/components/ui/navigation-menu/_registry'

import NavigationMenuDefaultStory from './NavigationMenuDefaultStory.vue'
import NavigationMenuDefaultSource from './NavigationMenuDefaultStory.vue?raw'

const meta = {
  title: 'Components/NavigationMenu',
  component: NavigationMenuRoot,
  subcomponents: {
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuContent,
    NavigationMenuLink,
    NavigationMenuIndicator,
    NavigationMenuViewport,
  },
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
      story: {
        inline: false,
        height: '40dvh',
      },
    },
  },
} satisfies Meta<typeof NavigationMenuRoot>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: NavigationMenuDefaultSource,
      },
    },
  },

  render: args => ({
    components: { NavigationMenuDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <NavigationMenuDefaultStory v-bind="args" />
    `,
  }),
}
