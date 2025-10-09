import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, A11y } from 'swiper/modules';
import { motion } from 'framer-motion';
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

  const testimonials: Testimonial[] = testimonialServer.map((s) => ({
    ...s,
    subtitle: t(s.subtitle),
  }));

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
    testimonials.forEach((_, index) => {
      setTimeout(() => calculateTextHeight(index), 100);
    });
  }, [testimonials]);

  const handleCardMouseEnter = (index: number) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    
    hoverTimeoutRef.current = setTimeout(() => {
      setExpandedCard(index);
      if (swiperRef.current?.swiper?.autoplay) {
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
      if (swiperRef.current?.swiper?.autoplay) {
        swiperRef.current.swiper.autoplay.start();
      }
    }, 100);
  };

  const handleCardClick = (index: number) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    
    const newExpandedState = expandedCard === index ? null : index;
    setExpandedCard(newExpandedState);
    
    if (newExpandedState === null) {
      if (swiperRef.current?.swiper?.autoplay) {
        swiperRef.current.swiper.autoplay.start();
      }
    } else {
      if (swiperRef.current?.swiper?.autoplay) {
        swiperRef.current.swiper.autoplay.stop();
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
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
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, [expandedCard]);

  return (
    <section className={styles.container} aria-label="Depoimentos">
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
          1200: { slidesPerView: 3, spaceBetween: 30 },
        }}
        className={styles.swiper}
      >
        {testimonials.map((test, i) => {
          const textHeight = textHeights[i] || 0;
          
          return (
            <SwiperSlide key={i}>
              <motion.div
                className={`${styles.card} ${expandedCard === i ? styles.expanded : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
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
    </section>
  );
};


export default TestimonialComponent;