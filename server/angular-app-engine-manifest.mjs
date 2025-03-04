
export default {
  basePath: 'https://mateher624.github.io/AzcalcBillSplitter',
  supportedLocales: {
  "en-US": ""
},
  entryPoints: {
    '': () => import('./main.server.mjs')
  },
};
