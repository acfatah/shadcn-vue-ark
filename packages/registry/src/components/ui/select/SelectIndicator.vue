<script setup lang="ts">
import type { SelectIndicatorProps } from '@ark-ui/vue/select'
import type { HTMLAttributes } from 'vue'
import { Select, useSelectContext } from '@ark-ui/vue/select'
import { reactiveOmit } from '@vueuse/core'
import { ChevronDownIcon } from 'lucide-vue-next'
import { computed } from 'vue'
import { useForwardExpose } from '@/composables/use-forward-expose'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

interface Props extends SelectIndicatorProps {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {})

const delegatedProps = reactiveOmit(props, 'class')
const selectContext = useSelectContext()
const state = computed(() => (selectContext.value.open ? 'open' : 'closed'))
const forwardedProps = useForwardPropsEmits(delegatedProps)
useForwardExpose()
</script>

<template>
  <Select.Indicator
    v-bind="forwardedProps"
    :class="cn(
      'absolute right-2 flex size-3.5 items-center justify-center',
      props.class,
    )"
  >
    <slot>
      <ChevronDownIcon
        data-part="icon"
        :data-state="state"
        class="
          size-4 shrink-0 transition-transform duration-250
          data-[state=open]:rotate-180
        "
      />
    </slot>
  </Select.Indicator>
</template>
