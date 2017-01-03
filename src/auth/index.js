import {router} from '../main.js'
import localstorage from 'localStorage'
import qs from 'querystring'

const GATEKEEPER = 'https://codeflight-gatekeeper-staging.herokuapp.com'

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
  },

  login(context, github_code) {

    this.user.login_loading = true

    var url = GATEKEEPER + '/authenticate/' + github_code

    context.$http.get(url).then((response) => {
      localstorage.setItem('github-token', response.body.token);
      var url = GATEKEEPER + '/auth/travis/'+ response.body.token

      context.$http.get(url).then((response) => {
        localstorage.setItem('travis-token', response.body.access_token);
        window.location = window.location.origin;

      }, (response) => {
        //error callback
        console.log(response)
      })

    }, (response) => {
      //error callback
      console.log(response)
    })
  },

  getGithubProfile (context, github_token) {
    var url = 'https://api.github.com/user'
    var options = {
      headers: {
        authorization: 'token ' + github_token
      }
    }

    context.$http.get(url, options).then((response) => {

      localstorage.setItem('user-name', response.body.name);
      localstorage.setItem('user-login', response.body.login);
      this.user.user_name = response.body.name
      this.user.user_login = response.body.login

    }, (response) => {
      //error callback
      console.log(response)
    });
  },

  getGithubAuthHeader() {
    return {
      'Authorization': 'token ' + localStorage.getItem('github-token')
    }
  },

  getTravisAuthHeader() {
    return {
      'Authorization': 'token ' + localStorage.getItem('travis-token')
    }
  }
}
