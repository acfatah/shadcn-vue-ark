import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { expect, userEvent, within } from 'storybook/test'

import { Accordion } from '@/components/ui/accordion'
import { registryItem } from '@/components/ui/accordion/_registry'

import { boolArg, classArg, selectArg } from '../../../_helpers/args'
import { docsRoot } from '../../../_helpers/docs-root'
import { renderRaw } from '../../../_helpers/render'
import AccordionDefaultStory from './AccordionDefaultStory.vue'
import AccordionDefaultSource from './AccordionDefaultStory.vue?raw'

const meta = {
  title: 'Components/UI/Accordion',
  component: docsRoot(Accordion.Root, 'Accordion.Root'),
  subcomponents: {
    'Accordion.Item': Accordion.Item,
    'Accordion.Trigger': Accordion.Trigger,
    'Accordion.Content': Accordion.Content,
  },
  tags: ['autodocs'],

  args: {
    disabled: false,
  },

  argTypes: {
    collapsible: boolArg('Allow an expanded item to collapse again.'),
    multiple: boolArg('Allow multiple items expanded at once.'),
    disabled: boolArg(),
    lazyMount: boolArg(),
    unmountOnExit: boolArg(),
    asChild: boolArg('Render the child element as the root (polymorphic).'),
    orientation: selectArg(['vertical', 'horizontal'], 'vertical'),
    defaultValue: { control: 'object' },
    modelValue: { control: 'object' },
    id: { control: 'text' },
    ids: { control: 'object' },
    class: classArg(),
  },

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },

    a11y: { test: 'error' },
  },
} satisfies Meta<typeof Accordion.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  ...renderRaw(AccordionDefaultStory, AccordionDefaultSource),

  // Core flow: clicking a collapsed trigger expands its item.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button', { name: /shipping details/i })

    await expect(trigger).toHaveAttribute('data-state', 'closed')
    await userEvent.click(trigger)
    await expect(trigger).toHaveAttribute('data-state', 'open')
  },
}

export const Multiple: Story = {
  args: { multiple: true },
  ...renderRaw(AccordionDefaultStory, AccordionDefaultSource, {
    description: 'With `multiple`, more than one item can be expanded at once.',
  }),
}

export const Disabled: Story = {
  args: { disabled: true },
  ...renderRaw(AccordionDefaultStory, AccordionDefaultSource),
}
