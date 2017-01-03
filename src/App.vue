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
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic&subset=latin');
body {
  font-family: 'Lato', 'Helvetica Neue', Arial, Helvetica, sans-serif;
}
</style>

<style src="semantic-ui-css/components/button.min.css"></style>
<style src="semantic-ui-css/components/container.min.css"></style>
<style src="semantic-ui-css/components/reset.min.css"></style>
<style src="semantic-ui-css/components/list.min.css"></style>
<style src="semantic-ui-css/components/form.min.css"></style>
<style src="semantic-ui-css/components/loader.min.css"></style>
<style src="semantic-ui-css/components/segment.min.css"></style>
<style src="semantic-ui-css/components/dimmer.min.css"></style>
