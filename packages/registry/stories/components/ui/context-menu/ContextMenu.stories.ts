import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { expect, fireEvent, screen, userEvent, waitFor, within } from 'storybook/test'

import { ContextMenu } from '@/components/ui/context-menu'
import { registryItem } from '@/components/ui/context-menu/_registry'

import { boolArg, classArg } from '../../../_helpers/args'
import { docsRoot } from '../../../_helpers/docs-root'
import { renderRaw } from '../../../_helpers/render'
import ContextMenuDefaultStory from './ContextMenuDefaultStory.vue'
import ContextMenuDefaultSource from './ContextMenuDefaultStory.vue?raw'

const meta = {
  title: 'Components/UI/ContextMenu',
  component: docsRoot(ContextMenu.Root, 'ContextMenu.Root'),
  subcomponents: {
    'ContextMenu.Trigger': ContextMenu.Trigger,
    'ContextMenu.Content': ContextMenu.Content,
    'ContextMenu.Item': ContextMenu.Item,
    'ContextMenu.CheckboxItem': ContextMenu.CheckboxItem,
    'ContextMenu.RadioGroup': ContextMenu.RadioGroup,
    'ContextMenu.RadioItem': ContextMenu.RadioItem,
    'ContextMenu.Label': ContextMenu.Label,
    'ContextMenu.Separator': ContextMenu.Separator,
    'ContextMenu.Group': ContextMenu.Group,
    'ContextMenu.Sub': ContextMenu.Sub,
    'ContextMenu.SubTrigger': ContextMenu.SubTrigger,
    'ContextMenu.SubContent': ContextMenu.SubContent,
    'ContextMenu.Shortcut': ContextMenu.Shortcut,
    'ContextMenu.Positioner': ContextMenu.Positioner,
    'ContextMenu.ItemText': ContextMenu.ItemText,
    'ContextMenu.ItemIndicator': ContextMenu.ItemIndicator,
    'ContextMenu.Indicator': ContextMenu.Indicator,
    'ContextMenu.ContextTrigger': ContextMenu.ContextTrigger,
    'ContextMenu.RootProvider': ContextMenu.RootProvider,
  },
  tags: ['autodocs'],

  argTypes: {
    'anchorPoint': { control: 'object' },
    'aria-label': { control: 'text' },
    'closeOnSelect': boolArg(),
    'composite': boolArg(),
    'defaultHighlightedValue': { control: 'text' },
    'defaultOpen': boolArg('Initial open state (uncontrolled).'),
    'highlightedValue': { control: 'text' },
    'id': { control: 'text' },
    'ids': { control: 'object' },
    'loopFocus': boolArg('Loop keyboard navigation at the list ends.'),
    'navigate': { control: false },
    'open': boolArg('Controlled open state.'),
    'positioning': { control: 'object' },
    'typeahead': boolArg('Jump to an item by typing its label.'),
    'triggerValue': { control: 'text' },
    'defaultTriggerValue': { control: 'text' },
    'lazyMount': boolArg(),
    'unmountOnExit': boolArg(),
    'asChild': boolArg('Render the child element as the root (polymorphic).'),
    'class': classArg(),
  },

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },

    a11y: { test: 'error' },
  },
} satisfies Meta<typeof ContextMenu.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  ...renderRaw(ContextMenuDefaultStory, ContextMenuDefaultSource),

  // Core flow: right-click the trigger area opens the teleported menu (queried
  // via `screen`); Esc dismisses it. Open with `fireEvent.contextMenu` for a
  // deterministic contextmenu event in the test runner.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByText(/right click here/i)

    await fireEvent.contextMenu(trigger)
    const menu = await screen.findByRole('menu')
    await expect(within(menu).getByText('Back', { exact: false })).toBeInTheDocument()

    await userEvent.keyboard('{Escape}')
    await waitFor(() => expect(screen.queryByRole('menu')).toBeNull())
  },
}

export const Open: Story = {
  args: { defaultOpen: true },
  ...renderRaw(ContextMenuDefaultStory, ContextMenuDefaultSource, {
    description: 'Render the menu open in docs with `defaultOpen`; a11y runs against the open state.',
  }),
}
