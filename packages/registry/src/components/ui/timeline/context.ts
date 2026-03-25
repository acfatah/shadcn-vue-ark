import type { ComputedRef } from 'vue'

import { createContext } from '@/composables/createContext'

import type { TimelineOptions } from './types'

export type { TimelineOptions, TimelineOrientation, TimelineSize } from './types'

export const [TimelineOptionsProvider, useTimelineOptions]
  = createContext<ComputedRef<TimelineOptions>>('TimelineOptions')
