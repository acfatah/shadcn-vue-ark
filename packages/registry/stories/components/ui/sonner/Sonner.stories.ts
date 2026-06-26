import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { Toaster } from '@/components/ui/sonner'
import { registryItem } from '@/components/ui/sonner/_registry'

import SonnerDefaultStory from './SonnerDefaultStory.vue'
import SonnerDefaultSource from './SonnerDefaultStory.vue?raw'
import SonnerRichStory from './SonnerRichStory.vue'
import SonnerRichSource from './SonnerRichStory.vue?raw'
import SonnerVariantsStory from './SonnerVariantsStory.vue'
import SonnerVariantsSource from './SonnerVariantsStory.vue?raw'

const meta: Meta<typeof Toaster> = {
  title: 'Components/UI/Sonner',
  component: Toaster,
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
        code: SonnerDefaultSource,
      },
    },
  },

  render: args => ({
    components: { SonnerDefaultStory, Toaster },

    setup() {
      return { args }
    },

    template: html`
      <Teleport to="body">
        <Toaster v-bind="args" />
      </Teleport>
      <SonnerDefaultStory />
    `,
  }),
}

export const Variants: Story = {
  parameters: {
    docs: {
      source: {
        code: SonnerVariantsSource,
      },
    },
  },

  render: args => ({
    components: { SonnerVariantsStory, Toaster },

    setup() {
      return { args }
    },

    template: html`
      <Teleport to="body">
        <Toaster v-bind="args" />
      </Teleport>
      <SonnerVariantsStory />
    `,
  }),
}

export const RichToast: Story = {
  parameters: {
    docs: {
      source: {
        code: SonnerRichSource,
      },

      description: {
        story: html`
          A toast with title, description, action button, and cancel button.
        `,
      },
    },
  },

  render: args => ({
    components: { SonnerRichStory, Toaster },

    setup() {
      return { args }
    },

    template: html`
      <Teleport to="body">
        <Toaster v-bind="args" />
      </Teleport>
      <SonnerRichStory />
    `,
  }),
}
RichToast.storyName = 'Rich Toast'
