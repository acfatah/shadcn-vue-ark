import SheetClose from './SheetClose.vue'
import SheetContent from './SheetContent.vue'
import SheetDescription from './SheetDescription.vue'
import SheetFooter from './SheetFooter.vue'
import SheetHeader from './SheetHeader.vue'
import SheetOverlay from './SheetOverlay.vue'
import SheetRoot from './SheetRoot.vue'
import SheetTitle from './SheetTitle.vue'
import SheetTrigger from './SheetTrigger.vue'

export const Sheet = {
  /** Sheet root provider */
  Root: SheetRoot,

  /** Sheet trigger */
  Trigger: SheetTrigger,

  /** Sheet content with overlay */
  Content: SheetContent,

  /** Sheet overlay */
  Overlay: SheetOverlay,

  /** Sheet header container */
  Header: SheetHeader,

  /** Sheet footer container */
  Footer: SheetFooter,

  /** Sheet title */
  Title: SheetTitle,

  /** Sheet description */
  Description: SheetDescription,

  /** Sheet close trigger */
  Close: SheetClose,
}
