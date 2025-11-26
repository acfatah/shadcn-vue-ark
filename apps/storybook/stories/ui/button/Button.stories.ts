import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { html } from 'common-tags'

import { Button } from '@/components/ui/button'
import metadata from '@/components/ui/button/metadata'
import AsChildStory from './AsChildStory.vue'
import AsChildStorySource from './AsChildStory.vue?raw'
import DemoStory from './DemoStory.vue'
import DemoStorySource from './DemoStory.vue?raw'
import RoundedStory from './RoundedStory.vue'
import RoundedStorySource from './RoundedStory.vue?raw'
import SizeStory from './SizeStory.vue'
import SizeStorySource from './SizeStory.vue?raw'
import SpinnerStory from './SpinnerStory.vue'
import SpinnerStorySource from './SpinnerStory.vue?raw'
import VariantStory from './VariantStory.vue'
import VariantStorySource from './VariantStory.vue?raw'
import WithIconStory from './WithIconStory.vue'
import WithIconStorySource from './WithIconStory.vue?raw'

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: metadata.description,
      },
    },
  },

  args: {
    disabled: false,
  },

  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },

    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'icon'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },

    class: {
      type: 'string',
      table: {
        type: { summary: 'string | array | object' },
        defaultValue: { summary: 'null' },
      },
      description: 'HTMLAttributes[\'class\']',
    },

    disabled: {
      type: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: DemoStorySource,
      },
    },
  },

  args: {
    default: 'Button',
  },

  render: args => ({
    components: { DemoStory },

    setup() {
      return { args }
    },

    template: html`
      <DemoStory v-bind="args" />
    `,
  }),
}

export const SizeVariants: Story = {
  parameters: {
    controls: {
      exclude: ['size'],
    },

    docs: {
      source: {
        code: SizeStorySource,
      },
    },
  },

  render: args => ({
    components: { SizeStory },
    setup() {
      return { args }
    },

    template: html`
      <SizeStory v-bind="args" />
    `,
  }),
}

export const VariantVariants: Story = {
  parameters: {
    controls: {
      exclude: ['variant'],
    },

    docs: {
      source: {
        code: VariantStorySource,
      },
    },
  },

  render: args => ({
    components: { VariantStory },
    setup() {
      return { args }
    },

    template: html`
      <VariantStory v-bind="args" />
    `,
  }),
}
VariantVariants.storyName = 'Variants'

export const WithIcon: Story = {
  parameters: {
    docs: {
      source: {
        code: WithIconStorySource,
      },
    },
  },

  render: args => ({
    components: { WithIconStory },

    setup() {
      return { args }
    },

    template: html`
      <WithIconStory v-bind="args" />
    `,
  }),
}

export const Rounded: Story = {
  parameters: {
    docs: {
      source: {
        code: RoundedStorySource,
      },
    },
  },

  render: args => ({
    components: { RoundedStory },

    setup() {
      return { args }
    },

    template: html`
      <RoundedStory v-bind="args" />
    `,
  }),
}

export const Spinner: Story = {
  parameters: {
    docs: {
      source: {
        code: SpinnerStorySource,
      },
    },
  },

  render: args => ({
    components: { SpinnerStory },

    setup() {
      return { args }
    },

    template: html`
      <SpinnerStory v-bind="args" />
    `,
  }),
}

export const AsChild: Story = {
  parameters: {
    docs: {
      source: {
        code: AsChildStorySource,
      },
    },
  },

  render: args => ({
    components: { AsChildStory },

    setup() {
      return { args }
    },

    template: html`
      <AsChildStory v-bind="args" />
    `,
  }),
}
AsChild.storyName = 'Link (asChild)'
