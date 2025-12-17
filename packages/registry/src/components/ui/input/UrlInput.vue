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
  hideIcon?: boolean
  icon?: string
}
interface Emits extends PrimitiveInputEmits {}

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  ariaLabel: 'URL address',
  hideIcon: false,
  icon: 'lucide:link',
})

const emits = defineEmits<Emits>()
const delegatedProps = reactiveOmit(props, ['ariaLabel', 'class', 'icon', 'hideIcon'])
const forwardedProps = useForwardPropsEmits(delegatedProps, emits)
const nativeInvalid = ref(false)
const hasIcon = computed(() => !props.hideIcon && !!props.icon)
const ariaInvalid = computed(() => (props.invalid || nativeInvalid.value) ? 'true' : undefined)

function handleInvalid(_event: Event) {
  nativeInvalid.value = true
}

const [UseTemplate, EmailInput] = createReusableTemplate()
</script>

<template>
  <UseTemplate>
    <PrimitiveInput
      scope="url-input"
      data-part="input"
      type="url"
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
      data-scope="url-input"
      data-part="root"
      class="relative"
    >
      <EmailInput />
      <div
        data-scope="url-input"
        data-part="icon-wrapper"
        class="
          pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3
          text-muted-foreground
          peer-disabled:opacity-50
          peer-aria-invalid:text-destructive
        "
      >
        <Icon
          data-scope="url-input"
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
