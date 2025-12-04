import FileInput from './FileInput.vue'
import InputDescription from './InputDescription.vue'
import InputLabel from './InputLabel.vue'
import TextareaInput from './TextareaInput.vue'
import TextInput from './TextInput.vue'

export const Input = {
  /** LabelInput component */
  Label: InputLabel,

  /** Description component */
  Description: InputDescription,

  /** TextInput component */
  Text: TextInput,

  /** TextInput component */
  Textarea: TextareaInput,

  /** File component */
  File: FileInput,
}
