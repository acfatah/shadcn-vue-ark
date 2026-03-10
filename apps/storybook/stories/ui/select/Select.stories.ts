import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import {
  SelectClearTrigger,
  SelectContent,
  SelectControl,
  SelectEmpty,
  SelectIndicator,
  SelectItem,
  SelectItemGroup,
  SelectItemGroupLabel,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@/components/ui/select'
import { registryItem } from '@/components/ui/select/_registry'

import SelectClearableStory from './SelectClearableStory.vue'
import SelectClearableSource from './SelectClearableStory.vue?raw'
import SelectDefaultStory from './SelectDefaultStory.vue'
import SelectDefaultSource from './SelectDefaultStory.vue?raw'
import SelectEmptyStory from './SelectEmptyStory.vue'
import SelectEmptySource from './SelectEmptyStory.vue?raw'
import SelectPlacementStory from './SelectPlacementStory.vue'
import SelectPlacementSource from './SelectPlacementStory.vue?raw'

const meta = {
  title: 'Components/Select',
  component: SelectRoot,
  subcomponents: {
    SelectClearTrigger,
    SelectContent,
    SelectControl,
    SelectEmpty,
    SelectIndicator,
    SelectItem,
    SelectItemGroup,
    SelectItemGroupLabel,
    SelectItemIndicator,
    SelectItemText,
    SelectLabel,
    SelectTrigger,
    SelectValueText,
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
  },
} satisfies Meta<typeof SelectRoot>

export default meta
type Story = StoryObj<typeof meta>

// @ts-expect-error TS2322
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

// @ts-expect-error TS2322
export const Placement: Story = {
  name: 'Custom Placement',
  args: {
    // @ts-expect-error TS2353
    align: 'start',
    side: 'right',
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

// @ts-expect-error TS2322
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

// @ts-expect-error TS2322
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
