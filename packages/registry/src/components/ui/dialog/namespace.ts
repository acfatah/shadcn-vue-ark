import DialogRoot from './Dialog.vue'
import DialogClose from './DialogClose.vue'
import DialogContent from './DialogContent.vue'
import DialogDescription from './DialogDescription.vue'
import DialogFooter from './DialogFooter.vue'
import DialogHeader from './DialogHeader.vue'
import DialogOverlay from './DialogOverlay.vue'
import DialogScrollContent from './DialogScrollContent.vue'
import DialogTitle from './DialogTitle.vue'
import DialogTrigger from './DialogTrigger.vue'

export const Dialog = {
  /** Dialog root provider */
  Root: DialogRoot,

  /** Dialog trigger */
  Trigger: DialogTrigger,

  /** Dialog content with overlay */
  Content: DialogContent,

  /** Dialog content with scrollable positioner */
  ScrollContent: DialogScrollContent,

  /** Dialog overlay */
  Overlay: DialogOverlay,

  /** Dialog header container */
  Header: DialogHeader,

  /** Dialog footer container */
  Footer: DialogFooter,

  /** Dialog title */
  Title: DialogTitle,

  /** Dialog description */
  Description: DialogDescription,

  /** Dialog close trigger */
  Close: DialogClose,
}
