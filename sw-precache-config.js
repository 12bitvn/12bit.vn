module.exports = {
  root:'public',
  staticFileGlobs: [
    'public/**/*.{html,jpg,png,css,js}',
  ],
  navigateFallback: '/offline.html',
  stripPrefix: 'public'
};
