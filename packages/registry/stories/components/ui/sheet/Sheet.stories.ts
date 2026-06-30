import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { expect, screen, userEvent, waitFor, within } from 'storybook/test'

import { Sheet } from '@/components/ui/sheet'
import { registryItem } from '@/components/ui/sheet/_registry'

import { boolArg, selectArg } from '../../../_helpers/args'
import { docsRoot } from '../../../_helpers/docs-root'
import { renderRaw } from '../../../_helpers/render'
import SheetDefaultStory from './SheetDefaultStory.vue'
import SheetDefaultSource from './SheetDefaultStory.vue?raw'

const meta = {
  title: 'Components/UI/Sheet',
  component: docsRoot(Sheet.Root, 'Sheet.Root'),
  subcomponents: {
    'Sheet.Trigger': Sheet.Trigger,
    'Sheet.Content': Sheet.Content,
    'Sheet.Overlay': Sheet.Overlay,
    'Sheet.Header': Sheet.Header,
    'Sheet.Footer': Sheet.Footer,
    'Sheet.Title': Sheet.Title,
    'Sheet.Description': Sheet.Description,
    'Sheet.Close': Sheet.Close,
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
      height: '300px',
      description: {
        component: registryItem.description,
      },
    },

    a11y: { test: 'error' },
  },
} satisfies Meta<typeof Sheet.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  ...renderRaw(SheetDefaultStory, SheetDefaultSource),

  // Core portal flow: trigger opens, the teleported panel renders (queried via
  // `screen`), Esc dismisses it. Assert data-state, not visibility: the panel
  // animates in.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button', { name: /^open$/i })

    await userEvent.click(trigger)
    const dialog = await screen.findByRole('dialog')
    await expect(dialog).toHaveAttribute('data-state', 'open')
    await expect(within(dialog).getByText('Edit profile')).toBeInTheDocument()

    await userEvent.keyboard('{Escape}')
    await waitFor(() => expect(dialog).toHaveAttribute('data-state', 'closed'))
  },
}

export const Open: Story = {
  args: { defaultOpen: true },
  ...renderRaw(SheetDefaultStory, SheetDefaultSource, {
    description: 'Render the panel open in docs with `defaultOpen`; a11y runs against the open state.',
  }),
}
