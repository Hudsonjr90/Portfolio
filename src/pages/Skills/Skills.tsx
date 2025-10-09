import React, { useState, useEffect, useMemo, Suspense } from "react";
import styles from "./Skills.module.css";
import { motion, AnimatePresence } from "framer-motion";
import Transition from "../../components/Transition/Transition";
import { iconComponents, mainIcons } from "../../data/iconsServer";
import { useTranslation } from "react-i18next";
import ProgressBar from "../../components/Progressbar/ProgressBar";
import {
  FaSearch,
  FaChartBar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { IoCloudOutline } from "react-icons/io5";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import IconButton from "@mui/material/IconButton";
import { ThemeProvider } from "@mui/material/styles";
import ReactPaginate from "react-paginate";
import { simpleTheme, useTheme } from "../../context/ThemeContext";
import CircularChart from "../../components/Chart/CircularChart";
import { MdArrowDropDown } from "react-icons/md";

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

type ViewMode = "chart" | "grid" | "cloud";

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
  const [selectedPieCategory, setSelectedPieCategory] = useState<string | null>(
    null
  );
  const [viewMode, setViewMode] = useState<ViewMode>("chart");
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      const mobile = window.innerWidth < 769;
      setIsMobile(mobile);
      if (mobile) {
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

  const handleChartClick = (params: any) => {
    if (params.data && params.data.category) {
      setSelectedPieCategory(params.data.category);
    }
  };

  const circularChartData = useMemo(() => {
    if (selectedPieCategory) {
      return filteredIcons
        .filter(icon => icon.category.toLowerCase() === selectedPieCategory.toLowerCase())
        .sort((a, b) => b.percentage - a.percentage)
        .slice(0, 15) 
        .map(skill => ({
          name: skill.name,
          value: skill.percentage,
          category: skill.category,
        }));
    } else {
      return categoryOptions
        .filter(cat => cat.value !== 'all')
        .map(category => {
          const categorySkills = filteredIcons.filter(icon => 
            icon.category.toLowerCase() === category.value.toLowerCase()
          );
          const averagePercentage = categorySkills.length > 0 
            ? Math.round(categorySkills.reduce((sum, skill) => sum + skill.percentage, 0) / categorySkills.length)
            : 0;
          const skillCount = categorySkills.length;
          
          return {
            name: category.label,
            value: averagePercentage,
            skillCount: skillCount,
            category: category.value,
            skills: categorySkills.sort((a, b) => b.percentage - a.percentage)
          };
        })
        .filter(cat => cat.skillCount > 0)
        .sort((a, b) => b.value - a.value);
    }
  }, [filteredIcons, selectedPieCategory, categoryOptions]);

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
          <div className={styles.viewModeButtons}>
            <ThemeProvider theme={simpleTheme}>
              <Tooltip
                TransitionComponent={Zoom}
                title={t("skills.chart")}
                placement="top"
                arrow
              >
                <IconButton
                  onClick={() => setViewMode("chart")}
                  className={`${styles.viewButton} ${viewMode === "chart" ? styles.activeView : ""}`}
                  style={{
                    color:
                      viewMode === "chart" ? mainColor : "var(--text_color)",
                  }}
                >
                  <FaChartBar />
                </IconButton>
              </Tooltip>
            </ThemeProvider>

            <ThemeProvider theme={simpleTheme}>
              <Tooltip
                TransitionComponent={Zoom}
                title={t("skills.searchable")}
                placement="top"
                arrow
              >
                <IconButton
                  onClick={() => setViewMode("grid")}
                  className={`${styles.viewButton} ${viewMode === "grid" ? styles.activeView : ""}`}
                  style={{
                    color:
                      viewMode === "grid" ? mainColor : "var(--text_color)",
                  }}
                >
                  <FaSearch />
                </IconButton>
              </Tooltip>
            </ThemeProvider>

            <ThemeProvider theme={simpleTheme}>
              <Tooltip
                TransitionComponent={Zoom}
                title={t("skills.cloudWord")}
                placement="top"
                arrow
              >
                <IconButton
                  onClick={() => setViewMode("cloud")}
                  className={`${styles.viewButton} ${viewMode === "cloud" ? styles.activeView : ""}`}
                  style={{
                    color:
                      viewMode === "cloud" ? mainColor : "var(--text_color)",
                  }}
                >
                  <IoCloudOutline />
                </IconButton>
              </Tooltip>
            </ThemeProvider>
          </div>
        </div>
        {viewMode === "cloud" ? (
          <Suspense fallback={<div>Loading...</div>}>
            <Cloud />
          </Suspense>
        ) : (
          <>
            {visibleIcons.length === 0 && viewMode === "grid" ? (
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
              <AnimatePresence mode="wait">
                {viewMode === "grid" && (
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

                    <motion.div
                      key="grid"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5 }}
                      className={styles.icons_container}
                      variants={container}
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

                              <div className={styles.indicator}>
                                {icon.name}
                              </div>
                            </ProgressBar>
                          </motion.div>
                        );
                      })}
                    </motion.div>

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
                        previousLabel={<FaChevronLeft />}
                        nextLabel={<FaChevronRight />}
                        forcePage={currentPage}
                      />
                    </motion.div>
                  </>
                )}

                {viewMode === "chart" && (
                  <motion.div
                    key="chart"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    className={styles.chartContainer}
                  >
                    {/* Novo componente CircularChart com botão integrado */}
                    <CircularChart
                      data={circularChartData}
                      title={selectedPieCategory 
                        ? `${selectedPieCategory.charAt(0).toUpperCase() + selectedPieCategory.slice(1)}`
                        : t("skills.dashboardTitle")
                      }
                      subtitle={selectedPieCategory 
                        ? `${circularChartData.length} ${t("skills.text")}`
                        : t("skills.dashboardSubtitle", { count: filteredIcons.length })
                      }
                      height={isMobile ? 400 : 500}
                      onChartClick={handleChartClick}
                      showLegend={!selectedPieCategory}
                      roseType={!selectedPieCategory}
                      isMobile={isMobile}
                      showBackButton={!!selectedPieCategory}
                      onBackClick={() => {
                        setSelectedPieCategory(null);
                      }}
                    />
                    
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </>
        )}
      </section>
    </Transition>
  );
};

export default Skills;
