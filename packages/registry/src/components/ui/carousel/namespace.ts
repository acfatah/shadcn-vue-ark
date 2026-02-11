import CarouselContent from './CarouselContent.vue'
import CarouselItem from './CarouselItem.vue'
import CarouselNext from './CarouselNext.vue'
import CarouselPrevious from './CarouselPrevious.vue'
import CarouselRoot from './CarouselRoot.vue'

export const Carousel = {
  /** Carousel root provider */
  Root: CarouselRoot,

  /** Carousel scroll content */
  Content: CarouselContent,

  /** Carousel item */
  Item: CarouselItem,

  /** Carousel previous control */
  Previous: CarouselPrevious,

  /** Carousel next control */
  Next: CarouselNext,
}
