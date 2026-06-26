import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { ContextMenu } from '@/components/ui/context-menu'
import { registryItem } from '@/components/ui/context-menu/_registry'

import { docsRoot } from '../../../_helpers/docs-root'
import ContextMenuDefaultStory from './ContextMenuDefaultStory.vue'
import ContextMenuDefaultSource from './ContextMenuDefaultStory.vue?raw'

const meta: Meta<typeof ContextMenu.Root> = {
  title: 'Components/UI/ContextMenu',
  component: docsRoot(ContextMenu.Root, 'ContextMenu.Root'),
  subcomponents: {
    'ContextMenu.Trigger': ContextMenu.Trigger,
    'ContextMenu.Content': ContextMenu.Content,
    'ContextMenu.Item': ContextMenu.Item,
    'ContextMenu.CheckboxItem': ContextMenu.CheckboxItem,
    'ContextMenu.RadioGroup': ContextMenu.RadioGroup,
    'ContextMenu.RadioItem': ContextMenu.RadioItem,
    'ContextMenu.Label': ContextMenu.Label,
    'ContextMenu.Separator': ContextMenu.Separator,
    'ContextMenu.Group': ContextMenu.Group,
    'ContextMenu.Sub': ContextMenu.Sub,
    'ContextMenu.SubTrigger': ContextMenu.SubTrigger,
    'ContextMenu.SubContent': ContextMenu.SubContent,
    'ContextMenu.Shortcut': ContextMenu.Shortcut,
    'ContextMenu.Positioner': ContextMenu.Positioner,
    'ContextMenu.ItemText': ContextMenu.ItemText,
    'ContextMenu.ItemIndicator': ContextMenu.ItemIndicator,
    'ContextMenu.Indicator': ContextMenu.Indicator,
    'ContextMenu.ContextTrigger': ContextMenu.ContextTrigger,
    'ContextMenu.RootProvider': ContextMenu.RootProvider,
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
        code: ContextMenuDefaultSource,
      },
    },
  },

  render: args => ({
    components: { ContextMenuDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <ContextMenuDefaultStory v-bind="args" />
    `,
  }),
}
