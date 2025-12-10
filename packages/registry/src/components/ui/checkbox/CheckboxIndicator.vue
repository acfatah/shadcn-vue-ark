<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Checkbox } from '@ark-ui/vue/checkbox'
import { Icon } from '@iconify/vue'
import { reactiveOmit } from '@vueuse/core'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'

interface Props {
  class?: HTMLAttributes['class']
  icon?: string
}

const props = withDefaults(defineProps<Props>(), {
  icon: 'lucide:check',
})

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Checkbox.Indicator v-bind="forwardedProps">
    <slot>
      <Icon
        data-part="icon"
        :icon="props.icon"
        class="grid h-3.5 w-3.5 place-content-center text-current transition-none"
      />
    </slot>
  </Checkbox.Indicator>
</template>
