import { Button } from '../button'
import { Label } from '../label'
import CheckboxInput from './CheckboxInput.vue'
import ColorInput from './ColorInput.vue'
import DateInput from './DateInput.vue'
import DatetimeLocalInput from './DatetimeLocalInput.vue'
import EmailInput from './EmailInput.vue'
import FileInput from './FileInput.vue'
import InputDescription from './InputDescription.vue'
import InputError from './InputError.vue'
import InputRequiredIndicator from './InputRequiredIndicator.vue'
import MonthInput from './MonthInput.vue'
import NumberInput from './NumberInput.vue'
import PasswordInput from './PasswordInput.vue'
import RadioInput from './RadioInput.vue'
import RangeInput from './RangeInput.vue'
import ResetInput from './ResetInput.vue'
import SearchInput from './SearchInput.vue'
import SelectInput from './SelectInput.vue'
import SubmitInput from './SubmitInput.vue'
import TelInput from './TelInput.vue'
import TextareaInput from './TextareaInput.vue'
import TextInput from './TextInput.vue'
import TimeInput from './TimeInput.vue'
import UrlInput from './UrlInput.vue'
import WeekInput from './WeekInput.vue'

export const Input = {
  /** LabelInput component */
  Label,

  /**
   * InputRequiredIndicator component
   *
   * Indicates that an input field is required.
   *
   * See also `FieldRequiredIndicator` component.
   */
  RequiredIndicator: InputRequiredIndicator,

  /** Description component */
  Description: InputDescription,

  /**
   * InputError component
   *
   * See also `FieldError` component.
   */
  Error: InputError,

  /**
   * Alias to `Button` component
   *
   * Displays a button or a component that looks like a button.
   *
   * References:
   * - shadcn/ui: https://ui.shadcn.com/docs/components/button
   */
  Button,

  /**
   * Submit button
   *
   * See `Button` component for more details.
   */
  Submit: SubmitInput,

  /**
   * Reset button
   *
   * See `Button` component for more details.
   */
  Reset: ResetInput,

  /** TextInput component */
  Text: TextInput,

  /** TextInput component */
  Textarea: TextareaInput,

  /** Number input field */
  Number: NumberInput,

  /** Alias to DatetimeLocal input field */
  Datetime: DatetimeLocalInput,

  /** DatetimeLocal input field */
  DatetimeLocal: DatetimeLocalInput,

  /** Month input field */
  Month: MonthInput,

  /** Week input field */
  Week: WeekInput,

  /** Date input field */
  Date: DateInput,

  /** Time input field */
  Time: TimeInput,

  /** File component */
  File: FileInput,

  /**
   * CheckboxInput component
   *
   * Render native checkbox input element.
   *
   * See `Checkbox` component for more granular usage.
   */
  Checkbox: CheckboxInput,

  /**
   * RadioInput component
   *
   * Render native radio input element.
   *
   * See `Radio` component for more granular usage.
   */
  Radio: RadioInput,

  /**
   * SelectInput component
   *
   * Render native select input element.
   *
   * See `Select` component for more granular usage.
   */
  Select: SelectInput,

  /** Range input field */
  Range: RangeInput,

  /** Search input field */
  Search: SearchInput,

  /** Email input field */
  Email: EmailInput,

  /** Password input field */
  Password: PasswordInput,

  /** Color input field */
  Color: ColorInput,

  /** URL input field */
  Url: UrlInput,

  /** Telephone input field */
  Tel: TelInput,
}
