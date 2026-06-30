import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { Fieldset } from '@/components/ui/fieldset'
import { registryItem } from '@/components/ui/fieldset/_registry'

import { boolArg, classArg, selectArg } from '../../../_helpers/args'
import { docsRoot } from '../../../_helpers/docs-root'
import { renderRaw } from '../../../_helpers/render'
import FieldsetDefaultStory from './FieldsetDefaultStory.vue'
import FieldsetDefaultSource from './FieldsetDefaultStory.vue?raw'

const meta = {
  title: 'Components/UI/Fieldset',
  component: docsRoot(Fieldset.Root, 'Fieldset.Root'),
  subcomponents: {
    'Fieldset.Legend': Fieldset.Legend,
    'Fieldset.Content': Fieldset.Content,
    'Fieldset.Group': Fieldset.Group,
    'Fieldset.Description': Fieldset.Description,
    'Fieldset.Error': Fieldset.Error,
    'Fieldset.Separator': Fieldset.Separator,
  },
  tags: ['autodocs'],

  args: {
    disabled: false,
    invalid: false,
    orientation: 'vertical',
  },

  argTypes: {
    disabled: boolArg(),
    invalid: boolArg(),
    asChild: boolArg('Render the child element as the root (polymorphic).'),
    orientation: selectArg(['vertical', 'horizontal'], 'vertical'),
    id: { control: 'text' },
    class: classArg(),
  },

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },

    a11y: { test: 'error' },
  },
} satisfies Meta<typeof Fieldset.Root>

export default meta
type Story = StoryObj<typeof meta>

// Non-interactive layout, so no play; matrix + a11y only.
export const Default: Story = {
  ...renderRaw(FieldsetDefaultStory, FieldsetDefaultSource),
}
