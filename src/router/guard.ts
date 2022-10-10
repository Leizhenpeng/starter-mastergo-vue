/**
 * @name: index
 * @author: river
 * @date: 2022/3/13 12:30 下午
 * @contact: laolei@forkway.cn
 * @description：路由守卫
 */
import type { Router } from 'vue-router'
import { createAsyncApiCheckGuard } from './router-guard'

export function setupRouterGuard(router: Router) {
  createAsyncApiCheckGuard(router)
}
