import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { expect, screen, userEvent, waitFor, within } from 'storybook/test'

import { DropdownMenu } from '@/components/ui/dropdown-menu'
import { registryItem } from '@/components/ui/dropdown-menu/_registry'

import { boolArg, classArg, selectArg } from '../../../_helpers/args'
import { docsRoot } from '../../../_helpers/docs-root'
import { renderRaw } from '../../../_helpers/render'
import DropdownMenuDefaultStory from './DropdownMenuDefaultStory.vue'
import DropdownMenuDefaultSource from './DropdownMenuDefaultStory.vue?raw'
import DropdownMenuPlacementStory from './DropdownMenuPlacementStory.vue'
import DropdownMenuPlacementSource from './DropdownMenuPlacementStory.vue?raw'

const meta = {
  title: 'Components/UI/DropdownMenu',
  component: docsRoot(DropdownMenu.Root, 'DropdownMenu.Root'),
  subcomponents: {
    'DropdownMenu.Trigger': DropdownMenu.Trigger,
    'DropdownMenu.Content': DropdownMenu.Content,
    'DropdownMenu.Item': DropdownMenu.Item,
    'DropdownMenu.CheckboxItem': DropdownMenu.CheckboxItem,
    'DropdownMenu.RadioGroup': DropdownMenu.RadioGroup,
    'DropdownMenu.RadioItem': DropdownMenu.RadioItem,
    'DropdownMenu.Label': DropdownMenu.Label,
    'DropdownMenu.Separator': DropdownMenu.Separator,
    'DropdownMenu.Group': DropdownMenu.Group,
    'DropdownMenu.Sub': DropdownMenu.Sub,
    'DropdownMenu.SubTrigger': DropdownMenu.SubTrigger,
    'DropdownMenu.SubContent': DropdownMenu.SubContent,
    'DropdownMenu.Shortcut': DropdownMenu.Shortcut,
    'DropdownMenu.Positioner': DropdownMenu.Positioner,
    'DropdownMenu.ItemText': DropdownMenu.ItemText,
    'DropdownMenu.ItemIndicator': DropdownMenu.ItemIndicator,
    'DropdownMenu.Indicator': DropdownMenu.Indicator,
    'DropdownMenu.ContextTrigger': DropdownMenu.ContextTrigger,
    'DropdownMenu.RootProvider': DropdownMenu.RootProvider,
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
    'align': selectArg(['start', 'center', 'end'], 'start'),
    'alignOffset': { control: 'number' },
    'side': selectArg(['top', 'right', 'bottom', 'left'], 'bottom'),
    'sideOffset': { control: 'number' },
  },

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },

    a11y: { test: 'error' },
  },
} satisfies Meta<typeof DropdownMenu.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { align: 'start', side: 'bottom' },
  ...renderRaw(DropdownMenuDefaultStory, DropdownMenuDefaultSource),

  // Core menu flow: click opens the teleported menu (queried via `screen`),
  // ArrowDown rolls focus through items, Esc dismisses it. The menu unmounts
  // from the a11y tree on close (queryByRole null).
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button', { name: /^open$/i })

    await userEvent.click(trigger)
    const menu = await screen.findByRole('menu')
    await expect(within(menu).getByText('Profile')).toBeInTheDocument()

    await userEvent.keyboard('{ArrowDown}')
    await waitFor(() =>
      expect(menu.querySelector('[data-highlighted]')).not.toBeNull())

    await userEvent.keyboard('{Escape}')
    await waitFor(() => expect(screen.queryByRole('menu')).toBeNull())
  },
}

export const Open: Story = {
  args: { defaultOpen: true, align: 'start', side: 'bottom' },
  ...renderRaw(DropdownMenuDefaultStory, DropdownMenuDefaultSource, {
    description: 'Render the menu open in docs with `defaultOpen`; a11y runs against the open state.',
  }),
}

export const Placement: Story = {
  name: 'Custom Placement',
  args: {
    align: 'center',
    alignOffset: 0,
    side: 'left',
    sideOffset: 4,
  },
  ...renderRaw(DropdownMenuPlacementStory, DropdownMenuPlacementSource, {
    description: 'Position the content with `side`/`align` (mapped to the Ark `positioning` placement).',
  }),
}
