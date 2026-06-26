import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { Command } from '@/components/ui/command'
import { registryItem } from '@/components/ui/command/_registry'

import { docsRoot } from '../../../_helpers/docs-root'
import CommandDefaultStory from './CommandDefaultStory.vue'
import CommandDefaultSource from './CommandDefaultStory.vue?raw'

const meta: Meta<typeof Command.Root> = {
  title: 'Components/UI/Command',
  component: docsRoot(Command.Root, 'Command.Root'),
  subcomponents: {
    'Command.Dialog': Command.Dialog,
    'Command.Input': Command.Input,
    'Command.List': Command.List,
    'Command.Empty': Command.Empty,
    'Command.Group': Command.Group,
    'Command.Item': Command.Item,
    'Command.Separator': Command.Separator,
    'Command.Shortcut': Command.Shortcut,
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
        code: CommandDefaultSource,
      },
    },
  },

  render: args => ({
    components: { CommandDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <CommandDefaultStory v-bind="args" />
    `,
  }),
}
