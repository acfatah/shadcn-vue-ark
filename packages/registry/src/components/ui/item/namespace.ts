import ItemActions from './ItemActions.vue'
import ItemContent from './ItemContent.vue'
import ItemDescription from './ItemDescription.vue'
import ItemFooter from './ItemFooter.vue'
import ItemGroup from './ItemGroup.vue'
import ItemHeader from './ItemHeader.vue'
import ItemMedia from './ItemMedia.vue'
import ItemRoot from './ItemRoot.vue'
import ItemSeparator from './ItemSeparator.vue'
import ItemTitle from './ItemTitle.vue'

export const Item = {
  /**
   * ItemGroup component
   *
   * Wraps multiple Item.Root entries as a list container.
   */
  Group: ItemGroup,

  /** ItemRoot component */
  Root: ItemRoot,

  /** ItemHeader component */
  Header: ItemHeader,

  /**
   * ItemMedia component
   *
   * Leading media slot. Use `variant="icon"` or `variant="image"` for
   * presets.
   */
  Media: ItemMedia,

  /** Content container that holds title and description */
  Content: ItemContent,

  /** ItemTitle component */
  Title: ItemTitle,

  /** ItemDescription component */
  Description: ItemDescription,

  /** ItemActions component */
  Actions: ItemActions,

  /** ItemFooter component */
  Footer: ItemFooter,

  /** ItemSeparator component */
  Separator: ItemSeparator,
}
