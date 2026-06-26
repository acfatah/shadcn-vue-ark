import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { Editable } from '@/components/ui/editable'
import { registryItem } from '@/components/ui/editable/_registry'

import { docsRoot } from '../../../_helpers/docs-root'
import EditableDefaultStory from './EditableDefaultStory.vue'
import EditableDefaultSource from './EditableDefaultStory.vue?raw'

const meta: Meta<typeof Editable.Root> = {
  title: 'Components/UI/Editable',
  component: docsRoot(Editable.Root, 'Editable.Root'),
  subcomponents: {
    'Editable.Area': Editable.Area,
    'Editable.CancelTrigger': Editable.CancelTrigger,
    'Editable.Control': Editable.Control,
    'Editable.EditTrigger': Editable.EditTrigger,
    'Editable.Input': Editable.Input,
    'Editable.Label': Editable.Label,
    'Editable.Preview': Editable.Preview,
    'Editable.SubmitTrigger': Editable.SubmitTrigger,
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
        code: EditableDefaultSource,
      },
    },
  },

  render: args => ({
    components: { EditableDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <EditableDefaultStory v-bind="args" />
    `,
  }),
}
