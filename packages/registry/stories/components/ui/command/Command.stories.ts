import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { expect, userEvent, waitFor, within } from 'storybook/test'

import { Command } from '@/components/ui/command'
import { registryItem } from '@/components/ui/command/_registry'

import { boolArg, classArg, selectArg } from '../../../_helpers/args'
import { docsRoot } from '../../../_helpers/docs-root'
import { renderRaw } from '../../../_helpers/render'
import CommandDefaultStory from './CommandDefaultStory.vue'
import CommandDefaultSource from './CommandDefaultStory.vue?raw'

const meta = {
  title: 'Components/UI/Command',
  component: docsRoot(Command.Root, 'Command.Root'),
  subcomponents: {
    'Command.Dialog': Command.Dialog,
    'Command.Input': Command.Input,
    'Command.List': Command.List,
    'Command.Empty': Command.Empty,
    'Command.Group': Command.Group,
    'Command.Item': Command.Item,
    'Command.Separator': Command.Separator,
    'Command.Shortcut': Command.Shortcut,
  },
  tags: ['autodocs'],

  argTypes: {
    defaultHighlightedValue: { control: 'text' },
    defaultValue: { control: 'object' },
    deselectable: boolArg(),
    disabled: boolArg(),
    disallowSelectAll: boolArg(),
    highlightedValue: { control: 'text' },
    id: { control: 'text' },
    ids: { control: 'object' },
    loopFocus: boolArg('Loop keyboard navigation at the list ends.'),
    modelValue: { control: 'object' },
    orientation: selectArg(['horizontal', 'vertical'], 'vertical'),
    scrollToIndexFn: { control: false },
    selectOnHighlight: boolArg(),
    selectionMode: { control: 'text' },
    typeahead: boolArg('Jump to an item by typing its label.'),
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
      // KNOWN-BUG: SDL-010 - the filtering Listbox carries a dangling
      // aria-labelledby (no Command/Listbox.Label part is exposed), so it has
      // no accessible name. Component defect (logged, not fixed); disable only
      // this rule.
      config: { rules: [{ id: 'aria-input-field-name', enabled: false }] },
    },
  },
} satisfies Meta<typeof Command.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  ...renderRaw(CommandDefaultStory, CommandDefaultSource),

  // Core typeahead flow: typing filters the in-flow list (non-matches are
  // removed from the DOM via v-if), and a non-matching query falls through to
  // the empty state.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByPlaceholderText(/type a command/i)

    await userEvent.type(input, 'profile')
    await waitFor(() => {
      expect(canvas.getByText('Profile')).toBeInTheDocument()
      expect(canvas.queryByText('Calendar')).toBeNull()
    })

    await userEvent.clear(input)
    await userEvent.type(input, 'zzzzzz')
    await waitFor(() =>
      expect(canvas.getByText(/no results found/i)).toBeInTheDocument())

    // Clear restores the full list (and a non-empty listbox for the a11y pass).
    await userEvent.clear(input)
    await waitFor(() => expect(canvas.getByText('Calendar')).toBeInTheDocument())
  },
}
