import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { Menubar } from '@/components/ui/menubar'
import { registryItem } from '@/components/ui/menubar/_registry'

import MenubarDefaultStory from './MenubarDefaultStory.vue'
import MenubarDefaultSource from './MenubarDefaultStory.vue?raw'

const meta = {
  title: 'Components/Menubar',
  component: Menubar.Root,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },
  },
} satisfies Meta<typeof Menubar.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: MenubarDefaultSource,
      },
    },
  },

  render: args => ({
    components: { MenubarDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <MenubarDefaultStory v-bind="args" />
    `,
  }),
}
