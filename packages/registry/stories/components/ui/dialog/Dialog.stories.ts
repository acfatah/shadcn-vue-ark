import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { expect, screen, userEvent, waitFor, within } from 'storybook/test'

import { Dialog } from '@/components/ui/dialog'
import { registryItem } from '@/components/ui/dialog/_registry'

import { boolArg, selectArg } from '../../../_helpers/args'
import { docsRoot } from '../../../_helpers/docs-root'
import { renderRaw } from '../../../_helpers/render'
import DialogDefaultStory from './DialogDefaultStory.vue'
import DialogDefaultSource from './DialogDefaultStory.vue?raw'
import DialogDemoStory from './DialogDemoStory.vue'
import DialogDemoSource from './DialogDemoStory.vue?raw'
import DialogFormStory from './DialogFormStory.vue'
import DialogFormSource from './DialogFormStory.vue?raw'
import DialogScrollableStory from './DialogScrollableStory.vue'
import DialogScrollableSource from './DialogScrollableStory.vue?raw'

const meta = {
  title: 'Components/UI/Dialog',
  component: docsRoot(Dialog.Root, 'Dialog.Root'),
  subcomponents: {
    'Dialog.Trigger': Dialog.Trigger,
    'Dialog.Content': Dialog.Content,
    'Dialog.ScrollContent': Dialog.ScrollContent,
    'Dialog.Overlay': Dialog.Overlay,
    'Dialog.Header': Dialog.Header,
    'Dialog.Footer': Dialog.Footer,
    'Dialog.Title': Dialog.Title,
    'Dialog.Description': Dialog.Description,
    'Dialog.Close': Dialog.Close,
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
} satisfies Meta<typeof Dialog.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  ...renderRaw(DialogDefaultStory, DialogDefaultSource),

  // Core portal flow: trigger opens, the teleported panel renders (queried via
  // `screen`, not `canvas`), Esc dismisses it, and focus returns to the trigger.
  // Assert on data-state, not visibility: the panel animates in (fade-in-0), so
  // opacity is mid-transition at assertion time.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button', { name: /open dialog/i })

    await userEvent.click(trigger)
    const dialog = await screen.findByRole('dialog')
    await expect(dialog).toHaveAttribute('data-state', 'open')
    await expect(within(dialog).getByText('Edit profile')).toBeInTheDocument()

    await userEvent.keyboard('{Escape}')
    await waitFor(() => expect(dialog).toHaveAttribute('data-state', 'closed'))
    await waitFor(() => expect(trigger).toHaveFocus())
  },
}

export const Open: Story = {
  args: { defaultOpen: true },
  ...renderRaw(DialogDefaultStory, DialogDefaultSource, {
    description: 'Render the panel open in docs with `defaultOpen`; a11y runs against the open state.',
  }),
}

export const WithForm: Story = {
  ...renderRaw(DialogFormStory, DialogFormSource),
}

export const ScrollableContent: Story = {
  ...renderRaw(DialogScrollableStory, DialogScrollableSource, {
    description: 'Use `Dialog.ScrollContent` when the body can exceed the viewport height.',
  }),
}

export const Demo: Story = {
  ...renderRaw(DialogDemoStory, DialogDemoSource),
}
