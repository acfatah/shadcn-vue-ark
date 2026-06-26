import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { Sidebar } from '@/components/ui/sidebar'
import { registryItem } from '@/components/ui/sidebar/_registry'

import { docsRoot } from '../../../_helpers/docs-root'
import SidebarDefaultStory from './SidebarDefaultStory.vue'
import SidebarDefaultSource from './SidebarDefaultStory.vue?raw'

const meta: Meta<typeof Sidebar.Root> = {
  title: 'Components/UI/Sidebar',
  component: docsRoot(Sidebar.Root, 'Sidebar.Root'),
  subcomponents: {
    'Sidebar.Provider': Sidebar.Provider,
    'Sidebar.Header': Sidebar.Header,
    'Sidebar.Content': Sidebar.Content,
    'Sidebar.Footer': Sidebar.Footer,
    'Sidebar.Group': Sidebar.Group,
    'Sidebar.GroupLabel': Sidebar.GroupLabel,
    'Sidebar.GroupAction': Sidebar.GroupAction,
    'Sidebar.GroupContent': Sidebar.GroupContent,
    'Sidebar.Input': Sidebar.Input,
    'Sidebar.Inset': Sidebar.Inset,
    'Sidebar.Menu': Sidebar.Menu,
    'Sidebar.MenuItem': Sidebar.MenuItem,
    'Sidebar.MenuButton': Sidebar.MenuButton,
    'Sidebar.MenuAction': Sidebar.MenuAction,
    'Sidebar.MenuBadge': Sidebar.MenuBadge,
    'Sidebar.MenuSkeleton': Sidebar.MenuSkeleton,
    'Sidebar.MenuSub': Sidebar.MenuSub,
    'Sidebar.MenuSubItem': Sidebar.MenuSubItem,
    'Sidebar.MenuSubButton': Sidebar.MenuSubButton,
    'Sidebar.Rail': Sidebar.Rail,
    'Sidebar.Separator': Sidebar.Separator,
    'Sidebar.Trigger': Sidebar.Trigger,
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
        code: SidebarDefaultSource,
      },
    },
  },

  render: args => ({
    components: { SidebarDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <SidebarDefaultStory v-bind="args" />
    `,
  }),
}
