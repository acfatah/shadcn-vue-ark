import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { Switch } from '@/components/ui/switch'
import { registryItem } from '@/components/ui/switch/_registry'

import { docsRoot } from '../../../_helpers/docs-root'
import SwitchDefaultStory from './SwitchDefaultStory.vue'
import SwitchDefaultSource from './SwitchDefaultStory.vue?raw'

const defaultAttributes = {
  args: {
    invalid: false,
    disabled: false,
    loading: false,
  },

  argTypes: {
    invalid: {
      control: { type: 'boolean' as const },
    },

    disabled: {
      control: { type: 'boolean' as const },
    },

    loading: {
      control: { type: 'boolean' as const },
    },
  },
}

const meta: Meta<typeof Switch.Root> = {
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
        code: SwitchDefaultSource,
      },
    },
  },

  ...defaultAttributes,

  render: args => ({
    components: { SwitchDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <SwitchDefaultStory v-bind="args" />
    `,
  }),
}
