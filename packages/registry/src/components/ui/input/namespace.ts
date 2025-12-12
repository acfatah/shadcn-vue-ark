import CheckboxInput from './CheckboxInput.vue'
import FileInput from './FileInput.vue'
import InputDescription from './InputDescription.vue'
import InputError from './InputError.vue'
import InputGroup from './InputGroup.vue'
import InputLabel from './InputLabel.vue'
import InputRequiredIndicator from './InputRequiredIndicator.vue'
import TextareaInput from './TextareaInput.vue'
import TextInput from './TextInput.vue'

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

  /** TextInput component */
  Text: TextInput,

  /** TextInput component */
  Textarea: TextareaInput,

  /** File component */
  File: FileInput,

  /** Checkbox component - native checkbox input */
  Checkbox: CheckboxInput,
}
