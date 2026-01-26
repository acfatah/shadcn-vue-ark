import type { RegistryItem } from 'shadcn/schema'

import { existsSync } from 'node:fs'
import { basename } from 'node:path'
import { join, relative } from 'pathe'

import { readFile } from '@/utils'

import { getFileDependencies } from './get-file-dependecies'
import { COMPOSABLES_PATH, REGISTRY_URL } from './paths'

function getKebabName(value: string) {
  return value.replace(/\B([A-Z][a-z])/g, '-$1').toLowerCase()
}

function resolveComposablePath(source: string) {
  const pathWithExt = source.endsWith('.ts')
    ? source
    : `${source}.ts`

  return join(COMPOSABLES_PATH, pathWithExt)
}

async function getComposableExports() {
  const indexPath = join(COMPOSABLES_PATH, 'index.ts')
  const source = await readFile(indexPath, { encoding: 'utf8' })

  const exportSources = new Set<string>()
  const regex = /from\s+['"]\.\/([^'"]+)['"]/g

  for (const match of source.matchAll(regex)) {
    const path = match[1]

    if (!path)
      continue

    exportSources.add(path)
  }

  return Array.from(exportSources)
}

export async function buildHooksRegistry(registryBaseUrl: string) {
  const exportSources = await getComposableExports()
  const hooks: RegistryItem[] = []

  for (const source of exportSources) {
    const filepath = resolveComposablePath(source)

    if (!existsSync(filepath))
      continue

    const name = getKebabName(basename(filepath).replace(/\.ts$/, ''))
    const relativePath = join('src', relative(REGISTRY_URL, filepath))
    const fileSource = await readFile(filepath, { encoding: 'utf8' })
    const { dependencies, registryDependencies } = await getFileDependencies(
      filepath,
      fileSource,
      registryBaseUrl,
    )

    hooks.push({
      name,
      type: 'registry:hook',
      dependencies: Array.from(dependencies),
      registryDependencies: Array.from(registryDependencies),
      files: [
        {
          path: relativePath,
          type: 'registry:hook',
        },
      ],
    })
  }

  return hooks
}
