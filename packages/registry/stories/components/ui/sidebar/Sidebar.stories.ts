import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { expect, userEvent, waitFor, within } from 'storybook/test'

import { Sidebar } from '@/components/ui/sidebar'
import { registryItem } from '@/components/ui/sidebar/_registry'

import { classArg, selectArg } from '../../../_helpers/args'
import { docsRoot } from '../../../_helpers/docs-root'
import { renderRaw } from '../../../_helpers/render'
import SidebarDefaultStory from './SidebarDefaultStory.vue'
import SidebarDefaultSource from './SidebarDefaultStory.vue?raw'

const meta = {
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

  argTypes: {
    side: selectArg(['left', 'right'], 'left'),
    variant: selectArg(['sidebar', 'floating', 'inset'], 'sidebar'),
    collapsible: selectArg(['offcanvas', 'icon', 'none'], 'offcanvas'),
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
} satisfies Meta<typeof Sidebar.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  ...renderRaw(SidebarDefaultStory, SidebarDefaultSource),

  // Core flow: the trigger toggles the sidebar between expanded and collapsed
  // (reflected on the sidebar container's data-state).
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const sidebar = canvasElement.querySelector('[data-state]')!
    const before = sidebar.getAttribute('data-state')

    await userEvent.click(canvas.getByRole('button'))
    await waitFor(() =>
      expect(sidebar.getAttribute('data-state')).not.toBe(before))
  },
}
