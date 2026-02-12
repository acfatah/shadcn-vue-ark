<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

import type { InputGroupVariants } from '.'

import { inputGroupAddonVariants } from '.'

const props = withDefaults(defineProps<{
  align?: InputGroupVariants['align']
  class?: HTMLAttributes['class']
}>(), {
  align: 'inline-start',
})

const delegatedProps = reactiveOmit(props, ['align', 'class'])
const forwardedProps = useForwardPropsEmits(delegatedProps)

function handleInputGroupAddonClick(event: MouseEvent) {
  const currentTarget = event.currentTarget as HTMLElement | null
  const target = event.target as HTMLElement | null

  if (target?.closest('button')) {
    return
  }

  const root = currentTarget?.closest('[data-scope="input-group"][data-part="root"]')
  const control = root?.querySelector<HTMLElement>('[data-part="control"]')

  control?.focus()
}
</script>

<template>
  <div
    v-bind="forwardedProps"
    role="group"
    data-scope="input-group"
    data-part="addon"
    :data-align="props.align"
    :class="cn(inputGroupAddonVariants({ align: props.align }), props.class)"
    @click="handleInputGroupAddonClick"
  >
    <slot />
  </div>
</template>
