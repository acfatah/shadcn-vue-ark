import AvatarFallback from './AvatarFallback.vue'
import AvatarGroup from './AvatarGroup.vue'
import AvatarImage from './AvatarImage.vue'
import AvatarRoot from './AvatarRoot.vue'

export const Avatar = {
  /**
   * AvatarGroup component
   *
   * Wraps multiple Avatar components to display them as a group with overlapping
   * styles.
   */
  Group: AvatarGroup,

  /** AvatarRoot component */
  Root: AvatarRoot,

  /** AvatarImage component */
  Image: AvatarImage,

  /** AvatarFallback component */
  Fallback: AvatarFallback,
}
