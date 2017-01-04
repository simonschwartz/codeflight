<template>
  <li class="item">
    <a v-bind:href="'https://travis-ci.org/'+project.slug">
      <span v-if="project.last_build_status == 1">Broken</span>
      <span v-if="project.last_build_status == 0">Running</span>
      <span v-else>Stopped</span>
    </a>

    <div class="content">
      <a v-bind:href="'https://github.com/'+project.slug" class="header">{{project.slug}}</a>
      <div class="description">Updated {{project.last_build_finished_at | formatDate }}</div>
    </div>
  </li>
</template>

<script>
import moment from 'moment'

export default {
  data() {
    return {
    }
  },
  filters: {
    formatDate: function(v) {
      return moment(v).fromNow()
    }
  },
  props: ['project']
}
</script>

<style lang="scss" scoped>

</style>
