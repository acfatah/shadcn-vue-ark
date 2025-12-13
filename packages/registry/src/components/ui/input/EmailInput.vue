<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { createReusableTemplate, reactiveOmit } from '@vueuse/core'
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
  noIcon?: boolean
  icon?: string
}
interface Emits extends PrimitiveInputEmits {}

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  ariaLabel: 'Email address',
  noIcon: false,
  icon: 'lucide:mail',
})

const emits = defineEmits<Emits>()
const delegatedProps = reactiveOmit(props, ['ariaLabel', 'class', 'icon', 'noIcon'])
const forwardedProps = useForwardPropsEmits(delegatedProps, emits)
const nativeInvalid = ref(false)
const hasIcon = computed(() => !props.noIcon && !!props.icon)

function handleInvalid(_event: Event) {
  nativeInvalid.value = true
}

const [UseTemplate, EmailInput] = createReusableTemplate()
</script>

<template>
  <UseTemplate>
    <PrimitiveInput
      scope="email-input"
      type="email"
      :aria-label="props.ariaLabel"
      :aria-invalid="nativeInvalid"
      :class="cn(
        hasIcon && 'peer pl-9',
        props.class)"
      v-bind="{ ...$attrs, ...forwardedProps }"
      @invalid="handleInvalid"
      @input="nativeInvalid = false"
    />
  </UseTemplate>

  <template v-if="hasIcon">
    <div class="relative">
      <EmailInput />
      <div
        data-scope="email-input"
        data-part="icon-wrapper"
        class="
          pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3
          text-muted-foreground
          peer-disabled:opacity-50
        "
      >
        <Icon
          data-scope="email-input"
          data-part="icon"
          aria-hidden="true"
          :icon="props.icon"
        />
      </div>
    </div>
  </template>
  <template v-else>
    <EmailInput />
  </template>
</template>
