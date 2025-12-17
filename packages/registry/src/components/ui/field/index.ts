import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as FieldDescription } from './FieldDescription.vue'
export { default as FieldError } from './FieldError.vue'
export { default as FieldInput } from './FieldInput.vue'
export { default as FieldLabel } from './FieldLabel.vue'
export { default as FieldRequiredIndicator } from './FieldRequiredIndicator.vue'
export { default as FieldRoot } from './FieldRoot.vue'
export { default as FieldRootProvider } from './FieldRootProvider.vue'
export { default as FieldTextarea } from './FieldTextarea.vue'

export { Field } from './namespace'

export const fieldRootVariants = cva(
  `
    group/field flex w-full gap-3
    data-[invalid=true]:text-destructive
  `,
  {
    variants: {
      orientation: {
        vertical: [`
          flex-col
          *:w-full
          [&>.sr-only]:w-auto
        `],
        horizontal: [
          'flex-row items-center',
          '*:data-[scope=field-label]:flex-auto',
          `
            has-[>[data-scope=field-content]]:items-start
            has-[>[data-scope=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px
          `,
        ],
        responsive: [
          `
            flex-col
            *:w-full
            @md/field-group:flex-row @md/field-group:items-center @md/field-group:*:w-auto
            [&>.sr-only]:w-auto
          `,
          '@md/field-group:*:data-[scope=field-label]:flex-auto',
          `
            @md/field-group:has-[>[data-scope=field-content]]:items-start
            @md/field-group:has-[>[data-scope=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px
          `,
        ],
      },
    },
    defaultVariants: {
      orientation: 'vertical',
    },
  },
)

export type FieldRootVariants = VariantProps<typeof fieldRootVariants>
export { FieldContext, useField, useFieldContext } from '@ark-ui/vue/field'
