import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { Drawer } from '@/components/ui/drawer'
import { registryItem } from '@/components/ui/drawer/_registry'

import { docsRoot } from '../../../_helpers/docs-root'
import DrawerDefaultStory from './DrawerDefaultStory.vue'
import DrawerDefaultSource from './DrawerDefaultStory.vue?raw'

const meta: Meta<typeof Drawer.Root> = {
  title: 'Components/UI/Drawer',
  component: docsRoot(Drawer.Root, 'Drawer.Root'),
  subcomponents: {
    'Drawer.Trigger': Drawer.Trigger,
    'Drawer.Content': Drawer.Content,
    'Drawer.Overlay': Drawer.Overlay,
    'Drawer.Header': Drawer.Header,
    'Drawer.Footer': Drawer.Footer,
    'Drawer.Title': Drawer.Title,
    'Drawer.Description': Drawer.Description,
    'Drawer.Close': Drawer.Close,
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
