import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { PinInput } from '@/components/ui/pin-input'
import { registryItem } from '@/components/ui/pin-input/_registry'

import { docsRoot } from '../../../_helpers/docs-root'
import PinInputDefaultStory from './PinInputDefaultStory.vue'
import PinInputDefaultSource from './PinInputDefaultStory.vue?raw'

const meta: Meta<typeof PinInput.Root> = {
  title: 'Components/UI/PinInput',
  component: docsRoot(PinInput.Root, 'PinInput.Root'),
  subcomponents: {
    'PinInput.Group': PinInput.Group,
    'PinInput.Slot': PinInput.Slot,
    'PinInput.HiddenInput': PinInput.HiddenInput,
    'PinInput.Separator': PinInput.Separator,
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
        code: PinInputDefaultSource,
      },
    },
  },

  render: args => ({
    components: { PinInputDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <PinInputDefaultStory v-bind="args" />
    `,
  }),
}
