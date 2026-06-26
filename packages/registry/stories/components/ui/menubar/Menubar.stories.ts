import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { Menubar } from '@/components/ui/menubar'
import { registryItem } from '@/components/ui/menubar/_registry'

import { docsRoot } from '../../../_helpers/docs-root'
import MenubarDefaultStory from './MenubarDefaultStory.vue'
import MenubarDefaultSource from './MenubarDefaultStory.vue?raw'

const meta: Meta<typeof Menubar.Root> = {
  title: 'Components/UI/Menubar',
  component: docsRoot(Menubar.Root, 'Menubar.Root'),
  subcomponents: {
    'Menubar.Menu': Menubar.Menu,
    'Menubar.Trigger': Menubar.Trigger,
    'Menubar.Content': Menubar.Content,
    'Menubar.Item': Menubar.Item,
    'Menubar.CheckboxItem': Menubar.CheckboxItem,
    'Menubar.RadioGroup': Menubar.RadioGroup,
    'Menubar.RadioItem': Menubar.RadioItem,
    'Menubar.Label': Menubar.Label,
    'Menubar.Separator': Menubar.Separator,
    'Menubar.Group': Menubar.Group,
    'Menubar.Sub': Menubar.Sub,
    'Menubar.SubTrigger': Menubar.SubTrigger,
    'Menubar.SubContent': Menubar.SubContent,
    'Menubar.Shortcut': Menubar.Shortcut,
    'Menubar.Positioner': Menubar.Positioner,
    'Menubar.ItemText': Menubar.ItemText,
    'Menubar.ItemIndicator': Menubar.ItemIndicator,
    'Menubar.Indicator': Menubar.Indicator,
    'Menubar.ContextTrigger': Menubar.ContextTrigger,
    'Menubar.RootProvider': Menubar.RootProvider,
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
        code: MenubarDefaultSource,
      },
    },
  },

  render: args => ({
    components: { MenubarDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <MenubarDefaultStory v-bind="args" />
    `,
  }),
}
