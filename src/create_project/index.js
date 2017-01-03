import {router} from '../main.js'
import auth from '../auth'
import localstorage from 'localStorage'

const GITHUB_AUTH_HEADER = {
  headers: auth.getGithubAuthHeader()
}

const TRAVIS_AUTH_HEADER = {
  headers: auth.getTravisAuthHeader()
}

const GATEKEEPER = 'https://codeflight-gatekeeper-staging.herokuapp.com'

export default {

  progress: {
    repo_created: {
      name: 'Creating GitHub repository',
      loading: false,
      completed: false
    },
    travis_yml_created: {
      name: 'Creating Travis configuration',
      loading: false,
      completed: false
    },
    travis_synced: {
      name: 'Syncing Travis projects',
      loading: false,
      completed: false
    },
    activate_travis: {
      name: 'Activating Travis',
      loading: false,
      completed: false
    }
  },

  createRepo(context, project_name) {
    var url = 'https://api.github.com/user/repos'
    var body = {
      'name': project_name,
      'description': "built with name",
      'auto_init': true
    }

    return context.$http.post(url, body, GITHUB_AUTH_HEADER).then((response) => {
      console.log('repo created')
      return response;
    }, (response) => {
      //error callback
      console.log('repo create failed')
    });
  },

  addTravisConfig(context, project_name) {
    var url = 'https://api.github.com/repos/'+auth.user.user_login+'/'+project_name+'/contents/.travis.yml?ref=master'
    var travisYML = 'language: node_js\nnode_js:\n  - 0.12\nscript:\n  - echo "Welcome to CodeFlight"\ndeploy:\n  provider: surge\n  domain: '+project_name+'-codeflight.surge.sh';
    var travisYMLEncoded = window.btoa(travisYML)
    var body = {
      "path": ".travis.yml",
      "name": ".travis.yml",
      "type": "file",
      "content": travisYMLEncoded,
      "message": "Create travis.yml"
    }

    return context.$http.put(url, body, GITHUB_AUTH_HEADER).then((response) => {
      console.log('travis.yml created')
      return response;
    }, (response) => {
      //error callback
      console.log('travis.yml create failed')
    });
  },

  syncTravis(context){
    var url = 'https://api.travis-ci.org/users/sync'
    var body = {
      "user": {
        "login": auth.user.user_login
      }
    }

    return context.$http.post(url, body, TRAVIS_AUTH_HEADER).then((response) => {
      console.log('travis is syncing')
    }, (response) => {
      //error callback
      console.log('travis.yml didnt sync')
    });
  },

  getTravisRepo(context, project_name) {
    var url = 'https://api.travis-ci.org/repos/'+auth.user.user_login+'/'+project_name

    return context.$http.get(url, TRAVIS_AUTH_HEADER).then((response) => {
      console.log('fetched travis project id')
      return response.body.id;

    }, (response) => {
      //error callback
      console.log('travis.yml didnt sync')
    });
  },

  activateTravisRepo(context, project_id) {
    var url =  'https://api.travis-ci.org/hooks'

    var body = {
      "hook": {
        "id": project_id,
        "active": true
      }
    }

    return context.$http.put(url, body, TRAVIS_AUTH_HEADER).then((response) => {
      console.log('travis repo is activated')
      return response;
    }, (response) => {
      //error callback
      console.log('travis repo activation failed')
    });
  },

  setSurgeVars(context, project_id) {
    var url = GATEKEEPER+'/setenv/'+project_id+'/' + localstorage.getItem('travis-token')

    return context.$http.get(url).then((response) => {
      console.log('env vars sent')
      return response;
    }, (response) => {
      //error callback
      console.log('env vars send failed')
    });
  },

  createProjectFile(context, project_name) {
    var url = 'https://api.github.com/repos/'+auth.user.user_login+'/'+project_name+'/contents/index.html?ref=master'
    var body = {
      "path": "index.html",
      "name": "index.html",
      "type": "file",
      "content": "PGgxPkhlbGxvIFdvcmxkITwvaDE+",
      "message": "Create index.html"
    }

    return context.$http.put(url, body, GITHUB_AUTH_HEADER).then((response) => {
      console.log('index file created')
      return response;
    }, (response) => {
      //error callback
      console.log('index file creation failed')
    });
  }

}
