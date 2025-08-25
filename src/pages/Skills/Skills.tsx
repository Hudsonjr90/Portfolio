import React, { useState, useEffect, useMemo, Suspense } from "react";
import styles from "./Skills.module.css";
import { motion } from "framer-motion";
import Transition from "../../components/Transition/Transition";
import { iconComponents, mainIcons } from "../../data/iconsServer";
import { useTranslation } from "react-i18next";
import ProgressBar from "../../components/Progressbar/ProgressBar";
import { FaSearch } from "react-icons/fa";
import { GiCloudDownload } from "react-icons/gi";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import IconButton from "@mui/material/IconButton";
import { MdArrowDropDown } from "react-icons/md";
import { ThemeProvider } from "@mui/material/styles";
import ReactPaginate from "react-paginate";
import { simpleTheme, useTheme } from "../../context/ThemeContext";
import ChatBot from "../../components/Chat/ChatBot";

const Cloud = React.lazy(() => import("../../components/WordCloud/Cloud"));
const ParticlesB = React.lazy(
  () => import("../../components/Particles/ParticlesB")
);

const categoryOptions = [
  { value: "all", label: "All" },
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "database", label: "Database" },
  { value: "tools", label: "Tools" },
  { value: "deploy", label: "Deploy" },
  { value: "design", label: "Design" },
];

const Skills = () => {
  const { t } = useTranslation();
  const { mainColor } = useTheme();

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(0);
  const [showCloud, setShowCloud] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const handleCategoryChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(0);
  };

  const handleSearchTermChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchTerm(event.target.value);
    setCurrentPage(0);
  };

  useEffect(() => {
    setCurrentPage(0);
  }, [selectedCategory]);

  const filteredIcons = useMemo(() => {
    return mainIcons.filter((icon) => {
      const categoryMatch =
        selectedCategory === "all" ||
        icon.category.toLowerCase() === selectedCategory.toLowerCase();
      const searchTermMatch = icon.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return categoryMatch && searchTermMatch;
    });
  }, [mainIcons, selectedCategory, searchTerm]);

  useEffect(() => {
    setNoResults(filteredIcons.length === 0);
  }, [filteredIcons]);

  const [itemsPerPage, setItemsPerPage] = useState(14);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 769) {
        setItemsPerPage(4);
      } else {
        setItemsPerPage(14);
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(filteredIcons.length / itemsPerPage);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const visibleIcons = useMemo(() => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredIcons.slice(startIndex, endIndex);
  }, [currentPage, itemsPerPage, filteredIcons]);

  const handleCloudClick = () => {
    setShowCloud(true);
  };

  const handleDefaultClick = () => {
    setShowCloud(false);
  };

  return (
    <Transition onAnimationComplete={() => {}}>
      <Suspense fallback={<div>Loading...</div>}>
        <ParticlesB />
      </Suspense>
      <section className={styles.skills}>
        <h2 className={styles.heading}>
          <span>//</span> {t("skills.title")}
          <span>{t("skills.text")}</span>
        </h2>
        <div className={styles.toggleButtons}>
          {showCloud ? (
            <ThemeProvider theme={simpleTheme}>
              <Tooltip
                TransitionComponent={Zoom}
                title={t("skills.searchable")}
                placement="top"
                arrow
              >
                <IconButton
                  className={styles.show_search}
                  onClick={handleDefaultClick}
                >
                  <FaSearch />
                </IconButton>
              </Tooltip>
            </ThemeProvider>
          ) : (
            <ThemeProvider theme={simpleTheme}>
              <Tooltip
                TransitionComponent={Zoom}
                title={t("skills.cloudWord")}
                placement="top"
                arrow
              >
                <IconButton
                  className={styles.show_cloud}
                  onClick={handleCloudClick}
                >
                  <GiCloudDownload />
                </IconButton>
              </Tooltip>
            </ThemeProvider>
          )}
        </div>
        {showCloud ? (
          <Suspense fallback={<div>Loading...</div>}>
            <Cloud />
          </Suspense>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, x: "-100%" }}
              animate={{ opacity: 1, x: "0%" }}
              transition={{
                duration: 2.5,
                delay: 0.3,
                ease: [0.3, 0, 0.2, 1],
              }}
              className={styles.filters}
            >
              <div className={styles.selectContainer}>
                <select
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  className={styles.customSelect}
                >
                  {categoryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <MdArrowDropDown className={styles.selectIcon} />
              </div>
              {/* <motion.div
                initial={{ opacity: 0, y: "-100%" }}
                animate={{ opacity: 1, y: "0%" }}
                transition={{
                  duration: 2.5,
                  delay: 0.3,
                  ease: [0.3, 0, 0.2, 1],
                }}
                className={styles.toggleButtons}
              >
                {showCloud ? (
                  <ThemeProvider theme={simpleTheme}>
                    <Tooltip
                      TransitionComponent={Zoom}
                      title={t("skills.searchable")}
                      placement="top"
                      arrow
                    >
                      <IconButton
                        className={styles.show_search}
                        onClick={handleDefaultClick}
                      >
                        <FaSearch />
                      </IconButton>
                    </Tooltip>
                  </ThemeProvider>
                ) : (
                  <ThemeProvider theme={simpleTheme}>
                    <Tooltip
                      TransitionComponent={Zoom}
                      title={t("skills.cloudWord")}
                      placement="top"
                      arrow
                    >
                      <IconButton
                        className={styles.show_cloud}
                        onClick={handleCloudClick}
                      >
                        <GiCloudDownload />
                      </IconButton>
                    </Tooltip>
                  </ThemeProvider>
                )}
              </motion.div> */}
              <div className={styles.searchContainer}>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchTermChange}
                  placeholder=" "
                  className={styles.customTextField}
                />
                <label className={styles.customTextFieldLabel}>
                  {t("skills.search")}
                </label>
                <FaSearch className={styles.searchIcon} />
              </div>
            </motion.div>
            {visibleIcons.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, x: "-100%" }}
                animate={{ opacity: 1, x: "0%" }}
                transition={{
                  duration: 2.5,
                  delay: 0.3,
                  ease: [0.3, 0, 0.2, 1],
                }}
                className={styles.no_results}
              >
                {noResults && <p>{t("skills.noResults")}</p>}
              </motion.div>
            ) : (
              <motion.div
                className={styles.icons_container}
                variants={container}
                initial="hidden"
                animate="visible"
              >
                {visibleIcons.map((icon) => {
                  const IconComponent = iconComponents[icon.name];
                  return (
                    <motion.div
                      key={icon.id}
                      variants={container}
                      className={styles.box_icon}
                    >
                      <div className={styles.icon_description}>
                        {t(`${icon.level}`)}
                      </div>
                      <ProgressBar
                        radius={70}
                        strokeWidth={4}
                        strokeColor={mainColor}
                        trackStrokeWidth={9}
                        trackStrokeColor="var(--second_bg_color)"
                        pointerRadius={6}
                        pointerStrokeWidth={5}
                        pointerStrokeColor={mainColor}
                        progress={icon.percentage}
                        initialAnimation={true}
                        transition="2.5s ease 0.5s"
                        trackTransition="0s ease"
                      >
                        <div className={styles.icon_wrapper}>
                          {IconComponent && (
                            <IconComponent className={styles.icon} />
                          )}
                        </div>

                        <div className={styles.indicator}>{icon.name}</div>
                      </ProgressBar>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
            <motion.div
              initial={{ opacity: 0, x: "-100%" }}
              animate={{ opacity: 1, x: "0%" }}
              transition={{
                duration: 2.5,
                delay: 0.3,
                ease: [0.3, 0, 0.2, 1],
              }}
            >
              <ReactPaginate
                pageCount={totalPages}
                pageRangeDisplayed={5}
                marginPagesDisplayed={0}
                onPageChange={({ selected: selectedPage }) => {
                  handlePageClick({ selected: selectedPage });
                }}
                containerClassName={styles.pagination}
                activeClassName={styles.activePage}
                previousLabel={"<<"}
                nextLabel={">>"}
                forcePage={currentPage}
              />
            </motion.div>
          </>
        )}
        <ChatBot />
      </section>
    </Transition>
  );
};

export default Skills;
