<template>
  <div>
  <welcome-message v-bind:username="user.user_name" v-bind:userlogin="user.user_login"></welcome-message>
  <project-list v-bind:userlogin="user.user_login"></project-list>
</div>
</template>

<script>
import auth from '../auth'
import WelcomeMessage from './WelcomeMessage.vue'
import ProjectList from './ProjectList.vue'

export default {
  name: 'Dashboard',
  components: { WelcomeMessage, ProjectList },
  data: function () {
    return {
      user: auth.user
    }
  },
  route: {
    canActivate() {
      return user.authenticated
    }
  },
  methods: {
    test: function () {
      //this.$router.push('/')
    }
  }
}
</script>
