<script setup lang="ts">
import { createReusableTemplate, reactiveOmit } from '@vueuse/core'
import { EyeIcon, EyeOffIcon } from 'lucide-vue-next'
import { computed, ref, watch } from 'vue'
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
  showPasswordIcon?: string
  hidePasswordIcon?: string
}
interface Emits extends PrimitiveInputEmits {}

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  ariaLabel: 'Toggle password visibility',
  hideIcon: false,
})

const emits = defineEmits<Emits>()
const delegatedProps = reactiveOmit(props, [
  'ariaLabel',
  'class',
  'hideIcon',
  'showPasswordIcon',
  'hidePasswordIcon',
])
const forwardedProps = useForwardPropsEmits(delegatedProps, emits)
const inputValue = ref(props.defaultValue ?? '')
const revealPassword = ref(false)
const showIcon = computed(() => !props.hideIcon)
const inputType = computed(() => (revealPassword.value ? 'text' : 'password'))
const hasValue = computed(() => inputValue.value.length > 0)

function handleModelValueUpdate(nextValue: string | undefined) {
  inputValue.value = nextValue ?? ''
}

watch(
  () => forwardedProps.value.modelValue,
  (nextValue) => {
    if (nextValue !== undefined)
      inputValue.value = nextValue
  },
  {
    immediate: true,
  },
)

const [UseTemplate, PasswordInput] = createReusableTemplate()
</script>

<template>
  <UseTemplate>
    <PrimitiveInput
      v-bind="{ ...$attrs, ...forwardedProps }"
      scope="password-input"
      data-part="input"
      :type="inputType"
      :aria-label="props.ariaLabel"
      :class="cn(
        showIcon && 'peer pr-9',
        props.class)"
      @update:model-value="handleModelValueUpdate"
    />
  </UseTemplate>

  <template v-if="showIcon">
    <div
      data-scope="password-input"
      data-part="root"
      class="relative"
      :class="cn(
        'relative',
        props.disabled && 'pointer-events-none',
      )"
    >
      <PasswordInput />
      <div
        data-scope="password-input"
        data-part="icon-wrapper"
        :class="cn(
          `
            absolute inset-y-0 right-0 flex items-center justify-center pr-3 text-muted-foreground
            peer-disabled:opacity-50
          `,
          !hasValue && 'pointer-events-none',
        )"
        :aria-label="revealPassword ? 'Hide password' : 'Show password'"
        @click.stop="revealPassword = !revealPassword"
      >
        <slot name="icon">
          <component
            :is="revealPassword ? EyeOffIcon : EyeIcon"
            data-scope="password-input"
            data-part="icon"
            aria-hidden="true"
            :class="cn(
              'size-4 transition-opacity',
              hasValue ? 'opacity-100' : 'opacity-50',
            )"
          />
        </slot>
      </div>
    </div>
  </template>
  <template v-else>
    <PasswordInput />
  </template>
</template>

<style lang="css">
/* https://learn.microsoft.com/en-us/microsoft-edge/web-platform/password-reveal */
::-ms-reveal {
  display: none;
}

input[data-scope='password-input'] {
  -webkit-text-security: none;
  -moz-text-security: none;
}
</style>
