<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { Pagination } from '@ark-ui/vue/pagination'
import { reactiveOmit } from '@vueuse/core'
import { ChevronRightIcon } from 'lucide-vue-next'
import { computed } from 'vue'

import type { ButtonVariants } from '@/components/ui/button'

import { buttonVariants } from '@/components/ui/button'
import { Dynamic } from '@/composables/dynamic'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

import { usePaginationOptions } from './context'

interface Props {
  asChild?: boolean
  class?: HTMLAttributes['class']
  size?: ButtonVariants['size']
  disabled?: boolean
}

const props = defineProps<Props>()

const delegatedProps = reactiveOmit(props, ['asChild', 'class', 'size', 'disabled'])
const forwardedProps = useForwardPropsEmits(delegatedProps)

const options = usePaginationOptions(computed(() => ({
  itemSize: 'icon',
  controlSize: 'md',
})))

const resolvedSize = computed(() => props.size ?? options.value.controlSize ?? 'md')

function handleClick(event: MouseEvent, pagination: any) {
  const onClick = (forwardedProps.value as { onClick?: (event: MouseEvent) => void })?.onClick

  onClick?.(event)

  if (event.defaultPrevented || props.disabled || pagination.page === pagination.totalPages)
    return

  pagination.goToLastPage()
}
</script>

<template>
  <Pagination.Context v-slot="pagination">
    <component
      :is="props.asChild ? Dynamic : 'button'"
      :type="props.asChild ? undefined : 'button'"
      data-scope="pagination"
      data-part="last-trigger"
      v-bind="forwardedProps"
      :disabled="props.disabled || pagination.page === pagination.totalPages"
      :class="cn(
        buttonVariants({
          variant: 'ghost',
          size: resolvedSize,
        }),
        `
          gap-1 px-2.5
          sm:pr-2.5
        `,
        props.class,
      )"
      @click="(event: MouseEvent) => handleClick(event, pagination)"
    >
      <slot>
        <span
          class="
            hidden
            sm:block
          "
        >Last</span>
        <ChevronRightIcon />
      </slot>
    </component>
  </Pagination.Context>
</template>
