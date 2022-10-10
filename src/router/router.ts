import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import type { App } from 'vue'
import { LeftRoute, MainRoute } from './router-define'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [MainRoute, LeftRoute] as unknown as RouteRecordRaw[],
})

// config router
export function setupRouter(app: App<Element>) {
  app.use(router)
}
