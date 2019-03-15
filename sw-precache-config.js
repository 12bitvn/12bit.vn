module.exports = {
  root: 'public',
  staticFileGlobs: [
    'public/**/*.*',
  ],
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/cdn\.jsdelivr\.net\//,
      handler: 'cacheFirst'
    },
    {
      urlPattern: /^https:\/\/fonts\.googleapis\.com\//,
      handler: 'cacheFirst'
    },{
      urlPattern: /^https:\/\/fonts\.gstatic\.com\//,
      handler: 'cacheFirst'
    },{
      urlPattern: /^https:\/\/d33wubrfki0l68\.cloudfront\.net\//,
      handler: 'cacheFirst'
    }],
  navigateFallback: '/offline.html',
  stripPrefix: 'public'
}
