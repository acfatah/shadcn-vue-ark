import { createInjectionState } from '@vueuse/core'
import emblaCarouselVue from 'embla-carousel-vue'
import { computed, onMounted, ref } from 'vue'

import type {
  UnwrapRefCarouselApi as CarouselApi,
  CarouselEmits,
  CarouselProps,
} from './interface'

const [useProvideCarousel, useInjectCarousel] = createInjectionState(
  (props: CarouselProps, emits: CarouselEmits) => {
    const orientation = computed(() => props.orientation ?? 'horizontal')

    const [emblaNode, emblaApi] = emblaCarouselVue({
      ...props.opts,
      axis: orientation.value === 'horizontal' ? 'x' : 'y',
    }, props.plugins)

    const canScrollNext = ref(false)
    const canScrollPrev = ref(false)

    function onSelect(api: CarouselApi) {
      canScrollNext.value = api?.canScrollNext() || false
      canScrollPrev.value = api?.canScrollPrev() || false
    }

    function scrollPrev() {
      emblaApi.value?.scrollPrev()
    }

    function scrollNext() {
      emblaApi.value?.scrollNext()
    }

    onMounted(() => {
      if (!emblaApi.value)
        return

      emblaApi.value.on('init', onSelect)
      emblaApi.value.on('reInit', onSelect)
      emblaApi.value.on('select', onSelect)

      onSelect(emblaApi.value)
      emits('init-api', emblaApi.value)
    })

    return {
      carouselRef: emblaNode,
      carouselApi: emblaApi,
      canScrollPrev,
      canScrollNext,
      scrollPrev,
      scrollNext,
      orientation,
    }
  },
)

function useCarousel() {
  const carouselState = useInjectCarousel()

  if (!carouselState)
    throw new Error('useCarousel must be used within a <CarouselRoot />')

  return carouselState
}

export { useCarousel, useProvideCarousel }
