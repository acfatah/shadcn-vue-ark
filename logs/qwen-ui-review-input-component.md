# UI Input Components Review

## Overview
Analysis of the input components located in `packages/registry/src/components/ui/input/`. All components follow the Vue 3 Composition API with TypeScript, and most leverage the `PrimitiveInput` base component for consistent behavior and styling.

## Consistency Patterns Observed

### 1. Prop Forwarding Pattern
Most input components use the `useForwardPropsEmits` composable to forward props and emits to the underlying primitive component:
```typescript
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'

const forwardedProps = useForwardPropsEmits(props, emits)
```

### 2. Component Structure
Components typically follow this structure:
- Import `useForwardPropsEmits`
- Define extended Props interface from `PrimitiveInputProps`
- Define extended Emits interface from `PrimitiveInputEmits`
- Create forwarded props
- Use the primitive component in template with forwarded props

### 3. Accessibility Attributes
Consistent use of accessibility attributes like `data-scope`, `data-part`, and ARIA attributes across all components.

### 4. Styling Approach
Most components use the `cn` utility function for class name composition, maintaining consistent styling across the UI kit.

## Inconsistencies and Issues Found

### 1. Naming Inconsistencies
- `DatetimeLocalInput.vue` vs `DatetimeLocalInput.1.vue` (duplicate component files)
- Some components like `NumberInput` and `NumberInput.1.vue` seem to have duplicate/alternative implementations

### 2. Component Architecture Differences
While most components follow the prop forwarding pattern, some deviate:

#### CheckboxInput.vue
Uses `useVModel` directly instead of the prop forwarding pattern:
```typescript
const checked = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue ?? false,
})
```

#### FileInput.vue
Also uses `useVModel` directly without extending from `PrimitiveInput`:
```typescript
const files = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue ?? [],
})
```

#### RadioInput.vue
Similar to CheckboxInput, uses `useVModel` directly.

### 3. Missing Type Imports
Some components have inconsistent type imports - some import from `'@/lib/utils'` for `cn` while others import directly from their dependencies.

### 4. Duplicate Components
There appear to be duplicate files with similar functionality but numbered extensions:
- `DatetimeLocalInput.1.vue` and `DatetimeLocalInput.vue`
- `NumberInput.1.vue` and `NumberInput.vue`

### 5. Inconsistent Icon Handling
Some input components (like `EmailInput`, `PasswordInput`, `SearchInput`, `TelInput`, `UrlInput`) implement icon handling differently with reusable templates, while others don't have icons at all.

### 6. Incomplete JSDoc Comments
The `NumberInput.vue` component has a TODO section indicating props that aren't implemented:
```typescript
// TODO: add these to props as optional
// checked:  Specifies that an input field should be pre-selected when the page loads (for type="checkbox" or type="radio")
// disabled:  Specifies that an input field should be disabled
// ...
```

## Recommendations

### 1. Standardize Component Architecture
- Choose between prop forwarding pattern or direct `useVModel` approach consistently
- Consider if checkbox, radio, and file inputs should extend from `PrimitiveInput` or have their own base component

### 2. Clean Up Duplicate Files
- Remove duplicate files like `DatetimeLocalInput.1.vue` and `NumberInput.1.vue`
- Determine which implementations should be kept

### 3. Improve Documentation
- Add JSDoc comments to all props and emits
- Document the differences between component architectures

### 4. Refactor Icon Handling
- Create a consistent icon handling pattern for all input components that need icons
- Consider creating a shared icon wrapper component

### 5. Validate Type Usage
- Ensure consistent typing across all components
- Verify that all exported types are properly documented

### 6. Standardize Validation Handling
- Some components use native validation (`handleInvalid` function) while others don't
- Establish a consistent approach for validation handling across all inputs

## Positive Observations

- Good use of TypeScript interfaces for Props and Emits
- Comprehensive use of accessibility attributes
- Consistent naming convention for `data-scope` and `data-part` attributes
- Proper use of Vue's Composition API features
- Good separation of concerns between primitive and specialized components
- Effective use of utility classes for consistent styling