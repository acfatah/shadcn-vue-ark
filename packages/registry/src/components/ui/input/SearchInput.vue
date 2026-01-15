<script setup lang="ts">
import { createReusableTemplate, reactiveOmit } from '@vueuse/core'
import { SearchIcon } from 'lucide-vue-next'
import { computed } from 'vue'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'
import type {
  Emits as PrimitiveInputEmits,
  Props as PrimitiveInputProps,
} from './PrimitiveInput.vue'
import PrimitiveInput from './PrimitiveInput.vue'

interface Props extends Omit<PrimitiveInputProps, 'scope' | 'type'> {
  ariaLabel?: string
  hideIcon?: boolean
}
interface Emits extends PrimitiveInputEmits {}

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  ariaLabel: 'Search',
  hideIcon: false,
})

const emits = defineEmits<Emits>()
const delegatedProps = reactiveOmit(props, ['ariaLabel', 'class', 'hideIcon'])
const forwardedProps = useForwardPropsEmits(delegatedProps, emits)
const hasIcon = computed(() => !props.hideIcon)

const [UseTemplate, SearchInput] = createReusableTemplate()
</script>

<template>
  <UseTemplate>
    <PrimitiveInput
      scope="search-input"
      data-part="input"
      type="search"
      :aria-label="props.ariaLabel"
      :class="cn(
        hasIcon && 'peer pl-9',
        props.class)"
      v-bind="{ ...$attrs, ...forwardedProps }"
    />
  </UseTemplate>

  <template v-if="hasIcon">
    <div
      data-scope="search-input"
      data-part="root"
      class="relative"
    >
      <SearchInput />
      <div
        data-scope="search-input"
        data-part="icon-wrapper"
        class="
          pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3
          text-muted-foreground
          peer-disabled:opacity-50
        "
      >
        <slot name="icon">
          <SearchIcon
            data-scope="search-input"
            data-part="icon"
            aria-hidden="true"
            class="size-4"
          />
        </slot>
      </div>
    </div>
  </template>
  <template v-else>
    <SearchInput />
  </template>
</template>
