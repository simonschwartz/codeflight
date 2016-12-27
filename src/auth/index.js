import localstorage from 'localStorage'
import xhr from 'xhr'
import qs from 'querystring'

const GATEKEEPER = 'http://localhost:9999'

export default {

  user: {
    authenticated: false,
    github_code: '',
    github_token: localstorage.getItem('github-token'),
    travis_token: localstorage.getItem('travis-token')
  },

  checkAuth() {
    if(this.user.github_token && this.user.travis_token) {
      this.user.authenticated = true
    }
    else {
      this.user.authenticated = false
    }
  },

  logout() {
    localStorage.removeItem('github-token')
    this.user.github_token = ''
    localStorage.removeItem('travis-token')
    this.user.travis_token = ''
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
  }
}
