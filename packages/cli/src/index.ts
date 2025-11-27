#!/usr/bin/env bun

import { Command } from 'commander'
import packageJson from '../package.json'
import { build } from './commands/build'

async function main() {
  const program = new Command()
    .name('bun cli')
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
