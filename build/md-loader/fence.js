// 覆盖默认的 fence 渲染策略
var fs = require('fs');
var path = require('path');
module.exports = md => {
  const defaultRender = md.renderer.rules.fence;
  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    // 判断该 fence 是否在 :::demo 内
    const prevToken = tokens[idx - 1];
    const isInDemoContainer = prevToken && prevToken.nesting === 1 && prevToken.info.trim().match(/^demo\s*(.*)$/);

    if (token.info === 'html' && isInDemoContainer) {
      if (token.content.indexOf('mobile-box') !== -1) {
        let url = token.content.match(/url="(.+)"/)[1]
        const FILE_PATH = path.join(__dirname, `../../examples/pages/demo/${url}.vue`);
        token.content = fs.readFileSync(FILE_PATH, 'utf-8');
      }
      return `<template slot="highlight"><pre v-pre><code class="html">${md.utils.escapeHtml(token.content)}</code></pre></template>`;
    }
    return defaultRender(tokens, idx, options, env, self);
  };
};
