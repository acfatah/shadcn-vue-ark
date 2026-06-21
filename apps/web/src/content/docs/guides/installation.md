---
title: Installation
description: Install shadcn-vue-ark components into a Vue 3 project.
---

`shadcn-vue-ark` is a GitHub-native registry: components install straight from
the repository by `owner/repo/item` address, with no extra registry
configuration.

## Requirements

- A Vue 3 project with Tailwind CSS v4 and a `components.json`. Run
  `bunx --bun shadcn@latest init`, or start from the `vue-starter` template,
  which is preconfigured.
- `shadcn` CLI v4 or newer (GitHub-address registries require v4+).
- The `@/*` path alias mapped to your `src/` directory (see [Aliases](#aliases)).

## Project setup

Run the one-time setup first. It adds the base `components.json`, theme styles,
fonts, and the `cn()` utility:

```bash
bunx --bun shadcn@latest add acfatah/shadcn-vue-ark/project-setup
```

## Add components

Add any component by name:

```bash
bunx --bun shadcn@latest add acfatah/shadcn-vue-ark/button
bunx --bun shadcn@latest add acfatah/shadcn-vue-ark/dialog
```

`npx shadcn@latest add ...` works the same way if you are not using Bun.

## Aliases

Every component imports composables via `@/composables/*` and the `cn()` util
via `@/lib/utils`. Your project must map the `@/*` alias to `src/*`, for example
in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

`@/composables` is not a default shadcn alias; it resolves through this generic
`@/*` mapping, so keep it in place.

## Pinning a version

Installs track the repository default branch. Once a release is tagged, append a
ref for reproducibility:

```bash
bunx --bun shadcn@latest add acfatah/shadcn-vue-ark/button#v0.1.0-beta.1
```
