// test/component-a.spec.js
var Vue = require('vue')
var ComponentWelcomeMessage = require('../../../src/components/WelcomeMessage.vue')

describe('WelcomeMessage.vue', function () {

  // asserting rendered result by actually rendering the component
  it('should render correct message', function () {
    var vm = new Vue({
      template: '<div><test username="Test User"></test></div>',
      components: {
        'test': ComponentWelcomeMessage
      }
    }).$mount()
    expect(vm.$el.querySelector('h2').textContent).toBe('Welcome Test User')
  })

})
