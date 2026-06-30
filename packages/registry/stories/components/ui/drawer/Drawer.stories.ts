import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { expect, screen, userEvent, waitFor, within } from 'storybook/test'

import { Drawer } from '@/components/ui/drawer'
import { registryItem } from '@/components/ui/drawer/_registry'

import { boolArg, selectArg } from '../../../_helpers/args'
import { docsRoot } from '../../../_helpers/docs-root'
import { renderRaw } from '../../../_helpers/render'
import DrawerDefaultStory from './DrawerDefaultStory.vue'
import DrawerDefaultSource from './DrawerDefaultStory.vue?raw'

const meta = {
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

  args: {
    defaultOpen: false,
    modal: true,
    role: 'dialog',
  },

  argTypes: {
    'open': boolArg('Controlled open state.'),
    'defaultOpen': boolArg('Initial open state (uncontrolled).'),
    'modal': boolArg(),
    'closeOnEscape': boolArg(),
    'closeOnInteractOutside': boolArg(),
    'preventScroll': boolArg(),
    'restoreFocus': boolArg(),
    'trapFocus': boolArg(),
    'lazyMount': boolArg(),
    'unmountOnExit': boolArg(),
    'role': selectArg(['dialog', 'alertdialog'], 'dialog'),
    'aria-label': { control: 'text' },
    'id': { control: 'text' },
    'ids': { control: 'object' },
    'triggerValue': { control: 'text' },
    'defaultTriggerValue': { control: 'text' },
    'initialFocusEl': { control: false },
    'finalFocusEl': { control: false },
    'persistentElements': { control: false },
  },

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },

    a11y: { test: 'error' },
  },
} satisfies Meta<typeof Drawer.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  ...renderRaw(DrawerDefaultStory, DrawerDefaultSource),

  // Core portal flow: trigger opens, the teleported panel renders (queried via
  // `screen`), Esc dismisses it. Assert data-state, not visibility: the panel
  // animates in.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button', { name: /open drawer/i })

    await userEvent.click(trigger)
    const dialog = await screen.findByRole('dialog')
    await expect(dialog).toHaveAttribute('data-state', 'open')
    await expect(within(dialog).getByText('Move Goal')).toBeInTheDocument()

    await userEvent.keyboard('{Escape}')
    await waitFor(() => expect(dialog).toHaveAttribute('data-state', 'closed'))
  },
}

export const Open: Story = {
  args: { defaultOpen: true },
  ...renderRaw(DrawerDefaultStory, DrawerDefaultSource, {
    description: 'Render the panel open in docs with `defaultOpen`; a11y runs against the open state.',
  }),
}
