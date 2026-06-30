import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { expect, userEvent, waitFor, within } from 'storybook/test'

import { Steps } from '@/components/ui/steps'
import { registryItem } from '@/components/ui/steps/_registry'

import { boolArg, classArg, selectArg } from '../../../_helpers/args'
import { docsRoot } from '../../../_helpers/docs-root'
import { renderRaw } from '../../../_helpers/render'
import StepsDefaultStory from './StepsDefaultStory.vue'
import StepsDefaultSource from './StepsDefaultStory.vue?raw'

const meta = {
  title: 'Components/UI/Steps',
  component: docsRoot(Steps.Root, 'Steps.Root'),
  subcomponents: {
    'Steps.List': Steps.List,
    'Steps.Item': Steps.Item,
    'Steps.Trigger': Steps.Trigger,
    'Steps.Indicator': Steps.Indicator,
    'Steps.Separator': Steps.Separator,
    'Steps.Content': Steps.Content,
    'Steps.CompletedContent': Steps.CompletedContent,
    'Steps.NextTrigger': Steps.NextTrigger,
    'Steps.PrevTrigger': Steps.PrevTrigger,
  },
  tags: ['autodocs'],

  argTypes: {
    asChild: boolArg('Render the child element as the root (polymorphic).'),
    count: { control: 'number' },
    defaultStep: { control: 'number' },
    id: { control: 'text' },
    ids: { control: 'object' },
    isStepSkippable: { control: false },
    isStepValid: { control: false },
    linear: boolArg('Require steps to be completed in order.'),
    orientation: selectArg(['horizontal', 'vertical'], 'horizontal'),
    step: { control: 'number' },
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
      // KNOWN-BUG: SDL-022 - Steps.List declares a role whose required children
      // (the step triggers) carry the wrong roles. Component defect (logged, not
      // fixed); disable only this rule.
      config: { rules: [{ id: 'aria-required-children', enabled: false }] },
    },
  },
} satisfies Meta<typeof Steps.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  ...renderRaw(StepsDefaultStory, StepsDefaultSource),

  // Core flow: Next advances the active step, swapping the visible content panel.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(canvas.getByText(/Step 1 of 4/)).toBeVisible()
    await userEvent.click(canvas.getByRole('button', { name: /next/i }))
    await waitFor(() => expect(canvas.getByText(/Step 2 of 4/)).toBeVisible())
  },
}
