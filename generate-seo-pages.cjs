const fs = require('fs');
const path = require('path');

// Define all the routes for your portfolio
const routes = [
  { path: '/', title: 'Hudson Kennedy - Portfolio', description: 'Cientista da Computação e Desenvolvedor Full Stack especializado em React, TypeScript, Vue.js e tecnologias modernas' },
  { path: '/about', title: 'Sobre - Hudson Kennedy', description: 'Conheça mais sobre Hudson Kennedy, sua experiência e habilidades como Desenvolvedor Full Stack' },
  { path: '/skills', title: 'Habilidades - Hudson Kennedy', description: 'Tecnologias e habilidades técnicas de Hudson Kennedy em desenvolvimento web e mobile' },
  { path: '/portfolio', title: 'Portfólio - Hudson Kennedy', description: 'Projetos e trabalhos desenvolvidos por Hudson Kennedy utilizando tecnologias modernas' },
  { path: '/education', title: 'Educação - Hudson Kennedy', description: 'Formação acadêmica e certificações de Hudson Kennedy' },
  { path: '/experiences', title: 'Experiências - Hudson Kennedy', description: 'Experiência profissional e trajetória de Hudson Kennedy como desenvolvedor' },
  { path: '/testimonials', title: 'Depoimentos - Hudson Kennedy', description: 'Depoimentos e recomendações de clientes e colegas sobre o trabalho de Hudson Kennedy' },
  { path: '/contact', title: 'Contato - Hudson Kennedy', description: 'Entre em contato com Hudson Kennedy para projetos e oportunidades' }
];

// Generate sitemap.xml
const generateSitemap = () => {
  const baseUrl = 'https://hudsonkennedy.dev.br';
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

// Generate robots.txt
const generateRobots = () => {
  const robots = `User-agent: *
Allow: /

Sitemap: https://hudsonkennedy.dev.br/sitemap.xml`;

  const robotsPath = path.join(__dirname, 'dist', 'robots.txt');
  fs.writeFileSync(robotsPath, robots);
  console.log('✅ robots.txt generated successfully!');
};

// Update index.html with better meta tags
const updateIndexHTML = () => {
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  
  if (!fs.existsSync(indexPath)) {
    console.error('❌ dist/index.html not found');
    return;
  }

  let html = fs.readFileSync(indexPath, 'utf8');
  
  // Add structured data for better SEO
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
  
  // Insert structured data before closing </head>
  html = html.replace('</head>', `  ${structuredDataScript}\n</head>`);
  
  // Ensure meta tags are present
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

// Main function
const main = () => {
  console.log('🚀 Generating SEO files...');
  
  try {
    generateSitemap();
    generateRobots();
    updateIndexHTML();
    console.log('✅ All SEO files generated successfully!');
  } catch (error) {
    console.error('❌ Error generating SEO files:', error);
    process.exit(1);
  }
};

main();