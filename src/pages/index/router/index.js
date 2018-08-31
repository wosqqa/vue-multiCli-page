import Vue from 'vue'
import Router from 'vue-router'
const appMytab = resolve => require(['@/pages/index/app_mytab.vue'], resolve)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: appMytab,
      name: '邀请好友',
      meta: {
        keepAlive: true // 需要缓存
      }
    },
  ]
})
