import Vue from 'vue'
import VueRouter from 'vue-router';
import VueCookies from 'vue-cookies';
import App from './App.vue'

import Router from './routes/index';

Vue.use(VueRouter);
Vue.use(VueCookies);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router: Router,
}).$mount('#app')
