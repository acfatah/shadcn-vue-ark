import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { ButtonGroup } from '@/components/ui/button-group'
import { registryItem } from '@/components/ui/button-group/_registry'

import { docsRoot } from '../../../_helpers/docs-root'
import ButtonGroupDefaultStory from './ButtonGroupDefaultStory.vue'
import ButtonGroupDefaultSource from './ButtonGroupDefaultStory.vue?raw'

const meta: Meta<typeof ButtonGroup.Root> = {
  title: 'Components/UI/ButtonGroup',
  component: docsRoot(ButtonGroup.Root, 'ButtonGroup.Root'),
  subcomponents: {
    'ButtonGroup.Text': ButtonGroup.Text,
    'ButtonGroup.Separator': ButtonGroup.Separator,
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
        code: ButtonGroupDefaultSource,
      },
    },
  },

  render: args => ({
    components: { ButtonGroupDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <ButtonGroupDefaultStory v-bind="args" />
    `,
  }),
}
