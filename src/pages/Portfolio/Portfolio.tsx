import React, { useState, useEffect, useCallback, Suspense } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Tooltip,
} from "@mui/material";
import Transition from "../../components/Transition/Transition";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styles from "./Portfolio.module.css";
import portfolioServer from "../../data/portfolioServer";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const ParticlesB = React.lazy(() => import("../../components/Particles/ParticlesB"));

const Portfolio = () => {
  const { t } = useTranslation();
  const [currentItems, setCurrentItems] = useState(portfolioServer.slice(0, 3));
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [transitionCompleted, setTransitionCompleted] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  const updateItemsPerPage = useCallback(() => {
    const width = window.innerWidth;
    if (width <= 768) {
      setItemsPerPage(1);
    } else if (width > 768 && width <= 1550) {
      setItemsPerPage(2);
    } else {
      setItemsPerPage(3);
    }
  }, []);

  const updateCurrentItems = useCallback(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(portfolioServer.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(portfolioServer.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  useEffect(() => {
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, [updateItemsPerPage]);

  useEffect(() => {
    updateCurrentItems();
  }, [itemOffset, itemsPerPage, updateCurrentItems]);

  const handlePageClick = useCallback((event: {selected: number}) => {
    const newOffset = (event.selected * itemsPerPage) % portfolioServer.length;
    setItemOffset(newOffset);
    setCurrentPage(event.selected);
  }, [itemsPerPage]);

  const toggleCardFlip = useCallback((cardId: number) => {
    setFlippedCards(prev => {
      const newSet = new Set<number>();
      if (!prev.has(cardId)) {
        newSet.add(cardId);
      }
      return newSet;
    });
  }, []);

  return (
    <Transition onAnimationComplete={() => setTransitionCompleted(true)}>
      {transitionCompleted && (
        <section className={styles.portfolio}>
          <Suspense fallback={<div>Loading...</div>}>
            <ParticlesB />
          </Suspense>
          <h2 className={styles.heading}>
            <span>//</span> {t("projects.title")} <span>{t("projects.text")}</span>
          </h2>
          <div className={styles.portfolio_grid}>
            {currentItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: "0%" }}
                transition={{
                  duration: 2,
                  delay: 0.7,
                  ease: [0.2, 0, 0.2, 1],
                }}
                className={styles.cardWrapper}
              >
                <div 
                  className={`${styles.cardContainer} ${flippedCards.has(item.id) ? styles.flipped : ''}`}
                  onClick={() => toggleCardFlip(item.id)}
                >
                  {/* Frente do card - apenas imagem */}
                  <div className={styles.cardFront}>
                    <CardMedia
                      component="img"
                      alt={item.name}
                      height="300"
                      image={item.image}
                      loading="lazy"
                      className={styles.cardImage}
                    />
                    <div className={styles.clickHint}>
                      {t("projects.clickToFlip")}
                    </div>
                  </div>
                  
                  {/* Verso do card - conteúdo e ações */}
                  <div className={styles.cardBack}>
                    <Card className={styles.card}>
                      <CardContent className={styles.cardContent}>
                        <h3 className={styles.cardTitle}>{item.name}</h3>
                      </CardContent>
                      <CardContent className={styles.cardContent}>
                        <p className={styles.cardDescription}>
                          {t(`projects.data.${item.id}.description`)}
                        </p>
                      </CardContent>
                      <CardContent className={styles.cardContent}>
                        <div className={styles.tech_title}>{t("projects.subtitle")}</div>
                        <div className={styles.techList}>
                          {item.technologies.map((tech, index) => (
                            <span className={styles.tech_list} key={index}>
                              {tech}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                      <CardActions className={styles.cardActions}>
                        <Tooltip 
                          title={!item.linkDeploy ? t("projects.inDevelopment") : ""}
                          placement="top"
                          arrow
                        >
                          <span>
                            <Button 
                              className={`${styles.links} ${!item.linkDeploy ? styles.disabled : ''}`}
                              disabled={!item.linkDeploy}
                            >
                              <NavLink
                                to={item.linkDeploy || "#"}
                                target={item.linkDeploy ? "_blank" : "_self"}
                                rel="noopener noreferrer"
                                className={styles.link}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (!item.linkDeploy) e.preventDefault();
                                }}
                              >
                                Deploy
                              </NavLink>
                            </Button>
                          </span>
                        </Tooltip>
                        <Tooltip 
                          title={!item.linkRepository ? t("projects.inDevelopment") : ""}
                          placement="top"
                          arrow
                        >
                          <span>
                            <Button 
                              className={`${styles.links} ${!item.linkRepository ? styles.disabled : ''}`}
                              disabled={!item.linkRepository}
                            >
                              <NavLink
                                to={item.linkRepository || "#"}
                                target={item.linkRepository ? "_blank" : "_self"}
                                rel="noopener noreferrer"
                                className={styles.link}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (!item.linkRepository) e.preventDefault();
                                }}
                              >
                                Code
                              </NavLink>
                            </Button>
                          </span>
                        </Tooltip>
                      </CardActions>
                    </Card>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: "80%" }}
            animate={{ opacity: 1, y: "0%" }}
            transition={{
              duration: 2,
              delay: 0.3,
              ease: [0.3, 0, 0.2, 1],
            }}
          >
            <ReactPaginate
              previousLabel={<FaChevronLeft />}
              nextLabel={<FaChevronRight />}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              pageRangeDisplayed={5}
              marginPagesDisplayed={0}
              onPageChange={handlePageClick}
              containerClassName={styles.pagination}
              activeClassName={styles.activePage}
              forcePage={currentPage}
            />
          </motion.div>
        </section>
      )}
    </Transition>
  );
};

export default Portfolio;
