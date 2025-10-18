const fs = require('fs');
const path = require('path');

// Template base com as meta tags específicas para cada rota
const createRouteHTML = (route, seoData) => {
  const baseHTML = fs.readFileSync(path.join(__dirname, 'dist', 'index.html'), 'utf8');
  
  // Substitui as meta tags com dados específicos da rota
  let modifiedHTML = baseHTML
    .replace(/<title>.*?<\/title>/, `<title>${seoData.title}</title>`)
    .replace(/name="description"\s+content="[^"]*"/, `name="description" content="${seoData.description}"`)
    .replace(/name="keywords"\s+content="[^"]*"/, `name="keywords" content="${seoData.keywords}"`)
    .replace(/property="og:title"\s+content="[^"]*"/, `property="og:title" content="${seoData.title}"`)
    .replace(/property="og:description"\s+content="[^"]*"/, `property="og:description" content="${seoData.description}"`)
    .replace(/property="og:url"\s+content="[^"]*"/, `property="og:url" content="${seoData.url}"`)
    .replace(/property="og:image"\s+content="[^"]*"/, `property="og:image" content="${seoData.image}"`)
    .replace(/property="og:image:alt"\s+content="[^"]*"/, `property="og:image:alt" content="${seoData.title}"`)
    .replace(/name="twitter:title"\s+content="[^"]*"/, `name="twitter:title" content="${seoData.title}"`)
    .replace(/name="twitter:description"\s+content="[^"]*"/, `name="twitter:description" content="${seoData.description}"`)
    .replace(/name="twitter:image"\s+content="[^"]*"/, `name="twitter:image" content="${seoData.image}"`)
    .replace(/name="twitter:image:alt"\s+content="[^"]*"/, `name="twitter:image:alt" content="${seoData.title}"`)
    .replace(/rel="canonical"\s+href="[^"]*"/, `rel="canonical" href="${seoData.url}"`);
  
  // Adicionar comentário para identificar página gerada para SEO
  modifiedHTML = modifiedHTML.replace(
    '<body>',
    `<body>
  <!-- This page was generated for SEO optimization by generate-seo-pages.cjs -->
  <!-- Generated on: ${new Date().toISOString()} -->
  <!-- Route: ${route} -->`
  );
  
  return modifiedHTML;
};

// Dados SEO para cada rota
const routesData = {
  '/': {
    title: 'Início | Hudson Kennedy - Desenvolvedor Full Stack',
    description: 'Hudson Kennedy - Desenvolvedor Full Stack especializado em React, TypeScript, Vue.js e tecnologias modernas. 10+ anos de experiência em desenvolvimento web.',
    keywords: 'Hudson Kennedy, Desenvolvedor Full Stack, React, TypeScript, Vue.js, JavaScript, Desenvolvedor Web, Frontend, Backend, Portfolio',
    image: 'https://hudsonkennedy.dev.br/imgs/home.webp',
    url: 'https://hudsonkennedy.dev.br/'
  },
  '/about': {
    title: 'Sobre | Hudson Kennedy - Quem Sou',
    description: 'Conheça Hudson Kennedy - Cientista da Computação e Desenvolvedor Full Stack apaixonado por criar soluções web inovadoras e impactantes.',
    keywords: 'Hudson Kennedy, Sobre, Cientista da Computação, Desenvolvedor, Biografia, Perfil Profissional, Experiência',
    image: 'https://hudsonkennedy.dev.br/imgs/my.webp',
    url: 'https://hudsonkennedy.dev.br/about'
  },
  '/skills': {
    title: 'Habilidades | Hudson Kennedy - Minhas Habilidades',
    description: 'Explore as habilidades técnicas de Hudson Kennedy em desenvolvimento web: React, TypeScript, Vue.js, Node.js, Python e muito mais.',
    keywords: 'Habilidades, Skills, React, TypeScript, Vue.js, Node.js, Python, JavaScript, CSS, HTML, Tecnologias',
    image: 'https://hudsonkennedy.dev.br/imgs/code.gif',
    url: 'https://hudsonkennedy.dev.br/skills'
  },
  '/portfolio': {
    title: 'Projetos | Hudson Kennedy - Meus Projetos',
    description: 'Confira os projetos desenvolvidos por Hudson Kennedy: aplicações web modernas usando React, Vue.js, TypeScript e outras tecnologias.',
    keywords: 'Portfolio, Projetos, React, Vue.js, TypeScript, Aplicações Web, Desenvolvimento, GitHub, Deploy',
    image: 'https://hudsonkennedy.dev.br/imgs/linkImage.webp',
    url: 'https://hudsonkennedy.dev.br/portfolio'
  },
  '/education': {
    title: 'Formações | Hudson Kennedy - Formação',
    description: 'Formação acadêmica e certificações de Hudson Kennedy: Mestrado Harvard, especializações em desenvolvimento e diversas certificações técnicas.',
    keywords: 'Formação, Educação, Harvard, Certificações, Cursos, Especialização, Desenvolvimento, Tecnologia',
    image: 'https://hudsonkennedy.dev.br/imgs/linkImage.webp',
    url: 'https://hudsonkennedy.dev.br/education'
  },
  '/experiences': {
    title: 'Experiências | Hudson Kennedy - Experiências',
    description: 'Experiência profissional de Hudson Kennedy: 10+ anos atuando como desenvolvedor em empresas e projetos freelancer.',
    keywords: 'Experiência, Trabalho, Carreira, Desenvolvedor, Freelancer, Projetos, Empresas, Profissional',
    image: 'https://hudsonkennedy.dev.br/imgs/linkImage.webp',
    url: 'https://hudsonkennedy.dev.br/experiences'
  },
  '/testimonials': {
    title: 'Depoimentos | Hudson Kennedy - Depoimentos',
    description: 'Depoimentos e recomendações de colegas e clientes sobre o trabalho de Hudson Kennedy como desenvolvedor.',
    keywords: 'Depoimentos, Recomendações, Feedback, Clientes, Colegas, Trabalho, Profissional, Qualidade',
    image: 'https://hudsonkennedy.dev.br/imgs/linkImage.webp',
    url: 'https://hudsonkennedy.dev.br/testimonials'
  },
  '/contact': {
    title: 'Contato | Hudson Kennedy - Entre em Contato',
    description: 'Entre em contato com Hudson Kennedy para projetos de desenvolvimento web, consultoria ou oportunidades profissionais.',
    keywords: 'Contato, Email, WhatsApp, LinkedIn, GitHub, Projeto, Consultoria, Trabalho, Oportunidade',
    image: 'https://hudsonkennedy.dev.br/imgs/linkImage.webp',
    url: 'https://hudsonkennedy.dev.br/contact'
  }
};

// Gera os arquivos HTML para cada rota
Object.entries(routesData).forEach(([route, seoData]) => {
  const routePath = route === '/' ? 'index.html' : `${route.slice(1)}.html`;
  const htmlContent = createRouteHTML(route, seoData);
  
  fs.writeFileSync(path.join(__dirname, 'dist', routePath), htmlContent);
  console.log(`✅ Generated ${routePath} with custom SEO data`);
});

console.log('🎉 All route-specific HTML files generated successfully!');