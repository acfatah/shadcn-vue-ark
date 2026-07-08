<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useId, watchEffect } from 'vue'

import type { CustomizerConfig } from './lib/config'

import { buildThemeVars } from './lib/build-theme-vars'

const props = withDefaults(
  defineProps<{
    /** Base color + theme + radius selection to preview. */
    config: CustomizerConfig

    /** Show the preview in dark mode, independent of the Storybook toolbar. */
    dark?: boolean
  }>(),
  { dark: false },
)

// Per-instance scope id so multiple previews on one page never share a var
// scope. It is only ever used inside a quoted attribute selector, so the value
// needs no escaping.
const scopeId = useId()
const rootEl = ref<HTMLElement | null>(null)

// Injected <style> element, created imperatively rather than in the template:
// Vue parses a template <style> as a raw-text element (mustaches do not
// interpolate), so we manage a real element by hand instead. This mirrors the
// upstream design-system provider and keeps the rules scoped to this wrapper.
let styleEl: HTMLStyleElement | null = null

const css = computed(() => {
  const selector = `[data-preview-root="${scopeId}"]`
  const { light: lightVars, dark: darkVars } = buildThemeVars(props.config)

  // Radius lives only in the light set; the base rule sets it and the .dark
  // rule (colors only) leaves it untouched, so it cascades to both modes.
  return [
    rule(selector, lightVars),
    rule(`${selector}.dark`, darkVars),
  ]
    .filter(Boolean)
    .join('\n')
})

// Create and fill the style element before first paint so the preview never
// flashes unstyled. watchEffect then keeps it in sync with later config changes.
onMounted(() => {
  styleEl = document.createElement('style')
  styleEl.textContent = css.value
  rootEl.value?.prepend(styleEl)
})

watchEffect(() => {
  const value = css.value
  if (styleEl)
    styleEl.textContent = value
})

onBeforeUnmount(() => {
  styleEl?.remove()
  styleEl = null
})

function rule(selector: string, tokens: Record<string, string>): string {
  const body = Object.entries(tokens)
    .filter(([, value]) => value !== '')
    .map(([key, value]) => `  --${key}: ${value};`)
    .join('\n')

  if (!body)
    return ''

  return `${selector} {\n${body}\n}`
}
</script>

<template>
  <div
    ref="rootEl"
    :data-preview-root="scopeId"
    :class="{ dark }"
    :style="{ colorScheme: dark ? 'dark' : 'light' }"
    class="bg-background text-foreground"
  >
    <slot />
  </div>
</template>
