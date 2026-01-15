<script setup lang="ts">
import { createReusableTemplate, reactiveOmit } from '@vueuse/core'
import { MailIcon } from 'lucide-vue-next'
import { computed, ref } from 'vue'
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
  ariaLabel: 'Email address',
  hideIcon: false,
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

const [UseTemplate, EmailInput] = createReusableTemplate()
</script>

<template>
  <UseTemplate>
    <PrimitiveInput
      scope="email-input"
      data-part="input"
      type="email"
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
      data-scope="email-input"
      data-part="root"
      class="relative"
    >
      <EmailInput />
      <div
        data-scope="email-input"
        data-part="icon-wrapper"
        class="
          pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3
          text-muted-foreground
          peer-disabled:opacity-50
          peer-aria-invalid:text-destructive
        "
      >
        <slot name="icon">
          <MailIcon
            data-scope="email-input"
            data-part="icon"
            aria-hidden="true"
            class="size-4"
          />
        </slot>
      </div>
    </div>
  </template>

  <template v-else>
    <EmailInput />
  </template>
</template>
