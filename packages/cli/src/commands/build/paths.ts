import { join, resolve } from 'pathe'

const ROOT_PATH = resolve(__dirname, '..', '..', '..', '..', 'registry')
const REGISTRY_PATH = join(ROOT_PATH, 'src')
const REGISTRY_OUTPUT_PATH = join(ROOT_PATH, 'public', 'r')
const UI_PATH = join(REGISTRY_PATH, 'components', 'ui')
const COMPONENTS_PATH = join(REGISTRY_PATH, 'components')
const BLOCKS_PATH = join(REGISTRY_PATH, 'blocks')
const COMPOSABLES_PATH = join(REGISTRY_PATH, 'composables')
const LIB_PATH = join(REGISTRY_PATH, 'lib')

export {
  BLOCKS_PATH,
  COMPONENTS_PATH,
  COMPOSABLES_PATH,
  LIB_PATH,
  REGISTRY_OUTPUT_PATH,
  REGISTRY_PATH,
  ROOT_PATH,
  UI_PATH,
}
