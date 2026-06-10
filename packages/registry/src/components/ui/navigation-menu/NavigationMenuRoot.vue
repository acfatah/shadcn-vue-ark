<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { NavigationMenu } from '@ark-ui/vue/navigation-menu'
import { reactiveOmit } from '@vueuse/core'
import { computed } from 'vue'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

import type { NavigationMenuRootEmits, NavigationMenuRootProps } from './types'

import { NavigationMenuOptionsProvider } from './context'
import NavigationMenuViewport from './NavigationMenuViewport.vue'

interface Props extends NavigationMenuRootProps {
  class?: HTMLAttributes['class']
  viewport?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  viewport: true,
})
const emit = defineEmits<NavigationMenuRootEmits>()
const delegatedProps = reactiveOmit(props, ['class', 'viewport'])
const forwardedProps = useForwardPropsEmits(delegatedProps, emit)

const options = computed(() => ({
  viewport: props.viewport,
}))

NavigationMenuOptionsProvider(options)
</script>

<template>
  <NavigationMenu.Root
    v-bind="forwardedProps"
    :class="cn(
      'group/navigation-menu relative flex max-w-max flex-1 items-center justify-center',
      props.class,
    )"
  >
    <slot />
    <NavigationMenuViewport v-if="viewport" />
  </NavigationMenu.Root>
</template>
