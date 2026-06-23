import React, { useState, useEffect, useCallback, Suspense, useMemo } from "react";
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

const sortedPortfolio = [...portfolioServer].sort((a, b) =>
  b.date.localeCompare(a.date)
);
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCodeCompare } from "react-icons/fa6";

const ParticlesB = React.lazy(
  () => import("../../components/Particles/ParticlesB")
);

const Portfolio = () => {
  const { t } = useTranslation();
  const [currentItems, setCurrentItems] = useState(sortedPortfolio.slice(0, 4));
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [transitionCompleted, setTransitionCompleted] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [selectedTech, setSelectedTech] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const normalizeTechnologyName = useCallback((tech: string) => {
    const normalized = tech.trim().toLowerCase();
    const aliasMap: Record<string, string> = {
      typescript: "TypeScript",
      "type script": "TypeScript",
      javascript: "JavaScript",
      nodejs: "Node.js",
      nextjs: "Next.js",
      next: "Next.js",
      nuxtjs: "Nuxt.js",
      vue3: "Vue 3",
      vuejs: "Vue.js",
      html: "HTML",
      css: "CSS",
      js: "JavaScript",
      mui: "MUI",
      "material-ui": "Material-UI",
      websockets: "WebSockets",
      postgresql: "PostgreSQL",
      rest: "REST",
      "api rest": "REST API",
    };

    return aliasMap[normalized] || tech.trim();
  }, []);

  const getNormalizedTechnologies = useCallback(
    (technologies: string[]) => {
      return Array.from(
        new Set(technologies.map((tech) => normalizeTechnologyName(tech)))
      );
    },
    [normalizeTechnologyName]
  );

  const featuredProjects = useMemo(
    () => sortedPortfolio.filter((item) => item.linkDeploy).slice(0, 2),
    []
  );

  const techOptions = useMemo(() => {
    const unique = new Set<string>();
    sortedPortfolio.forEach((item) => {
      item.technologies.forEach((tech) =>
        unique.add(normalizeTechnologyName(tech))
      );
    });
    return Array.from(unique).sort((a, b) => a.localeCompare(b));
  }, [normalizeTechnologyName]);

  const filteredPortfolio = useMemo(() => {
    return sortedPortfolio.filter((item) => {
      const matchesTech =
        selectedTech === "all" ||
        item.technologies
          .map((tech) => normalizeTechnologyName(tech))
          .includes(selectedTech);
      const hasLiveDemo = Boolean(item.linkDeploy);
      const matchesStatus =
        selectedStatus === "all" ||
        (selectedStatus === "online" ? hasLiveDemo : !hasLiveDemo);

      return matchesTech && matchesStatus;
    });
  }, [selectedStatus, selectedTech, normalizeTechnologyName]);

  const updateItemsPerPage = useCallback(() => {
    const width = window.innerWidth;
    if (width <= 768) {
      setItemsPerPage(1);
    } else if (width > 768 && width <= 1550) {
      setItemsPerPage(2); 
    } else {
      setItemsPerPage(4);
    }
  }, []);

  const updateCurrentItems = useCallback(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(filteredPortfolio.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredPortfolio.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredPortfolio]);

  useEffect(() => {
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, [updateItemsPerPage]);

  useEffect(() => {
    updateCurrentItems();
  }, [itemOffset, itemsPerPage, updateCurrentItems, filteredPortfolio]);

  useEffect(() => {
    setItemOffset(0);
    setCurrentPage(0);
    setFlippedCards(new Set());
  }, [selectedTech, selectedStatus, itemsPerPage]);

  const handlePageClick = useCallback(
    (event: { selected: number }) => {
      if (filteredPortfolio.length === 0) {
        return;
      }
      const newOffset =
        (event.selected * itemsPerPage) % filteredPortfolio.length;
      setItemOffset(newOffset);
      setCurrentPage(event.selected);
    },
    [itemsPerPage, filteredPortfolio.length]
  );

  const toggleCardFlip = useCallback((cardId: number) => {
    setFlippedCards((prev) => {
      const newSet = new Set<number>();
      if (!prev.has(cardId)) {
        newSet.add(cardId);
      }
      return newSet;
    });
  }, []);

  const handleCardKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>, cardId: number) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleCardFlip(cardId);
      }
    },
    [toggleCardFlip]
  );

  const clearFilters = useCallback(() => {
    setSelectedTech("all");
    setSelectedStatus("all");
  }, []);

  const formatProjectDate = useCallback((date: string) => {
    const [year, month] = date.split("-");
    if (!year || !month) {
      return date;
    }
    return `${month}-${year}`;
  }, []);

  return (
    <Transition onAnimationComplete={() => setTransitionCompleted(true)}>
      {transitionCompleted && (
        <section className={styles.portfolio} data-tour="portfolio-section">
          <Suspense fallback={<div>{t("home.loading")}</div>}>
            <ParticlesB />
          </Suspense>
          <h2 className={styles.heading}>
            {t("projects.title")} <span>{t("projects.text")} <FaCodeCompare /></span>
          </h2>

          <section className={styles.featuredSection}>
            <div className={styles.featuredHeader}>
              <h3>{t("projects.featuredTitle")}</h3>
              <p>{t("projects.featuredSubtitle")}</p>
            </div>
            <div className={styles.featuredGrid}>
              {featuredProjects.map((item) => {
                const normalizedTechnologies = getNormalizedTechnologies(item.technologies);

                return (
                  <article className={styles.featuredCard} key={`featured-${item.id}`}>
                    <div className={styles.featuredTop}>
                      <h4 className={styles.featuredName}>{item.name}</h4>
                      <span className={styles.featuredDate}>{formatProjectDate(item.date)}</span>
                    </div>
                    <p className={styles.cardDescription}>{t(item.descriptionKey)}</p>
                    <div className={styles.featuredTech}>
                      {normalizedTechnologies.slice(0, 5).map((tech) => (
                        <span className={styles.tech_list} key={`${item.id}-${tech}`}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className={styles.featuredActions}>
                      {item.linkDeploy && (
                        <NavLink
                          to={item.linkDeploy}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.link}
                        >
                          {t("projects.viewDeploy")}
                        </NavLink>
                      )}
                      {item.linkRepository && (
                        <NavLink
                          to={item.linkRepository}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.link}
                        >
                          {t("projects.viewCode")}
                        </NavLink>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section className={styles.filtersBar}>
            <h3 className={styles.filtersTitle}>{t("projects.filterByStack")}</h3>
            <div className={styles.filtersControls}>
              <label className={styles.filterField}>
                {t("projects.filterByStack")}
                <select
                  className={styles.filterSelect}
                  value={selectedTech}
                  onChange={(event) => setSelectedTech(event.target.value)}
                >
                  <option value="all">{t("projects.allTechnologies")}</option>
                  {techOptions.map((tech) => (
                    <option value={tech} key={tech}>
                      {tech}
                    </option>
                  ))}
                </select>
              </label>

              <label className={styles.filterField}>
                {t("projects.filterByStatus")}
                <select
                  className={styles.filterSelect}
                  value={selectedStatus}
                  onChange={(event) => setSelectedStatus(event.target.value)}
                >
                  <option value="all">{t("projects.allStatuses")}</option>
                  <option value="online">{t("projects.statusOnline")}</option>
                  <option value="in-progress">{t("projects.statusInProgress")}</option>
                </select>
              </label>

              <button
                type="button"
                className={styles.clearFiltersBtn}
                onClick={clearFilters}
                disabled={selectedTech === "all" && selectedStatus === "all"}
              >
                {t("projects.clearFilters")}
              </button>
            </div>
          </section>

          <div className={styles.portfolio_grid} data-tour="portfolio-grid">
            {currentItems.length === 0 && (
              <div className={styles.emptyState}>{t("projects.noResults")}</div>
            )}
            {currentItems.map((item, index) => {
              const normalizedTechnologies = getNormalizedTechnologies(item.technologies);

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: "-100%" }}
                  animate={{ opacity: 1, y: "0%" }}
                  transition={{
                    duration: 1.5,
                    delay: 0.7 + index * 0.3,
                    ease: [0.2, 0, 0.2, 1],
                  }}
                  className={styles.cardWrapper}
                  data-tour={index === 0 ? "portfolio-card" : undefined}
                >
                  <div
                    className={`${styles.cardContainer} ${flippedCards.has(item.id) ? styles.flipped : ""}`}
                    onClick={() => toggleCardFlip(item.id)}
                    onKeyDown={(event) => handleCardKeyDown(event, item.id)}
                    tabIndex={0}
                    role="button"
                    aria-label={`${item.name} - ${t("projects.clickToFlip")}`}
                    aria-pressed={flippedCards.has(item.id)}
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
                        <div className={styles.cardMeta}>
                          <span>{formatProjectDate(item.date)}</span>
                          <span
                            className={`${styles.cardStatus} ${item.linkDeploy ? styles.statusOnline : styles.statusInProgress}`}
                          >
                            {item.linkDeploy ? t("projects.statusOnline") : t("projects.inDevelopment")}
                          </span>
                        </div>
                        <h3 className={styles.cardTitle}>{item.name}</h3>

                        <p className={styles.cardDescription}>
                          {t(item.descriptionKey)}
                        </p>

                        <div className={styles.tech_title}>
                          {t("projects.subtitle")}
                        </div>
                        <div className={styles.techList}>
                          {normalizedTechnologies.map((tech, index) => (
                            <span className={styles.tech_list} key={index}>
                              {tech}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                      <CardActions className={styles.cardActions}>
                        <Tooltip
                          title={
                            !item.linkDeploy ? t("projects.inDevelopment") : ""
                          }
                          placement="top"
                          arrow
                          componentsProps={{
                            tooltip: {
                              sx: {
                                fontSize: "1.1rem",
                                padding: "8px 12px",
                                backgroundColor: "var(--second_bg_color)",
                                color: "var(--main_color)",
                                fontWeight: 700,
                                borderRadius: "8px",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                              },
                            },
                            arrow: {
                              sx: {
                                color: "var(--second_bg_color)",
                              },
                            },
                          }}
                        >
                          <span>
                            <Button
                              className={`${styles.links} ${!item.linkDeploy ? styles.disabled : ""}`}
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
                                {t("projects.viewDeploy")}
                              </NavLink>
                            </Button>
                          </span>
                        </Tooltip>
                        <Tooltip
                          title={
                            !item.linkRepository
                              ? t("projects.inDevelopment")
                              : ""
                          }
                          placement="top"
                          arrow
                          componentsProps={{
                            tooltip: {
                              sx: {
                                fontSize: "1.1rem",
                                padding: "8px 12px",
                                backgroundColor: "var(--second_bg_color)",
                                color: "var(--main_color)",
                                fontWeight: 700,
                                borderRadius: "8px",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                              },
                            },
                            arrow: {
                              sx: {
                                color: "var(--second_bg_color)",
                              },
                            },
                          }}
                        >
                          <span>
                            <Button
                              className={`${styles.links} ${!item.linkRepository ? styles.disabled : ""}`}
                              disabled={!item.linkRepository}
                            >
                              <NavLink
                                to={item.linkRepository || "#"}
                                target={
                                  item.linkRepository ? "_blank" : "_self"
                                }
                                rel="noopener noreferrer"
                                className={styles.link}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (!item.linkRepository) e.preventDefault();
                                }}
                              >
                                {t("projects.viewCode")}
                              </NavLink>
                            </Button>
                          </span>
                        </Tooltip>
                      </CardActions>
                    </Card>
                  </div>
                </div>
              </motion.div>
              );
            })}
          </div>
          {pageCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: "80%" }}
              animate={{ opacity: 1, y: "0%" }}
              transition={{ duration: 2, delay: 0.3, ease: [0.3, 0, 0.2, 1] }}
              className={styles.pagination_container}
              data-tour="portfolio-pagination"
            >
              <p className={styles.pageInfo}>
                {t("projects.pageInfo", { current: currentPage + 1, total: pageCount })}
              </p>
              <ReactPaginate
                previousLabel={<FaChevronLeft />}
                nextLabel={<FaChevronRight />}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pageCount}
                pageRangeDisplayed={3}
                marginPagesDisplayed={0}
                onPageChange={handlePageClick}
                containerClassName={styles.pagination}
                activeClassName={styles.activePage}
                forcePage={currentPage}
              />
            </motion.div>
          )}
        </section>
      )}
    </Transition>
  );
};

export default Portfolio;
