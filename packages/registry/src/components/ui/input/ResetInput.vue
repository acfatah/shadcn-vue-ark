<script setup lang="ts">
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import type { ButtonProps } from '../button'
import { Button } from '../button'

const props = defineProps<ButtonProps>()
const forwardedProps = useForwardPropsEmits(props)
</script>

<template>
  <Button
    data-scope="reset-input"
    type="reset"
    v-bind="forwardedProps"
    variant="outline"
  >
    <slot />
  </Button>
</template>
