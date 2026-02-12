import DrawerClose from './DrawerClose.vue'
import DrawerContent from './DrawerContent.vue'
import DrawerDescription from './DrawerDescription.vue'
import DrawerFooter from './DrawerFooter.vue'
import DrawerHeader from './DrawerHeader.vue'
import DrawerOverlay from './DrawerOverlay.vue'
import DrawerRoot from './DrawerRoot.vue'
import DrawerTitle from './DrawerTitle.vue'
import DrawerTrigger from './DrawerTrigger.vue'

export const Drawer = {
  /** Drawer root provider */
  Root: DrawerRoot,

  /** Drawer trigger */
  Trigger: DrawerTrigger,

  /** Drawer content with overlay */
  Content: DrawerContent,

  /** Drawer overlay */
  Overlay: DrawerOverlay,

  /** Drawer header container */
  Header: DrawerHeader,

  /** Drawer footer container */
  Footer: DrawerFooter,

  /** Drawer title */
  Title: DrawerTitle,

  /** Drawer description */
  Description: DrawerDescription,

  /** Drawer close trigger */
  Close: DrawerClose,
}
