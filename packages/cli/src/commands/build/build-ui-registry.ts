import type { RegistryItem } from 'shadcn/schema'

import { join, relative } from 'pathe'

import { readDirectory, readFile } from '@/utils'

import type { RegistryItemCss, RegistryItemCssVars } from './build-css-from-tailwind'

import { buildCssFromTailwind, mergeCss } from './build-css-from-tailwind'
import { getFileDependencies } from './get-file-dependecies'
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
        files.push(...registryItem.files)
      }

      if (registryItem?.registryDependencies) {
        registryItem.registryDependencies.forEach(dep => registryDependencies.add(dep))
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
