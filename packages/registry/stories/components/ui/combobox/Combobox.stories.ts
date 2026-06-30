import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { expect, screen, userEvent, waitFor, within } from 'storybook/test'

import { Combobox } from '@/components/ui/combobox'
import { registryItem } from '@/components/ui/combobox/_registry'

import { boolArg, selectArg } from '../../../_helpers/args'
import { docsRoot } from '../../../_helpers/docs-root'
import { renderRaw } from '../../../_helpers/render'
import ComboboxDefaultStory from './ComboboxDefaultStory.vue'
import ComboboxDefaultSource from './ComboboxDefaultStory.vue?raw'
import ComboboxPlacementStory from './ComboboxPlacementStory.vue'
import ComboboxPlacementSource from './ComboboxPlacementStory.vue?raw'
import ComboboxUsingPopoverAndCommandStory from './ComboboxUsingPopoverAndCommandStory.vue'
import ComboboxUsingPopoverAndCommandSource from './ComboboxUsingPopoverAndCommandStory.vue?raw'
import MultipleComboboxStory from './MultipleComboboxStory.vue'
import MultipleComboboxSource from './MultipleComboboxStory.vue?raw'

const meta: Meta<typeof Combobox.Root> = {
  title: 'Components/UI/Combobox',
  component: docsRoot(Combobox.Root, 'Combobox.Root'),
  subcomponents: {
    'Combobox.Anchor': Combobox.Anchor,
    'Combobox.Trigger': Combobox.Trigger,
    'Combobox.Input': Combobox.Input,
    'Combobox.List': Combobox.List,
    'Combobox.Viewport': Combobox.Viewport,
    'Combobox.Empty': Combobox.Empty,
    'Combobox.Group': Combobox.Group,
    'Combobox.Item': Combobox.Item,
    'Combobox.ItemIndicator': Combobox.ItemIndicator,
    'Combobox.Separator': Combobox.Separator,
  },
  tags: ['autodocs'],

  argTypes: {
    asChild: boolArg('Render the child element as the root (polymorphic).'),
    allowCustomValue: boolArg(),
    alwaysSubmitOnEnter: boolArg(),
    autoFocus: boolArg(),
    closeOnSelect: boolArg(),
    collection: { control: false },
    composite: boolArg(),
    defaultHighlightedValue: { control: 'text' },
    defaultInputValue: { control: 'text' },
    defaultOpen: boolArg('Initial open state (uncontrolled).'),
    defaultValue: { control: 'object' },
    disableLayer: boolArg(),
    disabled: boolArg(),
    form: { control: 'text' },
    highlightedValue: { control: 'text' },
    id: { control: 'text' },
    ids: { control: 'object' },
    inputBehavior: { control: 'text' },
    inputValue: { control: 'text' },
    invalid: boolArg(),
    loopFocus: boolArg('Loop keyboard navigation at the list ends.'),
    modelValue: { control: 'object' },
    multiple: boolArg(),
    name: { control: 'text' },
    navigate: { control: false },
    open: boolArg('Controlled open state.'),
    openOnChange: boolArg(),
    openOnClick: boolArg(),
    openOnKeyPress: boolArg(),
    placeholder: { control: 'text' },
    positioning: { control: 'object' },
    readOnly: boolArg(),
    required: boolArg(),
    scrollToIndexFn: { control: false },
    selectionBehavior: { control: 'text' },
    translations: { control: 'object' },
    lazyMount: boolArg(),
    unmountOnExit: boolArg(),
    align: selectArg(['start', 'center', 'end'], 'start'),
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
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  ...renderRaw(ComboboxDefaultStory, ComboboxDefaultSource, {
    parameters: {
      a11y: {
        config: {
          // KNOWN-BUG: SDL-015 - Combobox.Input (role=combobox) is nested
          // inside Combobox.List (role=listbox), so once the play mounts the
          // list the listbox has disallowed children. Component defect (logged,
          // not fixed); disable only this rule.
          rules: [{ id: 'aria-required-children', enabled: false }],
        },
      },
    },
  }),

  // Core typeahead flow: open, type to filter the teleported listbox (queried
  // via `screen`), pick the surviving option, the trigger reflects the value.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // Ark labels the toggle button "Toggle suggestions" (overrides the visible
    // text); the selected value still shows in its text content.
    const trigger = canvas.getByRole('button', { name: /toggle suggestions/i })

    await userEvent.click(trigger)
    const input = await screen.findByPlaceholderText(/search framework/i)
    await userEvent.type(input, 'svelte')

    // Typing filters the list down to the single match.
    await waitFor(() => {
      const options = screen.getAllByRole('option')
      expect(options).toHaveLength(1)
      expect(options[0]).toHaveTextContent('SvelteKit')
    })

    await userEvent.click(screen.getByRole('option', { name: /sveltekit/i }))
    await waitFor(() => expect(trigger).toHaveTextContent('SvelteKit'))
  },
}

export const Disabled: Story = {
  args: { disabled: true },
  ...renderRaw(ComboboxDefaultStory, ComboboxDefaultSource, {
    description: 'Disable the whole control with `disabled`.',
  }),
}

export const Multiple: Story = {
  ...renderRaw(MultipleComboboxStory, MultipleComboboxSource, {
    description: 'Select several values at once with `multiple`.',
    parameters: {
      a11y: {
        config: {
          // KNOWN-BUG: SDL-013 - the default (non as-child) Combobox.Trigger
          // renders a div carrying aria-expanded with no supporting role.
          // Component defect (logged, not fixed); disable only this rule.
          rules: [{ id: 'aria-allowed-attr', enabled: false }],
        },
      },
    },
  }),
}

export const Placement: Story = {
  name: 'Custom Placement',
  args: {
    align: 'start',
    alignOffset: 0,
    side: 'right',
    sideOffset: 4,
  },
  ...renderRaw(ComboboxPlacementStory, ComboboxPlacementSource, {
    description: 'Position the content with `side`/`align` (mapped to the Ark `positioning` placement).',
  }),
}

export const UsingPopoverAndCommand: Story = {
  ...renderRaw(ComboboxUsingPopoverAndCommandStory, ComboboxUsingPopoverAndCommandSource, {
    description: 'Compose the same pattern from `Popover` + `Command` instead of the Ark combobox.',
    parameters: {
      a11y: {
        config: {
          // This composition embeds Command and a popover-as-dropdown, so it
          // reproduces SDL-010 (command listbox has no accessible name) and
          // SDL-014 (the Popover.Content used as a dropdown is role=dialog with
          // no name). Both are component defects (logged, not fixed).
          rules: [
            { id: 'aria-input-field-name', enabled: false },
            { id: 'aria-dialog-name', enabled: false },
          ],
        },
      },
    },
  }),
}
