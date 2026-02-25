import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { Separator } from '@/components/ui/separator'
import { registryItem } from '@/components/ui/separator/_registry'

import SeparatorDefaultStory from './SeparatorDefaultStory.vue'
import SeparatorDefaultSource from './SeparatorDefaultStory.vue?raw'

const meta = {
  title: 'Components/Separator',
  component: Separator,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },
  },

  args: {
    orientation: 'horizontal',
    decorative: true,
  },

  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      table: {
        type: { summary: 'horizontal | vertical' },
        defaultValue: { summary: 'horizontal' },
      },
    },

    decorative: {
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },

    class: {
      control: { type: 'text' },
      table: {
        type: { summary: 'string | array | object' },
        defaultValue: { summary: 'null' },
      },
      description: 'HTMLAttributes[\'class\']',
    },
  },
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: SeparatorDefaultSource,
      },
    },
  },

  render: args => ({
    components: { SeparatorDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <SeparatorDefaultStory v-bind="args" />
    `,
  }),
}
