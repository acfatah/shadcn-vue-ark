<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import {
  CalendarDateTime,
  getLocalTimeZone,
  now,
} from '@internationalized/date'
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
import ScrollAreaRoot from '../scroll-area/ScrollArea.vue'
import { useDatetimePickerContext } from './context'

type ListboxKind = 'hour' | 'minute' | 'period'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const ctx = useDatetimePickerContext()!
const uid = useId()

const hourRef = ref<InstanceType<typeof ScrollAreaRoot>>()
const minuteRef = ref<InstanceType<typeof ScrollAreaRoot>>()
const liveRegion = ref<HTMLElement>()
const focusedHour = ref<number>()
const focusedMinute = ref<number>()
const focusedPeriod = ref<'AM' | 'PM'>()

const is12h = computed(() => ctx.hourCycle.value === 12)

const hours = computed(() => {
  if (is12h.value)
    return Array.from({ length: 12 }, (_, i) => i + 1)

  return Array.from({ length: 24 }, (_, i) => i)
})

const minutes = computed(() =>
  Array.from({ length: 60 }, (_, i) => i),
)

const periods = ['AM', 'PM'] as const

const selectedHour = computed(() => {
  if (!ctx.datetimeValue.value)
    return undefined

  const h = ctx.datetimeValue.value.hour

  if (is12h.value) {
    const h12 = h % 12

    return h12 === 0 ? 12 : h12
  }

  return h
})

const selectedMinute = computed(
  () => ctx.datetimeValue.value?.minute,
)

const selectedPeriod = computed(() => {
  if (!ctx.datetimeValue.value)
    return undefined

  return ctx.datetimeValue.value.hour >= 12 ? 'PM' : 'AM'
})

function hourOptionId(hour: number) {
  return `${uid}-hour-${hour}`
}

function minuteOptionId(minute: number) {
  return `${uid}-minute-${minute}`
}

function periodOptionId(period: 'AM' | 'PM') {
  return `${uid}-period-${period}`
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

function resolveBase(): CalendarDateTime {
  const current = ctx.datetimeValue.value

  if (current)
    return current

  const n = now(getLocalTimeZone())

  return new CalendarDateTime(
    n.year,
    n.month,
    n.day,
    n.hour,
    n.minute,
  )
}

function setHour(hour: number) {
  if (ctx.disabled.value)
    return

  focusedHour.value = hour
  const base = resolveBase()

  let h24 = hour
  if (is12h.value) {
    const isPm = base.hour >= 12
    if (hour === 12)
      h24 = isPm ? 12 : 0
    else
      h24 = isPm ? hour + 12 : hour
  }

  ctx.setDatetime(
    base.set({ hour: h24 }),
  )
}

function setMinute(minute: number) {
  if (ctx.disabled.value)
    return

  focusedMinute.value = minute
  const base = resolveBase()

  ctx.setDatetime(
    base.set({ minute }),
  )
}

function setPeriod(period: 'AM' | 'PM') {
  if (ctx.disabled.value)
    return

  focusedPeriod.value = period
  const base = resolveBase()
  const currentHour = base.hour
  const isCurrentlyPm = currentHour >= 12

  if (
    (period === 'PM' && !isCurrentlyPm)
    || (period === 'AM' && isCurrentlyPm)
  ) {
    const newHour = period === 'PM'
      ? currentHour + 12
      : currentHour - 12

    ctx.setDatetime(
      base.set({ hour: newHour }),
    )
  }

  if (!ctx.datetimeValue.value)
    ctx.setDatetime(base)
}

function scrollToSelected(
  container: InstanceType<typeof ScrollAreaRoot> | undefined,
  value: number | string | undefined,
) {
  if (!container || value === undefined)
    return

  const el = (
    container.$el as HTMLElement
  ).querySelector(`[data-value="${value}"]`)

  if (el) {
    el.scrollIntoView({
      block: 'nearest',
      behavior: 'smooth',
    })
  }
}

function scrollAllToSelected() {
  nextTick(() => {
    scrollToSelected(hourRef.value, selectedHour.value)
    scrollToSelected(
      minuteRef.value,
      selectedMinute.value,
    )
  })
}

function pad(n: number): string {
  return n.toString().padStart(2, '0')
}

function defaultFocusedHour() {
  const base = resolveBase()

  if (is12h.value) {
    const h12 = base.hour % 12

    return h12 === 0 ? 12 : h12
  }

  return base.hour
}

function defaultFocusedMinute() {
  return resolveBase().minute
}

function defaultFocusedPeriod() {
  return resolveBase().hour >= 12 ? 'PM' : 'AM'
}

// Sync focus refs with the selected value so keyboard
// navigation continues from the active item.
function syncFocusFromSelection() {
  if (focusedHour.value === undefined)
    focusedHour.value = selectedHour.value ?? defaultFocusedHour()

  if (focusedMinute.value === undefined)
    focusedMinute.value = selectedMinute.value ?? defaultFocusedMinute()

  if (focusedPeriod.value === undefined)
    focusedPeriod.value = selectedPeriod.value ?? defaultFocusedPeriod()
}

// Keyboard navigation

function navigateHour(index: number) {
  const list = hours.value
  const next = Math.max(0, Math.min(index, list.length - 1))
  const value = list[next]

  if (value !== undefined)
    setHour(value)
}

function navigateMinute(index: number) {
  const list = minutes.value
  const next = Math.max(0, Math.min(index, list.length - 1))
  const value = list[next]

  if (value !== undefined)
    setMinute(value)
}

function currentHourIndex() {
  const list = hours.value
  const target = focusedHour.value
    ?? selectedHour.value
    ?? defaultFocusedHour()

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
      setHour(candidate)
  }
  else if (candidate >= 0 && candidate <= 59) {
    setMinute(candidate)
  }

  typeAheadTimer = setTimeout(resetTypeAhead, 500)
}

function onListboxKeydown(kind: ListboxKind, event: KeyboardEvent) {
  if (ctx.disabled.value)
    return

  syncFocusFromSelection()

  const navKeys = [
    'ArrowDown',
    'ArrowUp',
    'Home',
    'End',
    'PageDown',
    'PageUp',
    'Enter',
    ' ',
    'Escape',
  ]

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
        navigateMinute(i + 10)
        break
      case 'PageUp':
        event.preventDefault()
        navigateMinute(i - 10)
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
      setPeriod('PM')
      break
    case 'ArrowUp':
    case 'Home':
      event.preventDefault()
      setPeriod('AM')
      break
  }
}

// Initialize focus refs when a listbox gains focus.
function onListboxFocus() {
  syncFocusFromSelection()
}

// Live region announcement

const announcementText = computed(() => {
  const v = ctx.datetimeValue.value

  if (!v)
    return 'No time selected'

  const h = is12h.value
    ? (v.hour % 12 === 0 ? 12 : v.hour % 12)
    : v.hour
  const m = pad(v.minute)
  const p = is12h.value ? (v.hour >= 12 ? 'PM' : 'AM') : ''

  return `Selected time: ${h}:${m} ${p}`.trim()
})

let announceTimer: ReturnType<typeof setTimeout> | null = null

watch(
  () => ctx.datetimeValue.value,
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

// Prevent the ScrollArea viewport from stealing keyboard
// focus from the listboxes.
function disableViewportFocus(
  container: InstanceType<typeof ScrollAreaRoot> | undefined,
) {
  const viewport = (
    container?.$el as HTMLElement | undefined
  )?.querySelector(
    '[data-part="viewport"]',
  ) as HTMLElement | null

  if (viewport)
    viewport.tabIndex = -1
}

onMounted(() => {
  scrollAllToSelected()
  disableViewportFocus(hourRef.value)
  disableViewportFocus(minuteRef.value)
})

onBeforeUnmount(() => {
  if (typeAheadTimer)
    clearTimeout(typeAheadTimer)

  if (announceTimer)
    clearTimeout(announceTimer)
})
</script>

<template>
  <div
    data-scope="datetime-picker"
    data-part="time-scroll"
    :class="cn(
      'relative self-stretch',
      is12h ? 'w-49' : 'w-32.5',
    )"
  >
    <div
      :class="cn(
        'absolute inset-0 flex gap-0.5',
        ctx.disabled.value && 'pointer-events-none opacity-50',
        props.class,
      )"
    >
      <!-- Hours -->
      <ScrollAreaRoot
        ref="hourRef"
        class="
          h-full w-16 rounded-md
          focus-within:ring-[3px] focus-within:ring-ring/50
        "
        hide-scrollbar
      >
        <div
          role="listbox"
          aria-label="Hour"
          aria-orientation="vertical"
          :aria-activedescendant="activeHourId"
          :aria-disabled="ctx.disabled.value || undefined"
          :tabindex="ctx.disabled.value ? -1 : 0"
          class="flex flex-col items-center gap-0.5 rounded-md p-1 outline-none"
          @focus="onListboxFocus"
          @keydown="onListboxKeydown('hour', $event)"
        >
          <div
            v-for="hour in hours"
            :id="hourOptionId(hour)"
            :key="hour"
            role="option"
            :data-value="hour"
            :aria-selected="selectedHour === hour"
            :aria-disabled="ctx.disabled.value || undefined"
            :class="cn(
              buttonVariants({ variant: 'ghost', size: 'sm' }),
              'w-full cursor-pointer tabular-nums',
              selectedHour === hour
                && 'bg-accent text-accent-foreground',
            )"
            @click="setHour(hour)"
          >
            {{ pad(hour) }}
          </div>
        </div>
      </ScrollAreaRoot>

      <!-- Minutes -->
      <ScrollAreaRoot
        ref="minuteRef"
        class="
          h-full w-16 rounded-md
          focus-within:ring-[3px] focus-within:ring-ring/50
        "
        hide-scrollbar
      >
        <div
          role="listbox"
          aria-label="Minute"
          aria-orientation="vertical"
          :aria-activedescendant="activeMinuteId"
          :aria-disabled="ctx.disabled.value || undefined"
          :tabindex="ctx.disabled.value ? -1 : 0"
          class="flex flex-col items-center gap-0.5 rounded-md p-1 outline-none"
          @focus="onListboxFocus"
          @keydown="onListboxKeydown('minute', $event)"
        >
          <div
            v-for="minute in minutes"
            :id="minuteOptionId(minute)"
            :key="minute"
            role="option"
            :data-value="minute"
            :aria-selected="selectedMinute === minute"
            :aria-disabled="ctx.disabled.value || undefined"
            :class="cn(
              buttonVariants({ variant: 'ghost', size: 'sm' }),
              'w-full cursor-pointer tabular-nums',
              selectedMinute === minute
                && 'bg-accent text-accent-foreground',
            )"
            @click="setMinute(minute)"
          >
            {{ pad(minute) }}
          </div>
        </div>
      </ScrollAreaRoot>

      <!-- AM/PM (12h only) -->
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
          v-for="period in periods"
          :id="periodOptionId(period)"
          :key="period"
          role="option"
          :aria-selected="selectedPeriod === period"
          :aria-disabled="ctx.disabled.value || undefined"
          :class="cn(
            buttonVariants({ variant: 'ghost', size: 'sm' }),
            'w-full cursor-pointer',
            selectedPeriod === period
              && 'bg-accent text-accent-foreground',
          )"
          @click="setPeriod(period)"
        >
          {{ period }}
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
  </div>
</template>
