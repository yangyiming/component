import module from './src/main';
const namespace = 'Co'
/* istanbul ignore next */
module.install = function(Vue) {
  Vue.component(namespace + module.name, module);
};

export default module;
