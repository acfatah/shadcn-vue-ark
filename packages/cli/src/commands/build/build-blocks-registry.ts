import type { RegistryItem } from 'shadcn/schema'

import { join } from 'pathe'

import { readFile } from '@/utils'

import { getFileDependencies } from './get-file-dependecies'
import { REGISTRY_PATH } from './paths'

function resolveFilePath(blockPath: string, filePath: string) {
  if (filePath.startsWith('src/')) {
    const pathWithoutSrc = filePath.replace(/^src\//, '')

    return join(REGISTRY_PATH, pathWithoutSrc)
  }

  return join(blockPath, filePath)
}

function resolveOutputPath(blockName: string, filePath: string) {
  if (filePath.startsWith('src/'))
    return filePath

  return join('src', 'blocks', blockName, filePath)
}

export async function buildBlocksRegistry(
  blockPath: string,
  blockName: string,
  registryBaseUrl: string,
) {
  const registryFile = join(blockPath, '_registry.ts')
  const { registryItem } = await import(registryFile) as { registryItem?: RegistryItem }

  if (!registryItem) {
    throw new Error(`Missing registry item in ${registryFile}`)
  }

  const files: RegistryItem['files'] = []
  const dependencies = new Set<string>(registryItem.dependencies ?? [])
  const registryDependencies = new Set<string>(registryItem.registryDependencies ?? [])

  for (const file of registryItem.files ?? []) {
    const outputPath = resolveOutputPath(blockName, file.path)
    const inputPath = resolveFilePath(blockPath, file.path)
    const source = await readFile(inputPath, { encoding: 'utf8' })
    files.push({ ...file, path: outputPath })

    const deps = await getFileDependencies(inputPath, source, registryBaseUrl)
    deps.dependencies.forEach(dep => dependencies.add(dep))
    deps.registryDependencies.forEach(dep => registryDependencies.add(dep))
  }

  return {
    ...registryItem,
    name: registryItem.name || blockName,
    type: 'registry:block',
    files,
    dependencies: Array.from(dependencies),
    registryDependencies: Array.from(registryDependencies),
  } satisfies RegistryItem
}
