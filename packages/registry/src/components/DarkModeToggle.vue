<script setup lang="ts">
import { UseDark } from '@vueuse/components'
import { MoonIcon, SunIcon } from 'lucide-vue-next'
</script>

<template>
  <UseDark v-slot="{ isDark, toggleDark }">
    <button
      data-scope="dark-mode-toggle"
      data-part="button"
      class="
        inline-flex h-8 w-8 items-center justify-center gap-2 rounded-md text-sm font-medium
        whitespace-nowrap ring-offset-background transition-colors
        hover:bg-accent hover:text-accent-foreground
        focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
        focus-visible:outline-none
        disabled:pointer-events-none disabled:opacity-50
        [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0
      "
      aria-label="Toggle dark mode"
      @click="toggleDark()"
    >
      <MoonIcon
        v-if="!isDark"
        data-scope="dark-mode-toggle"
        data-part="icon"
      />
      <SunIcon
        v-if="isDark"
        data-scope="dark-mode-toggle"
        data-part="icon"
      />
    </button>
  </UseDark>
</template>
