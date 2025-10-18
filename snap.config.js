module.exports = {
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
  preloadImages: true,
  fixWebpackChunksIssue: false,
  removeBlobs: true,
  minifyCss: {},
  // Desabilitar para evitar problemas com React Router
  fixInsertRule: false,
  // Aguardar o carregamento completo da página
  waitFor: 2000,
  // Aguardar seletores específicos
  waitForSelector: '.container'
}