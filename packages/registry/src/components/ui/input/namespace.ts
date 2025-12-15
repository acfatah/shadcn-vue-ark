import CheckboxInput from './CheckboxInput.vue'
import ColorInput from './ColorInput.vue'
import DateInput from './DateInput.vue'
import DatetimeLocalInput from './DatetimeLocalInput.vue'
import EmailInput from './EmailInput.vue'
import FileInput from './FileInput.vue'
import InputDescription from './InputDescription.vue'
import InputError from './InputError.vue'
import InputGroup from './InputGroup.vue'
import InputLabel from './InputLabel.vue'
import InputRequiredIndicator from './InputRequiredIndicator.vue'
import NumberInput from './NumberInput.vue'
import PasswordInput from './PasswordInput.vue'
import ResetInput from './ResetInput.vue'
import SearchInput from './SearchInput.vue'
import SubmitInput from './SubmitInput.vue'
import TelInput from './TelInput.vue'
import TextareaInput from './TextareaInput.vue'
import TextInput from './TextInput.vue'
import TimeInput from './TimeInput.vue'
import UrlInput from './UrlInput.vue'
import WeekInput from './WeekInput.vue'

import { Button } from '../button'

export const Input = {
  /**
   * InputGroup component
   *
   * Groups label, input, and description together, providing consistent spacing
   * and layout.
   *
   * Do not confuse with the other `InputGroup` component. See `FormGroup` components.
   *
   * See `Field` and `Fieldset` components for better form
   * field grouping and accessibility.
   */
  Group: InputGroup,

  /** LabelInput component */
  Label: InputLabel,

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

  /** Week input field */
  Week: WeekInput,

  /** Date input field */
  Date: DateInput,

  /** Time input field */
  Time: TimeInput,

  /** File component */
  File: FileInput,

  /**
   * Checkbox component
   *
   * Native checkbox input.
   *
   *  See `Checkbox` component for more granular usage.
   */
  Checkbox: CheckboxInput,

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
