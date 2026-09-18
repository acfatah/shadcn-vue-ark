<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'

import type { CustomizerConfig } from './lib/config'

import { decodePreset, encodePreset, generateRandomConfig } from './lib/preset'
import { buildRegistryThemeItem, buildThemeCss } from './lib/theme-export'

type CopyKind = 'code' | 'css' | 'json'

const props = defineProps<{ config: CustomizerConfig }>()
const emit = defineEmits<{ apply: [config: CustomizerConfig] }>()

const code = computed(() => encodePreset(props.config))

const loadValue = ref('')
const loadError = ref('')
const copied = ref<CopyKind | ''>('')

// Announced via a polite live region so AT users get copy confirmation (an
// in-place button label change on the focused element is not reliably re-read).
const copiedMessage = computed(() => {
  if (copied.value === 'code')
    return 'Copied preset code'

  if (copied.value === 'css')
    return 'Copied CSS'

  if (copied.value === 'json')
    return 'Copied JSON'

  return ''
})

let resetTimer: ReturnType<typeof setTimeout> | undefined

function payload(kind: CopyKind): string {
  if (kind === 'code')
    return code.value

  if (kind === 'css')
    return buildThemeCss(props.config)

  return JSON.stringify(buildRegistryThemeItem(props.config), null, 2)
}

async function copy(kind: CopyKind) {
  try {
    await navigator.clipboard?.writeText(payload(kind))
    copied.value = kind
    clearTimeout(resetTimer)
    resetTimer = setTimeout(() => {
      copied.value = ''
    }, 1200)
  }
  catch {
    // Ignore clipboard failures (e.g. an insecure context).
  }
}

function load() {
  const decoded = decodePreset(loadValue.value.trim())
  if (!decoded) {
    loadError.value = 'Invalid preset code'

    return
  }

  loadError.value = ''
  loadValue.value = ''
  emit('apply', decoded)
}

function shuffle() {
  emit('apply', generateRandomConfig())
}

onBeforeUnmount(() => clearTimeout(resetTimer))
</script>

<template>
  <div class="flex flex-col gap-3">
    <span role="status" aria-live="polite" class="sr-only">{{ copiedMessage }}</span>

    <div class="flex flex-col gap-1.5">
      <span class="text-sm font-medium">Preset</span>
      <div class="flex items-center gap-2">
        <code class="min-w-0 flex-1 truncate rounded-md border bg-muted px-2 py-1 font-mono text-xs">--preset {{ code }}</code>
        <button
          type="button"
          class="
            shrink-0 rounded-md border px-2.5 py-1 text-sm transition-colors
            hover:bg-accent hover:text-accent-foreground
          "
          @click="copy('code')"
        >
          {{ copied === 'code' ? 'Copied' : 'Copy' }}
        </button>
      </div>
    </div>

    <div class="flex flex-wrap gap-2">
      <button
        type="button"
        class="
          rounded-md border px-2.5 py-1 text-sm transition-colors
          hover:bg-accent hover:text-accent-foreground
        "
        @click="copy('css')"
      >
        {{ copied === 'css' ? 'Copied CSS' : 'Copy CSS' }}
      </button>
      <button
        type="button"
        class="
          rounded-md border px-2.5 py-1 text-sm transition-colors
          hover:bg-accent hover:text-accent-foreground
        "
        @click="copy('json')"
      >
        {{ copied === 'json' ? 'Copied JSON' : 'Copy JSON' }}
      </button>
      <button
        type="button"
        class="
          rounded-md border px-2.5 py-1 text-sm transition-colors
          hover:bg-accent hover:text-accent-foreground
        "
        @click="shuffle"
      >
        Shuffle
      </button>
    </div>

    <form class="flex flex-col gap-1" @submit.prevent="load">
      <label for="load-preset" class="text-sm font-medium">Load code</label>
      <div class="flex items-center gap-2">
        <input
          id="load-preset"
          v-model="loadValue"
          type="text"
          placeholder="e.g. a8G"
          :aria-invalid="loadError ? 'true' : undefined"
          :aria-describedby="loadError ? 'load-preset-error' : undefined"
          class="
            min-w-0 flex-1 rounded-md border bg-background px-2 py-1 text-sm outline-none
            focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50
            aria-invalid:border-destructive aria-invalid:ring-destructive/20
          "
          @input="loadError = ''"
        >
        <button
          type="submit"
          class="
            shrink-0 rounded-md border px-2.5 py-1 text-sm transition-colors
            hover:bg-accent hover:text-accent-foreground
          "
        >
          Load
        </button>
      </div>
      <p
        v-if="loadError"
        id="load-preset-error"
        role="alert"
        class="text-xs text-destructive"
      >
        {{ loadError }}
      </p>
    </form>
  </div>
</template>
