<script setup lang="ts">
import type { MenuRootEmits, MenuRootProps } from '@ark-ui/vue/menu'

import { Menu } from '@ark-ui/vue/menu'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'

interface Props extends MenuRootProps {}

const props = defineProps<Props>()
const emit = defineEmits<MenuRootEmits>()
const forwardedProps = useForwardPropsEmits(props, emit)
</script>

<template>
  <Menu.Root
    v-bind="forwardedProps"
    data-scope="menubar"
    data-part="menu"
  >
    <slot />
  </Menu.Root>
</template>
