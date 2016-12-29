<template>
  <div id="app">
    <app-header></app-header>
    <router-view></router-view>
</template>

<script>
import auth from './auth'
import AppHeader from './components/AppHeader.vue'
import {router} from './main'

export default {
  components: { AppHeader },
  name: 'app',
  data: function () {
    return {
      user: auth.user,
    }
  },
  watch: {
  },
  methods: {
    //auth methods
    //get name method
  }
}
</script>
