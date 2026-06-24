import { join, resolve } from 'pathe'

const ROOT_PATH = resolve(__dirname, '..', '..', '..', '..')
const REGISTRY_PATH = join(ROOT_PATH, 'src')
const UI_PATH = join(REGISTRY_PATH, 'components', 'ui')
const COMPONENTS_PATH = join(REGISTRY_PATH, 'components')
const BLOCKS_PATH = join(COMPONENTS_PATH, 'blocks')
const LAYOUTS_PATH = join(COMPONENTS_PATH, 'layouts')
const COMPOSABLES_PATH = join(REGISTRY_PATH, 'composables')
const LIB_PATH = join(REGISTRY_PATH, 'lib')
const STORIES_PATH = join(ROOT_PATH, 'stories')
const STORIES_UI_PATH = join(STORIES_PATH, 'components', 'ui')
const PUBLIC_PATH = join(ROOT_PATH, 'public')
const PUBLIC_STORIES_PATH = join(PUBLIC_PATH, 'stories')

export {
  BLOCKS_PATH,
  COMPONENTS_PATH,
  COMPOSABLES_PATH,
  LAYOUTS_PATH,
  LIB_PATH,
  PUBLIC_PATH,
  PUBLIC_STORIES_PATH,
  REGISTRY_PATH,
  ROOT_PATH,
  STORIES_PATH,
  STORIES_UI_PATH,
  UI_PATH,
}
