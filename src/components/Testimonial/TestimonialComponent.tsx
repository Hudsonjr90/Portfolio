import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, A11y } from 'swiper/modules';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import 'swiper/css';
import styles from './TestimonialComponent.module.css';
import { useTranslation } from 'react-i18next';
import testimonialServer, { Testimonial } from '../../data/testimonialsServer';


const TestimonialComponent: React.FC = () => {
  const { t } = useTranslation();
  const swiperRef = useRef<any>(null);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [textHeights, setTextHeights] = useState<{ [key: number]: number }>({});
  const textRefs = useRef<{ [key: number]: HTMLParagraphElement | null }>({});
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const [currentPage, setCurrentPage] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [cardsPerPage, setCardsPerPage] = useState(4);
  const [animationKey, setAnimationKey] = useState(0);

  const testimonials: Testimonial[] = testimonialServer.map((s) => ({
    ...s,
    subtitle: t(s.subtitle),
  }));

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      const desktop = width >= 1200;
      setIsDesktop(desktop);
      
      if (width >= 1200) {
        setCardsPerPage(3);
      } else if (width >= 768) {
        setCardsPerPage(2);
      } else {
        setCardsPerPage(1);
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const offset = currentPage * cardsPerPage;
  const pageCount = Math.ceil(testimonials.length / cardsPerPage);

  const handleNextPage = () => {
    const nextPage = (currentPage + 1) % pageCount;
    setCurrentPage(nextPage);
    setAnimationKey(prev => prev + 1);
    setExpandedCard(null);
  };

  const handlePrevPage = () => {
    const prevPage = currentPage === 0 ? pageCount - 1 : currentPage - 1;
    setCurrentPage(prevPage);
    setAnimationKey(prev => prev + 1);
    setExpandedCard(null);
  };

  const currentPageData = isDesktop 
    ? testimonials.slice(offset, offset + cardsPerPage)
    : testimonials;

  const getCardAnimation = (index: number) => {
    const relativeIndex = index % cardsPerPage;
    
    switch (cardsPerPage) {
      case 3:
        switch (relativeIndex) {
          case 0: return { opacity: 0, x: -100, y: 0 };  // Esquerda
          case 1: return { opacity: 0, x: 0, y: 100 };   // Centro (de baixo)
          case 2: return { opacity: 0, x: 100, y: 0 };   // Direita
          default: return { opacity: 0, y: 30 };
        }
      case 2:
        switch (relativeIndex) {
          case 0: return { opacity: 0, x: -100, y: 0 };  
          case 1: return { opacity: 0, x: 100, y: 0 };   
          default: return { opacity: 0, y: 30 };
        }
      default:
        return { opacity: 0, y: 50 }; 
    }
  };

  const calculateTextHeight = (index: number) => {
    const textElement = textRefs.current[index];
    if (textElement && textElement.parentElement) {
      const tempElement = document.createElement('p');
      const parentWidth = textElement.parentElement.clientWidth || 280;
      
      tempElement.style.cssText = `
        font-family: 'Montserrat', sans-serif;
        font-size: 1.1rem;
        line-height: 1.7;
        font-weight: 400;
        padding: 0 1rem;
        width: ${parentWidth - 32}px;
        position: absolute;
        visibility: hidden;
        white-space: normal;
        word-wrap: break-word;
        box-sizing: border-box;
        margin: 0;
      `;
      
      if (window.innerWidth <= 768) {
        tempElement.style.fontSize = '1rem';
        tempElement.style.padding = '0 0.8rem';
        tempElement.style.width = `${parentWidth - 25.6}px`;
      }
      
      tempElement.textContent = testimonials[index].subtitle;
      document.body.appendChild(tempElement);
      
      const height = tempElement.scrollHeight;
      document.body.removeChild(tempElement);
      
      setTextHeights(prev => ({ ...prev, [index]: height }));
      return height;
    }
    return 0;
  };

  useEffect(() => {
    currentPageData.forEach((_, index) => {
      setTimeout(() => calculateTextHeight(offset + index), 100);
    });
  }, [currentPageData, offset]);

  const handleCardMouseEnter = (index: number) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    
    hoverTimeoutRef.current = setTimeout(() => {
      const adjustedIndex = isDesktop ? index : index;
      setExpandedCard(adjustedIndex);
      if (!isDesktop && swiperRef.current?.swiper?.autoplay) {
        swiperRef.current.swiper.autoplay.stop();
      }
    }, 150);
  };

  const handleCardMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    hoverTimeoutRef.current = setTimeout(() => {
      setExpandedCard(null);
      if (!isDesktop && swiperRef.current?.swiper?.autoplay) {
        swiperRef.current.swiper.autoplay.start();
      }
    }, 100);
  };

  const handleCardClick = (index: number) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    
    const adjustedIndex = isDesktop ? index : index;
    const newExpandedState = expandedCard === adjustedIndex ? null : adjustedIndex;
    setExpandedCard(newExpandedState);
    
    if (!isDesktop) {
      if (newExpandedState === null) {
        if (swiperRef.current?.swiper?.autoplay) {
          swiperRef.current.swiper.autoplay.start();
        }
      } else {
        if (swiperRef.current?.swiper?.autoplay) {
          swiperRef.current.swiper.autoplay.stop();
        }
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isDesktop) {
        const container = document.querySelector(`.${styles.container}`);
        if (container && !container.contains(event.target as Node)) {
          if (expandedCard !== null) {
            if (hoverTimeoutRef.current) {
              clearTimeout(hoverTimeoutRef.current);
            }
            setExpandedCard(null);
          }
        }
      } else {
        const swiperContainer = swiperRef.current?.querySelector('.swiper-wrapper');
        if (swiperContainer && !swiperContainer.contains(event.target as Node)) {
          if (expandedCard !== null) {
            if (hoverTimeoutRef.current) {
              clearTimeout(hoverTimeoutRef.current);
            }
            setExpandedCard(null);
            if (swiperRef.current?.swiper?.autoplay) {
              swiperRef.current.swiper.autoplay.start();
            }
          }
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, [expandedCard, isDesktop]);

  return (
    <section className={styles.container} aria-label="Depoimentos">
      {isDesktop ? (
        <>
          {/* Setas de navegação fixas */}
          {pageCount > 1 && (
            <>
              <motion.button
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className={styles.navArrow}
                onClick={handlePrevPage}
                disabled={pageCount <= 1}
                aria-label="Página anterior"
                style={{ left: '30rem', zIndex: 1 }}
              >
                <FaChevronLeft />
              </motion.button>

              <motion.button
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className={styles.navArrow}
                onClick={handleNextPage}
                disabled={pageCount <= 1}
                aria-label="Próxima página"
                style={{ right: '30rem', zIndex: 1 }}
              >
                <FaChevronRight />
              </motion.button>
            </>
          )}

          <div className={styles.desktopGrid} key={animationKey}>
            {currentPageData.map((test, i) => {
              const originalIndex = offset + i;
              const textHeight = textHeights[originalIndex] || 0;
              
              return (
                <motion.div
                  key={originalIndex}
                  className={`${styles.card} ${expandedCard === originalIndex ? styles.expanded : ''}`}
                  initial={getCardAnimation(i)}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: i * 0.15,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  onMouseEnter={() => handleCardMouseEnter(originalIndex)}
                  onMouseLeave={handleCardMouseLeave}
                  onClick={() => handleCardClick(originalIndex)}
                >
                  <img 
                    src={test.img} 
                    alt={test.title} 
                    className={styles.avatar}
                  />
                  <h3 className={styles.name}>{test.title}</h3>
                  <div 
                    className={`${styles.textContainer} ${expandedCard === originalIndex ? styles.showText : ''}`}
                    style={expandedCard === originalIndex && textHeight > 0 ? { 
                      maxHeight: `${textHeight + 30}px` 
                    } : {}}
                  >
                    <p 
                      ref={el => textRefs.current[originalIndex] = el}
                      className={styles.text}
                    >
                      {test.subtitle}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </>
      ) : (
        // Swiper para mobile/tablet
        <Swiper
          ref={swiperRef}
          modules={[Autoplay, A11y]}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 30 },
          }}
          className={styles.swiper}
        >
          {testimonials.map((test, i) => {
            const textHeight = textHeights[i] || 0;
            
            return (
              <SwiperSlide key={i}>
                <motion.div
                  className={`${styles.card} ${expandedCard === i ? styles.expanded : ''}`}
                  initial={getCardAnimation(i)}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: i < cardsPerPage ? i * 0.15 : 0,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                  onMouseEnter={() => handleCardMouseEnter(i)}
                  onMouseLeave={handleCardMouseLeave}
                  onClick={() => handleCardClick(i)}
                >
                  <img 
                    src={test.img} 
                    alt={test.title} 
                    className={styles.avatar}
                  />
                  <h3 className={styles.name}>{test.title}</h3>
                  <div 
                    className={`${styles.textContainer} ${expandedCard === i ? styles.showText : ''}`}
                    style={expandedCard === i && textHeight > 0 ? { 
                      maxHeight: `${textHeight + 30}px` 
                    } : {}}
                  >
                    <p 
                      ref={el => textRefs.current[i] = el}
                      className={styles.text}
                    >
                      {test.subtitle}
                    </p>
                  </div>
                </motion.div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </section>
  );
};


export default TestimonialComponent;