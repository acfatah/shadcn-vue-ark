import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { html } from 'common-tags'

import { Label } from '@/components/ui/label'
import { registryItem } from '@/components/ui/label/_registry'
import LabelDefaultStory from './LabelDefaultStory.vue'
import LabelDefaultSource from './LabelDefaultStory.vue?raw'

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
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
        code: LabelDefaultSource,
      },
    },
  },

  render: args => ({
    components: { LabelDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <LabelDefaultStory v-bind="args" />
    `,
  }),
}

/**
 * Styling when peer sibling `aria-invalid` is `true`.
 */
export const PeerInvalid: Story = {
  ...Default,

  args: {
    // @ts-expect-error 2353
    invalid: true,
  },
}

/**
 * Styling when peer sibling is `disabled` or `aria-disabled` is `true`.
 */
export const PeerDisabled: Story = {
  ...Default,

  args: {
    // @ts-expect-error 2353
    disabled: true,
  },
}

/**
 * Styling when peer sibling `aria-busy` is `true`.
 */
export const PeerLoading: Story = {
  ...Default,

  args: {
    // @ts-expect-error 2353
    loading: true,
  },
}
