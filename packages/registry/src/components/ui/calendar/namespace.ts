import CalendarRoot from './Calendar.vue'
import CalendarCell from './CalendarCell.vue'
import CalendarCellTrigger from './CalendarCellTrigger.vue'
import CalendarGrid from './CalendarGrid.vue'
import CalendarGridBody from './CalendarGridBody.vue'
import CalendarGridHead from './CalendarGridHead.vue'
import CalendarGridRow from './CalendarGridRow.vue'
import CalendarHeadCell from './CalendarHeadCell.vue'
import CalendarHeader from './CalendarHeader.vue'
import CalendarHeading from './CalendarHeading.vue'
import CalendarNextButton from './CalendarNextButton.vue'
import CalendarPrevButton from './CalendarPrevButton.vue'

export const Calendar = {
  /**
   * CalendarRoot component
   *
   * Root wrapper for the calendar views.
   */
  Root: CalendarRoot,

  /**
   * CalendarHeader component
   *
   * Header area that wraps navigation and heading.
   */
  Header: CalendarHeader,

  /**
   * CalendarHeading component
   *
   * Displays the current view label.
   */
  Heading: CalendarHeading,

  /**
   * CalendarPrevButton component
   *
   * Button that navigates to the previous page.
   */
  PrevButton: CalendarPrevButton,

  /**
   * CalendarNextButton component
   *
   * Button that navigates to the next page.
   */
  NextButton: CalendarNextButton,

  /**
   * CalendarGrid component
   *
   * Grid container for calendar rows and cells.
   */
  Grid: CalendarGrid,

  /**
   * CalendarGridHead component
   *
   * Head section for weekday labels.
   */
  GridHead: CalendarGridHead,

  /**
   * CalendarGridBody component
   *
   * Body section for day, month, or year rows.
   */
  GridBody: CalendarGridBody,

  /**
   * CalendarGridRow component
   *
   * Row wrapper for a week, month, or year group.
   */
  GridRow: CalendarGridRow,

  /**
   * CalendarHeadCell component
   *
   * Header cell used for weekday labels.
   */
  HeadCell: CalendarHeadCell,

  /**
   * CalendarCell component
   *
   * Cell wrapper for an individual date value.
   */
  Cell: CalendarCell,

  /**
   * CalendarCellTrigger component
   *
   * Interactive trigger inside a calendar cell.
   */
  CellTrigger: CalendarCellTrigger,
}
