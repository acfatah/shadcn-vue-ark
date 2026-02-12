import { Menu } from '@ark-ui/vue/menu'

import MenubarCheckboxItem from './MenubarCheckboxItem.vue'
import MenubarContent from './MenubarContent.vue'
import MenubarGroup from './MenubarGroup.vue'
import MenubarItem from './MenubarItem.vue'
import MenubarLabel from './MenubarLabel.vue'
import MenubarMenu from './MenubarMenu.vue'
import MenubarRadioGroup from './MenubarRadioGroup.vue'
import MenubarRadioItem from './MenubarRadioItem.vue'
import MenubarRoot from './MenubarRoot.vue'
import MenubarSeparator from './MenubarSeparator.vue'
import MenubarShortcut from './MenubarShortcut.vue'
import MenubarSub from './MenubarSub.vue'
import MenubarSubContent from './MenubarSubContent.vue'
import MenubarSubTrigger from './MenubarSubTrigger.vue'
import MenubarTrigger from './MenubarTrigger.vue'

export const Menubar = {
  /**
   * MenubarRoot component
   */
  Root: MenubarRoot,

  /**
   * MenubarMenu component
   */
  Menu: MenubarMenu,

  /**
   * MenubarTrigger component
   */
  Trigger: MenubarTrigger,

  /**
   * MenubarContent component
   */
  Content: MenubarContent,

  /**
   * MenubarItem component
   */
  Item: MenubarItem,

  /**
   * MenubarCheckboxItem component
   */
  CheckboxItem: MenubarCheckboxItem,

  /**
   * MenubarRadioGroup component
   */
  RadioGroup: MenubarRadioGroup,

  /**
   * MenubarRadioItem component
   */
  RadioItem: MenubarRadioItem,

  /**
   * MenubarLabel component
   */
  Label: MenubarLabel,

  /**
   * MenubarSeparator component
   */
  Separator: MenubarSeparator,

  /**
   * MenubarGroup component
   */
  Group: MenubarGroup,

  /**
   * MenubarSub component
   */
  Sub: MenubarSub,

  /**
   * MenubarSubTrigger component
   */
  SubTrigger: MenubarSubTrigger,

  /**
   * MenubarSubContent component
   */
  SubContent: MenubarSubContent,

  /**
   * MenubarShortcut component
   */
  Shortcut: MenubarShortcut,

  /**
   * MenubarPositioner component
   */
  Positioner: Menu.Positioner,

  /**
   * MenubarItemText component
   */
  ItemText: Menu.ItemText,

  /**
   * MenubarItemIndicator component
   */
  ItemIndicator: Menu.ItemIndicator,

  /**
   * MenubarIndicator component
   */
  Indicator: Menu.Indicator,

  /**
   * MenubarContextTrigger component
   */
  ContextTrigger: Menu.ContextTrigger,

  /**
   * MenubarRootProvider component
   */
  RootProvider: Menu.RootProvider,
}
