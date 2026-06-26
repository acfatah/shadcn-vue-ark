import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { NavigationMenu } from '@/components/ui/navigation-menu'
import { registryItem } from '@/components/ui/navigation-menu/_registry'

import { docsRoot } from '../../../_helpers/docs-root'
import NavigationMenuDefaultStory from './NavigationMenuDefaultStory.vue'
import NavigationMenuDefaultSource from './NavigationMenuDefaultStory.vue?raw'

const meta: Meta<typeof NavigationMenu.Root> = {
  title: 'Components/UI/NavigationMenu',
  component: docsRoot(NavigationMenu.Root, 'NavigationMenu.Root'),
  subcomponents: {
    'NavigationMenu.List': NavigationMenu.List,
    'NavigationMenu.Item': NavigationMenu.Item,
    'NavigationMenu.Trigger': NavigationMenu.Trigger,
    'NavigationMenu.Content': NavigationMenu.Content,
    'NavigationMenu.Link': NavigationMenu.Link,
    'NavigationMenu.Indicator': NavigationMenu.Indicator,
    'NavigationMenu.Viewport': NavigationMenu.Viewport,
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
}

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
