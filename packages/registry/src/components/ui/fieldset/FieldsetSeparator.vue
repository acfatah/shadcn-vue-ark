<script setup lang="ts">
import type { PolymorphicProps } from '@ark-ui/vue'
import type { HTMLAttributes } from 'vue'

import { ark } from '@ark-ui/vue'
import { reactiveOmit } from '@vueuse/core'
import { computed, useSlots } from 'vue'

import { Separator } from '@/components/ui/separator'
import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends PolymorphicProps {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {})
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)

const slots = useSlots()
const hasContent = computed(() => {
  const slot = slots.default?.()

  return Boolean(slot && slot.length > 0)
})
</script>

<template>
  <ark.div
    data-scope="fieldset"
    data-part="separator"
    :data-content="hasContent"
    v-bind="forwardedProps"
    :class="cn(
      `
        relative -my-2 h-5 text-sm
        group-data-[variant=outline]/field-group:-mb-2
      `,
      props.class,
    )"
  >
    <Separator class="absolute inset-0 top-1/2" />
    <span
      v-if="hasContent"
      data-scope="fieldset"
      data-part="separator-content"
      class="relative mx-auto block w-fit bg-background px-2 text-muted-foreground"
    >
      <slot />
    </span>
  </ark.div>
</template>
