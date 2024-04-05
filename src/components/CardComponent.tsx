import Card from "react-bootstrap/Card";
import styles from "./CardComponent.module.css";
import Paginate from "react-paginate";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import cardsServer from "../data/cardsServer";
import { useTranslation } from "react-i18next";

const CardComponent = () => {
  const { t } = useTranslation();

  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleMouseEnter = (id: number) => {
    setHoveredCard(id);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  const [currentPage, setCurrentPage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(1);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 769) {
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
  const pageCount = Math.ceil(cardsServer.length / cardsPerPage);

  const handlePageClick = ({
    selected: selectedPage,
  }: {
    selected: number;
  }) => {
    setCurrentPage(selectedPage);
  };

  const autoChangePage = () => {
    if (!hoveredCard) {
      const nextPage = (currentPage + 1) % pageCount;
      setCurrentPage(nextPage);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(autoChangePage, 5000);

    return () => clearInterval(intervalId);
  }, [currentPage, pageCount, hoveredCard]);

  const currentPageData = cardsServer
    .slice(offset, offset + cardsPerPage)
    .map((card) => (
      <Card
        className={styles.card_content}
        key={card.id}
        onMouseEnter={() => handleMouseEnter(card.id)}
        onMouseLeave={handleMouseLeave}
      >
        <Card.Img
          src={card.img}
          alt="Card image"
          className={hoveredCard === card.id ? styles.blur : ""}
        />
        <Card.ImgOverlay>
          <Card.Text
            className={`${styles.card_text} ${
              hoveredCard === card.id ? styles.showText : ""
            }`}
          >
            {t(`education.cards.${card.id}.text`)}
          </Card.Text>
        </Card.ImgOverlay>
      </Card>
    ));

  const [soundClick, setSoundClick] = useState<boolean>(false);

  const handleAudio = () => {
    const audio = new Audio("/sounds/button_click.mp3");

    if (soundClick) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: "-80%" }}
        animate={{ opacity: 1, x: "0%" }}
        transition={{
          duration: 2,
          delay: 0.3,
          ease: [0.3, 0, 0.2, 1],
        }}
        className={styles.card_container}
      >
        {currentPageData}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: "80%" }}
        animate={{ opacity: 1, y: "0%" }}
        transition={{
          duration: 2,
          delay: 0.3,
          ease: [0.3, 0, 0.2, 1],
        }}
      >
        <Paginate
          pageCount={pageCount}
          pageRangeDisplayed={5}
          marginPagesDisplayed={0}
          onPageChange={({ selected: selectedPage }) => {
            handlePageClick({ selected: selectedPage });
            handleAudio();
          }}
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
