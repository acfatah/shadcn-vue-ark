import type {
  RegistryItem,
  registryItemCssSchema,
  registryItemCssVarsSchema,
} from 'shadcn/schema'
import type { z } from 'zod'
import { join } from 'pathe'
import {
  readDirectory,
  readFile,
} from '@/utils'
import { UI_PATH } from '.'
import { getFileDependencies } from './get-file-dependecies'

type RegistryItemCss = z.infer<typeof registryItemCssSchema>
type RegistryItemCssVars = z.infer<typeof registryItemCssVarsSchema>

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
    const relativePath = join(UI_PATH, componentName, dirent.name)
    const source = await readFile(filepath, { encoding: 'utf8' })

    if (dirent.name === 'metadata.ts') {
      const { metadata } = await import(filepath) as { metadata: RegistryItem }

      title = metadata?.title || title
      description = metadata?.description || description
      cssVars = metadata?.cssVars ?? cssVars
      css = metadata?.css ?? css

      if (metadata?.files) {
        files.push(...metadata.files)
      }

      if (metadata?.registryDependencies) {
        metadata.registryDependencies.forEach(dep => registryDependencies.add(dep))
      }

      if (metadata?.dependencies) {
        metadata.dependencies.forEach(dep => dependencies.add(dep))
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
