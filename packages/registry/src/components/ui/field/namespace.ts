import FieldCheckbox from './FieldCheckbox.vue'
import FieldDescription from './FieldDescription.vue'
import FieldError from './FieldError.vue'
import FieldGroup from './FieldGroup.vue'
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

  /**
   * FieldGroup component
   *
   * Groups label, input, and description together, providing consistent spacing
   * and layout.
   *
   * - See also `FormGroup` components.
   * - See also `Field` and `Fieldset` components usage for better form field grouping
   * and accessibility.
   */
  Group: FieldGroup,

  /** FieldLabel component */
  Label: FieldLabel,

  /** FieldRequiredIndicator component */
  RequiredIndicator: FieldRequiredIndicator,

  /** FieldInput component */
  Input: FieldInput,

  /** FieldTextarea component */
  Textarea: FieldTextarea,

  /**
   * Simplified Checkbox components
   *
   * See `Checkbox` component for more granular usage.
   */
  Checkbox: FieldCheckbox,

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
