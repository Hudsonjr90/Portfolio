import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import cardsServer from "../../data/cardsServer";
import { useTranslation } from "react-i18next";
import Paginate from "react-paginate";
import {
  FaGraduationCap,
  FaUniversity,
  FaLaptopCode,
  FaDownload,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { PiCertificate } from "react-icons/pi";
import styles from "./CardComponent.module.css";
import Modal from "../Modal/Modal";

const CardComponent = () => {
  const { t } = useTranslation();
  const [selectedCard, setSelectedCard] = useState<any | null>(null);

  const handleDownload = (cardId: number) => {
    const card = cardsServer.find((c) => c.id === cardId);
    if (card && card.file) {
      const title = t(`education.cardTitles.${card.titleKey}`);
      const link = document.createElement("a");
      link.href = card.file;
      link.setAttribute("download", `${title}.pdf`);
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
      <div className={styles.card_wrapper} key={card.id}>
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
          /* Card simples para desktop */
          <div
            className={styles.card_container_simple}
            onClick={() => setSelectedCard(card)}
          >
            <img
              src={card.img}
              alt="Card image"
              className={styles.card_image}
              loading="lazy"
            />
            <div className={styles.card_overlay}>
              <span className={styles.click_hint}>
                {t("education.clickToView")}
              </span>
            </div>
          </div>
        )}
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
          pageRangeDisplayed={isMobile ? 2 : 6}
          marginPagesDisplayed={isMobile ? 0 : 0}
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
