<script setup lang="ts">
import { Avatar } from '@ark-ui/vue/avatar'
import { reactiveOmit } from '@vueuse/core'
import { useForwardProps } from '@/composables/use-forward-props'
import { cn } from '@/lib/utils'

interface Props {
  class?: string
}

const props = withDefaults(defineProps<Props>(), {})
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <Avatar.Image
    v-bind="forwardedProps"
    :class="cn(
      `aspect-square size-full`,
      props.class,
    )"
  />
</template>
