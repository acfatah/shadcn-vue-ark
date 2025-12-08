<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Icon } from '@iconify/vue'
import { useVModel } from '@vueuse/core'
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  defaultValue?: boolean | null
  modelValue?: boolean | null
  value?: string | number
  name?: string
  disabled?: boolean
  required?: boolean
  invalid?: boolean
  indeterminate?: boolean
  icon?: string
  indeterminateIcon?: string
  class?: HTMLAttributes['class']
}>(), {
  indeterminate: false,
  icon: 'lucide:check',
  indeterminateIcon: 'lucide:minus',
})

const emits = defineEmits<{
  (e: 'update:modelValue', payload: boolean | string | number): void
  (e: 'change', payload: boolean): void
}>()

const checked = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue ?? false,
})

const state = computed(() => {
  const values = [
    [true, 'checked'],
    [false, 'unchecked'],
    [null, 'indeterminate'],
  ]

  return values.find(([val]) => val === checked.value)?.[1] ?? 'unchecked'
})

const invalid = computed(() => props.invalid ?? undefined)
const disabled = computed(() => props.disabled ?? undefined)

function onChange(event: Event) {
  const target = event.target as HTMLInputElement
  emits('change', target.checked)
}

function onClick() {
  if (props.disabled)
    return

  if (props.indeterminate) {
    // Three-state cycle: unchecked -> checked -> indeterminate -> unchecked
    if (checked.value === false) {
      checked.value = true
    }
    else if (checked.value === true) {
      checked.value = null
    }
    else {
      checked.value = false
    }
  }
  else {
    // Two-state toggle: unchecked <-> checked
    if (checked.value === null) {
      checked.value = true
    }
    else {
      checked.value = !checked.value
    }
  }
}
</script>

<template>
  <div
    :data-disabled="disabled ? '' : undefined"
    :class="cn('peer relative inline-flex', props.class)"
    @click="onClick"
  >
    <input
      v-model="checked"
      :value="value"
      :name="name"
      :disabled="disabled"
      :required="required"
      :aria-invalid="invalid"
      data-scope="input"
      data-part="checkbox"
      type="checkbox"
      class="peer sr-only"
      @change="onChange"
    >

    <div
      :disabled="disabled ? '' : undefined"
      :data-state="state"
      :data-invalid="invalid ? 'true' : undefined"
      :class="cn(
        // Currently rounded-lg produces different results from rounded-[4px] here
        `
          size-4 shrink-0 rounded-[4px] border border-input shadow-xs transition-shadow outline-none
          peer-disabled:opacity-50
          disabled:pointer-events-none
        `,
        `
          not-data-[state=checked]:bg-background
          not-data-[state=indeterminate]:bg-background
          data-[state=checked]:border-primary data-[state=checked]:bg-primary
          data-[state=checked]:text-primary-foreground
          data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary
          data-[state=indeterminate]:text-primary-foreground
          data-invalid:data-[state=unchecked]:border-destructive/50
        `,
      )"
    >
      <Icon
        v-if="state === 'checked'"
        :icon="icon "
        class="grid h-3.5 w-3.5 place-content-center text-current transition-none"
      />
      <Icon
        v-if="state === 'indeterminate'"
        :icon="indeterminateIcon "
        class="grid h-3.5 w-3.5 place-content-center text-current transition-none"
      />
    </div>
  </div>
</template>
