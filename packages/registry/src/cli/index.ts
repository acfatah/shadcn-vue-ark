#!/usr/bin/env bun

import { Command } from 'commander'
import { resolve } from 'pathe'

import { build } from './commands/build'

const packageJson = await Bun.file(resolve(__dirname, '..', '..', 'package.json')).json()

async function main() {
  const program = new Command()
    .name('bun registry')
    .description(packageJson.description)
    .version(
      packageJson.version,
      '-v, --version',
      'display the version number',
    )

  program
    .addCommand(build)

  program.parse()
}

main()
