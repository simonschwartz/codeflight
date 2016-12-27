<template>
  <div id="app">
    <app-header></app-header>
    <welcome-message></welcome-message>
</template>

<script>
import auth from './auth'
import AppHeader from './components/AppHeader.vue'
import WelcomeMessage from './components/WelcomeMessage.vue'

export default {
  components: { AppHeader, WelcomeMessage },
  name: 'app',
  data: function () {
    return {
      msg: 'AUTH:'+auth.user.authenticated,
    }
  },
  methods: {
  }
}
</script>
