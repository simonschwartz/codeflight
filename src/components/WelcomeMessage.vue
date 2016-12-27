<template>
    <div class="ui container">
      <h2>Welcome {{user_name}}</h2>
    </div>
</template>

<script>
var qs = require('querystring')
var xhr = require('xhr')
import auth from '../auth'

export default {
  data() {
    return {
      user_name: null
    }
  },
  created: function() {
    this.fetchName()
  },
  methods: {
    fetchName: function () {
      var self = this

      var options = {
        url: 'https://api.github.com/user',
        json: true,
        headers: {
          authorization: 'token ' + localStorage.getItem('github-token')
        }
      }

      xhr(options, function (err, res, body) {
        if (err) return callback(err)
        if (body.name) {
          self.user_name = body.name
        } else {
          self.user_name = body.login
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.container {
  margin-top: 2.5em;

  h2 {
    font-size: 1.55rem;
    font-weight: 400;
  }
}

</style>
