// test/component-a.spec.js
var Vue = require('vue')
var ComponentProjectListItem = require('../../../src/components/ProjectListItem.vue')

describe('ProjectListItem.vue', function () {
  const testData = [
    {
      last_build_status: '0',
      slug: 'test-slug',
      last_build_finished_at: ''
    }
  ]
  // asserting rendered result by actually rendering the component
  it('should render correct message', function () {
    var vm = new Vue({
      template: '<div><test v-for="item in projects" :project="item"></test></div>',
      components: {
        'test': ComponentProjectListItem
      },
      data() {
        return {
          projects: testData
        }
      }
    }).$mount()
    expect(vm.$el.querySelector('a.header').textContent).toBe('test-slug'),
    expect(vm.$el.querySelector('span').textContent).toBe('Running')
  })

})
