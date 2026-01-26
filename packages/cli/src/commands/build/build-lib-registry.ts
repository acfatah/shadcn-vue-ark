import type { RegistryItem } from 'shadcn/schema'

import { basename } from 'node:path'
import { join, relative } from 'pathe'

import { readDirectory, readFile } from '@/utils'

import { getFileDependencies } from './get-file-dependecies'
import { LIB_PATH, REGISTRY_PATH } from './paths'

function getKebabName(value: string) {
  return value.replace(/\B([A-Z][a-z])/g, '-$1').toLowerCase()
}

function isValidLibFile(filename: string) {
  return filename.endsWith('.ts') && !filename.endsWith('.spec.ts')
}

export async function buildLibRegistry(registryBaseUrl: string) {
  const dir = await readDirectory(LIB_PATH, { withFileTypes: true })
  const items: RegistryItem[] = []

  for (const dirent of dir) {
    if (!dirent.isFile())
      continue

    if (!isValidLibFile(dirent.name))
      continue

    const filepath = join(LIB_PATH, dirent.name)
    const name = getKebabName(basename(dirent.name).replace(/\.ts$/, ''))
    const relativePath = join('src', relative(REGISTRY_PATH, filepath))
    const source = await readFile(filepath, { encoding: 'utf8' })
    const { dependencies, registryDependencies } = await getFileDependencies(
      filepath,
      source,
      registryBaseUrl,
    )

    items.push({
      name,
      type: 'registry:lib',
      dependencies: Array.from(dependencies),
      registryDependencies: Array.from(registryDependencies),
      files: [
        {
          path: relativePath,
          type: 'registry:lib',
        },
      ],
    })
  }

  return items
}
