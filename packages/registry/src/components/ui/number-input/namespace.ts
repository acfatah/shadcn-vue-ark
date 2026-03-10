import NumberInputControl from './NumberInputControl.vue'
import NumberInputDecrement from './NumberInputDecrement.vue'
import NumberInputIncrement from './NumberInputIncrement.vue'
import NumberInputInput from './NumberInputInput.vue'
import NumberInputRoot from './NumberInputRoot.vue'

export const NumberInput = {
  /**
   * NumberInputRoot component
   *
   * The root container for the number input.
   */
  Root: NumberInputRoot,

  /**
   * NumberInputControl component
   *
   * Wrapper for the input and trigger buttons.
   */
  Control: NumberInputControl,

  /**
   * NumberInputInput component
   *
   * The text input element for the number input.
   */
  Input: NumberInputInput,

  /**
   * NumberInputIncrement component
   *
   * Button to increment the number value.
   */
  Increment: NumberInputIncrement,

  /**
   * NumberInputDecrement component
   *
   * Button to decrement the number value.
   */
  Decrement: NumberInputDecrement,
}
