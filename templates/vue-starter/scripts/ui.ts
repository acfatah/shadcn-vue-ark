#!/usr/bin/env bun

import { program } from 'commander'
import { consola } from 'consola'
import process from 'node:process'

type ComponentName = string

// shadcn GitHub-native registry address (`<owner>/<repo>`) plus the ref
// (branch/tag/sha) to resolve. `add` installs via
// `shadcn add <owner>/<repo>/<item>`; `list`/`find`/`info` read the generated
// `registry.json` catalog directly. Override any of these via env.
const REGISTRY = (process.env.REGISTRY || 'acfatah/shadcn-vue-ark').replace(/^\/+|\/+$/g, '')
const REGISTRY_REF = process.env.REGISTRY_REF || 'main'

const CATALOG_URL = (process.env.REGISTRY_CATALOG_URL
  || `https://raw.githubusercontent.com/${REGISTRY}/refs/heads/${REGISTRY_REF}/packages/registry/registry.json`).replace(/\/+$/, '')

function logError(error: unknown) {
  consola.error(
    typeof error === 'object' && error !== null && 'message' in error
      ? (error as { message: string }).message
      : String(error),
  )
}

// Fetch the registry catalog and return its `items[]`. Tolerates the legacy
// top-level-array shape. Throws a clear error on any non-OK response so a 404
// never surfaces as a confusing "Failed to parse JSON".
async function fetchCatalog(): Promise<any> {
  const res = await fetch(CATALOG_URL)

  if (!res.ok)
    throw new Error(`Registry catalog unreachable (HTTP ${res.status}) at ${CATALOG_URL}`)

  const data = await res.json() as { items?: any[] } | any[]

  return Array.isArray(data) ? data : (data.items ?? [])
}

async function loadCatalogOrExit() {
  try {
    return await fetchCatalog()
  }
  catch (error) {
    logError(error)

    process.exit(1)
  }
}

async function checkStatus() {
  try {
    const res = await fetch(CATALOG_URL)

    if (!res.ok)
      throw new Error(`Registry unreachable (HTTP ${res.status}) at ${CATALOG_URL}`)
  }
  catch (error) {
    logError(error)

    process.exit(1)
  }
}

program.command('status')
  .description('Check the status of the registry')
  .action(async () => {
    await checkStatus()
    consola.success('Registry is up and running.')
  })

program.command('list')
  .description('List available blocks and components')
  .option('--block', 'filter to show only blocks (*-block)')
  .option('--component', 'filter to show only components (no suffix)')
  .option('--layout', 'filter to show only layouts (*-layout)')
  .option('--lib', 'filter to show only libs (*-lib)')
  .action(async (options: { block?: boolean, component?: boolean, layout?: boolean, lib?: boolean }) => {
    let components = await loadCatalogOrExit()

    if (options.block) {
      components = components.filter((c: any) => c.name.endsWith('-block'))
    }

    if (options.layout) {
      components = components.filter((c: any) => c.name.endsWith('-layout'))
    }

    if (options.lib) {
      components = components.filter((c: any) => c.name.endsWith('-lib'))
    }

    if (options.component) {
      components = components.filter((c: any) => !c.name.endsWith('-block') && !c.name.endsWith('-layout') && !c.name.endsWith('-lib'))
    }

    consola.log(components.reduce((acc: string, component: any) => {
      acc += `${component.name} `

      return acc
    }, '').trim())
  })

program.command('info')
  .description('Display information about a block or component')
  .argument('<component>', 'the component to display information about')
  .action(async (arg: string) => {
    const components = await loadCatalogOrExit()
    const component = components.find((c: any) => c.name === arg)

    if (!component) {
      consola.error('Component not found')

      process.exit(1)
    }

    consola.log(JSON.stringify({
      ...component,
      // skip the content key
      files: ((component as any).files ?? []).map(
        (file: { type: string, path: string }) => ({
          type: file.type,
          path: file.path,
        }),
      ),
    }, null, 2))
  })

program.command('find')
  .description('Find matching components')
  .argument('<query>', 'the query to search for')
  .action(async (arg: string) => {
    const components = await loadCatalogOrExit()

    consola.log(components.reduce((acc: string, component: any) => {
      if (component.name.includes(arg)) {
        acc += `${component.name} `
      }

      return acc
    }, '').trim())
  })

program.command('add')
  .description('Add a component to your project')
  .argument('<components...>', 'the components to add')
  .option('--first', 'display just the first substring')
  .option('-y, --yes', 'skip confirmation prompt. (default: false)')
  .option('-o, --overwrite', 'overwrite existing files. (default: false)')
  .option('-s, --silent', 'mute output. (default: false)')
  .action(async (components, options) => {
    await checkStatus()

    // GitHub-native install addresses: `<owner>/<repo>/<item>` (optionally
    // pinned with `#<ref>` when REGISTRY_REF is explicitly set).
    const pin = process.env.REGISTRY_REF ? `#${REGISTRY_REF}` : ''
    const addresses: string[] = components.map(
      (component: string) => `${REGISTRY}/${component}${pin}`,
    )

    consola.start('Adding the following components:')

    components.forEach((component: ComponentName) => {
      console.log(`- ${component}`)
    })

    const flags = {
      y: options.yes,
      o: options.overwrite,
      s: options.silent,
    }

    const opts = Object.entries(flags)
      .filter(([_key, value]) => value)
      .map(([key]) => `-${key}`)

    const proc = Bun.spawn(
      ['bunx', '--bun', 'shadcn@latest', 'add', ...opts, ...addresses],
      {
        stdin: 'inherit',
        stdout: 'inherit',
        stderr: 'inherit',
      },
    )

    if (!await proc.exited) {
      process.stdout.write('\x1B[1A\x1B[K')
      consola.success('Done!')
    }
  })

program.parse()
