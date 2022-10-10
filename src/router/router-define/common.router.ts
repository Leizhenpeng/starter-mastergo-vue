import type { RouteRecordRaw } from 'vue-router'
import { EPagePath } from '../enum'
import ProcessVue from '~/pages/Process.vue'

export const MainRoute: RouteRecordRaw = {
  path: EPagePath.Main,
  name: 'main',
  component: ProcessVue,
  meta: {
  },
}

// export const ChangeAPiRoute: RouteRecordRaw = {
//   path: EPagePath.ChangeApi,
//   name: 'change_api',
//   component: ChangeApiVue,
//   meta: {
//   },
// }

export const LeftRoute: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: 'left',
  redirect: EPagePath.Main,
  meta: {
  },
}
