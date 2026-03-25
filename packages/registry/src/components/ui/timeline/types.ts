export type TimelineSize = 'sm' | 'md' | 'lg'
export type TimelineOrientation = 'vertical' | 'horizontal'

export interface TimelineOptions {
  size?: TimelineSize
  orientation?: TimelineOrientation
  reversed?: boolean
}
