import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import cardsServer from "../../data/cardsServer";
import { useTranslation } from "react-i18next";
import Paginate from "react-paginate";
import { FaDownload, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styles from "./CardComponent.module.css";

const CardComponent = () => {
  const { t } = useTranslation();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleMouseEnter = (id: number) => setHoveredCard(id);
  const handleMouseLeave = () => setHoveredCard(null);

  const handleDownload = (cardId: number) => {
    const card = cardsServer.find((c) => c.id === cardId);
    if (card && card.file && card.text) {
      const link = document.createElement("a");
      link.href = card.file;
      link.setAttribute("download", `${card.text}.pdf`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const [currentPage, setCurrentPage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(4);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      const mobile = width < 768;
      setIsMobile(mobile);
      
      if (width < 480) {
        setCardsPerPage(1);
      } else if (width < 768) {
        setCardsPerPage(1);
      } else if (width < 992) {
        setCardsPerPage(2);
      } else if (width < 1200) {
        setCardsPerPage(3);
      } else {
        setCardsPerPage(4);
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const offset = currentPage * cardsPerPage;
  const pageCount = Math.ceil(cardsServer.length / cardsPerPage);

  const handlePageClick = ({
    selected: selectedPage,
  }: {
    selected: number;
  }) => {
    setCurrentPage(selectedPage);
  };

  const currentPageData = cardsServer
    .slice(offset, offset + cardsPerPage)
    .map((card) => (
      <div
        className={styles.card_wrapper}
        key={card.id}
        onMouseEnter={() => !isMobile && handleMouseEnter(card.id)}
        onMouseLeave={() => !isMobile && handleMouseLeave()}
      >
        {isMobile ? (
          /* Card tradicional para mobile */
          <div className={styles.mobile_card}>
            <div className={styles.mobile_card_image_container}>
              <img
                src={card.img}
                alt="Card image"
                className={styles.mobile_card_image}
                loading="lazy"
              />
            </div>
            <div className={styles.mobile_card_content}>
              <h3 className={styles.mobile_card_title}>
                {t(`education.cards.${card.id}.title`)}
              </h3>
              <p className={styles.mobile_card_description}>
                {t(`education.cards.${card.id}.text`)}
              </p>
              <button
                className={styles.mobile_card_button}
                onClick={() => handleDownload(card.id)}
              >
                {t("home.download")}
                <FaDownload />
              </button>
            </div>
          </div>
        ) : (
          /* Card com efeito holograma para desktop */
          <div className={styles.card_container_3d}>
            {/* Card base que deita */}
            <div
              className={`${styles.card} ${styles.card_base}`}
              style={{
                transform: hoveredCard === card.id
                  ? "rotateX(75deg) translateZ(-20px)"
                  : "rotateX(0deg) translateZ(0px)",
              }}
            >
              <img
                src={card.img}
                alt="Card image"
                className={styles.card_image}
                loading="lazy"
              />
            </div>

            {/* Holograma 3D que surge no hover */}
            {hoveredCard === card.id && (
              <motion.div
                className={styles.hologram}
                initial={{ 
                  opacity: 0, 
                  scale: 0.5, 
                  rotateX: -90,
                  translateZ: -50
                }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  rotateX: 0,
                  translateZ: 100
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.5 },
                  rotateX: { duration: 0.6 },
                  translateZ: { duration: 0.6 }
                }}
              >
                {/* Efeito de glow do holograma */}
                <div className={styles.hologram_glow} />
                
                {/* Conteúdo do holograma */}
                <div className={styles.hologram_content}>
                  <motion.h3 
                    className={styles.hologram_title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                  >
                    {t(`education.cards.${card.id}.title`)}
                  </motion.h3>
                  
                  <motion.p 
                    className={styles.hologram_description}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    {t(`education.cards.${card.id}.text`)}
                  </motion.p>
                  
                  <motion.button
                    className={styles.hologram_button}
                    onClick={() => handleDownload(card.id)}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t("home.download")}
                    <FaDownload />
                  </motion.button>
                </div>
                
                {/* Linhas de scanner holográfico */}
                <div className={styles.hologram_scanner} />
              </motion.div>
            )}
          </div>
        )}
      </div>
    ));

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: "-80%" }}
        animate={{ opacity: 1, x: "0%" }}
        transition={{ duration: 2, delay: 0.3, ease: [0.3, 0, 0.2, 1] }}
        className={styles.card_container}
      >
        {currentPageData}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: "80%" }}
        animate={{ opacity: 1, y: "0%" }}
        transition={{ duration: 2, delay: 0.3, ease: [0.3, 0, 0.2, 1] }}
      >
        <Paginate
          pageCount={pageCount}
          pageRangeDisplayed={isMobile ? 2 : 5}
          marginPagesDisplayed={isMobile ? 0 : 0}
          onPageChange={({ selected }) => handlePageClick({ selected })}
          containerClassName={styles.pagination}
          activeClassName={styles.activePage}
          previousLabel={<FaChevronLeft />}
          nextLabel={<FaChevronRight />}
          forcePage={currentPage}
        />
      </motion.div>
    </>
  );
};

export default CardComponent;
