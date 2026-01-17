<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { reactiveOmit, useVModel } from '@vueuse/core'
import { ChevronsUpDownIcon } from 'lucide-vue-next'
import { computed } from 'vue'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

export interface Props {
  id?: string
  name?: string
  defaultValue?: string
  modelValue?: string
  class?: HTMLAttributes['class']
  invalid?: boolean
  loading?: boolean
  readonly?: boolean
  disabled?: boolean
}

export interface Emits {
  (e: 'update:modelValue', payload: string | undefined): void
}

const props = withDefaults(defineProps<Props>(), {
  defaultValue: '',
})

const emits = defineEmits<Emits>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps, emits)

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})

const readonly = computed(() => props.readonly || undefined)
const disabled = computed(() => props.disabled || props.loading || undefined)
const ariaInvalid = computed(() => props.invalid || undefined)
const ariaBusy = computed(() => props.loading || undefined)
</script>

<template>
  <div
    data-scope="select-input"
    data-part="root"
    class="
      group/select-input relative w-full
      has-[select:disabled]:opacity-50
    "
  >
    <select
      :id="props.id"
      v-model="modelValue"
      :name="props.name"
      data-scope="select-input"
      data-part="input"
      :disabled="disabled"
      :aria-invalid="ariaInvalid"
      :aria-readonly="readonly"
      :aria-busy="ariaBusy"
      v-bind="forwardedProps"
      :class="cn(
        `
          h-9 w-full min-w-0 appearance-none rounded-md border border-input bg-transparent px-3 py-2
          pr-9 text-sm shadow-xs transition-[color,box-shadow] outline-none
          selection:bg-primary selection:text-primary-foreground
          placeholder:text-muted-foreground
          disabled:pointer-events-none disabled:cursor-not-allowed
          data-[size=sm]:h-8 data-[size=sm]:py-1
          dark:bg-input/30 dark:hover:bg-input/50
        `,
        `focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50`,
        `
          aria-invalid:border-destructive aria-invalid:ring-destructive/20
          dark:aria-invalid:ring-destructive/40
        `,

        // There are limited option to style `<option>` elements,
        `[&_option]:bg-muted`,
        `[&_option][data-[part=placeholder]]:text-muted-foreground`,

        // Currently, there is no option to change the font color of the option
        // element since it inherits the color from the select element.
        modelValue === '' && 'text-muted-foreground',

        props.class,
      )"
    >
      <slot />
    </select>
    <div
      data-scope="search-input"
      data-part="icon-wrapper"
      class="
        pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-muted-foreground
        select-none
      "
    >
      <slot name="icon">
        <ChevronsUpDownIcon
          data-scope="select-input"
          data-part="icon"
          aria-hidden="true"
          class="size-4"
        />
      </slot>
    </div>
  </div>
</template>
