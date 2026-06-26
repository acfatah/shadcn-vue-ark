import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { DropdownMenu } from '@/components/ui/dropdown-menu'
import { registryItem } from '@/components/ui/dropdown-menu/_registry'

import { docsRoot } from '../../../_helpers/docs-root'
import DropdownMenuDefaultStory from './DropdownMenuDefaultStory.vue'
import DropdownMenuDefaultSource from './DropdownMenuDefaultStory.vue?raw'
import DropdownMenuPlacementStory from './DropdownMenuPlacementStory.vue'
import DropdownMenuPlacementSource from './DropdownMenuPlacementStory.vue?raw'

const meta: Meta<typeof DropdownMenu.Root> = {
  title: 'Components/UI/DropdownMenu',
  component: docsRoot(DropdownMenu.Root, 'DropdownMenu.Root'),
  subcomponents: {
    'DropdownMenu.Trigger': DropdownMenu.Trigger,
    'DropdownMenu.Content': DropdownMenu.Content,
    'DropdownMenu.Item': DropdownMenu.Item,
    'DropdownMenu.CheckboxItem': DropdownMenu.CheckboxItem,
    'DropdownMenu.RadioGroup': DropdownMenu.RadioGroup,
    'DropdownMenu.RadioItem': DropdownMenu.RadioItem,
    'DropdownMenu.Label': DropdownMenu.Label,
    'DropdownMenu.Separator': DropdownMenu.Separator,
    'DropdownMenu.Group': DropdownMenu.Group,
    'DropdownMenu.Sub': DropdownMenu.Sub,
    'DropdownMenu.SubTrigger': DropdownMenu.SubTrigger,
    'DropdownMenu.SubContent': DropdownMenu.SubContent,
    'DropdownMenu.Shortcut': DropdownMenu.Shortcut,
    'DropdownMenu.Positioner': DropdownMenu.Positioner,
    'DropdownMenu.ItemText': DropdownMenu.ItemText,
    'DropdownMenu.ItemIndicator': DropdownMenu.ItemIndicator,
    'DropdownMenu.Indicator': DropdownMenu.Indicator,
    'DropdownMenu.ContextTrigger': DropdownMenu.ContextTrigger,
    'DropdownMenu.RootProvider': DropdownMenu.RootProvider,
  },
  tags: ['autodocs'],

  argTypes: {
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
    },
    alignOffset: { control: 'number' },

    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
    },
    sideOffset: { control: 'number' },
  },

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
  args: {
    align: 'start',
    side: 'bottom',
  },
  parameters: {
    docs: {
      source: {
        code: DropdownMenuDefaultSource,
      },
    },
  },

  render: args => ({
    components: { DropdownMenuDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <DropdownMenuDefaultStory v-bind="args" />
    `,
  }),
}

export const Placement: Story = {
  name: 'Custom Placement',
  args: {
    align: 'center',
    alignOffset: 0,
    side: 'left',
    sideOffset: 4,
  },
  parameters: {
    docs: {
      source: {
        code: DropdownMenuPlacementSource,
      },
    },
  },

  render: args => ({
    components: { DropdownMenuPlacementStory },

    setup() {
      return { args }
    },

    template: html`
      <DropdownMenuPlacementStory v-bind="args" />
    `,
  }),
}
