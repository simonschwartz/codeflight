<template>
  <div id="app">
    <app-header></app-header>
    <welcome-message></welcome-message>
    <project-list></project-list>
</template>

<script>
import auth from './auth'
import AppHeader from './components/AppHeader.vue'
import WelcomeMessage from './components/WelcomeMessage.vue'
import ProjectList from './components/ProjectList.vue'

export default {
  components: { AppHeader, WelcomeMessage, ProjectList },
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
