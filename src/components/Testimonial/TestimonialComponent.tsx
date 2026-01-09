import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Paginate from "react-paginate";
import "swiper/css";
import styles from "./TestimonialComponent.module.css";
import { useTranslation } from "react-i18next";
import testimonialServer, { Testimonial } from "../../data/testimonialsServer";

const TestimonialComponent: React.FC = () => {
  const { t } = useTranslation();
  const swiperRef = useRef<any>(null);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [textHeights, setTextHeights] = useState<{ [key: number]: number }>({});
  const textRefs = useRef<{ [key: number]: HTMLParagraphElement | null }>({});
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [hiddenCard, setHiddenCard] = useState<number | null>(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [cardsPerPage, setCardsPerPage] = useState(4);
  const [animationKey, setAnimationKey] = useState(0);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

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
        setCardsPerPage(6);
      } else if (width >= 769) {
        setCardsPerPage(4); // Tablet usa 4 cards em grid 2x2
      } else {
        setCardsPerPage(2); // Mobile usa 2 cards por página
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const offset = currentPage * cardsPerPage;
  const pageCount = Math.ceil(testimonials.length / cardsPerPage);

  const handlePageClick = ({
    selected: selectedPage,
  }: {
    selected: number;
  }) => {
    setCurrentPage(selectedPage);
    setAnimationKey((prev) => prev + 1);
    setExpandedCard(null);
  };

  const currentPageData = testimonials.slice(offset, offset + cardsPerPage);

  const getCardAnimation = (index: number) => {
    const relativeIndex = index % cardsPerPage;

    switch (cardsPerPage) {
      case 6:
        const row = Math.floor(relativeIndex / 3);
        const col = relativeIndex % 3;
        return {
          opacity: 0,
          y: row === 0 ? -50 : 50, 
          x: (col - 1) * 20, 
        };
      case 4:

        const tabletRow = Math.floor(relativeIndex / 2);
        const tabletCol = relativeIndex % 2;
        return {
          opacity: 0,
          y: tabletRow === 0 ? -40 : 40, 
          x: (tabletCol - 0.5) * 30, 
        };
      case 2:
        switch (relativeIndex) {
          case 0:
            return { opacity: 0, x: -100, y: 0 };
          case 1:
            return { opacity: 0, x: 100, y: 0 };
          default:
            return { opacity: 0, y: 30 };
        }
      default:
        return { opacity: 0, y: 50 };
    }
  };

  const calculateTextHeight = (index: number) => {
    const textElement = textRefs.current[index];
    if (
      textElement &&
      textElement.parentElement &&
      testimonials[index]?.subtitle
    ) {
      try {
        const tempElement = document.createElement("div");
        const parentWidth = Math.max(
          280,
          textElement.parentElement.clientWidth - 32
        );

        tempElement.style.cssText = `
          font-family: 'Montserrat', sans-serif;
          font-size: 0.95rem;
          line-height: 1.4;
          font-weight: 400;
          padding: 0 0.8rem;
          width: ${parentWidth}px;
          position: absolute;
          visibility: hidden;
          white-space: normal;
          word-wrap: break-word;
          box-sizing: border-box;
          margin: 0;
          max-width: 100%;
        `;

        if (window.innerWidth <= 768) {
          tempElement.style.fontSize = "0.95rem";
          tempElement.style.lineHeight = "1.4";
          tempElement.style.padding = "0 0.8rem";
        }

        tempElement.textContent = String(testimonials[index].subtitle || "");
        document.body.appendChild(tempElement);

        const height = Math.max(0, tempElement.scrollHeight || 0);
        document.body.removeChild(tempElement);

        setTextHeights((prev) => ({ ...prev, [index]: height }));
        return height;
      } catch (error) {
        console.warn("Error calculating text height:", error);
        setTextHeights((prev) => ({ ...prev, [index]: 100 }));
        return 100;
      }
    }
    setTextHeights((prev) => ({ ...prev, [index]: 100 }));
    return 100;
  };

  useEffect(() => {
    currentPageData.forEach((_, index) => {
      setTimeout(() => calculateTextHeight(offset + index), 100);
    });
  }, [currentPageData, offset]);

  const toggleCardFlip = (cardId: number) => {
    console.log("Toggling card flip for ID:", cardId);
    setFlippedCards((prev) => {
      const newSet = new Set<number>();
      if (!prev.has(cardId)) {
        newSet.add(cardId);
      }
      console.log("New flipped cards:", newSet);
      return newSet;
    });
  };

  const handleCardClick = (index: number) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    const adjustedIndex = isDesktop ? index : index;

    if (expandedCard === adjustedIndex) {
      setExpandedCard(null);
      setHiddenCard(null);
    } else {
      setExpandedCard(adjustedIndex);

      if (!isDesktop && window.innerWidth <= 768) {
        const indexInPage = adjustedIndex % cardsPerPage;
        const otherCardIndex = offset + (indexInPage === 0 ? 1 : 0);

        if (
          otherCardIndex < offset + cardsPerPage &&
          otherCardIndex < testimonials.length &&
          otherCardIndex !== adjustedIndex
        ) {
          setHiddenCard(otherCardIndex);
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
        const swiperContainer =
          swiperRef.current?.querySelector(".swiper-wrapper");
        if (
          swiperContainer &&
          !swiperContainer.contains(event.target as Node)
        ) {
          if (expandedCard !== null) {
            if (hoverTimeoutRef.current) {
              clearTimeout(hoverTimeoutRef.current);
            }
            setExpandedCard(null);
            setHiddenCard(null);
          }
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, [expandedCard, isDesktop]);

  return (
    <section className={styles.container} aria-label="Depoimentos">
      {isDesktop ? (
        <>
          <div className={styles.desktopGrid} key={animationKey}>
            {currentPageData.map((test, i) => {
              const originalIndex = offset + i;

              return (
                <motion.div
                  key={originalIndex}
                  className={styles.cardWrapper}
                  initial={getCardAnimation(i)}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  <div
                    className={`${styles.cardContainer} ${flippedCards.has(originalIndex) ? styles.flipped : ""}`}
                    onClick={() => toggleCardFlip(originalIndex)}
                  >
                    {/* Frente do card - avatar e nome */}
                    <div className={styles.cardFront}>
                      <img
                        src={test.img}
                        alt={test.title}
                        className={styles.avatar}
                      />
                      <h3 className={styles.name}>{test.title}</h3>
                      <div className={styles.clickHint}>
                        {t("projects.clickToFlip")}
                      </div>
                    </div>

                    {/* Verso do card - texto do depoimento */}
                    <div className={styles.cardBack}>
                      <div className={styles.testimonialContent}>
                        <h3 className={styles.nameBack}>{test.title}</h3>
                        <p className={styles.textBack}>{test.subtitle}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Paginação para Desktop */}
          {pageCount > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className={styles.pagination_container}
            >
              <Paginate
                pageCount={pageCount}
                pageRangeDisplayed={4}
                marginPagesDisplayed={0}
                onPageChange={({ selected }) => handlePageClick({ selected })}
                containerClassName={styles.pagination}
                activeClassName={styles.activePage}
                previousLabel={<FaChevronLeft />}
                nextLabel={<FaChevronRight />}
                forcePage={currentPage}
              />
            </motion.div>
          )}
        </>
      ) : window.innerWidth <= 768 ? (
        <>
          <div className={styles.mobileContainer} key={animationKey}>
            <div className={styles.mobileCardPage}>
              {currentPageData.map((test, i) => {
                const globalIndex = offset + i;
                const textHeight =
                  typeof textHeights[globalIndex] === "number"
                    ? textHeights[globalIndex]
                    : 0;

                return (
                  <motion.div
                    key={globalIndex}
                    className={`${styles.card} ${
                      expandedCard === globalIndex ? styles.expanded : ""
                    } ${hiddenCard === globalIndex ? styles.hidden : ""}`}
                    style={
                      expandedCard === globalIndex
                        ? {
                            height: `${Math.max(300, 200 + (typeof textHeight === "number" ? textHeight + 50 : 100))}px`,
                          }
                        : {}
                    }
                    initial={{ opacity: 0, y: "-80%" }}
                    animate={{ opacity: 1, y: "0%" }}
                    transition={{
                      duration: 2,
                      delay: 0.3,
                      ease: [0.3, 0, 0.2, 1],
                    }}
                    onClick={() => handleCardClick(globalIndex)}
                  >
                    <img
                      src={test.img}
                      alt={test.title}
                      className={styles.avatar}
                    />
                    <h3 className={styles.name}>{test.title}</h3>
                    <div
                      className={`${styles.textContainer} ${expandedCard === globalIndex ? styles.showText : ""}`}
                    >
                      <p
                        ref={(el) => (textRefs.current[globalIndex] = el)}
                        className={styles.text}
                      >
                        {test.subtitle}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Paginação para Mobile */}
          {pageCount > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className={styles.pagination_container}
            >
              <Paginate
                pageCount={pageCount}
                pageRangeDisplayed={3}
                breakLabel={"..."}
                breakClassName={"break-me"}
                marginPagesDisplayed={0}
                onPageChange={({ selected }) => handlePageClick({ selected })}
                containerClassName={styles.pagination}
                activeClassName={styles.activePage}
                previousLabel={<FaChevronLeft />}
                nextLabel={<FaChevronRight />}
                forcePage={currentPage}
              />
            </motion.div>
          )}
        </>
      ) : (
        <>
          <div className={styles.tabletGrid} key={animationKey}>
            {currentPageData.map((test, i) => {
              const globalIndex = offset + i;
              const textHeight =
                typeof textHeights[globalIndex] === "number"
                  ? textHeights[globalIndex]
                  : 0;

              return (
                <motion.div
                  key={globalIndex}
                  className={`${styles.card} ${
                    expandedCard === globalIndex ? styles.expanded : ""
                  } ${hiddenCard === globalIndex ? styles.hidden : ""}`}
                  style={
                    expandedCard === globalIndex
                      ? {
                          height: `${Math.max(280, 220 + (typeof textHeight === "number" ? textHeight + 40 : 80))}px`,
                        }
                      : {}
                  }
                  initial={getCardAnimation(i)}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.12,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  onClick={() => handleCardClick(globalIndex)}
                >
                  <img
                    src={test.img}
                    alt={test.title}
                    className={styles.avatar}
                  />
                  <h3 className={styles.name}>{test.title}</h3>
                  <div
                    className={`${styles.textContainer} ${expandedCard === globalIndex ? styles.showText : ""}`}
                  >
                    <p
                      ref={(el) => (textRefs.current[globalIndex] = el)}
                      className={styles.text}
                    >
                      {test.subtitle}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Paginação para Tablet */}
          {pageCount > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className={styles.pagination_container}
            >
              <Paginate
                pageCount={pageCount}
                pageRangeDisplayed={3}
                marginPagesDisplayed={1}
                onPageChange={({ selected }) => handlePageClick({ selected })}
                containerClassName={styles.pagination}
                activeClassName={styles.activePage}
                previousLabel={<FaChevronLeft />}
                nextLabel={<FaChevronRight />}
                forcePage={currentPage}
              />
            </motion.div>
          )}
        </>
      )}
    </section>
  );
};

export default TestimonialComponent;
