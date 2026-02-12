import InputGroupAddon from './InputGroupAddon.vue'
import InputGroupButton from './InputGroupButton.vue'
import InputGroupInput from './InputGroupInput.vue'
import InputGroupRoot from './InputGroupRoot.vue'
import InputGroupText from './InputGroupText.vue'
import InputGroupTextarea from './InputGroupTextarea.vue'

export const InputGroup = {
  /**
   * InputGroupRoot component
   */
  Root: InputGroupRoot,

  /**
   * InputGroupAddon component
   *
   * Addon container that aligns text, icons, or actions alongside the control.
   */
  Addon: InputGroupAddon,

  /**
   * InputGroupText component
   *
   * Simple text wrapper for leading or trailing context.
   */
  Text: InputGroupText,

  /**
   * InputGroupButton component
   *
   * Button styled to align with input-group controls.
   */
  Button: InputGroupButton,

  /**
   * InputGroupInput component
   *
   * Input control for single-line text.
   */
  Input: InputGroupInput,

  /**
   * InputGroupTextarea component
   *
   * Textarea control for multi-line input.
   */
  Textarea: InputGroupTextarea,
}
