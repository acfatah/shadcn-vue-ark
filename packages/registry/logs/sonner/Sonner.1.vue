<script setup lang="ts">
import type { createToaster, ToasterProps } from '@ark-ui/vue/toast'
import type { HTMLAttributes } from 'vue'

import { Toaster as ArkToaster, Toast } from '@ark-ui/vue/toast'
import { reactiveOmit } from '@vueuse/core'
import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
  XIcon,
} from 'lucide-vue-next'

import { useForwardProps } from '@/composables/use-forward-props'
import { cn } from '@/lib/utils'

import { toaster } from '../../src/components/ui/sonner'

type ToasterInstance = ReturnType<typeof createToaster>

interface Props extends Omit<ToasterProps, 'toaster'> {
  class?: HTMLAttributes['class']
  toaster?: ToasterInstance
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, ['class', 'toaster'])
const forwardedProps = useForwardProps(delegatedProps)

const iconMap = {
  success: CircleCheckIcon,
  info: InfoIcon,
  warning: TriangleAlertIcon,
  error: OctagonXIcon,
  loading: Loader2Icon,
} as const
</script>

<template>
  <ArkToaster
    v-bind="forwardedProps"
    :toaster="props.toaster ?? toaster"
    :class="cn(
      'toaster group pointer-events-none flex w-full flex-col items-end gap-2 p-4 sm:max-w-[420px]',
      props.class,
    )"
  >
    <template #default="toast">
      <Toast.Root
        v-if="toast"
        :data-type="toast.type"
        :class="cn(
          `
            pointer-events-auto relative flex w-full flex-col gap-3 rounded-md border bg-background
            p-4 text-foreground shadow-lg
          `,
          'w-full sm:max-w-[420px]',
          toast.type === 'success' && 'border-emerald-500/30',
          toast.type === 'info' && 'border-sky-500/30',
          toast.type === 'warning' && 'border-amber-500/30',
          toast.type === 'error' && 'border-red-500/30',
        )"
      >
        <div class="flex items-start gap-3">
          <component
            :is="iconMap[toast.type]"
            v-if="toast.type && iconMap[toast.type]"
            :class="cn(
              'mt-0.5 size-4 text-muted-foreground',
              toast.type === 'loading' && 'animate-spin',
            )"
          />
          <div class="grid gap-1">
            <Toast.Title
              v-if="toast.title"
              class="text-sm font-semibold"
            >
              {{ toast.title }}
            </Toast.Title>
            <Toast.Description
              v-if="toast.description"
              class="text-sm text-muted-foreground"
            >
              {{ toast.description }}
            </Toast.Description>
          </div>
        </div>
        <Toast.ActionTrigger
          v-if="toast.action"
          class="
            inline-flex h-8 w-fit items-center justify-center rounded-md border bg-background px-3
            text-xs font-medium transition-colors
            hover:bg-muted
          "
        >
          {{ toast.action?.label }}
        </Toast.ActionTrigger>
        <Toast.CloseTrigger
          aria-label="Close toast"
          class="
            absolute top-2 right-2 rounded-md p-1 text-muted-foreground transition
            hover:text-foreground
            focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
            focus-visible:outline-none
          "
        >
          <XIcon class="size-4" />
        </Toast.CloseTrigger>
      </Toast.Root>
    </template>
  </ArkToaster>
</template>
