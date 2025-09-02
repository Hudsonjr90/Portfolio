import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import cardsServer from "../../data/cardsServer";
import { useTranslation } from "react-i18next";
import Paginate from "react-paginate";
import { FaDownload } from "react-icons/fa";
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

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 769) {
        setCardsPerPage(1);
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
        onMouseEnter={() => handleMouseEnter(card.id)}
        onMouseLeave={handleMouseLeave}
      >
        {/* Halo animado */}
        {hoveredCard === card.id && (
          <motion.div
            className={styles.card_glow}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 0.5, 0], scale: [0, 1, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />
        )}

        {/* Card 3D */}
        <div
          className={`${styles.card} ${styles.card_3d}`}
          style={{
            transform:
              hoveredCard === card.id
                ? "rotateX(10deg) scale(1.05)"
                : "rotateX(0deg) scale(1)",
          }}
        >
          <div className={styles.card_image_container}>
            <img
              src={card.img}
              alt="Card image"
              className={`${styles.card_image} ${
                hoveredCard === card.id ? styles.blur : ""
              }`}
              loading="lazy"
            />
          </div>
          <div className={styles.card_content}>
            <h3 className={styles.card_title}>
              {t(`education.cards.${card.id}.title`)}
            </h3>
            <p className={styles.card_description}>
              {t(`education.cards.${card.id}.text`)}
            </p>
            {hoveredCard === card.id && (
              <button
                className={styles.download_button}
                onClick={() => handleDownload(card.id)}
              >
                {t("home.download")}
                <FaDownload />
              </button>
            )}
          </div>
        </div>
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
          pageRangeDisplayed={5}
          marginPagesDisplayed={0}
          onPageChange={({ selected }) => handlePageClick({ selected })}
          containerClassName={styles.pagination}
          activeClassName={styles.activePage}
          previousLabel={"<<"}
          nextLabel={">>"}
          forcePage={currentPage}
        />
      </motion.div>
    </>
  );
};

export default CardComponent;
