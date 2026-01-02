import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import cardsServer from "../../data/cardsServer";
import { useTranslation } from "react-i18next";
import Paginate from "react-paginate";
import {
  FaGraduationCap,
  FaUniversity,
  FaLaptopCode,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { PiCertificate } from "react-icons/pi";
import styles from "./CardComponent.module.css";
import Modal from "../Modal/Modal";
import OptimizedImage from "../OptimizedImage/OptimizedImage";

const CardComponent = () => {
  const { t } = useTranslation();
  const [selectedCard, setSelectedCard] = useState<any | null>(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(4);

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;

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

  // Preload das imagens da primeira página para carregamento mais rápido
  useEffect(() => {
    const firstPageCards = cardsServer.slice(0, cardsPerPage);
    firstPageCards.forEach(card => {
      const img = new Image();
      img.src = card.img;
    });
  }, [cardsPerPage]);

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
      <div className={styles.card_wrapper} key={card.id}>
        <div
          className={styles.card_container_simple}
          onClick={() => setSelectedCard(card)}
        >
          <OptimizedImage
            src={card.img}
            alt={t(`education.cardTitles.${card.titleKey}`)}
            className={styles.card_image}
            priority={currentPage === 0}
          />
          <div className={styles.card_overlay}>
            <span className={styles.click_hint}>
              {t("education.clickToView")}
            </span>
          </div>
        </div>
      </div>
    ));

  const renderIcon = (type: string) => {
    switch (type) {
      case "Mestrado":
      case "Pós-graduação":
        return <FaGraduationCap />;
      case "Graduação":
        return <FaUniversity />;
      case "Bootcamp":
        return <FaLaptopCode />;
      default:
        return <PiCertificate />;
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: "-80%" }}
        animate={{ opacity: 1, y: "0%" }}
        transition={{ duration: 2, delay: 0.3, ease: [0.3, 0, 0.2, 1] }}
        className={styles.card_container}
      >
        {currentPageData}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: "80%" }}
        animate={{ opacity: 1, y: "0%" }}
        transition={{ duration: 2, delay: 0.3, ease: [0.3, 0, 0.2, 1] }}
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
      <Modal
        show={!!selectedCard}
        onClose={() => setSelectedCard(null)}
        title={selectedCard ? t(`education.cardTitles.${selectedCard.titleKey}`) : ""}
        subtitle={selectedCard ? t(`education.cardInstitutions.${selectedCard.institutionKey}`) : ""}
        description={selectedCard ? t(`education.cardDescriptions.${selectedCard.descriptionKey}`) : ""}
        pdf={selectedCard?.file}
        icon={renderIcon(selectedCard?.type)}
        images={selectedCard?.img ? [selectedCard.img] : []}
      />
    </>
  );
};

export default CardComponent;
