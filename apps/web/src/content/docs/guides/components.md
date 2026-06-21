---
title: Components
description: Browse and install shadcn-vue-ark components.
---

The registry ships 62 UI components plus data-table blocks and a sidebar layout.
Each is a real Vue 3 single-file component you copy into your project and own.

## Install pattern

Every component installs by its kebab-case name:

```bash
bunx --bun shadcn@latest add acfatah/shadcn-vue-ark/<name>
```

Transitive dependencies (composables such as `useForwardPropsEmits`, the
`utils-lib` `cn()` helper, and any other components a part depends on) resolve
automatically, so you only name the component you want.

## List what is available

```bash
bunx --bun shadcn@latest list acfatah/shadcn-vue-ark   # all items
bunx --bun shadcn@latest view acfatah/shadcn-vue-ark/button   # one item
```

You can also browse the source directly under
[`packages/registry/src/components/ui`](https://github.com/acfatah/shadcn-vue-ark/tree/main/packages/registry/src/components/ui).

## Examples

| Component  | Add command                                    |
| ---------- | ---------------------------------------------- |
| Button     | `shadcn add acfatah/shadcn-vue-ark/button`     |
| Dialog     | `shadcn add acfatah/shadcn-vue-ark/dialog`     |
| Combobox   | `shadcn add acfatah/shadcn-vue-ark/combobox`   |
| Data Table | `shadcn add acfatah/shadcn-vue-ark/data-table` |

> Per-component pages with live previews are in progress. Until then, the
> Storybook workshop in `packages/registry` is the richest reference.
