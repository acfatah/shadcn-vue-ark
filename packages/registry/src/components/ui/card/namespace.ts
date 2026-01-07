import CardAction from './CardAction.vue'
import CardContent from './CardContent.vue'
import CardDescription from './CardDescription.vue'
import CardFooter from './CardFooter.vue'
import CardHeader from './CardHeader.vue'
import CardRoot from './CardRoot.vue'
import CardTitle from './CardTitle.vue'

export const Card = {
  /**
   * CardRoot component
   */
  Root: CardRoot,

  /**
   * CardHeader component
   *
   * Top section for title, description, and optional action.
   */
  Header: CardHeader,

  /**
   * CardContent component
   *
   * Main body area for card content.
   */
  Content: CardContent,

  /**
   * CardFooter component
   *
   * Bottom section for actions or supporting content.
   */
  Footer: CardFooter,

  /**
   * CardTitle component
   *
   * Heading text for the card.
   */
  Title: CardTitle,

  /**
   * CardDescription component
   *
   * Supporting text beneath the title.
   */
  Description: CardDescription,

  /**
   * CardAction component
   *
   * Optional action area aligned within the header.
   */
  Action: CardAction,
}
