import Vue from 'vue'
import App from './App.vue'
import auth from './auth'

auth.checkAuth()
var code = auth.getCode()

if (!auth.user.authenticated && code) {
  auth.login(auth.user.github_code)
}

var vm = new Vue({
  el: '#app',
  render: h => h(App),
})
