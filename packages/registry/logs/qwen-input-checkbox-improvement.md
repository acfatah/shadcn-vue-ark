You’ve built a solid foundation for a custom-styled Vue checkbox component that mimics native behavior — especially with three-state support — but there are several important improvements needed to **fully align with native HTML checkbox semantics** and ensure robustness, accessibility, and correctness.

Here’s my **detailed, actionable recommendation** to enhance your component, grouped by priority:

---

## ✅ 1. **Fix `v-model` binding to match native behavior**
### ❌ Problem:
You’re binding `v-model="checked"` directly to the `<input>` **while** also manually handling clicks — this leads to:
- **Race conditions**: both `v-model` and your click handler mutate `checked`.
- **Incorrect form submission**: native checkbox `.value` is only submitted when checked — but your `v-model` sets `checked` to `true/false/null`, which `v-model` on `<input type="checkbox">` expects only `true`/`false` (not `null`).

### ✅ Solution:
- **Let the native `<input>` be the single source of truth.**
- Use `ref` to access `<input>` DOM and set `.indeterminate` programmatically.
- Remove manual `checked.value = ...` mutations in `onClick()`.

👉 **Key insight**: `indeterminate` is a **property**, not an attribute — it can’t be set via HTML — only via JS on the `<input>` element.

#### Recommended changes:

```ts
// Replace useVModel with reactive ref + sync
import { ref, watch, nextTick } from 'vue'

const inputRef = ref<HTMLInputElement | null>(null)
const internalValue = ref(props.modelValue ?? props.defaultValue ?? false)

// Sync prop → DOM
watch(() => props.modelValue, (val) => {
  internalValue.value = val ?? false
}, { immediate: true })

// Sync internalValue & indeterminate → DOM
watch([() => internalValue.value, () => props.indeterminate], () => {
  nextTick(() => {
    if (inputRef.value) {
      inputRef.value.checked = internalValue.value === true
      // Only set indeterminate if input is unchecked — native behavior!
      // Note: indeterminate is only visual; .checked still determines submission
      inputRef.value.indeterminate = props.indeterminate && internalValue.value === null
    }
  })
})

// Emit updates ONLY from native change event
function onNativeChange(event: Event) {
  const target = event.target as HTMLInputElement
  const newValue = target.checked

  // For 2-state: emit boolean
  // For 3-state: maintain cycle elsewhere — but submission should be boolean!
  emits('update:modelValue', newValue)
  emits('change', newValue)
}
```

> 🔔 **Important**: For form submission and `FormData`, only `true`/`false` matter. `indeterminate` is purely UI. So `modelValue` should *always* be `boolean` for compatibility with native forms.

But you want 3-state logic? Then:
- Keep internal 3-state (`true`/`false`/`null`) for UI/rendering.
- But **emit only `boolean`** via `update:modelValue`, or overload the API.

Let’s resolve this cleanly.

---

## ✅ 2. **Clarify API: Two variants**

### Option A: **Strict native compatibility** (recommended for most cases)
- `modelValue` is `boolean`
- `indeterminate` is a **read-only visual hint** (e.g., for “partially selected” in a tree)
- Parent controls `indeterminate` prop *and* ensures `modelValue` is `false` when indeterminate (since native checkbox cannot submit `null`)

✅ Pros: Works with `<form>`, `FormData`, native validation, Vue `v-model`.

### Option B: **True 3-state component** (advanced)
- Support `modelValue: boolean | null`
- But: **do not bind `v-model` to native `<input>` directly** — use uncontrolled input or manual sync.

Since you’re simulating native behavior, I recommend **Option A**, and treat `indeterminate` as a *presentational* state.

So revise props:

```ts
const props = withDefaults(defineProps<{
  modelValue?: boolean        // ← no null
  defaultValue?: boolean
  // ...
  indeterminate?: boolean     // visual only; requires modelValue === false to show
}>(), {
  modelValue: undefined,
  defaultValue: false,
  indeterminate: false,
})
```

And enforce:
```ts
// In watcher or computed:
const effectiveIndeterminate = computed(() =>
  props.indeterminate && (internalValue.value === false)
)
```

Then:
```ts
inputRef.value!.indeterminate = effectiveIndeterminate.value
```

---

## ✅ 3. **Accessibility (a11y) fixes**

### Missing:
- `aria-checked` for custom indicator (when using `role="checkbox"`)
- Proper `role`, `tabindex`, keyboard handling
- Label association

### ✅ Fix:
Wrap in a `<label>` or use `aria-labelledby`. Better: make the whole thing a **label**.

#### Improved template:

```vue
<template>
  <label
    :class="cn('peer relative inline-flex items-center cursor-pointer', props.class)"
  >
    <input
      ref="inputRef"
      type="checkbox"
      :name="name"
      :value="value"
      :disabled="disabled"
      :required="required"
      :aria-invalid="invalid || undefined"
      class="peer sr-only"
      @change="onNativeChange"
    />

    <span
      :data-state="state"
      :data-disabled="disabled ? 'true' : undefined"
      :data-invalid="invalid ? 'true' : undefined"
      :class="cn(
        'size-4 shrink-0 rounded-[4px] border border-input shadow-xs',
        'flex items-center justify-center',
        'transition-colors duration-200',
        'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        // Base
        'bg-background',
        // Checked/Indeterminate
        'peer-checked:border-primary peer-checked:bg-primary',
        'peer-checked:text-primary-foreground',
        // Invalid + unchecked
        'peer-[aria-invalid="true"]:not(:checked):border-destructive/50'
      )"
    >
      <Icon
        v-if="inputRef?.indeterminate"
        :icon="indeterminateIcon"
        class="h-3.5 w-3.5"
      />
      <Icon
        v-else-if="internalValue"
        :icon="icon"
        class="h-3.5 w-3.5"
      />
    </span>

    <!-- Optional: render default slot for label text -->
    <span v-if="$slots.default" class="ml-2">
      <slot />
    </span>
  </label>
</template>
```

> ✅ Benefits:
> - Native `<label>` click/tap/focus/keyboard behavior.
> - Space/Enter toggles checkbox automatically.
> - No need for manual `onClick()` handler.
> - `peer-*` classes work naturally.

---

## ✅ 4. **Simplify state logic**

Remove manual `onClick()` and `onChange()` — rely on native `<input>` + `<label>`.

Then:

```ts
const state = computed(() => {
  if (inputRef.value?.indeterminate) return 'indeterminate'
  return internalValue.value ? 'checked' : 'unchecked'
})
```

But even this may be redundant — you can use `peer-indeterminate:` if needed (Tailwind doesn’t support it by default, but you can extend).

Alternatively, drop `data-state` and use native pseudo-classes where possible.

---

## ✅ 5. **Handle `value` correctly**
- Native checkbox only submits its `value` if checked.
- If you’re using `v-model` with array (e.g., `v-model="selected"` where `selected` is `string[]`), Vue expects `value` to be the item.
- Your current `emit('update:modelValue', boolean | string | number)` is ambiguous.

👉 **Recommendation**: Support **two modes** via overload or auto-detect:

| Mode | `v-model` type | Use case |
|------|----------------|----------|
| **Boolean** | `boolean` | Single on/off toggle |
| **Array** | `T[]` | Multi-select group (e.g., `name="tags"` with same name) |

But to keep it simple and native-compatible, **support only boolean mode** in this base component. Create a separate `<CheckboxGroup>` for array binding.

So simplify emits:

```ts
defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', value: boolean): void
}>()
```

And remove `value` from props? Or keep it for form submission (e.g., `<input value="newsletter">`).

✅ Keep `value` — it’s needed for native form encoding when multiple checkboxes share a `name`.

---

## ✅ 6. **Final polished version (recommended)**

Here’s a concise, robust refactor:

```vue
<script setup lang="ts">
import { ref, watch, nextTick, computed } from 'vue'
import { Icon } from '@iconify/vue'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  modelValue?: boolean
  defaultValue?: boolean
  value?: string | number
  name?: string
  disabled?: boolean
  required?: boolean
  invalid?: boolean
  indeterminate?: boolean  // visual only; best paired with modelValue=false
  icon?: string
  indeterminateIcon?: string
  class?: string
}>(), {
  modelValue: undefined,
  defaultValue: false,
  indeterminate: false,
  icon: 'lucide:check',
  indeterminateIcon: 'lucide:minus',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', value: boolean): void
}>()

const inputRef = ref<HTMLInputElement | null>(null)

// Internal state synced with prop
const internalChecked = computed({
  get: () => props.modelValue ?? props.defaultValue,
  set: (val) => {
    emit('update:modelValue', val)
    emit('change', val)
  }
})

// Sync indeterminate to DOM (only when unchecked)
watch([() => props.indeterminate, internalChecked], () => {
  nextTick(() => {
    if (inputRef.value) {
      // indeterminate is only visible when unchecked
      inputRef.value.indeterminate = props.indeterminate && !internalChecked.value
    }
  })
}, { immediate: true })
</script>

<template>
  <label :class="cn('group inline-flex items-center cursor-pointer', props.class)">
    <input
      ref="inputRef"
      v-model="internalChecked"
      type="checkbox"
      :value="value"
      :name="name"
      :disabled="disabled"
      :required="required"
      :aria-invalid="invalid || undefined"
      class="peer sr-only"
    />

    <span
      :data-disabled="disabled ? 'true' : undefined"
      :data-invalid="invalid ? 'true' : undefined"
      :class="cn(
        'size-4 shrink-0 rounded-[4px] border border-input shadow-xs',
        'flex items-center justify-center',
        'transition-colors duration-200',
        'bg-background',
        // Checked
        'peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground',
        // Indeterminate (fallback if Tailwind doesn’t support `peer-indeterminate:`)
        // We simulate via JS + class toggle, but here we rely on icon logic
        // Disabled
        'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        // Invalid when unchecked
        'peer-[aria-invalid="true"]:not(:checked):border-destructive/50'
      )"
    >
      <Icon
        v-if="inputRef?.indeterminate"
        :icon="indeterminateIcon"
        class="h-3.5 w-3.5"
      />
      <Icon
        v-else-if="internalChecked"
        :icon="icon"
        class="h-3.5 w-3.5"
      />
    </span>

    <span v-if="$slots.default" class="ml-2">
      <slot />
    </span>
  </label>
</template>
```

---

## ✅ Bonus: Tips for your UI registry (shadcn-like)

- Export a `<CheckboxGroup>` for array binding:
  ```vue
  <!-- Usage -->
  <CheckboxGroup v-model="selected" :options="[{value: 'a', label: 'A'}]" />
  ```
- Support `id`/`for` for explicit label association.
- Add `data-` attributes for testing (e.g., `data-testid="checkbox"`).
- Consider `asChild` pattern for composable design (Radix-style).

---

Let me know if you'd like:
- A version with array binding support (`v-model="selectedIds"`),
- Integration with Vue’s `<Field>` (e.g., for VeeValidate),
- Or TypeScript generics for typed `value`.

Great work so far — you're very close to a production-ready, native-compatible component 🎯
