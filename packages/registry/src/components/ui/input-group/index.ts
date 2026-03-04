import type { VariantProps } from 'class-variance-authority'

import type { inputGroupAddonVariants, inputGroupButtonVariants } from './variant'

export { default as InputGroupAddon } from './InputGroupAddon.vue'
export { default as InputGroupButton } from './InputGroupButton.vue'
export { default as InputGroupInput } from './InputGroupInput.vue'
export { default as InputGroupRoot } from './InputGroupRoot.vue'
export { default as InputGroupText } from './InputGroupText.vue'
export { default as InputGroupTextarea } from './InputGroupTextarea.vue'
export { InputGroup } from './namespace'
export type InputGroupButtonVariants = VariantProps<typeof inputGroupButtonVariants>
export type InputGroupVariants = VariantProps<typeof inputGroupAddonVariants>
export { align, inputGroupAddonVariants, inputGroupButtonVariants, size } from './variant'
