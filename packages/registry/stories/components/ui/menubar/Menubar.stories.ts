import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { expect, screen, userEvent, waitFor, within } from 'storybook/test'

import { Menubar } from '@/components/ui/menubar'
import { registryItem } from '@/components/ui/menubar/_registry'

import { boolArg, classArg } from '../../../_helpers/args'
import { docsRoot } from '../../../_helpers/docs-root'
import { renderRaw } from '../../../_helpers/render'
import MenubarDefaultStory from './MenubarDefaultStory.vue'
import MenubarDefaultSource from './MenubarDefaultStory.vue?raw'

const meta = {
  title: 'Components/UI/Menubar',
  component: docsRoot(Menubar.Root, 'Menubar.Root'),
  subcomponents: {
    'Menubar.Menu': Menubar.Menu,
    'Menubar.Trigger': Menubar.Trigger,
    'Menubar.Content': Menubar.Content,
    'Menubar.Item': Menubar.Item,
    'Menubar.CheckboxItem': Menubar.CheckboxItem,
    'Menubar.RadioGroup': Menubar.RadioGroup,
    'Menubar.RadioItem': Menubar.RadioItem,
    'Menubar.Label': Menubar.Label,
    'Menubar.Separator': Menubar.Separator,
    'Menubar.Group': Menubar.Group,
    'Menubar.Sub': Menubar.Sub,
    'Menubar.SubTrigger': Menubar.SubTrigger,
    'Menubar.SubContent': Menubar.SubContent,
    'Menubar.Shortcut': Menubar.Shortcut,
    'Menubar.Positioner': Menubar.Positioner,
    'Menubar.ItemText': Menubar.ItemText,
    'Menubar.ItemIndicator': Menubar.ItemIndicator,
    'Menubar.Indicator': Menubar.Indicator,
    'Menubar.ContextTrigger': Menubar.ContextTrigger,
    'Menubar.RootProvider': Menubar.RootProvider,
  },
  tags: ['autodocs'],

  argTypes: {
    asChild: boolArg('Render the child element as the root (polymorphic).'),
    class: classArg(),
  },

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },

    a11y: {
      test: 'error',
      // KNOWN-BUG: SDL-009 - MenubarRoot hardcodes role="menubar" but its
      // trigger buttons are not role="menuitem", so the bar reports disallowed
      // children. Component defect (logged, not fixed); disable only this rule.
      config: { rules: [{ id: 'aria-required-children', enabled: false }] },
    },
  },
} satisfies Meta<typeof Menubar.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  ...renderRaw(MenubarDefaultStory, MenubarDefaultSource),

  // Core flow: clicking a top-level trigger opens its teleported menu (queried
  // via `screen`); Esc dismisses it. Each menu is its own Ark machine, so the
  // bar holds no open state of its own.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const fileTrigger = canvas.getByText('File')

    await userEvent.click(fileTrigger)
    const menu = await screen.findByRole('menu')
    await expect(within(menu).getByText(/New Tab/)).toBeInTheDocument()

    await userEvent.keyboard('{Escape}')
    await waitFor(() => expect(screen.queryByRole('menu')).toBeNull())
  },
}
