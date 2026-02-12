import { Menu } from '@ark-ui/vue/menu'

import ContextMenuRoot from './ContextMenu.vue'
import ContextMenuCheckboxItem from './ContextMenuCheckboxItem.vue'
import ContextMenuContent from './ContextMenuContent.vue'
import ContextMenuGroup from './ContextMenuGroup.vue'
import ContextMenuItem from './ContextMenuItem.vue'
import ContextMenuLabel from './ContextMenuLabel.vue'
import ContextMenuRadioGroup from './ContextMenuRadioGroup.vue'
import ContextMenuRadioItem from './ContextMenuRadioItem.vue'
import ContextMenuSeparator from './ContextMenuSeparator.vue'
import ContextMenuShortcut from './ContextMenuShortcut.vue'
import ContextMenuSub from './ContextMenuSub.vue'
import ContextMenuSubContent from './ContextMenuSubContent.vue'
import ContextMenuSubTrigger from './ContextMenuSubTrigger.vue'
import ContextMenuTrigger from './ContextMenuTrigger.vue'

export const ContextMenu = {
  /**
   * ContextMenuRoot component
   */
  Root: ContextMenuRoot,

  /**
   * ContextMenuTrigger component
   */
  Trigger: ContextMenuTrigger,

  /**
   * ContextMenuContent component
   */
  Content: ContextMenuContent,

  /**
   * ContextMenuItem component
   */
  Item: ContextMenuItem,

  /**
   * ContextMenuCheckboxItem component
   */
  CheckboxItem: ContextMenuCheckboxItem,

  /**
   * ContextMenuRadioGroup component
   */
  RadioGroup: ContextMenuRadioGroup,

  /**
   * ContextMenuRadioItem component
   */
  RadioItem: ContextMenuRadioItem,

  /**
   * ContextMenuLabel component
   */
  Label: ContextMenuLabel,

  /**
   * ContextMenuSeparator component
   */
  Separator: ContextMenuSeparator,

  /**
   * ContextMenuGroup component
   */
  Group: ContextMenuGroup,

  /**
   * ContextMenuSub component
   */
  Sub: ContextMenuSub,

  /**
   * ContextMenuSubTrigger component
   */
  SubTrigger: ContextMenuSubTrigger,

  /**
   * ContextMenuSubContent component
   */
  SubContent: ContextMenuSubContent,

  /**
   * ContextMenuShortcut component
   */
  Shortcut: ContextMenuShortcut,

  /**
   * ContextMenuPositioner component
   */
  Positioner: Menu.Positioner,

  /**
   * ContextMenuItemText component
   */
  ItemText: Menu.ItemText,

  /**
   * ContextMenuItemIndicator component
   */
  ItemIndicator: Menu.ItemIndicator,

  /**
   * ContextMenuIndicator component
   */
  Indicator: Menu.Indicator,

  /**
   * ContextMenuContextTrigger component
   */
  ContextTrigger: Menu.ContextTrigger,

  /**
   * ContextMenuRootProvider component
   */
  RootProvider: Menu.RootProvider,
}
