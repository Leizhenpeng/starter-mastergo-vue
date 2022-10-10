/**
 * @name: permission.guard.ts
 * @author: river
 * @date: 2022/3/13 12:40 下午
 * @contact: laolei@forkway.cn
 * @description：与权限有关的路由守卫，判断是否登录，根据角色信息获取路由
 */
import type { Router } from 'vue-router'
// import { ifHasApi, ifInitApi } from '~/state'

export function createAsyncApiCheckGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    next()
    // 如果没有初始化, 就不要拦截路由
    // if (!ifInitApi.value) {
    //   next()
    //   return
    // }

    // if (to.path.includes(EPagePath.ChangeApi)) {
    //   next()
    //   return
    // }

    // // // 检测是否登录
    // if (ifHasApi.value) {
    //   next()
    //   return
    // }

    // next({
    //   path: EPagePath.ChangeApi,
    //   replace: true,
    // })
  })
}
