// Extracted from @ark-ui/vue@5.36.2 — re-sync when upgrading
import type {
  FileUploadFileAcceptDetails as FileAcceptDetails,
  FileUploadFileChangeDetails as FileChangeDetails,
  FileUploadFileError as FileError,
  FileUploadFileMimeType as FileMimeType,
  FileUploadFileRejectDetails as FileRejectDetails,
  FileUploadFileValidateDetails as FileValidateDetails,
} from '@ark-ui/vue/file-upload'

interface IntlTranslations {
  dropzone?: string
  itemPreview?: (file: File) => string
  deleteFile?: (file: File) => string
}

type ItemType = 'accepted' | 'rejected'

export interface FileUploadRootProps {
  /**
   * Use the provided child element as the default rendered element, combining their props and behavior.
   */
  asChild?: boolean

  /**
   * The accept file types
   */
  accept?: Record<string, string[]> | FileMimeType | FileMimeType[]

  /**
   * The default accepted files
   */
  defaultAcceptedFiles?: File[]

  /**
   * Whether to allow drag and drop in the dropzone element
   * @default true
   */
  allowDrop?: boolean

  /**
   * The default camera to use when capturing media
   */
  capture?: 'user' | 'environment'

  /**
   * Whether to accept directories, only works in webkit browsers
   */
  directory?: boolean

  /**
   * Whether the file input is disabled
   */
  disabled?: boolean

  /**
   * The unique identifier of the machine.
   */
  id?: string

  /**
   * The ids of the elements. Useful for composition.
   */
  ids?: Partial<{
    root: string
    dropzone: string
    hiddenInput: string
    trigger: string
    label: string
    item: (id: string) => string
    itemName: (id: string) => string
    itemSizeText: (id: string) => string
    itemPreview: (id: string) => string
  }>

  /**
   * Whether the file input is invalid
   */
  invalid?: boolean

  /**
   * The current locale. Based on the BCP 47 definition.
   * @default "en-US"
   */
  locale?: string

  /**
   * The maximum file size in bytes
   *
   * @default Infinity
   */
  maxFileSize?: number

  /**
   * The maximum number of files
   * @default 1
   */
  maxFiles?: number

  /**
   * The minimum file size in bytes
   *
   * @default 0
   */
  minFileSize?: number

  /**
   * The name of the underlying file input
   */
  name?: string

  /**
   * Whether to prevent the drop event on the document
   * @default true
   */
  preventDocumentDrop?: boolean

  /**
   * Whether the file input is read-only
   */
  readOnly?: boolean

  /**
   * Whether the file input is required
   */
  required?: boolean

  /**
   * The localized messages to use.
   */
  translations?: IntlTranslations

  /**
   * Function to validate a file
   */
  validate?: (file: File, details: FileValidateDetails) => FileError[] | null

  /**
   * Function to transform the files
   */
  transformFiles?: (files: File[]) => Promise<File[]>
}

export interface FileUploadRootEmits {
  /**
   * Function called when the accepted files change
   */
  'update:acceptedFiles': [files: File[]]

  /**
   * Function called when the file is accepted
   */
  'fileAccept': [details: FileAcceptDetails]

  /**
   * Function called when the value changes, whether accepted or rejected
   */
  'fileChange': [details: FileChangeDetails]

  /**
   * Function called when the file is rejected
   */
  'fileReject': [details: FileRejectDetails]
}

export interface FileUploadDropzoneProps {
  asChild?: boolean

  /**
   * Whether to disable the click event on the dropzone
   */
  disableClick?: boolean
}

export interface FileUploadTriggerProps {
  asChild?: boolean
}

export interface FileUploadLabelProps {
  asChild?: boolean
}

export interface FileUploadItemProps {
  asChild?: boolean
  file: File
  type?: ItemType
}

export interface FileUploadItemGroupProps {
  asChild?: boolean
  type?: ItemType
}

export interface FileUploadItemPreviewProps {
  asChild?: boolean
}

export interface FileUploadItemPreviewImageProps {
  asChild?: boolean
}

export interface FileUploadItemNameProps {
  asChild?: boolean
}

export interface FileUploadItemSizeTextProps {
  asChild?: boolean
}

export interface FileUploadItemDeleteTriggerProps {
  asChild?: boolean
}

export interface FileUploadClearTriggerProps {
  asChild?: boolean
}

export interface FileUploadHiddenInputProps {
  asChild?: boolean
}
