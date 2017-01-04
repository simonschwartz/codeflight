// test/component-a.spec.js
var Vue = require('vue')
var ComponentProjectList = require('../../../src/components/ProjectList.vue')

describe('ProjectList.vue', function () {
  const testData = [
    {
      "id":11430212,
      "slug":"simonschwartz/codeflight",
      "description":"built with name",
      "last_build_id":188735266,
      "last_build_number":"11",
      "last_build_status":0,
      "last_build_result":0,
      "last_build_duration":80,
      "last_build_language":null,
      "last_build_started_at":"2017-01-04T03:15:33Z",
      "last_build_finished_at":"2017-01-04T03:16:53Z",
      "active":true
    }
  ]
  // asserting rendered result by actually rendering the component
  it('should render correct message', function () {
    var vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ComponentProjectList
      },
      data() {
        return {
          projects_loading: false,
          projects: testData
        }
      }
    }).$mount()
  })

})
