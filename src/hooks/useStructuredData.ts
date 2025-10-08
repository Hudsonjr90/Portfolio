import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const useStructuredData = () => {
  const location = useLocation();
  const { i18n } = useTranslation();

  const getPersonSchema = () => ({
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
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Harvard University"
    },
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Full Stack Developer",
      "description": "Develops web applications using modern technologies"
    }
  });

  const getWebsiteSchema = () => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Hudson Kennedy Portfolio",
    "description": "Portfólio profissional de Hudson Kennedy, Desenvolvedor Full Stack",
    "url": "https://hudsonkennedy.dev.br",
    "author": {
      "@type": "Person",
      "name": "Hudson Kennedy"
    },
    "inLanguage": i18n.language === 'pt' ? 'pt-BR' : i18n.language,
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://hudsonkennedy.dev.br/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  });

  const getPortfolioSchema = () => ({
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": "Hudson Kennedy Portfolio",
    "description": "Coleção de projetos desenvolvidos por Hudson Kennedy",
    "url": "https://hudsonkennedy.dev.br/portfolio",
    "author": {
      "@type": "Person",
      "name": "Hudson Kennedy"
    },
    "creator": {
      "@type": "Person", 
      "name": "Hudson Kennedy"
    },
    "dateCreated": "2023-01-01",
    "dateModified": new Date().toISOString().split('T')[0],
    "keywords": "React, TypeScript, Vue.js, Portfolio, Web Development"
  });

  const getBreadcrumbSchema = () => {
    const breadcrumbs = [
      { name: "Home", url: "https://hudsonkennedy.dev.br" }
    ];

    if (location.pathname !== '/') {
      const pathSegments = location.pathname.split('/').filter(Boolean);
      pathSegments.forEach((segment, index) => {
        const url = `https://hudsonkennedy.dev.br/${pathSegments.slice(0, index + 1).join('/')}`;
        breadcrumbs.push({
          name: segment.charAt(0).toUpperCase() + segment.slice(1),
          url
        });
      });
    }

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url
      }))
    };
  };

  const updateStructuredData = () => {
    // Remove existing schema scripts
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach(script => script.remove());

    const schemas: any[] = [
      getPersonSchema(),
      getWebsiteSchema(),
      getBreadcrumbSchema()
    ];

    if (location.pathname === '/portfolio') {
      schemas.push(getPortfolioSchema());
    }

    schemas.forEach((schema, index) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = `structured-data-${index}`;
      script.innerHTML = JSON.stringify(schema, null, 2);
      document.head.appendChild(script);
    });
  };

  useEffect(() => {
    updateStructuredData();
  }, [location.pathname, i18n.language]);

  return { updateStructuredData };
};