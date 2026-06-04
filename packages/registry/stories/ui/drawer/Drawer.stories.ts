import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { Drawer } from '@/components/ui/drawer'
import { registryItem } from '@/components/ui/drawer/_registry'

import DrawerDefaultStory from './DrawerDefaultStory.vue'
import DrawerDefaultSource from './DrawerDefaultStory.vue?raw'

const meta = {
  title: 'Components/Drawer',
  component: Drawer.Root,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },
  },
} satisfies Meta<typeof Drawer.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: DrawerDefaultSource,
      },
    },
  },

  render: args => ({
    components: { DrawerDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <DrawerDefaultStory v-bind="args" />
    `,
  }),
}
