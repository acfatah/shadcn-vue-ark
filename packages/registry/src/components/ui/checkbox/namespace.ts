import CheckboxContent from './CheckboxContent.vue'
import CheckboxControl from './CheckboxControl.vue'
import CheckboxDescription from './CheckboxDescription.vue'
import CheckboxGroup from './CheckboxGroup.vue'
import CheckboxHiddenInput from './CheckboxHiddenInput.vue'
import CheckboxIndicator from './CheckboxIndicator.vue'
import CheckboxLabel from './CheckboxLabel.vue'
import CheckboxRoot from './CheckboxRoot.vue'

import { Checkbox as ArkCheckbox } from '@ark-ui/vue/checkbox'

export const Checkbox = {
  /**
   * CheckboxRoot component
   */
  Root: CheckboxRoot,

  /**
   * CheckboxContent component
   *
   * A flex column that groups label and description. Not required if you have no description.
   */
  Content: CheckboxContent,

  /**
   * CheckboxLabel component
   */
  Label: CheckboxLabel,

  /**
   * CheckboxDescription component
   */
  Description: CheckboxDescription,

  /**
   * CheckboxControl component
   */
  Control: CheckboxControl,

  /**
   * CheckboxIndicator component
   */
  Indicator: CheckboxIndicator,

  /**
   * CheckboxHiddenInput component
   */
  HiddenInput: CheckboxHiddenInput,

  /**
   * CheckboxRootProvider component
   *
   * See: https://ark-ui.com/docs/components/checkbox#props
   */
  RootProvider: ArkCheckbox.RootProvider,

  /**
   * CheckboxGroup component
   *
   * Component to manage a group of checkboxes.
   */
  Group: CheckboxGroup,
}
