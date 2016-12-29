import Vue from 'vue'
import App from './App.vue'



import VueRouter from 'vue-router'
Vue.use(VueRouter)

import AppHeader from './components/AppHeader.vue'
import Home from './components/Home.vue'
import Dashboard from './components/Dashboard.vue'

var router = new VueRouter()

var router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/dashboard', auth: true, component: Dashboard },
    { path: '*', redirect: '/home'}
  ]
})

var vm = new Vue({
  el: '#app',
  router: router,
  render: h => h(App),
})
