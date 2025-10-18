const reactSnap = require('react-snap');

const snapConfig = {
  source: 'dist',
  destination: 'dist',
  minifyHtml: {
    collapseWhitespace: false,
    removeComments: false
  },
  puppeteerArgs: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-gpu'
  ],
  crawlFrom: '/',
  include: [
    '/',
    '/about',
    '/skills', 
    '/portfolio',
    '/education',
    '/experiences',
    '/testimonials',
    '/contact'
  ],
  skipThirdPartyRequests: true,
  cacheAjaxRequests: false,
  preloadImages: false,
  fixWebpackChunksIssue: false,
  removeBlobs: true,
  minifyCss: {},
  fixInsertRule: false,
  waitFor: 3000,
  waitForSelector: '.container'
};

// Execute react-snap with configuration
reactSnap(snapConfig).then(() => {
  console.log('✅ React-snap completed successfully!');
}).catch((error) => {
  console.error('❌ React-snap failed:', error);
  process.exit(1);
});