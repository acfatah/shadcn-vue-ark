<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'
import { FullscreenIcon, MinimizeIcon } from 'lucide-vue-next'

const { isFullscreen, toggle } = useFullscreen(document.querySelector('body'))
</script>

<template>
  <button
    data-scope="fullscreen-toggle"
    data-part="button"
    class="
      inline-flex size-8 items-center justify-center gap-2 rounded-md text-sm font-medium
      whitespace-nowrap ring-offset-background transition-colors
      hover:bg-accent hover:text-accent-foreground
      focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
      focus-visible:outline-none
      disabled:pointer-events-none disabled:opacity-50
      [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0
    "
    aria-label="Toggle fullscreen mode"
    @click="toggle()"
  >
    <FullscreenIcon
      v-if="!isFullscreen"
      data-scope="fullscreen-toggle"
      data-part="icon"
      class="ease-out"
    />
    <MinimizeIcon
      v-if="isFullscreen"
      data-scope="fullscreen-toggle"
      data-part="icon"
      class="ease-out"
    />
  </button>
</template>
