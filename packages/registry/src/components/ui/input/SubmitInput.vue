<script setup lang="ts">
import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'

import type { ButtonProps } from '../button'

import { Button } from '../button'

const props = defineProps<ButtonProps>()
const forwardedProps = useForwardPropsEmits(props)
</script>

<template>
  <Button
    data-scope="submit-input"
    type="submit"
    v-bind="forwardedProps"
  >
    <slot />
  </Button>
</template>
