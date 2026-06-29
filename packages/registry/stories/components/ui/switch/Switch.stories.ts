import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { expect, userEvent, within } from 'storybook/test'

import { Switch } from '@/components/ui/switch'
import { registryItem } from '@/components/ui/switch/_registry'

import { boolArg, classArg } from '../../../_helpers/args'
import { docsRoot } from '../../../_helpers/docs-root'
import { renderRaw } from '../../../_helpers/render'
import SwitchControlledStory from './SwitchControlledStory.vue'
import SwitchControlledSource from './SwitchControlledStory.vue?raw'
import SwitchDefaultStory from './SwitchDefaultStory.vue'
import SwitchDefaultSource from './SwitchDefaultStory.vue?raw'
import SwitchDemoStory from './SwitchDemoStory.vue'
import SwitchDemoSource from './SwitchDemoStory.vue?raw'

const meta = {
  title: 'Components/UI/Switch',
  component: docsRoot(Switch.Root, 'Switch.Root'),
  subcomponents: {
    'Switch.Control': Switch.Control,
    'Switch.Thumb': Switch.Thumb,
    'Switch.Label': Switch.Label,
    'Switch.Description': Switch.Description,
    'Switch.HiddenInput': Switch.HiddenInput,
    'Switch.RootProvider': Switch.RootProvider,
  },
  tags: ['autodocs'],

  args: {
    disabled: false,
    invalid: false,
    loading: false,
    readOnly: false,
  },

  argTypes: {
    checked: boolArg('Controlled checked state.'),
    defaultChecked: boolArg('Initial checked state when uncontrolled.'),
    disabled: boolArg(),
    invalid: boolArg(),
    loading: boolArg(),
    readOnly: boolArg(),
    required: boolArg(),
    asChild: boolArg('Render the child element as the root (polymorphic).'),
    label: { control: 'text' },
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
} satisfies Meta<typeof Switch.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  ...renderRaw(SwitchDefaultStory, SwitchDefaultSource),

  // Core flow: clicking the switch flips its checked state. Ark renders a
  // visually hidden checkbox input plus a styled control; assert the input's
  // checked state and click the control the user actually sees.
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
  ...renderRaw(SwitchDefaultStory, SwitchDefaultSource),
}

export const Disabled: Story = {
  args: { disabled: true, defaultChecked: true },
  ...renderRaw(SwitchDefaultStory, SwitchDefaultSource),
}

export const Invalid: Story = {
  args: { invalid: true },
  ...renderRaw(SwitchDefaultStory, SwitchDefaultSource),
}

export const Loading: Story = {
  args: { loading: true },
  ...renderRaw(SwitchDefaultStory, SwitchDefaultSource),
}

export const Readonly: Story = {
  args: { readOnly: true, defaultChecked: true },
  ...renderRaw(SwitchDefaultStory, SwitchDefaultSource),
}

export const Controlled: Story = {
  ...renderRaw(SwitchControlledStory, SwitchControlledSource, {
    description: 'A controlled switch (`v-model:checked`) next to an uncontrolled one (`defaultChecked`).',
  }),
}

export const Demo: Story = {
  ...renderRaw(SwitchDemoStory, SwitchDemoSource),
}
