import {router} from '../main.js'
import localstorage from 'localStorage'
import xhr from 'xhr'
import qs from 'querystring'

const GATEKEEPER = 'http://localhost:9999'

export default {

  user: {
    authenticated: false,
    login_loading: false,
    github_code: '',
    github_token: localstorage.getItem('github-token'),
    travis_token: localstorage.getItem('travis-token'),
    user_name: localstorage.getItem('user-name'),
    user_login: localstorage.getItem('user-login')
  },
  methods: {
    test: function () {
      this.$router.push('dashboard')
    }
  },

  checkAuth() {
    if(this.user.github_token && this.user.travis_token) {
      this.user.authenticated = true
    } else {
      this.user.authenticated = false
    }
  },

  logout() {
    localStorage.removeItem('github-token')
    localStorage.removeItem('travis-token')
    localStorage.removeItem('user-name')
    localStorage.removeItem('user-login')
    this.user.authenticated = false
  },

  //gets the github redirect uri code
  getCode() {
    var query = window.location.href.split('?')[1]
    this.user.github_code = qs.parse(query).code
    return qs.parse(query).code
    console.log('Github_code: '+this.user.github_code)
  },

  //should refactor this to use promises?
  login(github_code) {
    var self = this
    this.user.login_loading = true

    var options = {
      url: GATEKEEPER + '/authenticate/' + github_code,
      json: true
    }

    //this post exhanges github code for github api token
    xhr(options, function (err, res, body){
      localstorage.setItem('github-token', res.body.token);

      var options = {
        url: GATEKEEPER + '/auth/travis/'+ res.body.token,
        json: true
      }

      //this post exchanges github api token for travis api token
      xhr(options, function (err, res, body) {
        if (err) return callback(err)
        localstorage.setItem('travis-token', body.access_token);
        window.location = window.location.origin;
      })
    })
  },

  getGithubProfile (github_token) {
    var self = this
    var options = {
      url: 'https://api.github.com/user',
      json: true,
      headers: {
        authorization: 'token ' + github_token
      }
    }

    xhr(options, function (err, res, body) {
      if (err) return callback(err)
      localstorage.setItem('user-name', body.name);
      localstorage.setItem('user-login', body.login);
      self.user.user_name = body.name
      self.user.user_login = body.login
    })
  }
}
