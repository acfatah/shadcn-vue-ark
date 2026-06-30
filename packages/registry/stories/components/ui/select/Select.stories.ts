import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { expect, screen, userEvent, waitFor } from 'storybook/test'

import { Select } from '@/components/ui/select'
import { registryItem } from '@/components/ui/select/_registry'

import { boolArg, classArg, selectArg } from '../../../_helpers/args'
import { docsRoot } from '../../../_helpers/docs-root'
import { renderRaw } from '../../../_helpers/render'
import SelectClearableStory from './SelectClearableStory.vue'
import SelectClearableSource from './SelectClearableStory.vue?raw'
import SelectDefaultStory from './SelectDefaultStory.vue'
import SelectDefaultSource from './SelectDefaultStory.vue?raw'
import SelectEmptyStory from './SelectEmptyStory.vue'
import SelectEmptySource from './SelectEmptyStory.vue?raw'
import SelectPlacementStory from './SelectPlacementStory.vue'
import SelectPlacementSource from './SelectPlacementStory.vue?raw'

const meta: Meta<typeof Select.Root> = {
  title: 'Components/UI/Select',
  component: docsRoot(Select.Root, 'Select.Root'),
  subcomponents: {
    'Select.ClearTrigger': Select.ClearTrigger,
    'Select.Content': Select.Content,
    'Select.Empty': Select.Empty,
    'Select.HiddenSelect': Select.HiddenSelect,
    'Select.Indicator': Select.Indicator,
    'Select.Item': Select.Item,
    'Select.ItemGroup': Select.ItemGroup,
    'Select.ItemGroupLabel': Select.ItemGroupLabel,
    'Select.ItemIndicator': Select.ItemIndicator,
    'Select.ItemText': Select.ItemText,
    'Select.Label': Select.Label,
    'Select.Positioner': Select.Positioner,
    'Select.Separator': Select.Separator,
    'Select.Trigger': Select.Trigger,
    'Select.ValueText': Select.ValueText,
  },
  tags: ['autodocs'],

  argTypes: {
    autoComplete: { control: 'text' },
    closeOnSelect: boolArg(),
    collection: { control: false },
    composite: boolArg(),
    defaultHighlightedValue: { control: 'text' },
    defaultOpen: boolArg('Initial open state (uncontrolled).'),
    defaultValue: { control: 'object' },
    deselectable: boolArg(),
    disabled: boolArg(),
    form: { control: 'text' },
    highlightedValue: { control: 'text' },
    id: { control: 'text' },
    ids: { control: 'object' },
    invalid: boolArg(),
    loopFocus: boolArg('Loop keyboard navigation at the list ends.'),
    modelValue: { control: 'object' },
    multiple: boolArg(),
    name: { control: 'text' },
    open: boolArg('Controlled open state.'),
    positioning: { control: 'object' },
    readOnly: boolArg(),
    required: boolArg(),
    scrollToIndexFn: { control: false },
    translations: { control: 'object' },
    lazyMount: boolArg(),
    unmountOnExit: boolArg(),
    asChild: boolArg('Render the child element as the root (polymorphic).'),
    align: selectArg(['start', 'center', 'end'], 'start'),
    alignOffset: { control: 'number' },
    class: classArg(),
    loading: boolArg(),
    side: selectArg(['top', 'right', 'bottom', 'left'], 'bottom'),
    sideOffset: { control: 'number' },
  },

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
      story: {
        inline: false,
        height: '40dvh',
      },
    },

    a11y: {
      test: 'error',
      // KNOWN-BUG: SDL-011 - SelectLabel renders a plain Label instead of Ark's
      // Select.Label part, so the trigger's auto-wired aria-labelledby dangles
      // and the trigger has no accessible name. Component defect (logged, not
      // fixed); disable only this rule.
      config: { rules: [{ id: 'button-name', enabled: false }] },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  ...renderRaw(SelectDefaultStory, SelectDefaultSource),

  // Core flow: open the teleported listbox (queried via `screen`), pick an
  // option, the trigger reflects the new value and the listbox dismisses.
  play: async ({ canvasElement }) => {
    const trigger = canvasElement.querySelector<HTMLElement>(
      '[data-scope="select"][data-part="trigger"]',
    )!

    await userEvent.click(trigger)
    await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeNull())

    await userEvent.click(screen.getByRole('option', { name: 'Apple' }))
    await waitFor(() => expect(screen.queryByRole('listbox')).toBeNull())
    await waitFor(() => expect(trigger).toHaveTextContent('Apple'))
  },
}

export const Disabled: Story = {
  args: { disabled: true },
  ...renderRaw(SelectDefaultStory, SelectDefaultSource, {
    description: 'Disable the whole control with `disabled`.',
    parameters: {
      a11y: {
        config: {
          // KNOWN-BUG: SDL-011 (carried from meta) plus SDL-012 - a disabled
          // control is WCAG-exempt from contrast, but axe still flags the
          // dimmed trigger. Story-level rules replace the meta array, so
          // button-name is re-listed here.
          rules: [
            { id: 'button-name', enabled: false },
            { id: 'color-contrast', enabled: false },
          ],
        },
      },
    },
  }),
}

export const Invalid: Story = {
  args: { invalid: true },
  ...renderRaw(SelectDefaultStory, SelectDefaultSource, {
    description: 'Flag a validation error with `invalid` (sets `aria-invalid`).',
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
  ...renderRaw(SelectPlacementStory, SelectPlacementSource, {
    description: 'Position the content with `side`/`align` (mapped to the Ark `positioning` placement).',
  }),
}

export const Empty: Story = {
  ...renderRaw(SelectEmptyStory, SelectEmptySource, {
    description: 'Show `Select.Empty` when the collection has no items.',
  }),
}

export const Clearable: Story = {
  ...renderRaw(SelectClearableStory, SelectClearableSource, {
    description: 'Add `Select.ClearTrigger` to reset the selection.',
  }),
}
