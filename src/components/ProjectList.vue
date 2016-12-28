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

var qs = require('querystring')
var xhr = require('xhr')
var moment = require('moment');
import auth from '../auth'

export default {
  data() {
    return {
      projects: null
    }
  },
  created: function() {
    this.fetchProjects()
  },
  filters: {
    formatDate: function(v) {
      return moment(v).fromNow()
    }
  },
  methods: {
    fetchProjects: function () {
      var self = this

      var options = {
        url: 'https://api.travis-ci.org/repos/' + 'simonschwartz',
        json: true,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'token ' + localStorage.getItem('travis-token'),
        },
        data : {
          "repo": {
            'active': true
          }
        }
      };
      xhr(options, function (err, resp, body) {
        if (err) return callback(err)
        self.projects = body
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
