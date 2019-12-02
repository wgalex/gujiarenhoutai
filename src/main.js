import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// import 'font-awesome/css/font-awesome.css'

//点击图片放大插件
import VueDirectiveImagePreviewer from 'vue-directive-image-previewer'
import 'vue-directive-image-previewer/dist/assets/style.css'
Vue.use(VueDirectiveImagePreviewer)

Vue.config.productionTip = false


Vue.use(ElementUI)
import './common/css/index.css'
import 'normalize.css'

// 配置路由权限
// router.beforeEach((to, from, next) => {
//   console.log(to.name)
//   if (to.name == 'login') {
//     next()
//   } else {
//     next({
//       path: '/login'
//     })
//   }
  
// })


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
