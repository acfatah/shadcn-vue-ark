import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { html } from 'common-tags'

import { size as ButtonSize } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { registryItem } from '@/components/ui/input/_registry'

import ButtonStory from './ButtonStory.vue'
import ButtonSource from './ButtonStory.vue?raw'
import CheckboxInputStory from './CheckboxInputStory.vue'
import CheckboxInputSource from './CheckboxInputStory.vue?raw'
import ColorInputStory from './ColorInputStory.vue'
import ColorInputSource from './ColorInputStory.vue?raw'
import DateInputStory from './DateInputStory.vue'
import DateInputSource from './DateInputStory.vue?raw'
import DatetimeStory from './DatetimeLocalInputStory.vue'
import DatetimeSource from './DatetimeLocalInputStory.vue?raw'
import EmailInputStory from './EmailInputStory.vue'
import EmailInputSource from './EmailInputStory.vue?raw'
import FileInputStory from './FileInputStory.vue'
import FileInputSource from './FileInputStory.vue?raw'
import InlineGroupStory from './InlineGroupStory.vue'
import InlineGroupSource from './InlineGroupStory.vue?raw'
import InputDefaultStory from './InputDefaultStory.vue'
import InputDefaultSource from './InputDefaultStory.vue?raw'
import MonthInputStory from './MonthInputStory.vue'
import MonthInputSource from './MonthInputStory.vue?raw'
import NumberInputStory from './NumberInputStory.vue'
import NumberInputSource from './NumberInputStory.vue?raw'
import PasswordInputStory from './PasswordInputStory.vue'
import PasswordInputSource from './PasswordInputStory.vue?raw'
import RangeInputStory from './RangeInputStory.vue'
import RangeInputSource from './RangeInputStory.vue?raw'
import ResetStory from './ResetStory.vue'
import ResetSource from './ResetStory.vue?raw'
import SearchInputStory from './SearchInputStory.vue'
import SearchInputSource from './SearchInputStory.vue?raw'
import SubmitStory from './SubmitStory.vue'
import SubmitSource from './SubmitStory.vue?raw'
import TelInputStory from './TelInputStory.vue'
import TelInputSource from './TelInputStory.vue?raw'
import TextareaInputStory from './TextareaInputStory.vue'
import TextareaInputSource from './TextareaInputStory.vue?raw'
import TextInputDefaultStory from './TextInputDefaultStory.vue'
import TextInputDefaultSource from './TextInputDefaultStory.vue?raw'
import TimeInputStory from './TimeInputStory.vue'
import TimeInputSource from './TimeInputStory.vue?raw'
import UrlInputStory from './UrlInputStory.vue'
import UrlInputSource from './UrlInputStory.vue?raw'
import WeekInputStory from './WeekInputStory.vue'
import WeekInputSource from './WeekInputStory.vue?raw'

const BUTTON_SIZES = Object.keys(ButtonSize)

const meta = {
  title: 'Components/Input',
  subcomponents: {
    InputGroup: Input.Group,
    InputLabel: Input.Label,
    InputDescription: Input.Description,
    InputError: Input.Error,
    InputRequiredIndicator: Input.RequiredIndicator,
    Button: Input.Button,
    Submit: Input.Submit,
    Reset: Input.Reset,
    TextInput: Input.Text,
    TextareaInput: Input.Textarea,
    NumberInput: Input.Number,
    CheckboxInput: Input.Checkbox,
    DatetimeLocalInput: Input.DatetimeLocal,
    FileInput: Input.File,
    SearchInput: Input.Search,
    EmailInput: Input.Email,
    PasswordInput: Input.Password,
    ColorInput: Input.Color,
    UrlInput: Input.Url,
    TelInput: Input.Tel,
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
    loading: false,
  },

  argTypes: {
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
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

export const NumberInput: Story = {
  parameters: {
    docs: {
      source: {
        code: NumberInputSource,
      },
    },
  },

  args: {
    hideSpinner: false,
  },

  argTypes: {
    hideSpinner: { control: 'boolean' },
  },

  render: args => ({
    components: { NumberInputStory },

    setup() {
      return { args }
    },

    template: html`
      <NumberInputStory v-bind="args" />
    `,
  }),
}

const buttonSizeControl = {
  args: {
    hideIcon: false,
    size: undefined,
  },

  argTypes: {
    hideIcon: { control: 'boolean' },
    size: {
      control: { type: 'select' },
      description: 'Button size variant.',
      options: [...BUTTON_SIZES],
    },
  },
}

/**
 * Alias to `Button` component
 */
export const Button: Story = {
  parameters: {
    docs: {
      source: {
        code: ButtonSource,
      },
    },
  },

  ...buttonSizeControl,

  render: args => ({
    components: { ButtonStory },

    setup() {
      return { args }
    },

    template: html`
      <ButtonStory v-bind="args" />
    `,
  }),
}

export const Submit: Story = {
  parameters: {
    docs: {
      source: {
        code: SubmitSource,
      },
    },
  },

  ...buttonSizeControl,

  render: args => ({
    components: { SubmitStory },

    setup() {
      return { args }
    },

    template: html`
      <SubmitStory v-bind="args" />
    `,
  }),
}

export const Reset: Story = {
  parameters: {
    docs: {
      source: {
        code: ResetSource,
      },
    },
  },

  ...buttonSizeControl,

  render: args => ({
    components: { ResetStory },

    setup() {
      return { args }
    },

    template: html`
      <ResetStory v-bind="args" />
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

export const Range: Story = {
  parameters: {
    docs: {
      source: {
        code: RangeInputSource,
      },
    },
  },

  args: {
    hideThumb: false,
  },

  argTypes: {
    hideThumb: { control: 'boolean' },
  },

  render: args => ({
    components: { RangeInputStory },

    setup() {
      return { args }
    },

    template: html`
      <RangeInputStory v-bind="args" />
    `,
  }),
}

/**
 * Alias to `DatetimeLocal` component or input `type="datetime-local"`.
 */
export const Datetime: Story = {
  parameters: {
    docs: {
      source: {
        code: DatetimeSource,
      },
    },
  },
  args: {
    hideIcon: false,
  },

  argTypes: {
    hideIcon: { control: 'boolean' },
  },

  render: args => ({
    components: { DatetimeStory },

    setup() {
      return { args }
    },

    template: html`
      <DatetimeStory v-bind="args" />
    `,
  }),
}

export const Month: Story = {
  parameters: {
    docs: {
      source: {
        code: MonthInputSource,
      },
    },
  },
  args: {
    hideIcon: false,
  },

  argTypes: {
    hideIcon: { control: 'boolean' },
  },

  render: args => ({
    components: { MonthInputStory },

    setup() {
      return { args }
    },

    template: html`
      <MonthInputStory v-bind="args" />
    `,
  }),
}

export const Week: Story = {
  parameters: {
    docs: {
      source: {
        code: WeekInputSource,
      },
    },
  },
  args: {
    hideIcon: false,
  },

  argTypes: {
    hideIcon: { control: 'boolean' },
  },

  render: args => ({
    components: { WeekInputStory },

    setup() {
      return { args }
    },

    template: html`
      <WeekInputStory v-bind="args" />
    `,
  }),
}

export const Date: Story = {
  parameters: {
    docs: {
      source: {
        code: DateInputSource,
      },
    },
  },
  args: {
    hideIcon: false,
  },

  argTypes: {
    hideIcon: { control: 'boolean' },
  },

  render: args => ({
    components: { DateInputStory },

    setup() {
      return { args }
    },

    template: html`
      <DateInputStory v-bind="args" />
    `,
  }),
}

export const Time: Story = {
  parameters: {
    docs: {
      source: {
        code: TimeInputSource,
      },
    },
  },
  args: {
    hideIcon: false,
  },

  argTypes: {
    hideIcon: { control: 'boolean' },
  },

  render: args => ({
    components: { TimeInputStory },

    setup() {
      return { args }
    },

    template: html`
      <TimeInputStory v-bind="args" />
    `,
  }),
}

export const FileInput: Story = {
  parameters: {
    docs: {
      source: {
        code: FileInputSource,
      },
    },
  },

  render: args => ({
    components: { FileInputStory },

    setup() {
      return { args }
    },

    template: html`
      <FileInputStory v-bind="args" />
    `,
  }),
}

const iconControl = {
  args: {
    hideIcon: false,
    icon: undefined,
  },

  argTypes: {
    hideIcon: {
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

export const EmailInput: Story = {
  parameters: {
    docs: {
      source: {
        code: EmailInputSource,
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
    components: { EmailInputStory },

    setup() {
      return { args }
    },

    template: html`
      <EmailInputStory v-bind="args" />
    `,
  }),
}

export const PasswordInput: Story = {
  parameters: {
    docs: {
      source: {
        code: PasswordInputSource,
      },
    },
  },

  args: {
    hideIcon: false,
    showPasswordIcon: undefined,
    hidePasswordIcon: undefined,
  },

  argTypes: {
    hideIcon: { control: 'boolean' },
    showPasswordIcon: { control: 'text' },
    hidePasswordIcon: { control: 'text' },
  },

  render: args => ({
    components: { PasswordInputStory },

    setup() {
      return { args }
    },

    template: html`
      <PasswordInputStory v-bind="args" />
    `,
  }),
}

export const ColorInput: Story = {
  parameters: {
    docs: {
      source: {
        code: ColorInputSource,
      },
    },
  },

  render: args => ({
    components: { ColorInputStory },

    setup() {
      return { args }
    },

    template: html`
      <ColorInputStory v-bind="args" />
    `,
  }),
}

export const UrlInput: Story = {
  parameters: {
    docs: {
      source: {
        code: UrlInputSource,
      },
    },
  },

  render: args => ({
    components: { UrlInputStory },

    setup() {
      return { args }
    },

    template: html`
      <UrlInputStory v-bind="args" />
    `,
  }),
}

export const TelInput: Story = {
  parameters: {
    docs: {
      source: {
        code: TelInputSource,
      },
    },
  },

  render: args => ({
    components: { TelInputStory },

    setup() {
      return { args }
    },

    template: html`
      <TelInputStory v-bind="args" />
    `,
  }),
}
