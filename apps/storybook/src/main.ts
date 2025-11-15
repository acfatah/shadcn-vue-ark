import 'packages.registry/styles/global.css'

// TODO: refactor `packages/registry/src/styles` with `apps/storybook/src/styles`

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')
