import DatetimePickerContent
  from './DatetimePickerContent.vue'
import DatetimePickerRoot from './DatetimePickerRoot.vue'
import DatetimePickerTimeScroll
  from './DatetimePickerTimeScroll.vue'
import DatetimePickerTrigger
  from './DatetimePickerTrigger.vue'

export const DatetimePicker = {
  /**
   * Root component that provides datetime picker context
   * and popover positioning.
   */
  Root: DatetimePickerRoot,

  /**
   * Trigger button that displays the selected datetime
   * and opens the picker popover.
   */
  Trigger: DatetimePickerTrigger,

  /**
   * Popover content that renders the calendar and time
   * scroll for datetime selection.
   */
  Content: DatetimePickerContent,

  /**
   * Scrollable time picker with hour, minute,
   * and optional AM/PM columns.
   */
  TimeScroll: DatetimePickerTimeScroll,
}
