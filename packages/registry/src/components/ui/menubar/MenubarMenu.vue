<script setup lang="ts">
import { Menu } from '@ark-ui/vue/menu'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'

import type { MenuRootEmits, MenuRootProps } from './types'

interface Props extends MenuRootProps {}

const props = defineProps<Props>()
const emit = defineEmits<MenuRootEmits>()
const forwardedProps = useForwardPropsEmits(props, emit)
</script>

<template>
  <Menu.Root
    v-bind="forwardedProps"
  >
    <slot />
  </Menu.Root>
</template>
