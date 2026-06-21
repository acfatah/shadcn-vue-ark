import TimePickerContent from './TimePickerContent.vue'
import TimePickerRoot from './TimePickerRoot.vue'
import TimePickerTrigger from './TimePickerTrigger.vue'

export const TimePicker = {
  /**
   * Root component that provides time picker context and popover state.
   */
  Root: TimePickerRoot,

  /**
   * Trigger button that displays the formatted time and opens the popover.
   */
  Trigger: TimePickerTrigger,

  /**
   * Popover content with hour, minute, and optional AM/PM listbox columns.
   */
  Content: TimePickerContent,
}
