import FieldDescription from './FieldDescription.vue'
import FieldError from './FieldError.vue'
import FieldInput from './FieldInput.vue'
import FieldLabel from './FieldLabel.vue'
import FieldRequiredIndicator from './FieldRequiredIndicator.vue'
import FieldRoot from './FieldRoot.vue'
import FieldRootProvider from './FieldRootProvider.vue'
import FieldTextarea from './FieldTextarea.vue'
import FieldTitle from './FieldTitle.vue'

export const Field = {
  /** FieldRoot component */
  Root: FieldRoot,

  /** FieldRootProvider component */
  RootProvider: FieldRootProvider,

  /** FieldLabel component */
  Label: FieldLabel,

  /** FieldRequiredIndicator component */
  RequiredIndicator: FieldRequiredIndicator,

  /** FieldInput component */
  Input: FieldInput,

  /** FieldTextarea component */
  Textarea: FieldTextarea,

  /**
   * FieldTitle component
   *
   * Renders a title with label styling inside `Field.Content`.
   *
   * See:
   * - https://ui.shadcn.com/docs/components/field#fieldtitle
   */
  Title: FieldTitle,

  /**
   * FieldDescription component
   *
   * Helper text slot that automatically balances long lines in horizontal layouts.
   *
   * See:
   * - https://ui.shadcn.com/docs/components/field#fielddescription
   */
  Description: FieldDescription,

  /**
   * FieldError component
   *
   * Accessible error container that accepts children or an errors array (e.g.,
   * from a form validation library).
   *
   * See:
   * - https://ui.shadcn.com/docs/components/field#validation-and-errors
   */
  Error: FieldError,
}
