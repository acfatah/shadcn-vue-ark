import type {
  RegistryItem,
  registryItemCssSchema,
  registryItemCssVarsSchema,
} from 'shadcn/schema'
import type { z } from 'zod'

import { join } from 'pathe'

import { readFile } from '@/utils'

import { getFileDependencies } from './get-file-dependecies'
import { COMPONENTS_PATH } from './paths'

type RegistryItemCss = z.infer<typeof registryItemCssSchema>
type RegistryItemCssVars = z.infer<typeof registryItemCssVarsSchema>

/**
 * Get file name from path without extension
 */
function getFileNameFromPath(path: string) {
  const parts = path.split('/')

  return parts[parts.length - 1] ?? ''
}

export async function buildComponentsRegistry(
  componentRegistry: Partial<RegistryItem>,
  registryBaseUrl: string,
) {
  const firstFile = componentRegistry.files?.[0]

  if (!firstFile) {
    throw new Error(`Invalid component registry entry: need at least one file.`)
  }

  const filename = getFileNameFromPath(firstFile?.path)

  if (!filename) {
    throw new Error(`Invalid component registry entry: missing path in first file.`)
  }

  const filepath = join(COMPONENTS_PATH, filename)
  const source = await readFile(filepath, { encoding: 'utf8' })
  const { dependencies, registryDependencies } = await getFileDependencies(filepath, source, registryBaseUrl)

  const title = componentRegistry.title
  const description = componentRegistry.description
  const files: RegistryItem['files'] = componentRegistry.files || []
  let cssVars: RegistryItemCssVars | undefined
  let css: RegistryItemCss | undefined

  return {
    name: componentRegistry.name,
    type: `registry:component`,
    title,
    description,
    dependencies: Array.from(dependencies),
    registryDependencies: Array.from(registryDependencies),
    files,
    ...(cssVars ? { cssVars } : {}),
    ...(css ? { css } : {}),
  } as RegistryItem
}
