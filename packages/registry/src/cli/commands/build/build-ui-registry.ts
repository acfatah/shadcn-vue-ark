import type { RegistryItem } from 'shadcn/schema'

import { join, relative } from 'pathe'

import { readDirectory, readFile } from '@/cli/utils'

import type { RegistryItemCss, RegistryItemCssVars } from './build-css-from-tailwind'

import { buildCssFromTailwind, mergeCss } from './build-css-from-tailwind'
import { getFileDependencies } from './get-file-dependecies'
import { normalizeRegistryDependency } from './normalize-registry-deps'
import { REGISTRY_PATH } from './paths'

export async function buildUIRegistry(
  componentPath: string,
  componentName: string,
  registryPath: string,
) {
  const dir = await readDirectory(componentPath, {
    withFileTypes: true,
  })

  const files: RegistryItem['files'] = []
  const dependencies = new Set<string>()
  const registryDependencies = new Set<string>()
  const type = 'registry:ui'
  let title = ''
  let description = ''
  let cssVars: RegistryItemCssVars | undefined
  let css: RegistryItemCss | undefined

  for (const dirent of dir) {
    if (!dirent.isFile())
      continue

    // Skip numbered backup files (e.g. NumberInput.1.vue)
    if (/\.\d+\./.test(dirent.name))
      continue

    const filepath = join(componentPath, dirent.name)
    const relativePath = join('src', relative(REGISTRY_PATH, filepath))
    const source = await readFile(filepath, { encoding: 'utf8' })

    if (dirent.name === '_registry.ts') {
      const { registryItem } = await import(filepath) as { registryItem: RegistryItem }

      title = registryItem?.title || title
      description = registryItem?.description || description
      cssVars = registryItem?.cssVars ?? cssVars
      css = registryItem?.css ?? css

      const tailwindCss = buildCssFromTailwind(registryItem?.tailwind)
      css = mergeCss(css, tailwindCss)

      if (registryItem?.files) {
        // Guard: composables (`src/composables/*`) and libs (`src/lib/*`) are
        // their own registry items, auto-resolved via `registryDependencies`
        // (see `get-file-dependecies.ts`). Listing them in `files[]` double-ships
        // the file. Fail loud so the convention cannot drift back.
        for (const file of registryItem.files) {
          if (/^src\/(?:composables|lib)\//.test(file.path)) {
            throw new Error(
              `${componentName}/_registry.ts: '${file.path}' is auto-resolved via `
              + `registryDependencies; remove it from files[] `
              + `(see docs/CONTEXT-registry-packaging.md).`,
            )
          }
        }

        files.push(...registryItem.files)
      }

      if (registryItem?.registryDependencies) {
        registryItem.registryDependencies.forEach(dep => registryDependencies.add(normalizeRegistryDependency(dep, registryPath)))
      }

      if (registryItem?.dependencies) {
        registryItem.dependencies.forEach(dep => dependencies.add(dep))
      }

      continue
    }
    else {
      files.push({ path: relativePath, type })
    }

    const deps = await getFileDependencies(filepath, source, registryPath)
    deps.dependencies.forEach(dep => dependencies.add(dep))
    deps.registryDependencies.forEach(dep => registryDependencies.add(dep))
  }

  return {
    name: componentName,
    type,
    title,
    description,
    dependencies: Array.from(dependencies),
    registryDependencies: Array.from(registryDependencies),
    files,
    ...(cssVars ? { cssVars } : {}),
    ...(css ? { css } : {}),
  } satisfies RegistryItem
}
