import FieldsetContent from './FieldsetContent.vue'
import FieldsetDescription from './FieldsetDescription.vue'
import FieldsetError from './FieldsetError.vue'
import FieldsetGroup from './FieldsetGroup.vue'
import FieldsetLegend from './FieldsetLegend.vue'
import FieldsetRoot from './FieldsetRoot.vue'
import FieldsetSeparator from './FieldsetSeparator.vue'

export const Fieldset = {
  /**
   * FieldsetRoot component
   *
   * Container that renders a semantic `fieldset` with spacing presets.
   *
   * See:
   * - https://ui.shadcn.com/docs/components/field#fieldset-1
   * - https://ark-ui.com/docs/components/fieldset
   */
  Root: FieldsetRoot,

  /**
   * FieldsetLegend component
   *
   * Legend element for a `FieldSet`. Switch to the `label` variant to align with
   * label sizing.
   *
   * See:
   * - https://ui.shadcn.com/docs/components/field#fieldlegend
   */
  Legend: FieldsetLegend,

  /**
   * FieldsetContent component
   *
   * Content wrapper that applies spacing between `Field` components.
   */
  Content: FieldsetContent,

  /**
   * FieldsetGroup component
   *
   * Layout wrapper that stacks `Field` components and enables container queries
   * for responsive orientations.
   *
   * See:
   * - https://ui.shadcn.com/docs/components/field#fieldgroup
   */
  Group: FieldsetGroup,

  /**
   * FieldsetDescription component
   *
   * Helper text slot that automatically balances long lines in horizontal layouts.
   */
  Description: FieldsetDescription,

  /**
   * FieldsetError component
   *
   * Accessible error container that accepts children or an errors array (e.g.,
   * from react-hook-form).
   *
   * See:
   * - https://ui.shadcn.com/docs/components/field#fielderror
   */
  Error: FieldsetError,

  /**
   * FieldsetSeparator component
   *
   * Visual divider to break up long fieldsets. Can render inline content by
   * passing children (e.g., "Or continue with").
   */
  Separator: FieldsetSeparator,
}
