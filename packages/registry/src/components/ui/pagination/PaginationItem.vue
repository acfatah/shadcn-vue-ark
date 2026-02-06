<script setup lang="ts">
import type { PaginationItemProps } from '@ark-ui/vue/pagination'
import type { HTMLAttributes } from 'vue'

import { Pagination } from '@ark-ui/vue/pagination'
import { reactiveOmit } from '@vueuse/core'
import { computed } from 'vue'

import type { ButtonVariants } from '@/components/ui/button'

import { buttonVariants } from '@/components/ui/button'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

import { usePaginationOptions } from './context'

interface Props extends PaginationItemProps {
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
  isActive?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'page',
})

const options = usePaginationOptions(computed(() => ({
  itemSize: 'icon',
  controlSize: 'md',
})))

const resolvedSize = computed(() => props.size ?? options.value.itemSize ?? 'icon')
const isControlledActive = computed(() => props.isActive !== undefined)
const itemVariant = computed(() => (props.isActive ? 'outline' : 'ghost'))

const delegatedProps = reactiveOmit(props, ['class', 'size', 'isActive'])
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Pagination.Item
    data-scope="pagination"
    data-part="item"
    v-bind="forwardedProps"
    :type="props.type"
    :value="props.value"
    :class="cn(
      buttonVariants({
        variant: itemVariant,
        size: resolvedSize,
      }),
      !isControlledActive
        ? `
          data-selected:border data-selected:bg-background data-selected:shadow-xs
          data-selected:hover:bg-accent data-selected:hover:text-accent-foreground
          dark:data-selected:border-input dark:data-selected:bg-input/30
          dark:data-selected:hover:bg-input/50
        `
        : null,
      props.class,
    )"
  >
    <slot />
  </Pagination.Item>
</template>
