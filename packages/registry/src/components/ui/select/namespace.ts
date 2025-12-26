import SelectClearTrigger from './SelectClearTrigger.vue'
import SelectContent from './SelectContent.vue'
import SelectEmpty from './SelectEmpty.vue'
import SelectIndicator from './SelectIndicator.vue'
import SelectItem from './SelectItem.vue'
import SelectItemGroup from './SelectItemGroup.vue'
import SelectItemGroupLabel from './SelectItemGroupLabel.vue'
import SelectItemIndicator from './SelectItemIndicator.vue'
import SelectItemText from './SelectItemText.vue'
import SelectLabel from './SelectLabel.vue'
import SelectRoot from './SelectRoot.vue'
import SelectSeparator from './SelectSeparator.vue'
import SelectTrigger from './SelectTrigger.vue'
import SelectValueText from './SelectValueText.vue'

import { Select as ArkSelect } from '@ark-ui/vue/select'

export const Select = {
  /**
   * SelectClearTrigger component
   */
  ClearTrigger: SelectClearTrigger,

  /**
   * SelectContent component
   */
  Content: SelectContent,

  /**
   * SelectControl component
   */
  Control: ArkSelect.Control,

  /**
   * SelectEmpty component
   */
  Empty: SelectEmpty,

  /**
   * SelectHiddenSelect component
   */
  HiddenSelect: ArkSelect.HiddenSelect,

  /**
   * SelectIndicator component
   */
  Indicator: SelectIndicator,

  /**
   * SelectItem component
   */
  Item: SelectItem,

  /**
   * SelectItemGroup component
   */
  ItemGroup: SelectItemGroup,

  /**
   * SelectItemGroupLabel component
   */
  ItemGroupLabel: SelectItemGroupLabel,

  /**
   * SelectItemIndicator component
   */
  ItemIndicator: SelectItemIndicator,

  /**
   * SelectItemText component
   */
  ItemText: SelectItemText,

  /**
   * SelectLabel component
   */
  Label: SelectLabel,

  /**
   * SelectPositioner component
   */
  Positioner: ArkSelect.Positioner,

  /**
   * SelectRoot component
   */
  Root: SelectRoot,

  /**
   * SelectRootProvider component
   */
  RootProvider: ArkSelect.RootProvider,

  /**
   * SelectSeparator component
   */
  Separator: SelectSeparator,

  /**
   * SelectTrigger component
   */
  Trigger: SelectTrigger,

  /**
   * SelectValueText component
   */
  ValueText: SelectValueText,
}
