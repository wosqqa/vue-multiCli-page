import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/assets/scss/common/reset.scss'
import VueLazyLoad from 'vue-lazyload'

Vue.use(VueLazyLoad,{
    error:'',
    loading:''
})
Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.name) {
    document.title = to.name;
  }
  next()
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
