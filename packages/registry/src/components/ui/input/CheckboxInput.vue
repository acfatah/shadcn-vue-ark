<script setup lang="ts">
import type { HTMLAttributes, WritableComputedRef } from 'vue'
import { Icon } from '@iconify/vue'
import { reactiveOmit, useVModel } from '@vueuse/core'
import { computed, ref, watch } from 'vue'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

interface Props {
  name?: string
  defaultValue?: boolean | null
  modelValue?: boolean | null
  value?: string | number
  required?: boolean
  disabled?: boolean
  loading?: boolean
  invalid?: boolean
  indeterminate?: boolean
  checkedIcon?: string
  indeterminateIcon?: string
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  indeterminate: false,
  checkedIcon: 'lucide:check',
  indeterminateIcon: 'lucide:minus',
})

const emits = defineEmits<{
  (e: 'update:modelValue', payload: boolean | null): void
  (e: 'change', payload: boolean | null): void
}>()

const checked = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue ?? false,
}) as WritableComputedRef<boolean | null>

const state = computed(() => {
  const values = [
    [true, 'checked'],
    [false, 'unchecked'],
    [null, 'indeterminate'],
  ]

  return values.find(([val]) => val === checked.value)?.[1] ?? 'unchecked'
})

const delegatedProps = reactiveOmit(props, [
  'checkedIcon',
  'class',
  'defaultValue',
  'disabled',
  'invalid',
  'indeterminate',
  'indeterminateIcon',
  'loading',
  'modelValue',
  'required',
])
const forwardedProps = useForwardPropsEmits(delegatedProps, emits)
const inputRef = ref<HTMLInputElement | null>(null)

watch(
  () => state.value,
  (value) => {
    if (inputRef.value)
      inputRef.value.indeterminate = value === 'indeterminate'
  },
  { immediate: true },
)

const invalid = computed(() => props.invalid || undefined)
const dataInvalid = computed(() => (props.invalid ? '' : undefined))
const disabled = computed(() => props.disabled || props.loading || undefined)
const dataDisabled = computed(() => (disabled.value ? '' : undefined))
const ariaChecked = computed(
  () => state.value === 'indeterminate' ? 'mixed' : state.value === 'checked' ? 'true' : 'false',
)
const ariaBusy = computed(() => props.loading || undefined)
const dataLoading = computed(() => (props.loading ? '' : undefined))

function onChange() {
  emits('change', checked.value)
}

function onClick() {
  if (disabled.value)
    return

  let next: boolean | null

  if (props.indeterminate) {
    // Three-state cycle: unchecked -> checked -> indeterminate -> unchecked
    if (checked.value === false) {
      next = true
    }
    else if (checked.value === true) {
      next = null
    }
    else {
      next = false
    }
  }
  else {
    // Two-state toggle: unchecked / checked
    if (checked.value === null) {
      next = true
    }
    else {
      next = !checked.value
    }
  }

  checked.value = next
  emits('change', next)
}
</script>

<template>
  <div
    :class="cn('peer relative inline-flex', props.class)"
    data-scope="checkbox-input"
    data-part="root"
    :data-state="state"
    :data-disabled="dataDisabled"
    :data-invalid="dataInvalid"
    :data-loading="dataLoading"
    @click="onClick"
  >
    <input
      ref="inputRef"
      v-bind="forwardedProps"
      v-model="checked"
      :value="props.value"
      :disabled="disabled"
      :required="required"
      :aria-invalid="invalid"
      :aria-checked="ariaChecked"
      :aria-busy="ariaBusy"
      data-scope="checkbox-input"
      data-part="input"
      type="checkbox"
      class="peer sr-only"
      @change="onChange"
      @click.stop
      @keydown.space.prevent="onClick"
    >
    <div
      data-scope="checkbox-input"
      data-part="control"
      :data-state="state"
      :data-invalid="dataInvalid"
      :data-disabled="dataDisabled"
      :data-loading="dataLoading"
      :class="cn(
        // Currently rounded-lg produces different results from rounded-[4px] here
        `
          size-4 shrink-0 rounded-[4px] border border-input shadow-xs transition-shadow outline-none
          disabled:pointer-events-none
        `,
        `
          peer-focus-visible:border-ring peer-focus-visible:ring-[3px]
          peer-focus-visible:ring-ring/50
          peer-disabled:opacity-50
        `,
        `
          not-data-[state=checked]:bg-background
          not-data-[state=indeterminate]:bg-background
          data-[state=checked]:border-primary data-[state=checked]:bg-primary
          data-[state=checked]:text-primary-foreground
          data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary
          data-[state=indeterminate]:text-primary-foreground
          data-invalid:data-[state=unchecked]:border-destructive/50
          dark:not-data-[state=checked]:not-data-[state=indeterminate]:bg-input/30
        `,
      )"
    >
      <Icon
        v-show="state === 'checked'"
        data-scope="checkbox-input"
        data-part="checked-icon"
        :icon="checkedIcon"
        class="grid h-3.5 w-3.5 place-content-center text-current transition-none"
      />
      <Icon
        v-show="state === 'indeterminate'"
        data-scope="checkbox-input"
        data-part="indeterminate-icon"
        :icon="indeterminateIcon"
        class="grid h-3.5 w-3.5 place-content-center text-current transition-none"
      />
    </div>
  </div>
</template>
