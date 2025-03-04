
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'https://mateher624.github.io/AzcalcBillSplitter/',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {},
  assets: {
    'index.csr.html': {size: 927, hash: '57524d735b093f0f8bfbe182e98bed2fac0745b8e094bf411542f0ef1625aefc', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1166, hash: '1dd048acab6d5572d6f361ad61cac27c22c632fcfdab11e628a6ba3e91fa9bae', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-BU236C3P.css': {size: 619, hash: 'Bg3Y1akoOwQ', text: () => import('./assets-chunks/styles-BU236C3P_css.mjs').then(m => m.default)}
  },
};
