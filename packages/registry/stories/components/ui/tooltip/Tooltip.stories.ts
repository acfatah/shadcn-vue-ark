import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { expect, userEvent, waitFor, within } from 'storybook/test'

import { Tooltip } from '@/components/ui/tooltip'
import { registryItem } from '@/components/ui/tooltip/_registry'

import { boolArg, selectArg } from '../../../_helpers/args'
import { docsRoot } from '../../../_helpers/docs-root'
import { renderRaw } from '../../../_helpers/render'
import TooltipDefaultStory from './TooltipDefaultStory.vue'
import TooltipDefaultSource from './TooltipDefaultStory.vue?raw'
import TooltipDemoStory from './TooltipDemoStory.vue'
import TooltipDemoSource from './TooltipDemoStory.vue?raw'
import TooltipPlacementStory from './TooltipPlacementStory.vue'
import TooltipPlacementSource from './TooltipPlacementStory.vue?raw'

const meta = {
  title: 'Components/UI/Tooltip',
  component: docsRoot(Tooltip.Root, 'Tooltip.Root'),
  subcomponents: {
    'Tooltip.Trigger': Tooltip.Trigger,
    'Tooltip.Content': Tooltip.Content,
    'Tooltip.Arrow': Tooltip.Arrow,
    'Tooltip.Provider': Tooltip.Provider,
  },
  tags: ['autodocs'],

  argTypes: {
    'aria-label': { control: 'text' },
    'closeDelay': { control: 'number' },
    'closeOnClick': boolArg(),
    'closeOnEscape': boolArg(),
    'closeOnPointerDown': boolArg(),
    'closeOnScroll': boolArg(),
    'defaultOpen': boolArg('Initial open state (uncontrolled).'),
    'disabled': boolArg(),
    'id': { control: 'text' },
    'ids': { control: 'object' },
    'interactive': boolArg('Keep the tooltip open while hovering its content.'),
    'open': boolArg('Controlled open state.'),
    'openDelay': { control: 'number' },
    'positioning': { control: 'object' },
    'triggerValue': { control: 'text' },
    'defaultTriggerValue': { control: 'text' },
    'lazyMount': boolArg(),
    'unmountOnExit': boolArg(),
    'align': selectArg(['start', 'center', 'end'], 'center'),
    'alignOffset': { control: 'number' },
    'hideArrow': boolArg('Hide the arrow pointer.'),
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
} satisfies Meta<typeof Tooltip.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  // Delays zeroed so the hover open/close is deterministic in the test runner.
  args: { openDelay: 0, closeDelay: 0 },
  ...renderRaw(TooltipDefaultStory, TooltipDefaultSource),

  // Core floating flow: hover opens the teleported content (queried via
  // `document`, not `canvas`), unhover closes it. Assert data-state, not
  // visibility: the panel animates, so opacity is mid-transition at assertion.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button', { name: /hover/i })

    await userEvent.hover(trigger)
    const content = await waitFor(() => {
      const el = document.querySelector<HTMLElement>(
        '[data-scope="tooltip"][data-part="content"]',
      )
      expect(el).not.toBeNull()
      expect(el).toHaveAttribute('data-state', 'open')

      return el!
    })
    await expect(content).toHaveTextContent('Add to library')

    await userEvent.unhover(trigger)
    await waitFor(() => expect(content).toHaveAttribute('data-state', 'closed'))
  },
}

export const Open: Story = {
  args: { defaultOpen: true },
  ...renderRaw(TooltipDefaultStory, TooltipDefaultSource, {
    description: 'Render the tooltip open in docs with `defaultOpen`; a11y runs against the open state.',
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
  ...renderRaw(TooltipPlacementStory, TooltipPlacementSource, {
    description: 'Position the content with `side`/`align` (mapped to the Ark `positioning` placement).',
  }),
}

export const Demo: Story = {
  args: { openDelay: 0, closeDelay: 0 },
  ...renderRaw(TooltipDemoStory, TooltipDemoSource, {
    description: 'Icon-button toolbar where each control documents itself with a tooltip.',
  }),
}
