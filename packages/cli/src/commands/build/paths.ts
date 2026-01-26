import { join, resolve } from 'pathe'

const ROOT_PATH = resolve(__dirname, '..', '..', '..', '..', 'registry')
const REGISTRY_URL = join(ROOT_PATH, 'src')
const REGISTRY_OUTPUT_PATH = join(ROOT_PATH, 'public', 'r')
const UI_PATH = join(REGISTRY_URL, 'components', 'ui')
const COMPONENTS_PATH = join(REGISTRY_URL, 'components')
const COMPOSABLES_PATH = join(REGISTRY_URL, 'composables')

export {
  COMPONENTS_PATH,
  COMPOSABLES_PATH,
  REGISTRY_OUTPUT_PATH,
  REGISTRY_URL,
  ROOT_PATH,
  UI_PATH,
}
