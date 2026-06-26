import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { Steps } from '@/components/ui/steps'
import { registryItem } from '@/components/ui/steps/_registry'

import { docsRoot } from '../../../_helpers/docs-root'
import StepsDefaultStory from './StepsDefaultStory.vue'
import StepsDefaultSource from './StepsDefaultStory.vue?raw'

const meta: Meta<typeof Steps.Root> = {
  title: 'Components/UI/Steps',
  component: docsRoot(Steps.Root, 'Steps.Root'),
  subcomponents: {
    'Steps.List': Steps.List,
    'Steps.Item': Steps.Item,
    'Steps.Trigger': Steps.Trigger,
    'Steps.Indicator': Steps.Indicator,
    'Steps.Separator': Steps.Separator,
    'Steps.Content': Steps.Content,
    'Steps.CompletedContent': Steps.CompletedContent,
    'Steps.NextTrigger': Steps.NextTrigger,
    'Steps.PrevTrigger': Steps.PrevTrigger,
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
        code: StepsDefaultSource,
      },
    },
  },

  render: args => ({
    components: { StepsDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <StepsDefaultStory v-bind="args" />
    `,
  }),
}
