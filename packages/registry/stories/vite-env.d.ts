/// <reference types="vite/client" />

import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    /** Title to show for the route (optional) */
    title?: string
    /** Layout component to render for the route */
    layout?: any
  }
}
