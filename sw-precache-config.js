module.exports = {
  root: 'public',
  staticFileGlobs: [
    'public/**/*.{html,jpg,png,css,js}',
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
    }],
  navigateFallback: '/offline.html',
  stripPrefix: 'public'
}
