import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { expect, userEvent, waitFor, within } from 'storybook/test'

import { Popover } from '@/components/ui/popover'
import { registryItem } from '@/components/ui/popover/_registry'

import { boolArg, selectArg } from '../../../_helpers/args'
import { docsRoot } from '../../../_helpers/docs-root'
import { renderRaw } from '../../../_helpers/render'
import PopoverDefaultStory from './PopoverDefaultStory.vue'
import PopoverDefaultSource from './PopoverDefaultStory.vue?raw'
import PopoverPlacementStory from './PopoverPlacementStory.vue'
import PopoverPlacementSource from './PopoverPlacementStory.vue?raw'

const meta = {
  title: 'Components/UI/Popover',
  component: docsRoot(Popover.Root, 'Popover.Root'),
  subcomponents: {
    'Popover.Trigger': Popover.Trigger,
    'Popover.Content': Popover.Content,
    'Popover.Anchor': Popover.Anchor,
  },
  tags: ['autodocs'],

  argTypes: {
    autoFocus: boolArg('Focus the first focusable element when opened.'),
    closeOnEscape: boolArg(),
    closeOnInteractOutside: boolArg(),
    defaultOpen: boolArg('Initial open state (uncontrolled).'),
    finalFocusEl: { control: false },
    id: { control: 'text' },
    ids: { control: 'object' },
    initialFocusEl: { control: false },
    modal: boolArg('Trap focus, block outside interaction, and lock scroll.'),
    open: boolArg('Controlled open state.'),
    persistentElements: { control: false },
    portalled: boolArg(),
    positioning: { control: 'object' },
    restoreFocus: boolArg(),
    translations: { control: 'object' },
    triggerValue: { control: 'text' },
    defaultTriggerValue: { control: 'text' },
    lazyMount: boolArg(),
    unmountOnExit: boolArg(),
    align: selectArg(['start', 'center', 'end'], 'center'),
    alignOffset: { control: 'number' },
    side: selectArg(['top', 'right', 'bottom', 'left'], 'bottom'),
    sideOffset: { control: 'number' },
  },

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },

    a11y: { test: 'error' },
  },
} satisfies Meta<typeof Popover.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  ...renderRaw(PopoverDefaultStory, PopoverDefaultSource),

  // Core portal flow: click opens the teleported panel (queried via `document`,
  // not `canvas`), Esc dismisses it, and focus returns to the trigger. Assert
  // data-state, not visibility: the panel animates in.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button', { name: /open popover/i })

    await userEvent.click(trigger)
    const content = await waitFor(() => {
      const el = document.querySelector<HTMLElement>(
        '[data-scope="popover"][data-part="content"]',
      )
      expect(el).not.toBeNull()
      expect(el).toHaveAttribute('data-state', 'open')

      return el!
    })
    await expect(within(content).getByText('Dimensions')).toBeInTheDocument()

    await userEvent.keyboard('{Escape}')
    await waitFor(() => expect(content).toHaveAttribute('data-state', 'closed'))
    await waitFor(() => expect(trigger).toHaveFocus())
  },
}

export const Open: Story = {
  args: { defaultOpen: true },
  ...renderRaw(PopoverDefaultStory, PopoverDefaultSource, {
    description: 'Render the panel open in docs with `defaultOpen`; a11y runs against the open state.',
  }),
}

export const Placement: Story = {
  name: 'Custom Placement',
  args: {
    align: 'center',
    alignOffset: 0,
    side: 'right',
    sideOffset: 4,
  },
  ...renderRaw(PopoverPlacementStory, PopoverPlacementSource, {
    description: 'Position the content with `side`/`align` (mapped to the Ark `positioning` placement).',
  }),
}
