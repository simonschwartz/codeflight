<template>
  <div class="ui container grid">
    <div class="ten wide column">
      <create-project-form></create-project-form>
    </div>
    <!--
    <div class="six wide column">
      <project-build-log v-bind:progress="progress"></project-build-log>
    </div>
  -->
</div>
</template>

<script>
import auth from '../auth'
import create from '../create_project'
import CreateProjectForm from './CreateProjectForm.vue'
import ProjectBuildLog from './ProjectBuildLog.vue'

export default {
  name: 'create-new-project',
  components: { CreateProjectForm, ProjectBuildLog },
  data: function () {
    return {
      user: auth.user,
      progress: create.progress
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
