import type { HTMLAttributes } from 'vue'

export type InputType
  = | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week'

export type ReadonlySupportedType = Extract<
  InputType,
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'month'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week'
>

export type ReadonlyUnsupportedType = Exclude<InputType, ReadonlySupportedType>

interface CommonProps {
  scope: string
  id?: string
  name?: string
  defaultValue?: string
  modelValue?: string
  class?: HTMLAttributes['class']
  required?: boolean
  invalid?: boolean
  loading?: boolean
  disabled?: boolean
}

export type PrimitiveInputProps
  = | (CommonProps & {
    /** Input types that support readonly */
    type: ReadonlySupportedType
    readonly?: boolean
  })
  | (CommonProps & {
    /** Input types that do not support readonly */
    type: ReadonlyUnsupportedType
    readonly?: never
  })

export interface PrimitiveInputEmits {
  (e: 'update:modelValue', payload: string | undefined): void
}

export interface SelectInputProps {
  id?: string
  name?: string
  defaultValue?: string
  modelValue?: string
  class?: HTMLAttributes['class']
  invalid?: boolean
  loading?: boolean
  readonly?: boolean
  disabled?: boolean
}

export interface SelectInputEmits {
  (e: 'update:modelValue', payload: string | undefined): void
}

// `asChild` inlined from @ark-ui/vue@5.37.0 (`PolymorphicProps` /
// `FieldErrorTextProps`). Faithful 1:1 copy — re-sync by hand when upgrading.
export interface InputDescriptionProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}

export interface InputErrorProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}
