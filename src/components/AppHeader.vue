<template>
  <header role="banner">
    <div class="ui container">
      <h1>codeflight</h1>
      <a v-if="user.authenticated" class="positive ui button" v-on:click="logout" href="#">Logout</a>
      <a v-else v-bind:href="loginUrl" class="positive ui button"> <div v-if="user.login_loading" class="ui mini active inline loader"></div> Log in with GitHub</a>
    </div>
  </header>
</template>

<script>

const OAUTH_API_URL = 'https://github.com/login/oauth/authorize?client_id='
const OAUTH_CLIENT_ID = '2ca85a89c5f1a9b7dca3'
const OAUTH_SCOPE = '&read:org&user:email&repo_deployment&repo:status&scope=repo&write:repo_hook'
const OAUTH_REDIRECT_URI = 'http://localhost:8080/'
const LOGINURL = OAUTH_API_URL + OAUTH_CLIENT_ID + OAUTH_SCOPE+ '&redirect_uri=' + OAUTH_REDIRECT_URI

import auth from '../auth'
import {router} from '../main'

export default {
  data() {
    return {
      user: auth.user,
      loginUrl: LOGINURL
    }
  },
  created: function() {
    auth.checkAuth()
    auth.getCode()
    if (!auth.user.authenticated && auth.user.github_code) {
      auth.login(auth.user.github_code)
    }
    if (auth.user.authenticated && !auth.user.user_login) {
      auth.getGithubProfile(auth.user.github_token)
      this.$router.push('dashboard')
    }
  },
  methods: {
    logout: function(e) {
      e.preventDefault()
      auth.logout()
      this.$router.push('/')
    },
    login: function() {

    }
  }
}
</script>

<style lang="scss" scoped>

header {
  overflow: hidden;
  border-bottom: 1px solid #f3f3f3;
  padding: 1em 0;

  h1 {
    float: left;
    margin: 0;
  }

  a {
    float: right;

    .ui.loader {
      margin-right: 1em;

      &:before {
        border-color: #fff;
      }
    }
  }
}

</style>
