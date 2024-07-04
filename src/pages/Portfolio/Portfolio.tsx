import { useState, useEffect, useCallback } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import Transition from '../../components/Transition';
import { useTranslation } from 'react-i18next';
import Particles from 'react-tsparticles';
import { Engine, IOptions } from 'tsparticles-engine';
import { loadFull } from 'tsparticles';
import { useTheme } from '../../context/ThemeContext';
import ReactPaginate from 'react-paginate';
import styles from './Portfolio.module.css';
import portfolioServer from '../../data/portfolioServer';
import { NavLink } from 'react-router-dom';

type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
    ? RecursivePartial<T[P]>
    : T[P];
};

const Portfolio = () => {
  const { t } = useTranslation();
  const [currentItems, setCurrentItems] = useState(portfolioServer.slice(0, 3));
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(0); 
  const [transitionCompleted, setTransitionCompleted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const endOffset = itemOffset + 3;
    setCurrentItems(portfolioServer.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(portfolioServer.length / 3));
  }, [itemOffset]);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * 3) % portfolioServer.length;
    setItemOffset(newOffset);
    setCurrentPage(event.selected); 
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isPaused) {
        setItemOffset((prevOffset) => {
          let newOffset = prevOffset + 3;
          let newPage = currentPage + 1;

          if (newOffset >= portfolioServer.length) {
            newOffset = 0;
            newPage = 0;
          }

          setCurrentPage(newPage); 
          return newOffset;
        });
      }
    }, 5000); 

    return () => clearInterval(intervalId);
  }, [isPaused, currentPage]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  const particlesInit = useCallback((engine: Engine) => {
    loadFull(engine);
    return Promise.resolve();
  }, []);

  const { mainColor } = useTheme();

  const particlesConfig: RecursivePartial<IOptions> = {
    particles: {
      number: {
        value: 50,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: mainColor,
      },
      shape: {
        type: 'polygon',
        stroke: {
          width: 0,
          color: mainColor,
        },
        polygon: {
          sides: 3,
        },
      },
      opacity: {
        value: 1,
        random: true,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: true,
          speed: 4.872463273808071,
          size_min: 0.1,
          sync: false,
        },
      },
      line_linked: {
        enable: false,
        distance: 150,
        color: '#ffffff',
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 4,
        direction: 'top-right',
        random: false,
        straight: true,
        out_mode: 'out',
        bounce: false,
        attract: { enable: false, rotateX: 600, rotateY: 1200 },
      },
    },
    interactivity: {
      events: {
        onhover: {
          enable: true,
          mode: 'repulse',
        },
        onclick: {
          enable: false,
          mode: 'push',
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 400,
          line_linked: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3,
        },
        repulse: {
          distance: 150,
          duration: 0.4,
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,
  };

  return (
    <Transition onAnimationComplete={() => setTransitionCompleted(true)}>
      {transitionCompleted && (
        <section className={styles.portfolio}>
          <Particles options={particlesConfig} init={particlesInit} />
          <h2 className={styles.heading}>
            <span>//</span> {t('projects.title')}{' '}
            <span>{t('projects.text')}</span>
          </h2>

          <div className={styles.portfolio_grid}>
            {currentItems.map((item) => (
              <Card 
                key={item.id} 
                className={styles.card}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <CardMedia
                  component="img"
                  alt={item.name}
                  height="300"
                  image={item.image}
                />
                <CardContent className={styles.cardContent}>
                  {t(`projects.data.${item.id}.description`)}
                </CardContent>
                <CardContent>
                  <li className={styles.tech_title}>
                    {t('projects.subtitle')}
                  </li>
                  {item.technologies.map((tech, index) => (
                    <li className={styles.tech_list} key={index}>
                      {tech}
                    </li>
                  ))}
                </CardContent>
                <CardActions className={styles.cardActions}>
                  <Button className={styles.links}>
                    <NavLink
                      to={item.linkDeploy || ''}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.link}
                    >
                      Deploy
                    </NavLink>
                  </Button>
                  <Button className={styles.links}>
                    <NavLink
                      to={item.linkRepository || ''}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.link}
                    >
                      Code
                    </NavLink>
                  </Button>
                </CardActions>
              </Card>
            ))}
          </div>
          <ReactPaginate
            previousLabel={'←'}
            nextLabel={'→'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={pageCount}
            pageRangeDisplayed={5}
            marginPagesDisplayed={0}
            onPageChange={handlePageClick}
            containerClassName={styles.pagination}
            activeClassName={styles.activePage}
            forcePage={currentPage} 
          />
        </section>
      )}
    </Transition>
  );
};

export default Portfolio;
