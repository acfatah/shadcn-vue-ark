import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { html } from 'common-tags'

import { Input } from '@/components/ui/input'
import { registryItem } from '@/components/ui/input/_registry'
import CheckboxInputStory from './CheckboxInputStory.vue'
import CheckboxInputSource from './CheckboxInputStory.vue?raw'
import InlineGroupStory from './InlineGroupStory.vue'
import InlineGroupSource from './InlineGroupStory.vue?raw'
import InputDefaultStory from './InputDefaultStory.vue'
import InputDefaultSource from './InputDefaultStory.vue?raw'
import SearchInputStory from './SearchInputStory.vue'
import SearchInputSource from './SearchInputStory.vue?raw'
import TextareaInputStory from './TextareaInputStory.vue'
import TextareaInputSource from './TextareaInputStory.vue?raw'
import TextInputDefaultStory from './TextInputDefaultStory.vue'
import TextInputDefaultSource from './TextInputDefaultStory.vue?raw'

const meta = {
  title: 'Components/Input',
  subcomponents: {
    InputGroup: Input.Group,
    InputLabel: Input.Label,
    InputDescription: Input.Description,
    InputError: Input.Error,
    InputRequiredIndicator: Input.RequiredIndicator,
    TextInput: Input.Text,
    TextareaInput: Input.Textarea,
    CheckboxInput: Input.Checkbox,
    SearchInput: Input.Search,
  },
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },
  },

  args: {
    invalid: false,
    disabled: false,
  },

  argTypes: {
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<Record<string, any>>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: InputDefaultSource,
      },
    },
  },

  render: args => ({
    components: { InputDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <InputDefaultStory v-bind="args" />
    `,
  }),
}

export const InlineGroup: Story = {
  parameters: {
    docs: {
      source: {
        code: InlineGroupSource,
      },
    },
  },

  args: {
    inline: true,
  },

  argTypes: {
    inline: { control: { type: 'boolean' } },
  },

  render: args => ({
    components: { InlineGroupStory },

    setup() {
      return { args }
    },

    template: html`
      <InlineGroupStory v-bind="args" />
    `,
  }),
}

export const TextInput: Story = {
  parameters: {
    docs: {
      source: {
        code: TextInputDefaultSource,
      },
    },
  },

  render: args => ({
    components: { TextInputDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <TextInputDefaultStory v-bind="args" />
    `,
  }),
}

export const Textarea: Story = {
  parameters: {
    docs: {
      source: {
        code: TextareaInputSource,
      },
    },
  },

  render: args => ({
    components: { TextareaInputStory },

    setup() {
      return { args }
    },

    template: html`
      <TextareaInputStory v-bind="args" />
    `,
  }),
}

/**
 * Checkbox component using native checkbox input.
 *
 * See `Checkbox` component for more granular usage.
 */
export const Checkbox: Story = {
  parameters: {
    docs: {
      source: {
        code: CheckboxInputSource,
      },
    },
  },

  args: {
    indeterminate: false,
    state: 'unchecked',
  },

  argTypes: {
    indeterminate: { control: 'boolean' },
    state: {
      control: { type: 'select' },
      options: ['checked', 'unchecked', 'indeterminate'],
      mapping: {
        checked: true,
        unchecked: false,
        indeterminate: null,
      },
    },
  },

  render: args => ({
    components: { CheckboxInputStory },

    setup() {
      return { args }
    },

    template: html`
      <CheckboxInputStory v-bind="args" />
    `,
  }),
}

const iconControl = {
  args: {
    noIcon: false,
    icon: undefined,
  },

  argTypes: {
    noIcon: {
      control: 'boolean',
      description: 'Use the `no-icon` attribute to suppress the search icon while keeping the layout.',
    },
    icon: { control: 'text' },
  },
}

export const SearchInput: Story = {
  parameters: {
    docs: {
      source: {
        code: SearchInputSource,
      },
    },
  },

  args: {
    ...iconControl.args,
  },

  argTypes: {
    ...iconControl.argTypes,
  },

  render: args => ({
    components: { SearchInputStory },

    setup() {
      return { args }
    },

    template: html`
      <SearchInputStory v-bind="args" />
    `,
  }),
}
