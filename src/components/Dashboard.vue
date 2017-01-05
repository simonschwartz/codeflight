<template>
  <div class="ui container">
  <welcome-message v-bind:username="user.user_name" v-bind:userlogin="user.user_login"></welcome-message>
  <project-list v-bind:userlogin="user.user_login"></project-list>
</div>
</template>

<script>
import auth from '../auth'
import WelcomeMessage from './WelcomeMessage.vue'
import ProjectList from './ProjectList.vue'
import CreateProjectButton from './CreateProjectButton.vue'

export default {
  name: 'Dashboard',
  components: { WelcomeMessage, ProjectList, CreateProjectButton },
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
  }
}
</script>

<style lang="scss" scoped>

.container {
  margin-top: 2.5em;
}

</style>
