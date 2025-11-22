import AccordionContent from './AccordionContent.vue'
import AccordionItem from './AccordionItem.vue'
import AccordionRoot from './AccordionRoot.vue'
import AccordionTrigger from './AccordionTrigger.vue'

import metadata from './metadata'

export const Accordion = {
  description: metadata.description,

  /**
   * AccordionRoot component
   */
  Root: AccordionRoot,

  /**
   * AccordionItem component
   */
  Item: AccordionItem,

  /**
   * AccordionTrigger component
   */
  Trigger: AccordionTrigger,

  /**
   * AccordionContent component
   */
  Content: AccordionContent,
}
