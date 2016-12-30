import Vue from 'vue'
import App from './App.vue'
import AppHeader from './components/AppHeader.vue'
import Home from './components/Home.vue'
import Dashboard from './components/Dashboard.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.use(VueRouter)

var router = new VueRouter()

var router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/dashboard', component: Dashboard },
    { path: '*', redirect: '/home'}
  ]
})

var vm = new Vue({
  el: '#app',
  router: router,
  render: h => h(App),
})
