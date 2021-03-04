import Vue from 'vue';
import entry from './app';
import mobileEntry from './mobile';
import VueRouter from 'vue-router';
import Element from 'element-ui';
import zeta from 'main/index.js';
import hljs from 'highlight.js';
import routes from './route.config';
import demoBlock from './components/demo-block';
import MainFooter from './components/footer';
import MainHeader from './components/header';
import SideNav from './components/side-nav';
import FooterNav from './components/footer-nav';
import MobileBox from './components/mobile-box';
import title from './i18n/title';

import 'element-ui/lib/theme-chalk/index.css';
import './demo-styles/index.scss';
import './assets/styles/common.css';
import './assets/styles/fonts/style.css';
import icon from './icon.json';

Vue.use(zeta);
Vue.use(Element);
Vue.use(VueRouter);
Vue.component('demo-block', demoBlock);
Vue.component('main-footer', MainFooter);
Vue.component('main-header', MainHeader);
Vue.component('side-nav', SideNav);
Vue.component('footer-nav', FooterNav);
Vue.component('mobile-box', MobileBox);

const globalEle = new Vue({
  data: { $isEle: false } // 是否 ele 用户
});

Vue.mixin({
  computed: {
    $isEle: {
      get: () => (globalEle.$data.$isEle),
      set: (data) => {globalEle.$data.$isEle = data;}
    }
  }
});

Vue.prototype.$icon = icon; // Icon 列表页用

const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes
});

router.afterEach(route => {
  // https://github.com/highlightjs/highlight.js/issues/909#issuecomment-131686186
  Vue.nextTick(() => {
    const blocks = document.querySelectorAll('pre code:not(.hljs)');
    Array.prototype.forEach.call(blocks, hljs.highlightBlock);
  });
  const data = title[route.meta.lang];
  for (let val in data) {
    if (new RegExp('^' + val, 'g').test(route.name)) {
      document.title = data[val];
      return;
    }
  }
  document.title = 'ZtElement';
  // ga('send', 'event', 'PageView', route.name);
});

// 如果是手机demo 使用不同的入口
let mainEntry = entry
const ismobile = /\/mobile\//.test(window.location.href);
if (ismobile) {
  mainEntry = mobileEntry
}
new Vue({ // eslint-disable-line
  ...mainEntry,
  router
}).$mount('#app');
