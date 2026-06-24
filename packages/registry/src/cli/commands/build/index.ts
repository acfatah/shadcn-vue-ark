import type { RegistryItem } from 'shadcn/schema'

import { Command } from 'commander'
import { consola } from 'consola'
import { existsSync } from 'node:fs'
import process from 'node:process'
import { join, resolve } from 'pathe'

import {
  readDirectory,
  writeFile,
} from '@/cli/utils'

import { buildBlocksRegistry } from './build-blocks-registry'
import { buildComponentsRegistry } from './build-components-registry'
import { buildComposablesRegistry } from './build-composables-registry'
import { buildLayoutsRegistry } from './build-layouts-registry'
import { buildLibRegistry } from './build-lib-registry'
import { buildStoriesBundles } from './build-stories-bundles'
import { buildUIRegistry } from './build-ui-registry'
import {
  BLOCKS_PATH,
  COMPONENTS_PATH,
  LAYOUTS_PATH,
  ROOT_PATH,
  UI_PATH,
} from './paths'

const mainPackageJson = await Bun.file(resolve(__dirname, '..', '..', '..', '..', '..', '..', 'package.json')).json()

const REGISTRY_NAMESPACE = process.env.REGISTRY_NAMESPACE || 'acfatah/shadcn-vue-ark'

interface BuildCommandOptions {
  name: string
  homepage: string
  registryNamespace: string
}

async function crawlAndBuildUIRegistry(registryBaseUrl: string) {
  const dir = await readDirectory(UI_PATH, { recursive: true, withFileTypes: true })
  const uiRegistry: RegistryItem[] = []

  for (const dirent of dir) {
    if (!dirent.isDirectory())
      continue

    const componentPath = join(UI_PATH, dirent.name)
    const registryItem = await buildUIRegistry(componentPath, dirent.name, registryBaseUrl)
    uiRegistry.push(registryItem)
  }

  return uiRegistry
}

async function crawlAndBuildComponentsRegistry(registryBaseUrl: string) {
  const path = join(COMPONENTS_PATH, '_registry.ts')
  const finalComponentsRegistry: RegistryItem[] = []
  const { componentsRegistry } = await import(path) as {
    componentsRegistry: ({ filename: string } & Partial<RegistryItem>)[]
  }

  for (const component of componentsRegistry) {
    const registryItem = await buildComponentsRegistry(component, registryBaseUrl)
    finalComponentsRegistry.push(registryItem)
  }

  return finalComponentsRegistry
}

async function crawlAndBuildBlocksRegistry(registryBaseUrl: string) {
  const dir = await readDirectory(BLOCKS_PATH, { withFileTypes: true })
  const blocksRegistry: RegistryItem[] = []

  for (const dirent of dir) {
    if (!dirent.isDirectory())
      continue

    const blockPath = join(BLOCKS_PATH, dirent.name)
    if (!existsSync(join(blockPath, '_registry.ts')))
      continue

    const registryItem = await buildBlocksRegistry(blockPath, dirent.name, registryBaseUrl)
    blocksRegistry.push(registryItem)
  }

  return blocksRegistry
}

async function crawlAndBuildLayoutsRegistry(registryBaseUrl: string) {
  const dir = await readDirectory(LAYOUTS_PATH, { withFileTypes: true })
  const layoutsRegistry: RegistryItem[] = []

  for (const dirent of dir) {
    if (!dirent.isDirectory())
      continue

    const layoutPath = join(LAYOUTS_PATH, dirent.name)
    if (!existsSync(join(layoutPath, '_registry.ts')))
      continue

    const registryItem = await buildLayoutsRegistry(layoutPath, dirent.name, registryBaseUrl)
    layoutsRegistry.push(registryItem)
  }

  return layoutsRegistry
}

// Normalize array ordering so the build is deterministic across machines
// (filesystem readdir order varies). Order is irrelevant to installation, so
// sorting keeps the committed registry.json stable for the CI drift check.
function sortRegistryItem(item: RegistryItem): RegistryItem {
  return {
    ...item,
    ...(item.dependencies
      ? { dependencies: [...item.dependencies].sort() }
      : {}),
    ...(item.registryDependencies
      ? { registryDependencies: [...item.registryDependencies].sort() }
      : {}),
    ...(item.files
      ? { files: [...item.files].sort((a, b) => a.path.localeCompare(b.path)) }
      : {}),
  }
}

export async function buildRegistry(registryBaseUrl: string) {
  const registry: RegistryItem[] = []

  const [ui, components, blocks, layouts, hooks, libs] = await Promise.all([
    crawlAndBuildUIRegistry(registryBaseUrl),
    crawlAndBuildComponentsRegistry(registryBaseUrl),
    crawlAndBuildBlocksRegistry(registryBaseUrl),
    crawlAndBuildLayoutsRegistry(registryBaseUrl),
    buildComposablesRegistry(registryBaseUrl),
    buildLibRegistry(registryBaseUrl),
  ])

  registry.push(
    ...ui,
    ...components,
    ...blocks,
    ...layouts,
    ...hooks,
    ...libs,
  )

  return registry
    .map(sortRegistryItem)
    .sort((a, b) => a.name.localeCompare(b.name))
}

export const build = new Command()
  .name('build')
  .description('Build components registry.')
  .option(
    '-n, --name <name>',
    'name of the registry',
    mainPackageJson.name,
  )
  .option(
    '-h, --homepage <homepage>',
    'homepage url for the registry',
    mainPackageJson.homepage,
  )
  .option(
    '-u, --registry-namespace <registryNamespace>',
    'owner/repo namespace for registry dependency addresses',
    REGISTRY_NAMESPACE,
  )
  .action(async (_cmd, args) => {
    const opts = args.opts() as BuildCommandOptions

    try {
      consola.start('Creating registry.json file...')
      const items = await buildRegistry(opts.registryNamespace)

      const registrySchema = {
        $schema: 'https://ui.shadcn.com/schema/registry.json',
        name: opts.name,
        homepage: opts.homepage,
        items,
      }

      await writeFile(
        join(ROOT_PATH, 'registry.json'),
        `${JSON.stringify(registrySchema, null, 2)}\n`,
      )

      consola.success('Registry created successfully.')

      consola.start('Building story bundles...')
      const storyNames = await buildStoriesBundles()
      consola.success(`Built ${storyNames.length} story bundles.`)
    }
    catch (error) {
      consola.error(error)
      process.exit(1)
    }
  })
