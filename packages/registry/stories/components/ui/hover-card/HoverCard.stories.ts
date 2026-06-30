import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { expect, userEvent, waitFor, within } from 'storybook/test'

import { HoverCard } from '@/components/ui/hover-card'
import { registryItem } from '@/components/ui/hover-card/_registry'

import { boolArg, selectArg } from '../../../_helpers/args'
import { docsRoot } from '../../../_helpers/docs-root'
import { renderRaw } from '../../../_helpers/render'
import HoverCardDefaultStory from './HoverCardDefaultStory.vue'
import HoverCardDefaultSource from './HoverCardDefaultStory.vue?raw'
import HoverCardPlacementStory from './HoverCardPlacementStory.vue'
import HoverCardPlacementSource from './HoverCardPlacementStory.vue?raw'

const meta = {
  title: 'Components/UI/HoverCard',
  component: docsRoot(HoverCard.Root, 'HoverCard.Root'),
  subcomponents: {
    'HoverCard.Trigger': HoverCard.Trigger,
    'HoverCard.Content': HoverCard.Content,
  },
  tags: ['autodocs'],

  argTypes: {
    closeDelay: { control: 'number' },
    defaultOpen: boolArg('Initial open state (uncontrolled).'),
    disabled: boolArg(),
    id: { control: 'text' },
    ids: { control: 'object' },
    open: boolArg('Controlled open state.'),
    openDelay: { control: 'number' },
    positioning: { control: 'object' },
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
} satisfies Meta<typeof HoverCard.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  // Delays zeroed so the hover open/close is deterministic in the test runner.
  args: { openDelay: 0, closeDelay: 0 },
  ...renderRaw(HoverCardDefaultStory, HoverCardDefaultSource),

  // Core floating flow: hover opens the teleported content (queried via
  // `document`, not `canvas`), unhover closes it. Assert data-state, not
  // visibility: the panel animates.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button', { name: /@nuxt/i })

    await userEvent.hover(trigger)
    const content = await waitFor(() => {
      const el = document.querySelector<HTMLElement>(
        '[data-scope="hover-card"][data-part="content"]',
      )
      expect(el).not.toBeNull()
      expect(el).toHaveAttribute('data-state', 'open')

      return el!
    })
    await expect(within(content).getByText(/Vue Framework/i)).toBeInTheDocument()

    await userEvent.unhover(trigger)
    await waitFor(() => expect(content).toHaveAttribute('data-state', 'closed'))
  },
}

export const Open: Story = {
  args: { defaultOpen: true },
  ...renderRaw(HoverCardDefaultStory, HoverCardDefaultSource, {
    description: 'Render the card open in docs with `defaultOpen`; a11y runs against the open state.',
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
  ...renderRaw(HoverCardPlacementStory, HoverCardPlacementSource, {
    description: 'Position the content with `side`/`align` (mapped to the Ark `positioning` placement).',
  }),
}
