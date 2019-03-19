module.exports = {
  root: 'public',
  staticFileGlobs: [
    'public/**/*.*',
  ],
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/cdn\.jsdelivr\.net\//,
      handler: 'fastest'
    },
    {
      urlPattern: /^https:\/\/fonts\.googleapis\.com\//,
      handler: 'fastest'
    }, {
      urlPattern: /^https:\/\/fonts\.gstatic\.com\//,
      handler: 'fastest'
    }, {
      urlPattern: /^https:\/\/d33wubrfki0l68\.cloudfront\.net\//,
      handler: 'fastest'
    }, {
      urlPattern: /^https:\/\/codesandbox\.io\//,
      handler: 'fastest'
    }, {
      urlPattern: /^https:\/\/caniuse\.bitsofco\.de\//,
      handler: 'fastest'
    }
  ],
  navigateFallback: '/offline.html',
  stripPrefix: 'public'
}
