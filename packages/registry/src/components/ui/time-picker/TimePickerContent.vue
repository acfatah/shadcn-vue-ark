<script setup lang="ts">
import type { Period, TimePickerContentProps } from './types'

import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  useId,
  watch,
} from 'vue'

import { cn } from '@/lib/utils'

import { buttonVariants } from '../button'
import PopoverContent from '../popover/PopoverContent.vue'
import { useTimePickerContext } from './context'
import { pad, parseTime, periodOf, to12 } from './utils'

type ListboxKind = 'hour' | 'minute' | 'period'

const props = defineProps<TimePickerContentProps>()
const ctx = useTimePickerContext()!
const uid = useId()

const hourListRef = ref<HTMLElement>()
const minuteListRef = ref<HTMLElement>()
const liveRegion = ref<HTMLElement>()

const focusedHour = ref<number>()
const focusedMinute = ref<number>()
const focusedPeriod = ref<Period>()

const periods: Period[] = ['AM', 'PM']

const is12h = computed(() => ctx.hourCycle.value === 12)

const hours = computed(() => {
  if (is12h.value)
    return Array.from({ length: 12 }, (_, i) => i + 1)

  return Array.from({ length: 24 }, (_, i) => i)
})

const minutes = computed(() => {
  const step = Math.max(1, Math.min(30, ctx.step.value))
  const out: number[] = []
  for (let m = 0; m < 60; m += step)
    out.push(m)

  return out
})

// Distinguish an empty value from a real `00:00` so nothing highlights when
// the picker is empty.
const hasValue = computed(
  () => /^\d{1,2}:\d{1,2}/.test(ctx.timeValue.value ?? ''),
)

const parsed = computed(() => parseTime(ctx.timeValue.value))

const selectedHour = computed(() => {
  if (!hasValue.value)
    return undefined

  return is12h.value ? to12(parsed.value.hour) : parsed.value.hour
})

const selectedMinute = computed(() =>
  hasValue.value ? parsed.value.minute : undefined,
)

const selectedPeriod = computed<Period | undefined>(() => {
  if (!hasValue.value || !is12h.value)
    return undefined

  return periodOf(parsed.value.hour)
})

function hourOptionId(h: number) {
  return `${uid}-hour-${h}`
}

function minuteOptionId(m: number) {
  return `${uid}-minute-${m}`
}

function periodOptionId(p: Period) {
  return `${uid}-period-${p}`
}

const activeHourId = computed(() =>
  focusedHour.value === undefined
    ? undefined
    : hourOptionId(focusedHour.value),
)

const activeMinuteId = computed(() =>
  focusedMinute.value === undefined
    ? undefined
    : minuteOptionId(focusedMinute.value),
)

const activePeriodId = computed(() =>
  focusedPeriod.value === undefined
    ? undefined
    : periodOptionId(focusedPeriod.value),
)

function pickHour(h: number) {
  if (ctx.disabled.value)
    return

  focusedHour.value = h
  ctx.setHour(h)
}

function pickMinute(m: number) {
  if (ctx.disabled.value)
    return

  focusedMinute.value = m
  ctx.setMinute(m)
}

function pickPeriod(p: Period) {
  if (ctx.disabled.value)
    return

  focusedPeriod.value = p
  ctx.setPeriod(p)
}

// Keyboard navigation

function defaultFocusedHour() {
  return selectedHour.value ?? (is12h.value ? 12 : 0)
}

function defaultFocusedMinute() {
  return selectedMinute.value ?? 0
}

function defaultFocusedPeriod(): Period {
  return selectedPeriod.value ?? 'AM'
}

// Seed focus refs from the current selection so arrow keys continue from the
// active item.
function syncFocusFromSelection() {
  if (focusedHour.value === undefined)
    focusedHour.value = defaultFocusedHour()

  if (focusedMinute.value === undefined)
    focusedMinute.value = defaultFocusedMinute()

  if (focusedPeriod.value === undefined)
    focusedPeriod.value = defaultFocusedPeriod()
}

function currentHourIndex() {
  const list = hours.value
  const target = focusedHour.value ?? selectedHour.value ?? defaultFocusedHour()
  const i = list.indexOf(target)

  return i === -1 ? 0 : i
}

function currentMinuteIndex() {
  const list = minutes.value
  const target = focusedMinute.value
    ?? selectedMinute.value
    ?? defaultFocusedMinute()
  const i = list.indexOf(target)

  return i === -1 ? 0 : i
}

function navigateHour(index: number) {
  const list = hours.value
  const value = list[Math.max(0, Math.min(index, list.length - 1))]

  if (value !== undefined)
    pickHour(value)
}

function navigateMinute(index: number) {
  const list = minutes.value
  const value = list[Math.max(0, Math.min(index, list.length - 1))]

  if (value !== undefined)
    pickMinute(value)
}

// Type-ahead state

const typeAheadBuffer = ref('')
let typeAheadTimer: ReturnType<typeof setTimeout> | null = null

function resetTypeAhead() {
  typeAheadBuffer.value = ''

  if (typeAheadTimer) {
    clearTimeout(typeAheadTimer)
    typeAheadTimer = null
  }
}

function handleTypeAhead(kind: 'hour' | 'minute', digit: string) {
  if (typeAheadTimer)
    clearTimeout(typeAheadTimer)

  typeAheadBuffer.value += digit
  const candidate = Number.parseInt(typeAheadBuffer.value, 10)

  if (kind === 'hour') {
    if (hours.value.includes(candidate))
      pickHour(candidate)
  }
  else if (minutes.value.includes(candidate)) {
    pickMinute(candidate)
  }

  typeAheadTimer = setTimeout(resetTypeAhead, 500)
}

function onListboxKeydown(kind: ListboxKind, event: KeyboardEvent) {
  if (ctx.disabled.value)
    return

  syncFocusFromSelection()

  const navKeys = ['ArrowDown', 'ArrowUp', 'Home', 'End', 'PageDown', 'PageUp']
  if (navKeys.includes(event.key))
    resetTypeAhead()

  if (kind === 'hour') {
    const i = currentHourIndex()
    const last = hours.value.length - 1

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        navigateHour(i + 1)
        break
      case 'ArrowUp':
        event.preventDefault()
        navigateHour(i - 1)
        break
      case 'Home':
        event.preventDefault()
        navigateHour(0)
        break
      case 'End':
        event.preventDefault()
        navigateHour(last)
        break
      case 'PageDown':
        event.preventDefault()
        navigateHour(i + 5)
        break
      case 'PageUp':
        event.preventDefault()
        navigateHour(i - 5)
        break
      default:
        if (/^\d$/.test(event.key)) {
          event.preventDefault()
          handleTypeAhead('hour', event.key)
        }
    }

    return
  }

  if (kind === 'minute') {
    const i = currentMinuteIndex()
    const last = minutes.value.length - 1

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        navigateMinute(i + 1)
        break
      case 'ArrowUp':
        event.preventDefault()
        navigateMinute(i - 1)
        break
      case 'Home':
        event.preventDefault()
        navigateMinute(0)
        break
      case 'End':
        event.preventDefault()
        navigateMinute(last)
        break
      case 'PageDown':
        event.preventDefault()
        navigateMinute(i + 3)
        break
      case 'PageUp':
        event.preventDefault()
        navigateMinute(i - 3)
        break
      default:
        if (/^\d$/.test(event.key)) {
          event.preventDefault()
          handleTypeAhead('minute', event.key)
        }
    }

    return
  }

  // Period listbox
  switch (event.key) {
    case 'ArrowDown':
    case 'End':
      event.preventDefault()
      pickPeriod('PM')
      break
    case 'ArrowUp':
    case 'Home':
      event.preventDefault()
      pickPeriod('AM')
      break
  }
}

function onListboxFocus() {
  syncFocusFromSelection()
}

// Scroll the selected option into view within its column.

function scrollToSelected(
  container: HTMLElement | undefined,
  value: number | undefined,
) {
  if (!container || value === undefined)
    return

  const el = container.querySelector(`[data-value="${value}"]`)
  if (el)
    (el as HTMLElement).scrollIntoView({ block: 'nearest' })
}

function scrollAllToSelected() {
  nextTick(() => {
    scrollToSelected(hourListRef.value, selectedHour.value)
    scrollToSelected(minuteListRef.value, selectedMinute.value)
  })
}

// Live region announcement

const announcementText = computed(() => {
  if (!hasValue.value)
    return 'No time selected'

  const { hour, minute } = parsed.value

  if (is12h.value)
    return `Selected time: ${to12(hour)}:${pad(minute)} ${periodOf(hour)}`

  return `Selected time: ${pad(hour)}:${pad(minute)}`
})

let announceTimer: ReturnType<typeof setTimeout> | null = null

watch(
  () => ctx.timeValue.value,
  () => {
    scrollAllToSelected()

    if (announceTimer)
      clearTimeout(announceTimer)

    announceTimer = setTimeout(() => {
      if (liveRegion.value)
        liveRegion.value.textContent = announcementText.value
    }, 300)
  },
)

onMounted(() => {
  scrollAllToSelected()
})

onBeforeUnmount(() => {
  if (typeAheadTimer)
    clearTimeout(typeAheadTimer)

  if (announceTimer)
    clearTimeout(announceTimer)
})
</script>

<template>
  <PopoverContent
    data-scope="time-picker"
    data-part="content"
    :class="cn('w-auto p-2', props.class)"
  >
    <div
      :class="cn(
        'flex items-stretch gap-0.5',
        ctx.disabled.value && 'pointer-events-none opacity-50',
      )"
    >
      <!-- Hours -->
      <div
        ref="hourListRef"
        role="listbox"
        aria-label="Hour"
        aria-orientation="vertical"
        :aria-activedescendant="activeHourId"
        :aria-disabled="ctx.disabled.value || undefined"
        :tabindex="ctx.disabled.value ? -1 : 0"
        class="
          no-scrollbar flex max-h-[220px] w-16 flex-col items-center gap-0.5 overflow-y-auto
          rounded-md p-1 outline-none
          focus-visible:ring-[3px] focus-visible:ring-ring/50
        "
        @focus="onListboxFocus"
        @keydown="onListboxKeydown('hour', $event)"
      >
        <div
          v-for="h in hours"
          :id="hourOptionId(h)"
          :key="h"
          role="option"
          :data-value="h"
          :aria-selected="selectedHour === h"
          :class="cn(
            buttonVariants({ variant: 'ghost', size: 'sm' }),
            'w-full cursor-pointer tabular-nums',
            selectedHour === h && 'bg-accent text-accent-foreground',
          )"
          @click="pickHour(h)"
        >
          {{ pad(h) }}
        </div>
      </div>

      <!-- Minutes -->
      <div
        ref="minuteListRef"
        role="listbox"
        aria-label="Minute"
        aria-orientation="vertical"
        :aria-activedescendant="activeMinuteId"
        :aria-disabled="ctx.disabled.value || undefined"
        :tabindex="ctx.disabled.value ? -1 : 0"
        class="
          no-scrollbar flex max-h-[220px] w-16 flex-col items-center gap-0.5 overflow-y-auto
          rounded-md p-1 outline-none
          focus-visible:ring-[3px] focus-visible:ring-ring/50
        "
        @focus="onListboxFocus"
        @keydown="onListboxKeydown('minute', $event)"
      >
        <div
          v-for="m in minutes"
          :id="minuteOptionId(m)"
          :key="m"
          role="option"
          :data-value="m"
          :aria-selected="selectedMinute === m"
          :class="cn(
            buttonVariants({ variant: 'ghost', size: 'sm' }),
            'w-full cursor-pointer tabular-nums',
            selectedMinute === m && 'bg-accent text-accent-foreground',
          )"
          @click="pickMinute(m)"
        >
          {{ pad(m) }}
        </div>
      </div>

      <!-- AM/PM (12-hour only) -->
      <div
        v-if="is12h"
        role="listbox"
        aria-label="Period (AM/PM)"
        aria-orientation="vertical"
        :aria-activedescendant="activePeriodId"
        :aria-disabled="ctx.disabled.value || undefined"
        :tabindex="ctx.disabled.value ? -1 : 0"
        class="
          flex w-16 flex-col items-center gap-0.5 rounded-md p-1 outline-none
          focus-visible:ring-[3px] focus-visible:ring-ring/50
        "
        @focus="onListboxFocus"
        @keydown="onListboxKeydown('period', $event)"
      >
        <div
          v-for="p in periods"
          :id="periodOptionId(p)"
          :key="p"
          role="option"
          :aria-selected="selectedPeriod === p"
          :class="cn(
            buttonVariants({ variant: 'ghost', size: 'sm' }),
            'w-full cursor-pointer',
            selectedPeriod === p && 'bg-accent text-accent-foreground',
          )"
          @click="pickPeriod(p)"
        >
          {{ p }}
        </div>
      </div>

      <!-- Live region for screen reader announcements -->
      <div
        ref="liveRegion"
        role="status"
        aria-live="polite"
        aria-atomic="true"
        class="sr-only"
      />
    </div>
  </PopoverContent>
</template>
