# shadcn-vue-ark

Implementation of [shadcn/ui][1] components as a registry, using Vue 3 and
[Ark UI][2]. Headless, accessible behavior from Ark UI; styling with Tailwind
CSS v4.

Inspired by the [shadcn-vue][3] project.

> [!NOTE]
> Beta. The install contract below is stable; component APIs may still change.

## Requirements

- A Vue 3 project with Tailwind CSS v4 and a `components.json`. Run
  `bunx --bun shadcn@latest init`, or start from the
  [`vue-starter`](templates/vue-starter) template, which is preconfigured.
- `shadcn` CLI v4 or newer (GitHub-address registries require v4+).
- The `@/*` path alias mapped to your `src/` directory (see [Aliases](#aliases)).

## Install

This is a GitHub-native registry: components install straight from this repo by
`owner/repo/item` address, with no extra registry configuration.

1. Run the one-time project setup (base `components.json`, theme styles, fonts,
   and the `cn()` util):

   ```bash
   bunx --bun shadcn@latest add acfatah/shadcn-vue-ark/project-setup
   ```

2. Add components by name:

   ```bash
   bunx --bun shadcn@latest add acfatah/shadcn-vue-ark/button
   bunx --bun shadcn@latest add acfatah/shadcn-vue-ark/dialog
   ```

`npx shadcn@latest add ...` works the same way if you are not using Bun.

### Aliases

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

### Pinning a version

Installs track the repository default branch. Once a release is tagged, append a
ref for reproducibility:

```bash
bunx --bun shadcn@latest add acfatah/shadcn-vue-ark/button#v0.1.0-beta.1
```

## Components

Browse the source under
[`packages/registry/src/components/ui`](packages/registry/src/components/ui), or
list items from the CLI:

```bash
bunx --bun shadcn@latest list acfatah/shadcn-vue-ark
```

## Development

A Bun-powered monorepo. See [`CLAUDE.md`](CLAUDE.md) for conventions.

```bash
bun install                                  # install (repo root)
cd packages/registry && bun storybook        # component workshop
cd packages/registry && bun registry build   # rebuild registry.json
```

## License

[MIT](LICENSE) (c) Achmad F. Ibrahim.

[1]: https://ui.shadcn.com/
[2]: https://ark-ui.com/
[3]: https://github.com/shadcn/shadcn-vue
