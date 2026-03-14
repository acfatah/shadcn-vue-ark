#!/usr/bin/env bun

/**
 * Script to lint all workspaces in parallel using eslint.
 * Accepts an optional --fix flag.
 */

import Bun from 'bun'
import { existsSync } from 'node:fs'
import process from 'node:process'
import { join } from 'pathe'

import { readDir } from './utils'

const TARGET_DIRS = ['apps', 'packages', 'templates']
const argv = Array.isArray((Bun as any)?.argv) ? (Bun as any).argv.slice(2) : process.argv.slice(2)
const useFix = argv.includes('--fix')

interface LintResult {
  path: string
  exitCode: number
  stdout: string
  stderr: string
  timedOut: boolean
}

async function lintDir(path: string): Promise<LintResult | null> {
  const hasConfig = existsSync(join(path, 'eslint.config.ts'))
    || existsSync(join(path, 'eslint.config.js'))
    || existsSync(join(path, 'eslint.config.mjs'))

  if (!hasConfig)
    return null

  const args = ['bunx', '--bun', 'eslint', '.'] as string[]
  if (useFix)
    args.push('--fix')

  console.log(`Linting ${path}...`)

  const proc = Bun.spawn(args, {
    cwd: path,
    stdout: 'pipe',
    stderr: 'pipe',
  })

  const timeoutMs = Number(process.env.LINT_TIMEOUT_MS ?? 5 * 60 * 1000)
  let timedOut = false
  const timer = setTimeout(() => {
    timedOut = true
    try {
      proc.kill()
    }
    catch {}
  }, timeoutMs)

  const exitCode = await proc.exited.finally(() => clearTimeout(timer))
  const stdout = await new Response(proc.stdout).text()
  const stderr = await new Response(proc.stderr).text()

  return { path, exitCode, stdout, stderr, timedOut }
}

async function main(): Promise<void> {
  const tasks: Promise<LintResult | null>[] = []

  for (const targetDir of TARGET_DIRS) {
    let dir
    try {
      dir = await readDir(targetDir, { withFileTypes: true, encoding: 'utf8' })
    }
    catch {
      continue
    }

    for (const dirent of dir) {
      if (!dirent.isDirectory())
        continue

      const dirPath = join(targetDir, String(dirent.name))
      tasks.push(lintDir(dirPath))
    }
  }

  // Also lint the scripts directory itself
  tasks.push(lintDir('scripts'))

  const results = (await Promise.all(tasks)).filter((r): r is LintResult => r !== null)

  let hasErrors = false

  for (const result of results) {
    const pathName = `"${result.path}"`

    if (result.timedOut) {
      console.error(`Lint for ${pathName} timed out and was killed.`)
      hasErrors = true
      continue
    }

    if (result.stdout.length)
      console.log(result.stdout)

    if (result.stderr.length)
      console.error(result.stderr)

    if (result.exitCode) {
      console.error(`ERROR: Lint failed for ${pathName} (exit ${result.exitCode}).`)
      hasErrors = true
    }
    else {
      console.log(`Lint passed for ${pathName}.`)
    }
  }

  if (hasErrors) {
    console.error('Some workspaces have lint errors.')
    process.exit(1)
  }

  console.log('All workspaces passed lint.')
}

main()
