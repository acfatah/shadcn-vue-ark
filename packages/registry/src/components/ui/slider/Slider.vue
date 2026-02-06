<script setup lang="ts">
import type { SliderRootEmits, SliderRootProps } from '@ark-ui/vue/slider'
import type { HTMLAttributes } from 'vue'

import { Slider } from '@ark-ui/vue/slider'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

interface Props extends SliderRootProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const emits = defineEmits<SliderRootEmits>()

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <Slider.Root
    data-scope="slider"
    data-part="root"
    :class="cn(
      `
        w-full touch-none select-none
        data-disabled:opacity-50
      `,
      props.class,
    )"
    v-bind="forwardedProps"
  >
    <Slider.Control
      data-scope="slider"
      data-part="control"
      class="
        relative flex w-full items-center
        data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44
        data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col
      "
    >
      <Slider.Track
        data-scope="slider"
        data-part="track"
        class="
          relative grow overflow-hidden rounded-full bg-muted
          data-[orientation=horizontal]:h-1 data-[orientation=horizontal]:w-full
          data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1
        "
      >
        <Slider.Range
          data-scope="slider"
          data-part="range"
          class="
            absolute bg-primary
            data-[orientation=horizontal]:h-full
            data-[orientation=vertical]:w-full
          "
        />
      </Slider.Track>

      <Slider.Context v-slot="slider">
        <Slider.Thumb
          v-for="(_, index) in slider.value"
          :key="index"
          :index="index"
          data-scope="slider"
          data-part="thumb"
          class="
            block size-3 shrink-0 rounded-full border border-ring bg-white shadow-sm ring-ring/50
            transition-[color,box-shadow]
            hover:ring-3
            focus-visible:ring-3 focus-visible:outline-hidden
            disabled:pointer-events-none disabled:opacity-50
          "
        />
      </Slider.Context>
    </Slider.Control>
  </Slider.Root>
</template>
