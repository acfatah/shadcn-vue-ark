import RangeCalendarCell from './RangeCalendarCell.vue'
import RangeCalendarCellTrigger from './RangeCalendarCellTrigger.vue'
import RangeCalendarGrid from './RangeCalendarGrid.vue'
import RangeCalendarGridBody from './RangeCalendarGridBody.vue'
import RangeCalendarGridHead from './RangeCalendarGridHead.vue'
import RangeCalendarGridRow from './RangeCalendarGridRow.vue'
import RangeCalendarHeadCell from './RangeCalendarHeadCell.vue'
import RangeCalendarHeader from './RangeCalendarHeader.vue'
import RangeCalendarHeading from './RangeCalendarHeading.vue'
import RangeCalendarNextButton from './RangeCalendarNextButton.vue'
import RangeCalendarPrevButton from './RangeCalendarPrevButton.vue'
import RangeCalendarRoot from './RangeCalendarRoot.vue'

export const RangeCalendar = {
  /**
   * RangeCalendarRoot component
   *
   * Root wrapper for range calendar views.
   */
  Root: RangeCalendarRoot,

  /**
   * RangeCalendarHeader component
   *
   * Header area that wraps navigation and heading.
   */
  Header: RangeCalendarHeader,

  /**
   * RangeCalendarHeading component
   *
   * Displays the current view label.
   */
  Heading: RangeCalendarHeading,

  /**
   * RangeCalendarPrevButton component
   *
   * Button that navigates to the previous page.
   */
  PrevButton: RangeCalendarPrevButton,

  /**
   * RangeCalendarNextButton component
   *
   * Button that navigates to the next page.
   */
  NextButton: RangeCalendarNextButton,

  /**
   * RangeCalendarGrid component
   *
   * Grid container for calendar rows and cells.
   */
  Grid: RangeCalendarGrid,

  /**
   * RangeCalendarGridHead component
   *
   * Head section for weekday labels.
   */
  GridHead: RangeCalendarGridHead,

  /**
   * RangeCalendarGridBody component
   *
   * Body section for day rows.
   */
  GridBody: RangeCalendarGridBody,

  /**
   * RangeCalendarGridRow component
   *
   * Row wrapper for a week group.
   */
  GridRow: RangeCalendarGridRow,

  /**
   * RangeCalendarHeadCell component
   *
   * Header cell used for weekday labels.
   */
  HeadCell: RangeCalendarHeadCell,

  /**
   * RangeCalendarCell component
   *
   * Cell wrapper for an individual date value.
   */
  Cell: RangeCalendarCell,

  /**
   * RangeCalendarCellTrigger component
   *
   * Interactive trigger inside a range calendar cell.
   */
  CellTrigger: RangeCalendarCellTrigger,
}
