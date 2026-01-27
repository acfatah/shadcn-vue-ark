import BreadcrumbRoot from './Breadcrumb.vue'
import BreadcrumbEllipsis from './BreadcrumbEllipsis.vue'
import BreadcrumbItem from './BreadcrumbItem.vue'
import BreadcrumbLink from './BreadcrumbLink.vue'
import BreadcrumbList from './BreadcrumbList.vue'
import BreadcrumbPage from './BreadcrumbPage.vue'
import BreadcrumbSeparator from './BreadcrumbSeparator.vue'

export const Breadcrumb = {
  /** Breadcrumb root container */
  Root: BreadcrumbRoot,

  /** Wrapper for breadcrumb items */
  List: BreadcrumbList,

  /** Breadcrumb list item */
  Item: BreadcrumbItem,

  /** Breadcrumb link */
  Link: BreadcrumbLink,

  /** Active breadcrumb page */
  Page: BreadcrumbPage,

  /** Separator between items */
  Separator: BreadcrumbSeparator,

  /** Ellipsis indicator */
  Ellipsis: BreadcrumbEllipsis,
}
