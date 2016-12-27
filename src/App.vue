<template>
  <div id="app">
    <app-header></app-header>
    <div class="ui container">
      <h1>{{ msg }}</h1>
    </div>
</template>

<script>
import auth from './auth'
import AppHeader from './components/AppHeader.vue'

export default {
  components: { AppHeader },
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
