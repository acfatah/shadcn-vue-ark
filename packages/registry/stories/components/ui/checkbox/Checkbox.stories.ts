import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { expect, userEvent, within } from 'storybook/test'

import { Checkbox } from '@/components/ui/checkbox'
import { registryItem } from '@/components/ui/checkbox/_registry'

import { boolArg, classArg, selectArg } from '../../../_helpers/args'
import { docsRoot } from '../../../_helpers/docs-root'
import { renderRaw } from '../../../_helpers/render'
import CheckboxDefaultStory from './CheckboxDefaultStory.vue'
import CheckboxDefaultSource from './CheckboxDefaultStory.vue?raw'
import CheckboxDemoStory from './CheckboxDemoStory.vue'
import CheckboxDemoSource from './CheckboxDemoStory.vue?raw'

const meta = {
  title: 'Components/UI/Checkbox',
  component: docsRoot(Checkbox.Root, 'Checkbox.Root'),
  subcomponents: {
    'Checkbox.Content': Checkbox.Content,
    'Checkbox.Label': Checkbox.Label,
    'Checkbox.Description': Checkbox.Description,
    'Checkbox.Control': Checkbox.Control,
    'Checkbox.Indicator': Checkbox.Indicator,
    'Checkbox.HiddenInput': Checkbox.HiddenInput,
    'Checkbox.RootProvider': Checkbox.RootProvider,
    'Checkbox.Group': Checkbox.Group,
  },
  tags: ['autodocs'],

  args: {
    disabled: false,
    invalid: false,
    loading: false,
    variant: 'default',
  },

  argTypes: {
    checked: boolArg('Controlled checked state.'),
    defaultChecked: boolArg('Initial checked state (uncontrolled).'),
    disabled: boolArg(),
    invalid: boolArg(),
    loading: boolArg(),
    readOnly: boolArg(),
    required: boolArg(),
    asChild: boolArg('Render the child element as the root (polymorphic).'),
    variant: selectArg(['default', 'card'], 'default'),
    name: { control: 'text' },
    value: { control: 'text' },
    form: { control: 'text' },
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
} satisfies Meta<typeof Checkbox.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  ...renderRaw(CheckboxDefaultStory, CheckboxDefaultSource),

  // Core flow: clicking the control toggles the hidden checkbox input. Ark
  // labels the input via aria-labelledby (not `for`), so click the control.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('checkbox', { hidden: true })
    const control = canvasElement.querySelector<HTMLElement>('[id$=":control"]')!

    await expect(input).not.toBeChecked()
    await userEvent.click(control)
    await expect(input).toBeChecked()
  },
}

export const Checked: Story = {
  args: { defaultChecked: true },
  ...renderRaw(CheckboxDefaultStory, CheckboxDefaultSource),
}

export const Disabled: Story = {
  args: { disabled: true, defaultChecked: true },
  ...renderRaw(CheckboxDefaultStory, CheckboxDefaultSource),
}

export const Invalid: Story = {
  args: { invalid: true },
  ...renderRaw(CheckboxDefaultStory, CheckboxDefaultSource),
}

export const Demo: Story = {
  ...renderRaw(CheckboxDemoStory, CheckboxDemoSource),
}
