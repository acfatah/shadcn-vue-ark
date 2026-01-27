import type { RegistryItem } from 'shadcn/schema'

import { Command } from 'commander'
import { consola } from 'consola'
import process from 'node:process'
import { join } from 'pathe'

import {
  readDirectory,
  rimraf,
  writeFile,
} from '@/utils'

import mainPackageJson from '../../../../../package.json'
import { buildComponentsRegistry } from './build-components-registry'
import { buildHooksRegistry } from './build-hooks-registry'
import { buildIndexJson } from './build-index-json'
import { buildLibRegistry } from './build-lib-registry'
import { buildStyles } from './build-styles'
import { buildThemes } from './build-themes'
import { buildUIRegistry } from './build-ui-registry'
import {
  COMPONENTS_PATH,
  REGISTRY_OUTPUT_PATH,
  ROOT_PATH,
  UI_PATH,
} from './paths'

const REGISTRY_URL = process.env.REGISTRY_URL
  || 'https://raw.githubusercontent.com/acfatah/shadcn-vue-ark/refs/heads/main/packages/registry/public/r'

interface BuildCommandOptions {
  output: string
  name: string
  homepage: string
  registryBaseUrl: string
  dryRun: boolean
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

export async function buildRegistry(registryBaseUrl: string) {
  const registry: RegistryItem[] = []

  const [ui, components, hooks, libs] = await Promise.all([
    crawlAndBuildUIRegistry(registryBaseUrl),
    crawlAndBuildComponentsRegistry(registryBaseUrl),
    buildHooksRegistry(registryBaseUrl),
    buildLibRegistry(registryBaseUrl),
  ])

  registry.push(
    ...ui,
    ...components,
    ...hooks,
    ...libs,
  )

  return registry.sort(
    (a, b) => a.name.localeCompare(b.name),
  )
}

async function runShadcnBuild() {
  await Bun.$`bunx --bun shadcn build -c ${ROOT_PATH} -o ${REGISTRY_OUTPUT_PATH}`
}

export const build = new Command()
  .name('build')
  .description('Build components registry.')
  .option(
    '-o, --output <path>',
    'destination directory for json files',
    './public/r',
  )
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
    '-u, --registry-base-url <registryBaseUrl>',
    'base url for the registry assets',
    REGISTRY_URL,
  )
  .option(
    '--dry-run',
    'only generate registry.json file without building the registry',
    false,
  )
  .action(async (_cmd, args) => {
    const opts = args.opts() as BuildCommandOptions
    let items: RegistryItem[]

    try {
      consola.start('Creating registry.json file...')
      items = await buildRegistry(opts.registryBaseUrl)

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
    }
    catch (error) {
      consola.error(error)
      process.exit(1)
    }

    if (opts.dryRun)
      return

    try {
      consola.start('Building registry...')
      await rimraf(REGISTRY_OUTPUT_PATH)
      await buildIndexJson(items)
      await buildThemes()
      await buildStyles()
      // await buildIcons()
      await runShadcnBuild()
      consola.success('Registry built successfully.')
    }
    catch (error) {
      consola.error(error)
      process.exit(1)
    }
  })
