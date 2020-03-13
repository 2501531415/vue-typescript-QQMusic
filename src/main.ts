import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { Lazyload } from 'vant';
import store from './store'
Vue.use(Lazyload);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
