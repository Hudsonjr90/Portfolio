import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface SEOData {
  title: string;
  description: string;
  keywords: string;
  image?: string;
  url: string;
}

export const useSEO = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const updateMetaTags = (seoData: SEOData) => {
    // Update title
    document.title = seoData.title;

    // Update meta description
    updateMetaTag('name', 'description', seoData.description);
    updateMetaTag('name', 'keywords', seoData.keywords);

    // Update Open Graph tags
    updateMetaTag('property', 'og:type', 'website');
    updateMetaTag('property', 'og:site_name', 'Hudson Kennedy - Portfolio');
    updateMetaTag('property', 'og:title', seoData.title);
    updateMetaTag('property', 'og:description', seoData.description);
    updateMetaTag('property', 'og:url', seoData.url);
    updateMetaTag('property', 'og:image', seoData.image || 'https://hudsonkennedy.dev.br/imgs/about.webp');
    updateMetaTag('property', 'og:image:width', '1200');
    updateMetaTag('property', 'og:image:height', '630');
    updateMetaTag('property', 'og:image:alt', seoData.title);
    updateMetaTag('property', 'og:locale', i18n.language === 'pt' ? 'pt_BR' : i18n.language === 'en' ? 'en_US' : i18n.language);

    // Update Twitter tags
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:site', '@hudsonkennedy');
    updateMetaTag('name', 'twitter:creator', '@hudsonkennedy');
    updateMetaTag('name', 'twitter:title', seoData.title);
    updateMetaTag('name', 'twitter:description', seoData.description);
    updateMetaTag('name', 'twitter:image', seoData.image || 'https://hudsonkennedy.dev.br/imgs/about.webp');
    updateMetaTag('name', 'twitter:image:alt', seoData.title);

    // Update canonical URL
    updateLink('canonical', seoData.url);

    // Update language
    document.documentElement.lang = i18n.language === 'pt' ? 'pt-br' : i18n.language;
    
    // Log para debug
    console.log('Meta tags updated for:', seoData.url);
    console.log('Title:', seoData.title);
  };

  const updateMetaTag = (attribute: string, name: string, content: string) => {
    let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
    if (element) {
      element.content = content;
    } else {
      element = document.createElement('meta');
      element.setAttribute(attribute, name);
      element.content = content;
      document.head.appendChild(element);
    }
  };

  const updateLink = (rel: string, href: string) => {
    let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
    if (element) {
      element.href = href;
    } else {
      element = document.createElement('link');
      element.rel = rel;
      element.href = href;
      document.head.appendChild(element);
    }
  };

  const getSEOData = (): SEOData => {
    const baseUrl = 'https://hudsonkennedy.dev.br';
    // Normalizar pathname removendo trailing slash e garantindo que comece com /
    const normalizedPath = location.pathname === '/' ? '/' : location.pathname.replace(/\/$/, '');
    const currentUrl = `${baseUrl}${normalizedPath}`;
    
    // Debug para verificar a rota atual
    console.log('Current pathname:', location.pathname);
    console.log('Normalized path:', normalizedPath);

    switch (normalizedPath) {
      case '/':
        return {
          title: `${t('menu.home')} | Hudson Kennedy - Desenvolvedor Full Stack`,
          description: t('seo.home.description'),
          keywords: t('seo.home.keywords'),
          image: `${baseUrl}/imgs/linkImage.webp`,
          url: currentUrl,
        };

      case '/about':
        return {
          title: `${t('menu.about')} | Hudson Kennedy - Quem Sou`,
          description: t('seo.about.description'),
          keywords: t('seo.about.keywords'),
          image: `${baseUrl}/imgs/about.webp`,
          url: currentUrl,
        };

      case '/skills':
        return {
          title: `${t('menu.skills')} | Hudson Kennedy - Minhas Habilidades`,
          description: t('seo.skills.description'),
          keywords: t('seo.skills.keywords'),
          image: `${baseUrl}/imgs/about.webp`,
          url: currentUrl,
        };

      case '/portfolio':
        return {
          title: `${t('menu.portfolio')} | Hudson Kennedy - Meus Projetos`,
          description: t('seo.portfolio.description'),
          keywords: t('seo.portfolio.keywords'),
          image: `${baseUrl}/imgs/my.webp`,
          url: currentUrl,
        };

      case '/education':
        return {
          title: `${t('menu.academic-education')} | Hudson Kennedy - Formação`,
          description: t('seo.education.description'),
          keywords: t('seo.education.keywords'),
          image: `${baseUrl}/imgs/my.webp`,
          url: currentUrl,
        };

      case '/experiences':
        return {
          title: `${t('menu.experiences')} | Hudson Kennedy - Experiências`,
          description: t('seo.experiences.description'),
          keywords: t('seo.experiences.keywords'),
          image: `${baseUrl}/imgs/my.webp`,
          url: currentUrl,
        };

      case '/testimonials':
        return {
          title: `${t('menu.testimonials')} | Hudson Kennedy - Depoimentos`,
          description: t('seo.testimonials.description'),
          keywords: t('seo.testimonials.keywords'),
          image: `${baseUrl}/imgs/about.webp`,
          url: currentUrl,
        };

      case '/contact':
        return {
          title: `${t('menu.contact')} | Hudson Kennedy - Entre em Contato`,
          description: t('seo.contact.description'),
          keywords: t('seo.contact.keywords'),
          image: `${baseUrl}/imgs/about.webp`,
          url: currentUrl,
        };

      default:
        console.log('No specific route found, using default SEO data for:', normalizedPath);
        return {
          title: 'Hudson Kennedy - Desenvolvedor Full Stack',
          description: 'Portfólio de Hudson Kennedy, Cientista da Computação e Desenvolvedor Full Stack especializado em React, TypeScript, Vue.js e tecnologias modernas.',
          keywords: 'Hudson Kennedy, Desenvolvedor, Full Stack, React, TypeScript, Vue.js, JavaScript, Portfolio',
          url: currentUrl,
        };
    }
  };

  useEffect(() => {
    // Aguardar um pequeno delay para garantir que as traduções estejam carregadas
    const updateSEO = () => {
      // Verificar se as traduções estão disponíveis
      if (!t || typeof t !== 'function') {
        console.log('Translations not loaded yet, retrying...');
        setTimeout(updateSEO, 100);
        return;
      }
      
      const seoData = getSEOData();
      console.log('Updating SEO with data:', seoData);
      updateMetaTags(seoData);
    };

    // Pequeno delay para garantir que o componente foi montado
    setTimeout(updateSEO, 50);
  }, [location.pathname, i18n.language, t]);

  return { updateMetaTags, getSEOData };
};