const fs = require('fs');
const path = require('path');

const baseUrl = 'https://hudsonkennedy.dev.br';

const routes = [
  {
    path: '/',
    title: 'Hudson Kennedy - Portfolio | H.K Dev',
    description: 'Portfólio de Hudson Kennedy, Cientista da Computação e Desenvolvedor Full Stack especializado em React, TypeScript, Vue.js e tecnologias modernas. 10+ anos de experiência.',
    keywords: 'Hudson Kennedy, Portfolio, Desenvolvedor Full Stack, React, TypeScript, Vue.js, JavaScript, Node.js, Web Development',
    image: `${baseUrl}/imgs/my.webp`,
  },
  {
    path: '/about',
    title: 'Sobre | H.K Dev',
    description: 'Conheça mais sobre Hudson Kennedy, Cientista da Computação e Desenvolvedor Full Stack com mais de 10 anos de experiência em React, TypeScript e tecnologias modernas.',
    keywords: 'Sobre Hudson Kennedy, Desenvolvedor Full Stack, Cientista da Computação, React, TypeScript, Vue.js, experiência profissional',
    image: `${baseUrl}/imgs/about.webp`,
  },
  {
    path: '/skills',
    title: 'Habilidades | H.K Dev',
    description: 'Tecnologias e habilidades técnicas de Hudson Kennedy: React, TypeScript, Vue.js, Node.js, Python, Docker, AWS e muito mais.',
    keywords: 'Habilidades, Skills, React, TypeScript, Vue.js, Node.js, Python, Docker, AWS, desenvolvimento web, frontend, backend',
    image: `${baseUrl}/imgs/hkdev.webp`,
  },
  {
    path: '/portfolio',
    title: 'Portfólio | H.K Dev',
    description: 'Projetos e trabalhos desenvolvidos por Hudson Kennedy utilizando React, TypeScript, Vue.js e outras tecnologias modernas.',
    keywords: 'Portfólio, Projetos, React, TypeScript, Vue.js, desenvolvimento web, aplicações, Hudson Kennedy',
    image: `${baseUrl}/imgs/hkdev.webp`,
  },
  {
    path: '/education',
    title: 'Formação Acadêmica | H.K Dev',
    description: 'Formação acadêmica e certificações de Hudson Kennedy: Ciência da Computação, MBA, certificações em tecnologias modernas.',
    keywords: 'Educação, Formação Acadêmica, Ciência da Computação, MBA, certificações, cursos, Hudson Kennedy',
    image: `${baseUrl}/imgs/hkdev.webp`,
  },
  {
    path: '/experiences',
    title: 'Experiências | H.K Dev',
    description: 'Trajetória profissional de Hudson Kennedy como Desenvolvedor Full Stack, com mais de 10 anos de experiência em empresas de tecnologia.',
    keywords: 'Experiências, Carreira, Desenvolvedor Full Stack, React, TypeScript, empresas de tecnologia, Hudson Kennedy',
    image: `${baseUrl}/imgs/hkdev.webp`,
  },
  {
    path: '/testimonials',
    title: 'Depoimentos | H.K Dev',
    description: 'Depoimentos e recomendações de clientes e colegas sobre o trabalho de Hudson Kennedy como Desenvolvedor Full Stack.',
    keywords: 'Depoimentos, Recomendações, Avaliações, Hudson Kennedy, Desenvolvedor Full Stack, clientes, colegas',
    image: `${baseUrl}/imgs/hkdev.webp`,
  },
  {
    path: '/contact',
    title: 'Contato | H.K Dev',
    description: 'Entre em contato com Hudson Kennedy para projetos, oportunidades de trabalho ou colaborações em desenvolvimento web.',
    keywords: 'Contato, Hudson Kennedy, Desenvolvedor Full Stack, projetos, oportunidades, React, TypeScript',
    image: `${baseUrl}/imgs/hkdev.webp`,
  },
];

const generateRoutePages = () => {
  const distPath = path.join(__dirname, 'dist');

  routes.forEach(route => {
    if (route.path === '/') return; 

    const routeName = route.path.replace('/', ''); 
    const canonicalUrl = `${baseUrl}${route.path}`;

    const html = `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="author" content="Hudson Kennedy">
  <title>${route.title}</title>
  <meta name="description" content="${route.description}">
  <meta name="keywords" content="${route.keywords}">
  <link rel="canonical" href="${canonicalUrl}">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Hudson Kennedy - Portfolio">
  <meta property="og:title" content="${route.title}">
  <meta property="og:description" content="${route.description}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:image" content="${route.image}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${route.title}">
  <meta property="og:locale" content="pt_BR">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@hudsonkennedy">
  <meta name="twitter:creator" content="@hudsonkennedy">
  <meta name="twitter:title" content="${route.title}">
  <meta name="twitter:description" content="${route.description}">
  <meta name="twitter:image" content="${route.image}">
  <meta name="twitter:image:alt" content="${route.title}">

  <!-- Redirect browsers to SPA -->
  <meta http-equiv="refresh" content="0;url=${canonicalUrl}">
  <script>window.location.replace("${canonicalUrl}");</script>
</head>
<body>
  <p>Redirecionando para <a href="${canonicalUrl}">${route.title}</a>...</p>
</body>
</html>`;

    const filePath = path.join(distPath, `${routeName}.html`);
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`✅ ${routeName}.html generated`);
  });
};

const generateSitemap = () => {
  const currentDate = new Date().toISOString().split('T')[0];
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  routes.forEach(route => {
    sitemap += `
  <url>
    <loc>${baseUrl}${route.path === '/' ? '' : route.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route.path === '/' ? '1.0' : '0.8'}</priority>
  </url>`;
  });

  sitemap += '\n</urlset>';
  
  const sitemapPath = path.join(__dirname, 'dist', 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemap);
  console.log('✅ sitemap.xml generated successfully!');
};

const generateRobots = () => {
  const robots = `User-agent: *
Allow: /

Sitemap: https://hudsonkennedy.dev.br/sitemap.xml`;

  const robotsPath = path.join(__dirname, 'dist', 'robots.txt');
  fs.writeFileSync(robotsPath, robots);
  console.log('✅ robots.txt generated successfully!');
};

const updateIndexHTML = () => {
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  
  if (!fs.existsSync(indexPath)) {
    console.error('❌ dist/index.html not found');
    return;
  }

  let html = fs.readFileSync(indexPath, 'utf8');
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Hudson Kennedy",
    "jobTitle": "Full Stack Developer",
    "description": "Cientista da Computação e Desenvolvedor Full Stack especializado em React, TypeScript, Vue.js e tecnologias modernas",
    "url": "https://hudsonkennedy.dev.br",
    "image": "https://hudsonkennedy.dev.br/imgs/my.webp",
    "sameAs": [
      "https://www.linkedin.com/in/hudsonkennedyjr",
      "https://github.com/Hudsonjr90",
      "https://hudsonkennedy.dev.br"
    ],
    "knowsAbout": [
      "React",
      "TypeScript", 
      "Vue.js",
      "JavaScript",
      "Node.js",
      "Python",
      "Web Development",
      "Frontend Development",
      "Backend Development",
      "UI/UX Design"
    ]
  };

  const structuredDataScript = `<script type="application/ld+json">${JSON.stringify(structuredData, null, 2)}</script>`;

  html = html.replace('</head>', `  ${structuredDataScript}\n</head>`);

  if (!html.includes('<meta name="description"')) {
    const descriptionMeta = '<meta name="description" content="Cientista da Computação e Desenvolvedor Full Stack especializado em React, TypeScript, Vue.js e tecnologias modernas">';
    html = html.replace('<title>', `  ${descriptionMeta}\n    <title>`);
  }
  
  if (!html.includes('<meta name="keywords"')) {
    const keywordsMeta = '<meta name="keywords" content="Hudson Kennedy, Full Stack Developer, React, TypeScript, Vue.js, JavaScript, Node.js, Python, Web Development, Portfolio">';
    html = html.replace('<meta name="description"', `  ${keywordsMeta}\n    <meta name="description"`);
  }

  fs.writeFileSync(indexPath, html);
  console.log('✅ index.html updated with structured data!');
};

const main = () => {
  console.log('🚀 Generating SEO files...');
  
  try {
    generateSitemap();
    generateRobots();
    updateIndexHTML();
    generateRoutePages();
    console.log('✅ All SEO files generated successfully!');
  } catch (error) {
    console.error('❌ Error generating SEO files:', error);
    process.exit(1);
  }
};

main();