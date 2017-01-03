<template>
  <div class="ui container">
    <ul class="ui relaxed divided list">
      <li v-for="project in projects" v-if="project.description == 'built with name'" class="item">

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
    </ul>
  </div>
</template>

<script>

var moment = require('moment');
import localstorage from 'localStorage'

export default {
  data() {
    return {
      projects: null
    }
  },
  props: ['userlogin'],
  watch : {
    //when user login is set - fetch projects (login)
    userlogin : function () {
      this.fetchProjects()
    }
  },
  created: function() {
    //if user login is present, refetch projects (page refresh)
    if (localstorage.getItem('user-login')) {
      this.fetchProjects()
    }
  },
  filters: {
    formatDate: function(v) {
      return moment(v).fromNow()
    }
  },
  methods: {
    fetchProjects: function () {
      var url = 'https://api.travis-ci.org/repos/' +this.userlogin
      var options = {
        data : {
          "repo": {
            'active': true
          }
        }
      }
      this.$http.get(url, options).then((response) => {
        this.projects = response.body
      }, (response) => {
        //error callback
        console.log(response)
      });
    }
  }
}

</script>

<style lang="scss" scoped>

  .container {
    margin-top: 2em;

    ul {
      margin-left: 0;

      li:before {
        content: none;
      }
    }
  }

</style>
