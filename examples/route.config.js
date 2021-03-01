import navConfig from './nav.config';

const load = function(path) {
  return r => require.ensure([], () =>
    r(require(`./pages/${path}.vue`)));
};

const loadMobileDemo = function(path) {
  return r => require.ensure([], () =>
    r(require(`./pages/demo/mobile/${path}.vue`)));
};

const loadmd = function(path) {
  return r => require.ensure([], () =>
    r(require(`./docs${path}.md`)));
};

const LOAD_DOCS_MAP = {
  'element': path => {
    return r => require.ensure([], () =>
      r(require(`./docs/element${path}.md`)),
    'element');
  },
  'vant': path => {
    return r => require.ensure([], () =>
      r(require(`./docs/vant${path}.md`)),
    'vant');
  }
};

const loadDocs = function(module, path) {
  return LOAD_DOCS_MAP[module](path);
};

const registerRoute = (navConfig) => {
  let route = [];
  // navConfig.forEach((item) => {
  // let navs = navConfig[lang];
  route.push({
    path: '/component',
    redirect: '/component/installation',
    component: load('component'),
    children: []
  });
  navConfig.forEach(nav => {
    if (nav.href) return;
    if (nav.groups) {
      nav.groups.forEach(group => {
        group.list.forEach(nav => {
          addRoute(nav);
        });
      });
    } else if (nav.children) {
      nav.children.forEach(nav => {
        addRoute(nav);
      });
    } else {
      addRoute(nav);
    }
  });
  // });
  function addRoute(page) {

    let component = ''
    if (page.path === '/changelog') {
      component = load('changelog')
    }
    if (page.path.indexOf('zt-') >= 0) {
      let module = page.package
      let path = page.path.replace('zt-', '')
      component = loadDocs(module, path);
    } else {
      component = loadmd(page.path)
    }

    let child = {
      path: page.path.slice(1),
      meta: {
        title: page.title || page.name,
        description: page.description
      },
      name: 'component-' + (page.title || page.name),
      component: component.default || component
    };
    route[0].children.push(child);
  }

  return route;
};

let route = registerRoute(navConfig);

const generateMiscRoutes = function() {
  let guideRoute = {
    path: '/guide', // 指南
    redirect: '/guide/design',
    component: load('guide'),
    children: [{
      path: 'design', // 设计原则
      name: 'guide-design',
      meta: { },
      component: load('design')
    }, {
      path: 'nav', // 导航
      name: 'guide-nav',
      component: load('nav')
    }]
  };

  let themeRoute = {
    path: '/theme',
    component: load('theme-nav'),
    children: [
      {
        path: '/', // 主题管理
        name: 'theme',
        meta: { },
        component: load('theme')
      },
      {
        path: 'preview', // 主题预览编辑
        name: 'theme-preview-',
        meta: { },
        component: load('theme-preview')
      }]
  };

  let resourceRoute = {
    path: '/resource', // 资源
    meta: { },
    name: 'resource',
    component: load('resource')
  };

  let indexRoute = {
    path: '/', // 首页
    meta: { },
    name: 'home',
    component: load('index')
  };

  return [guideRoute, resourceRoute, themeRoute, indexRoute];
};
const generateMobileRoutes = [{
  path: '/mobile',
  name: 'mobile',
  component: loadMobileDemo('index'),
  children: [{
    path: 'zt-scroll-refresh/index', //
    name: 'zt-scroll-refresh',
    component: loadMobileDemo('zt-scroll-refresh/index')
  },
  {
    path: 'zt-scroll-refresh/waterfall', // 资源
    name: 'zt-scroll-waterfall',
    component: loadMobileDemo('zt-scroll-refresh/waterfall')
  }]
}]
route = route.concat(generateMiscRoutes())
route = route.concat(generateMobileRoutes)
route.push({
  path: '/play',
  name: 'play',
  component: require('./play/index.vue')
});

// let userLanguage = localStorage.getItem('ELEMENT_LANGUAGE') || window.navigator.language || 'en-US';
// let defaultPath = '/en-US';
// if (userLanguage.indexOf('zh-') !== -1) {
//   defaultPath = '/zh-CN';
// } else if (userLanguage.indexOf('es') !== -1) {
//   defaultPath = '/es';
// } else if (userLanguage.indexOf('fr') !== -1) {
//   defaultPath = '/fr-FR';
// }

// route = route.concat([{
//   path: '/',
//   redirect: defaultPath
// }, {
//   path: '*',
//   redirect: defaultPath
// }]);

console.log(route)
export default route;
