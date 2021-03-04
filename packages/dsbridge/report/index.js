import module from './src/main'

/* istanbul ignore next */
module.install = function(Vue) {
  Vue.mixin({
    methods: {
      ...module
    }
  })
};
export default module
