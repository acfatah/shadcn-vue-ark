import DatePickerContent from './DatePickerContent.vue'
import DatePickerRoot from './DatePickerRoot.vue'
import DatePickerTrigger from './DatePickerTrigger.vue'

export const DatePicker = {
  /**
   * Root component that provides date picker context and popover positioning.
   */
  Root: DatePickerRoot,

  /**
   * Trigger button that displays the selected date and opens the calendar popover.
   */
  Trigger: DatePickerTrigger,

  /**
   * Popover content that renders the calendar for date selection.
   */
  Content: DatePickerContent,
}
