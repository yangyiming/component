import module from './src/main';
/* istanbul ignore next */
module.install = function(Vue) {
  Vue.component(module.name, module);
};

export default module;
