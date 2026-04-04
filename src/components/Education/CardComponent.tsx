import { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import cardsServer from "../../data/cardsServer";
import { useTranslation } from "react-i18next";
import {
  FaGraduationCap,
  FaUniversity,
  FaLaptopCode,
} from "react-icons/fa";
import { PiCertificate } from "react-icons/pi";
import styles from "./CardComponent.module.css";
import Modal from "../Modal/Modal";
import OptimizedImage from "../OptimizedImage/OptimizedImage";

const CardComponent = () => {
  const DESKTOP_VISIBLE_LIMIT = 6;
  const { t } = useTranslation();
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isMobileView, setIsMobileView] = useState<boolean>(false);

  const categoryPriority: Record<string, number> = {
    "Acadêmico": 1,
    "Técnico": 2,
    "Negócio": 3,
    "Administração": 4,
  };

  const sortedCards = useMemo(() => {
    return [...cardsServer].sort((a, b) => {

      const categoryDiff =
        (categoryPriority[a.category] ?? 999) -
        (categoryPriority[b.category] ?? 999);
      if (categoryDiff !== 0) return categoryDiff;

      return a.id - b.id;
    });
  }, []);

  const categoryOptions = useMemo(
    () => [...new Set(sortedCards.map((card) => card.category))],
    [sortedCards]
  );

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};

    for (const card of sortedCards) {
      counts[card.category] = (counts[card.category] ?? 0) + 1;
    }

    return counts;
  }, [sortedCards]);

  const filteredCards = useMemo(() => {
    return sortedCards.filter((card) => {
      return selectedCategory === "all" || card.category === selectedCategory;
    });
  }, [sortedCards, selectedCategory]);

  const categoryLabelKeyMap: Record<string, string> = {
    "Acadêmico": "education.categoryLabels.academic",
    "Técnico": "education.categoryLabels.technical",
    "Negócio": "education.categoryLabels.business",
    "Administração": "education.categoryLabels.administration",
  };

  const selectedCardIndex = useMemo(() => {
    if (selectedCardId === null) return -1;
    return filteredCards.findIndex((card) => card.id === selectedCardId);
  }, [filteredCards, selectedCardId]);

  const renderIcon = useCallback((type: string) => {
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
  }, []);

  const modalItems = useMemo(
    () =>
      filteredCards.map((card) => ({
        title: t(`education.cardTitles.${card.titleKey}`),
        subtitle: t(`education.cardInstitutions.${card.institutionKey}`),
        image: card.img,
        pdf: card.file,
        icon: renderIcon(card.type),
      })),
    [filteredCards, renderIcon, t]
  );

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      setIsMobileView(width <= 768);
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const visibleCards = useMemo(
    () => (isMobileView ? filteredCards.slice(0, 3) : filteredCards.slice(0, DESKTOP_VISIBLE_LIMIT)),
    [DESKTOP_VISIBLE_LIMIT, filteredCards, isMobileView]
  );

  useEffect(() => {
    const firstPageCards = visibleCards;

    firstPageCards.forEach(card => {
      const img = new Image();
      img.src = card.img;
    });
  }, [visibleCards]);

  useEffect(() => {
    setSelectedCardId(null);
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedCardId !== null && selectedCardIndex === -1) {
      setSelectedCardId(null);
    }
  }, [selectedCardId, selectedCardIndex]);

  const currentPageData = visibleCards
    .map((card) => (
      <div className={styles.card_wrapper} key={card.id}>
        <div
          className={styles.card_container_simple}
          onClick={() => setSelectedCardId(card.id)}
        >
          <OptimizedImage
            src={card.img}
            alt={t(`education.cardTitles.${card.titleKey}`)}
            className={styles.card_image}
            priority
          />
          <div className={styles.card_overlay}>
            <span className={styles.click_hint}>
              {t("education.clickToView")}
            </span>
          </div>
        </div>
      </div>
    ));

  return (
    <>
      <div className={styles.filters_container}>
        <motion.div 
        initial={{ opacity: 0, x: "80%" }}
        animate={{ opacity: 1, x: "0%" }}
        transition={{ duration: 2, delay: 0.3, ease: [0.3, 0, 0.2, 1] }} 
        className={styles.filter_buttons}>
          <button
            type="button"
            className={`${styles.filter_button} ${selectedCategory === "all" ? styles.filter_button_active : ""}`}
            onClick={() => setSelectedCategory("all")}
          >
            {t("education.allCategories")} ({sortedCards.length})
          </button>
          {categoryOptions.map((category) => (
            <button
              key={category}
              type="button"
              className={`${styles.filter_button} ${selectedCategory === category ? styles.filter_button_active : ""}`}
              onClick={() => setSelectedCategory(category)}
            >
              {t(categoryLabelKeyMap[category] ?? category)} ({categoryCounts[category] ?? 0})
            </button>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: "-80%" }}
        animate={{ opacity: 1, y: "0%" }}
        transition={{ duration: 2, delay: 0.3, ease: [0.3, 0, 0.2, 1] }}
        className={styles.card_container}
      >
        {currentPageData}
      </motion.div>

      <Modal
        show={selectedCardId !== null && filteredCards.length > 0}
        onClose={() => setSelectedCardId(null)}
        carouselItems={modalItems}
        initialPage={selectedCardIndex >= 0 ? selectedCardIndex : 0}
        loopNavigation
      />
    </>
  );
};

export default CardComponent;
