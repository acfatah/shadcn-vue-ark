import TableBody from './TableBody.vue'
import TableCaption from './TableCaption.vue'
import TableCell from './TableCell.vue'
import TableEmpty from './TableEmpty.vue'
import TableFooter from './TableFooter.vue'
import TableHead from './TableHead.vue'
import TableHeader from './TableHeader.vue'
import TableRoot from './TableRoot.vue'
import TableRow from './TableRow.vue'

export const Table = {
  /** Root table container */
  Root: TableRoot,

  /** Table header wrapper */
  Header: TableHeader,

  /** Table body wrapper */
  Body: TableBody,

  /** Table footer wrapper */
  Footer: TableFooter,

  /** Header cell */
  Head: TableHead,

  /** Body row */
  Row: TableRow,

  /** Body cell */
  Cell: TableCell,

  /** Table caption */
  Caption: TableCaption,

  /** Empty state row */
  Empty: TableEmpty,
}
