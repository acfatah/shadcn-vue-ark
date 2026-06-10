// Types extracted from @ark-ui/vue@5.37.0 (re-exports @zag-js/file-upload@1.x).
// Faithful 1:1 copy — re-sync by hand when upgrading @ark-ui/vue.

import type { ComputedRef } from 'vue'

// ── Detail types (inlined from @zag-js/file-utils + @zag-js/file-upload) ───────
type AnyString = string & {}

/** Inlined from @zag-js/file-utils. */
type FileError
  = | 'TOO_MANY_FILES'
    | 'FILE_INVALID_TYPE'
    | 'FILE_TOO_LARGE'
    | 'FILE_TOO_SMALL'
    | 'FILE_INVALID'
    | 'FILE_EXISTS'
    | AnyString

type ImageFileMimeType
  = | 'image/png'
    | 'image/gif'
    | 'image/jpeg'
    | 'image/svg+xml'
    | 'image/webp'
    | 'image/avif'
    | 'image/heic'
    | 'image/bmp'

type ApplicationFileMimeType
  = | 'application/pdf'
    | 'application/zip'
    | 'application/json'
    | 'application/xml'
    | 'application/msword'
    | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    | 'application/vnd.ms-excel'
    | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    | 'application/vnd.ms-powerpoint'
    | 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    | 'application/rtf'
    | 'application/x-rar'
    | 'application/x-7z-compressed'
    | 'application/x-tar'
    | 'application/vnd.microsoft.portable-executable'

type TextFileMimeType
  = | 'text/css'
    | 'text/csv'
    | 'text/html'
    | 'text/markdown'
    | 'text/plain'

type FontFileMimeType
  = | 'font/ttf'
    | 'font/otf'
    | 'font/woff'
    | 'font/woff2'
    | 'font/eot'
    | 'font/svg'

type VideoFileMimeType
  = | 'video/mp4'
    | 'video/webm'
    | 'video/ogg'
    | 'video/quicktime'
    | 'video/x-msvideo'

type AudioFileMimeType
  = | 'audio/mpeg'
    | 'audio/ogg'
    | 'audio/wav'
    | 'audio/webm'
    | 'audio/aac'
    | 'audio/flac'
    | 'audio/x-m4a'

type FileMimeTypeGroup
  = | 'image/*'
    | 'audio/*'
    | 'video/*'
    | 'text/*'
    | 'application/*'
    | 'font/*'

/** Inlined from @zag-js/file-utils. */
type FileMimeType
  = | ImageFileMimeType
    | ApplicationFileMimeType
    | TextFileMimeType
    | FontFileMimeType
    | VideoFileMimeType
    | AudioFileMimeType
    | FileMimeTypeGroup
    | AnyString

/** Inlined from @zag-js/file-upload. */
export interface FileRejection {
  file: File
  errors: FileError[]
}

/** Inlined from @zag-js/file-upload. */
export interface FileAcceptDetails {
  files: File[]
}

/** Inlined from @zag-js/file-upload. */
export interface FileChangeDetails {
  acceptedFiles: File[]
  rejectedFiles: FileRejection[]
}

/** Inlined from @zag-js/file-upload. */
export interface FileRejectDetails {
  files: FileRejection[]
}

/** Inlined from @zag-js/file-upload. */
export interface FileValidateDetails {
  acceptedFiles: File[]
  rejectedFiles: FileRejection[]
}

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

  /**
   * The file type to match against. Matches all file types by default.
   * @default '.*'
   */
  type?: string
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

// ── Context API (inlined from @zag-js/file-upload FileUploadApi) ───────────────
interface ItemTypeProps {
  type?: ItemType | undefined
}

interface ItemProps extends ItemTypeProps {
  file: File
}

interface ItemPreviewImageProps extends ItemProps {
  url: string
}

interface ItemGroupProps extends ItemTypeProps {}

interface DropzoneProps {
  /**
   * Whether to disable the click event on the dropzone
   */
  disableClick?: boolean | undefined
}

/**
 * The public file-upload API surface (faithful copy of @zag-js/file-upload's
 * `FileUploadApi`). Element/prop getters return loose records so the runtime
 * Ark `Api<PropTypes>` (whose getters return Vue element attribute objects)
 * stays assignable to this context.
 */
export interface FileUploadApi {
  /**
   * Whether the user is dragging something over the root element
   */
  dragging: boolean

  /**
   * Whether the user is focused on the dropzone element
   */
  focused: boolean

  /**
   * Whether the file input is disabled
   */
  disabled: boolean

  /**
   * Whether the file input is in read-only mode
   */
  readOnly: boolean

  /**
   * Whether files are currently being transformed via `transformFiles`
   */
  transforming: boolean

  /**
   * Whether the maximum number of files has been reached
   */
  maxFilesReached: boolean

  /**
   * The number of files that can still be added
   */
  remainingFiles: number

  /**
   * Function to open the file dialog
   */
  openFilePicker: () => void

  /**
   * Function to delete the file from the list
   */
  deleteFile: (file: File, type?: ItemType | undefined) => void

  /**
   * The accepted files that have been dropped or selected
   */
  acceptedFiles: File[]

  /**
   * The files that have been rejected
   */
  rejectedFiles: FileRejection[]

  /**
   * Sets the accepted files
   */
  setFiles: (files: File[]) => void

  /**
   * Clears the accepted files
   */
  clearFiles: () => void

  /**
   * Clears the rejected files
   */
  clearRejectedFiles: () => void

  /**
   * Returns the formatted file size (e.g. 1.2MB)
   */
  getFileSize: (file: File) => string

  /**
   * Returns the preview url of a file.
   * Returns a function to revoke the url.
   */
  createFileUrl: (file: File, cb: (url: string) => void) => () => void

  /**
   * Sets the clipboard files
   * Returns `true` if the clipboard data contains files, `false` otherwise.
   */
  setClipboardFiles: (dt: DataTransfer | null) => boolean

  getLabelProps: () => Record<string, any>
  getRootProps: () => Record<string, any>
  getDropzoneProps: (props?: DropzoneProps) => Record<string, any>
  getTriggerProps: () => Record<string, any>
  getHiddenInputProps: () => Record<string, any>
  getItemGroupProps: (props?: ItemGroupProps) => Record<string, any>
  getItemProps: (props: ItemProps) => Record<string, any>
  getItemNameProps: (props: ItemProps) => Record<string, any>
  getItemPreviewProps: (props: ItemProps) => Record<string, any>
  getItemPreviewImageProps: (props: ItemPreviewImageProps) => Record<string, any>
  getItemSizeTextProps: (props: ItemProps) => Record<string, any>
  getItemDeleteTriggerProps: (props: ItemProps) => Record<string, any>
  getClearTriggerProps: () => Record<string, any>
}

/**
 * The reactive context value provided by `<FileUpload.RootProvider>` /
 * `useFileUploadContext()`. Mirrors Ark's `UseFileUploadContext`, which is a
 * `ComputedRef<FileUploadApi>`.
 */
export interface UseFileUploadContext extends ComputedRef<FileUploadApi> {}
