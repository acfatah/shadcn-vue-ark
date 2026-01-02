<script setup lang="ts">
import type { SelectIndicatorProps } from '@ark-ui/vue/select'
import type { HTMLAttributes } from 'vue'
import { Select, useSelectContext } from '@ark-ui/vue/select'
import { Icon } from '@iconify/vue'
import { reactiveOmit } from '@vueuse/core'
import { computed } from 'vue'
import { useForwardExpose } from '@/composables/use-forward-expose'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

interface Props extends SelectIndicatorProps {
  class?: HTMLAttributes['class']
  icon?: string
}

const props = withDefaults(defineProps<Props>(), {
  icon: 'lucide:chevron-down',
})

const delegatedProps = reactiveOmit(props, ['class', 'icon'])
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
      <Icon
        data-part="icon"
        :data-state="state"
        :icon="props.icon"
        class="
          size-4 shrink-0 transition-transform duration-250
          data-[state=open]:rotate-180
        "
      />
    </slot>
  </Select.Indicator>
</template>
