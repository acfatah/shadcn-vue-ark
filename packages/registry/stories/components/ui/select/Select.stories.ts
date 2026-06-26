import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { Select } from '@/components/ui/select'
import { registryItem } from '@/components/ui/select/_registry'

import { docsRoot } from '../../../_helpers/docs-root'
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
  },

  args: {
    disabled: false,
    invalid: false,
    // @ts-expect-error TS2353
    position: 'item-aligned',
  },

  argTypes: {
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
    },
    alignOffset: { control: 'number' },
    disabled: { control: 'boolean' },
    // @ts-expect-error TS2353
    position: {
      control: { type: 'select' },
      options: ['item-aligned', 'popper'],
    },

    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
    },
    sideOffset: { control: 'number' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: SelectDefaultSource,
      },
    },
  },

  render: args => ({
    components: { SelectDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <SelectDefaultStory v-bind="args" />
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
        code: SelectPlacementSource,
      },
    },
  },

  render: args => ({
    components: { SelectPlacementStory },

    setup() {
      return { args }
    },

    template: html`
      <SelectPlacementStory v-bind="args" />
    `,
  }),
}

export const Empty: Story = {
  parameters: {
    docs: {
      source: {
        code: SelectEmptySource,
      },
    },
  },

  render: args => ({
    components: { SelectEmptyStory },

    setup() {
      return { args }
    },

    template: html`
      <SelectEmptyStory v-bind="args" />
    `,
  }),
}

export const Clearable: Story = {
  parameters: {
    docs: {
      source: {
        code: SelectClearableSource,
      },
    },
  },

  render: args => ({
    components: { SelectClearableStory },

    setup() {
      return { args }
    },

    template: html`
      <SelectClearableStory v-bind="args" />
    `,
  }),
}
