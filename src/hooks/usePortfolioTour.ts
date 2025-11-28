import { useEffect, useState } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { useTranslation } from 'react-i18next';

interface TourStep {
  element: string;
  popover: {
    title: string;
    description: string;
    side?: 'left' | 'right' | 'top' | 'bottom';
    align?: 'start' | 'center' | 'end';
  };
}

export const usePortfolioTour = () => {
  const { t } = useTranslation();
  const [tourCompleted, setTourCompleted] = useState<boolean>(false);

  useEffect(() => {
    // Verifica se o tour já foi completado
    const tourStatus = localStorage.getItem('portfolio-tour-completed');
    setTourCompleted(tourStatus === 'true');
  }, []);

  const startTour = (currentPage: string) => {
    const tourSteps = getTourSteps(currentPage);
    
    const driverObj = driver({
      showProgress: true,
      steps: tourSteps,
      nextBtnText: t('tour.next'),
      prevBtnText: t('tour.previous'),
      doneBtnText: t('tour.done'),
      progressText: t('tour.progress'),
      onDestroyed: () => {
        localStorage.setItem('portfolio-tour-completed', 'true');
        setTourCompleted(true);
      },
      popoverClass: 'portfolio-tour-popover',
      animate: true,
      overlayColor: 'rgba(0, 0, 0, 0.8)',
    });

    driverObj.drive();
  };

  const getTourSteps = (page: string): TourStep[] => {
    // Elementos comuns apenas para a página home
    const homeHeaderSteps: TourStep[] = [
      {
        element: '[data-tour="navbar"]',
        popover: {
          title: t('tour.navbar.title'),
          description: t('tour.navbar.description'),
          side: 'bottom',
          align: 'center'
        }
      },
      {
        element: '[data-tour="sound-toggle"]',
        popover: {
          title: t('tour.sound.title'),
          description: t('tour.sound.description'),
          side: 'bottom',
          align: 'center'
        }
      },
        {
        element: '[data-tour="particles-toggle"]',
        popover: {
          title: t('tour.particles.title'),
          description: t('tour.particles.description'),
          side: 'bottom',
          align: 'center'
        }
      },
      {
        element: '[data-tour="theme-toggle"]',
        popover: {
          title: t('tour.theme.title'),
          description: t('tour.theme.description'),
          side: 'bottom',
          align: 'center'
        }
      },
      {
        element: '[data-tour="language-toggle"]',
        popover: {
          title: t('tour.language.title'),
          description: t('tour.language.description'),
          side: 'bottom',
          align: 'center'
        }
      },
    
    ];

    const pageSteps: Record<string, TourStep[]> = {
      home: [
        {
          element: '[data-tour="hero-section"]',
          popover: {
            title: t('tour.hero.title'),
            description: t('tour.hero.description'),
            side: 'bottom',
            align: 'center'
          }
        },
        {
          element: '[data-tour="typewriter"]',
          popover: {
            title: t('tour.typewriter.title'),
            description: t('tour.typewriter.description'),
            side: 'top',
            align: 'center'
          }
        },
        {
          element: '[data-tour="resume-button"]',
          popover: {
            title: t('tour.resume.title'),
            description: t('tour.resume.description'),
            side: 'top',
            align: 'center'
          }
        },
        {
          element: '[data-tour="footer"]',
          popover: {
            title: t('tour.footer.title'),
            description: t('tour.footer.description'),
            side: 'top',
            align: 'center'
          }
        }
      ],
      about: [
        {
          element: '[data-tour="about-content"]',
          popover: {
            title: t('tour.about.title'),
            description: t('tour.about.description'),
            side: 'bottom',
            align: 'center'
          }
        }
      ],
      skills: [
        {
          element: '[data-tour="skills-search"]',
          popover: {
            title: t('tour.skillsSearch.title'),
            description: t('tour.skillsSearch.description'),
            side: 'bottom',
            align: 'center'
          }
        },
        {
          element: '[data-tour="skills-chart"]',
          popover: {
            title: t('tour.skillsChart.title'),
            description: t('tour.skillsChart.description'),
            side: 'left',
            align: 'center'
          }
        },
        {
          element: '[data-tour="word-cloud"]',
          popover: {
            title: t('tour.wordCloud.title'),
            description: t('tour.wordCloud.description'),
            side: 'right',
            align: 'center'
          }
        }
      ],
      portfolio: [
        {
          element: '[data-tour="portfolio-grid"]',
          popover: {
            title: t('tour.portfolioGrid.title'),
            description: t('tour.portfolioGrid.description'),
            side: 'bottom',
            align: 'center'
          }
        },
        {
          element: '[data-tour="portfolio-card"]',
          popover: {
            title: t('tour.portfolioCard.title'),
            description: t('tour.portfolioCard.description'),
            side: 'right',
            align: 'center'
          }
        },
        {
          element: '[data-tour="portfolio-pagination"]',
          popover: {
            title: t('tour.portfolioPagination.title'),
            description: t('tour.portfolioPagination.description'),
            side: 'top',
            align: 'center'
          }
        }
      ],
      experiences: [
        {
          element: '[data-tour="timeline"]',
          popover: {
            title: t('tour.timeline.title'),
            description: t('tour.timeline.description'),
            side: 'bottom',
            align: 'center'
          }
        }
      ],
      testimonials: [
        {
          element: '[data-tour="testimonials-cards"]',
          popover: {
            title: t('tour.testimonials.title'),
            description: t('tour.testimonials.description'),
            side: 'bottom',
            align: 'center'
          }
        }
      ],
      education: [
        {
          element: '[data-tour="education-cards"]',
          popover: {
            title: t('tour.education.title'),
            description: t('tour.education.description'),
            side: 'bottom',
            align: 'center'
          }
        }
      ],
      contact: [
        {
          element: '[data-tour="contact-form"]',
          popover: {
            title: t('tour.contactForm.title'),
            description: t('tour.contactForm.description'),
            side: 'right',
            align: 'center'
          }
        }
      ]
    };

    // Para a página home: header + conteúdo + footer
    if (page === 'home') {
      return [...homeHeaderSteps, ...(pageSteps[page] || [])];
    }
    
    // Para outras páginas: apenas conteúdo específico
    return pageSteps[page] || [];
  };

  const resetTour = () => {
    localStorage.removeItem('portfolio-tour-completed');
    setTourCompleted(false);
  };

  const shouldShowTourButton = () => {
    return tourCompleted;
  };

  return {
    startTour,
    resetTour,
    tourCompleted,
    shouldShowTourButton
  };
};