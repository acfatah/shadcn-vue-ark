import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { Combobox } from '@/components/ui/combobox'
import { registryItem } from '@/components/ui/combobox/_registry'

import { docsRoot } from '../../../_helpers/docs-root'
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
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
    },
    alignOffset: { control: 'number' },

    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
    },
    sideOffset: { control: 'number' },
  },

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: ComboboxDefaultSource,
      },
    },
  },

  render: args => ({
    components: { ComboboxDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <ComboboxDefaultStory v-bind="args" />
    `,
  }),
}

export const Multiple: Story = {
  parameters: {
    docs: {
      source: {
        code: MultipleComboboxSource,
      },
    },
  },

  render: args => ({
    components: { MultipleComboboxStory },

    setup() {
      return { args }
    },

    template: html`
      <MultipleComboboxStory v-bind="args" />
    `,
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
  parameters: {
    docs: {
      source: {
        code: ComboboxPlacementSource,
      },
    },
  },

  render: args => ({
    components: { ComboboxPlacementStory },

    setup() {
      return { args }
    },

    template: html`
      <ComboboxPlacementStory v-bind="args" />
    `,
  }),
}

export const UsingPopoverAndCommand: Story = {
  parameters: {
    docs: {
      source: {
        code: ComboboxUsingPopoverAndCommandSource,
      },
    },
  },

  render: args => ({
    components: { ComboboxUsingPopoverAndCommandStory },

    setup() {
      return { args }
    },

    template: html`
      <ComboboxUsingPopoverAndCommandStory v-bind="args" />
    `,
  }),
}
