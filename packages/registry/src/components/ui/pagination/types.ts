// Types extracted from @ark-ui/vue@5.37.0 (re-exports @zag-js/pagination@1.x).
// Faithful 1:1 copy — re-sync by hand when upgrading @ark-ui/vue.

// ── Detail types (inlined from @zag-js/pagination) ───────────────────────────
export interface PageChangeDetails {
  page: number
  pageSize: number
}

export interface PageSizeChangeDetails {
  pageSize: number
}

export interface ItemLabelDetails {
  page: number
  totalPages: number
}

export interface PageUrlDetails {
  page: number
  pageSize: number
}

export interface IntlTranslations {
  rootLabel?: string | undefined
  firstTriggerLabel?: string | undefined
  prevTriggerLabel?: string | undefined
  nextTriggerLabel?: string | undefined
  lastTriggerLabel?: string | undefined
  itemLabel?: ((details: ItemLabelDetails) => string) | undefined
}

// ── Root ─────────────────────────────────────────────────────────────────────
export interface PaginationRootProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean

  /**
   * Total number of data items
   */
  count?: number

  /**
   * The initial active page when rendered.
   * Use when you don't need to control the active page of the pagination.
   * @default 1
   */
  defaultPage?: number

  /**
   * The initial number of data items per page when rendered.
   * Use when you don't need to control the page size of the pagination.
   * @default 10
   */
  defaultPageSize?: number

  /**
   * The unique identifier of the machine.
   */
  id?: string

  /**
   * The ids of the elements in the accordion. Useful for composition.
   */
  ids?: Partial<{
    root: string
    ellipsis: (index: number) => string
    prevTrigger: string
    nextTrigger: string
    item: (page: number) => string
  }>

  /**
   * The controlled active page
   */
  page?: number

  /**
   * The controlled number of data items per page
   */
  pageSize?: number

  /**
   * Number of pages to show beside active page
   * @default 1
   */
  siblingCount?: number

  /**
   * Specifies the localized strings that identifies the accessibility elements and their states
   */
  translations?: IntlTranslations

  /**
   * The type of the trigger element
   * @default "button"
   */
  type?: 'button' | 'link'

  /**
   * Function to generate href attributes for pagination links.
   * Only used when `type` is set to "link".
   */
  getPageUrl?: (details: PageUrlDetails) => string
}

export interface PaginationRootEmits {
  /**
   * Called when the page number is changed
   */
  'pageChange': [details: PageChangeDetails]

  /**
   * Called when the page size is changed
   */
  'pageSizeChange': [details: PageSizeChangeDetails]

  /**
   * The callback fired when the model value changes.
   */
  'update:page': [page: PageChangeDetails['page']]

  /**
   * The callback fired when the model value changes.
   */
  'update:pageSize': [pageSize: PageSizeChangeDetails['pageSize']]
}

// ── Sub-parts ────────────────────────────────────────────────────────────────
export interface PaginationPrevTriggerProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}

export interface PaginationNextTriggerProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}

export interface PaginationItemProps {
  type: 'page'
  value: number

  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}

export interface PaginationEllipsisProps {
  index: number

  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}
