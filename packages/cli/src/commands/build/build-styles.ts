import { join } from 'pathe'

import { writeFile } from '../../utils'
import { REGISTRY_OUTPUT_PATH } from './paths'

export async function buildStyles() {
  const styles = [
    {
      name: 'new-york',
      label: 'New York',
    },
    {
      name: 'default',
      label: 'Default',
    },
  ]

  await writeFile(
    join(REGISTRY_OUTPUT_PATH, 'styles', 'index.json'),
    JSON.stringify(styles, null, 2),
  )
}
