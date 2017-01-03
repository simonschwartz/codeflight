<template>
<div class="ui vertical segment">
  <div class="ui inverted dimmer" v-bind:class="{ active: building }">
    <div class="ui text loader">Building your project</div>
  </div>
  <form class="ui large form">
    <div class="field">
      <label for="project_name">Project name</label>
      <input v-model="project_name" type="text" id="project_name" placeholder="your-project-name">
    </div>
    <button v-on:click="create" class="ui submit button" type="submit">Create new project</button>
  </form>
</div>
</template>

<script>
import create from '../create_project'
import {router} from '../main'

export default {
  components: { },
  data: function () {
    return {
      project_name: '',
      project_id: '',
      building: false
    }
  },
  methods: {
    create: function(e) {
      e.preventDefault()
      this.building = true
      create.createRepo(this, this.project_name).then(response => {
        create.addTravisConfig(this, this.project_name).then(response => {
          create.syncTravis(this).then(response => {

            var self = this
            setTimeout(function() {

              create.getTravisRepo(self, self.project_name).then(response => {
                self.project_id = response
                create.activateTravisRepo(self, self.project_id).then(response => {
                  create.setSurgeVars(self, self.project_id).then(response => {
                    create.createProjectFile(self, self.project_name).then(response => {
                      this.building = false
                      self.$router.push('/dashboard')
                    });
                  });
                });
              });

            }, 15000)
          });
        });
      });
    }
  }
}
</script>

<style lang="scss" scoped>

.container {
  margin-top: 2.5em;

  form {
    max-width: 400px;
  }
}

</style>
