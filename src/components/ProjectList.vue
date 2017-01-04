<template>

  <div v-if="projects_loading" class="ui inline active loader"></div>

  <div v-else>
    <div v-if="projects" class="ui container project-list">
      <create-project-button></create-project-button>
      <ul class="ui relaxed divided list">
        <project-list-item
          v-for="item in projects"
          :project="item"
          v-if="item.description == 'built with name'">
        </project-list-item>
      </ul>
    </div>
    <div v-else class="ui container project-list-empty">
      <p>You don't have any projects yet. Let's change that!</p>
      <create-project-button></create-project-button>
    </div>
  </div>

</template>

<script>
import localstorage from 'localStorage'
import CreateProjectButton from './CreateProjectButton.vue'
import ProjectListItem from './ProjectListItem.vue'

export default {
  components: {  CreateProjectButton, ProjectListItem },
  data() {
    return {
      projects: null,
      projects_loading: true
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
        this.projects_loading = false
      }, (response) => {
        //error callback
        console.log(response)
      });
    },
    checkTravisLinked: function () {
      //check is travis is linked to GH account
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
