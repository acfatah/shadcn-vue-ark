<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { reactiveOmit } from '@vueuse/core'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'
import type {
  Emits as PrimitiveInputEmits,
  Props as PrimitiveInputProps,
} from './PrimitiveInput.vue'
import PrimitiveInput from './PrimitiveInput.vue'

interface Props extends Omit<PrimitiveInputProps, 'scope' | 'type'> {
  ariaLabel?: string
  icon?: string
}
interface Emits extends PrimitiveInputEmits {}

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  ariaLabel: 'Search',
  icon: 'lucide:search',
})

const emits = defineEmits<Emits>()
const delegatedProps = reactiveOmit(props, ['ariaLabel', 'icon', 'class'])
const forwardedProps = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <div class="relative">
    <PrimitiveInput
      scope="search-input"
      type="search"
      :aria-label="props.ariaLabel"
      :class="cn('peer pl-9', props.class)"
      v-bind="{ ...$attrs, ...forwardedProps }"
    />
    <div
      class="
        pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3
        text-muted-foreground
        peer-disabled:opacity-50
      "
    >
      <Icon
        data-scope="search-input"
        data-part="icon"
        aria-hidden="true"
        :icon="props.icon"
      />
    </div>
  </div>
</template>
