<script setup lang="ts">
import { createReusableTemplate, reactiveOmit } from '@vueuse/core'
import { PhoneIcon } from 'lucide-vue-next'
import { computed, ref } from 'vue'

import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

import type {
  Emits as PrimitiveInputEmits,
  Props as PrimitiveInputProps,
} from './PrimitiveInput.vue'

import PrimitiveInput from './PrimitiveInput.vue'

interface Props extends Omit<PrimitiveInputProps, 'scope' | 'type'> {
  pattern?: string
  ariaLabel?: string
  hideIcon?: boolean
}
interface Emits extends PrimitiveInputEmits {}

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  ariaLabel: 'Phone number',
  hideIcon: false,
  icon: 'lucide:phone',
})

const emits = defineEmits<Emits>()
const delegatedProps = reactiveOmit(props, ['ariaLabel', 'class', 'hideIcon'])
const forwardedProps = useForwardPropsEmits(delegatedProps, emits)
const nativeInvalid = ref(false)
const hasIcon = computed(() => !props.hideIcon)
const ariaInvalid = computed(() => (props.invalid || nativeInvalid.value) ? 'true' : undefined)

function handleInvalid(_event: Event) {
  nativeInvalid.value = true
}

const [UseTemplate, TelInput] = createReusableTemplate()
</script>

<template>
  <UseTemplate>
    <PrimitiveInput
      scope="tel-input"
      data-part="input"
      type="tel"
      :aria-label="props.ariaLabel"
      :aria-invalid="ariaInvalid"
      :class="cn(
        hasIcon && 'peer pl-9',
        props.class)"
      v-bind="{ ...$attrs, ...forwardedProps }"
      @invalid="handleInvalid"
      @input="nativeInvalid = false"
    />
  </UseTemplate>

  <template v-if="hasIcon">
    <div
      data-scope="tel-input"
      data-part="root"
      class="relative"
    >
      <TelInput />
      <div
        data-scope="tel-input"
        data-part="icon-wrapper"
        class="
          pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3
          text-muted-foreground
          peer-disabled:opacity-50
          peer-aria-invalid:text-destructive
        "
      >
        <slot name="icon">
          <PhoneIcon
            data-scope="tel-input"
            data-part="icon"
            aria-hidden="true"
            class="size-4"
          />
        </slot>
      </div>
    </div>
  </template>

  <template v-else>
    <TelInput />
  </template>
</template>
