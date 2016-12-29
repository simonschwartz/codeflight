<template>
  <div id="app">
    <app-header></app-header>
    <welcome-message v-bind:username="user.user_name" v-bind:userlogin="user.user_login"></welcome-message>
    <project-list v-bind:userlogin="user.user_login"></project-list>
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
      user: auth.user
    }
  },
  methods: {
    //auth methods
    //get name method
  }
}
</script>
