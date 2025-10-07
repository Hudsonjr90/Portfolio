import React, { useState, useEffect, useMemo, Suspense } from "react";
import styles from "./Skills.module.css";
import { motion, AnimatePresence } from "framer-motion";
import Transition from "../../components/Transition/Transition";
import { iconComponents, mainIcons } from "../../data/iconsServer";
import { useTranslation } from "react-i18next";
import ProgressBar from "../../components/Progressbar/ProgressBar";
import { FaSearch, FaChartBar, FaArrowLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoCloudOutline } from "react-icons/io5";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import IconButton from "@mui/material/IconButton";
import { ThemeProvider } from "@mui/material/styles";
import ReactPaginate from "react-paginate";
import { simpleTheme, useTheme } from "../../context/ThemeContext";
import ReactECharts from 'echarts-for-react';
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

type ViewMode = 'chart' | 'grid' | 'cloud';

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
  const [selectedPieCategory, setSelectedPieCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('chart');
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

  const chartOption = useMemo(() => {
    const categoryDistribution = categoryOptions
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


    const categorySkills = selectedPieCategory 
      ? filteredIcons
          .filter(icon => icon.category.toLowerCase() === selectedPieCategory.toLowerCase())
          .sort((a, b) => b.percentage - a.percentage)
      : [];

    const maxVisibleSkills = isMobile ? 10 : 15; 
    const skillHeight = isMobile ? 35 : 40; 
    const baseHeight = isMobile ? 250 : 300;
    const calculatedHeight = selectedPieCategory 
      ? Math.max(baseHeight, Math.min(categorySkills.length * skillHeight, maxVisibleSkills * skillHeight))
      : isMobile ? 400 : 500;

    const categoryColors: { [key: string]: string } = {
      frontend: '#021f27ff',
      backend: '#5a0707ff',
      database: '#054e30ff',
      tools: '#1c4f9bff',
      deploy: '#09475fff',
      design: '#9e9517ff'
    };

    return {
      backgroundColor: 'transparent',
      title: {
        text: selectedPieCategory 
          ? `${selectedPieCategory.charAt(0).toUpperCase() + selectedPieCategory.slice(1)}`
          : t("skills.dashboardTitle"),
        subtext: selectedPieCategory 
          ? `${categorySkills.length} ${t("skills.text")}`
          : t("skills.dashboardSubtitle", { count: filteredIcons.length }),
        left: 'center',
        top: '0%',
        textStyle: {
          color: mainColor,
          fontSize: isMobile ? 18 : 24,
          fontWeight: 'bold'
        },
        subtextStyle: {
          color: mainColor,
          fontSize: isMobile ? 12 : 14,
          opacity: 0.8
        }
      },
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(0,0,0,0.9)',
        borderColor: mainColor,
        borderWidth: 2,
        textStyle: {
          color: '#fff',
          fontSize: isMobile ? 12 : 14
        },
        formatter: function(params: any) {
          if (selectedPieCategory) {
            return `<strong>${params.name}</strong><br/>
                    ${t("skills.proficiencyLevel")}: <span style="color:${mainColor}">${params.value}%</span>`;
          } else {
            const data = params.data;
            return `<strong>${data.name}</strong><br/>
                    ${t("skills.averageLevel")}: <span style="color:${mainColor}">${data.value}%</span><br/>
                    ${t("skills.totalSkills")}: ${data.skillCount}<br/>
                    <em>${t("skills.clickToViewDetails")}</em>`;
          }
        }
      },
      dataZoom: selectedPieCategory && categorySkills.length > maxVisibleSkills ? [
        {
          type: 'slider',
          yAxisIndex: 0,
          width: isMobile ? 15 : 20,
          right: isMobile ? 5 : 10,
          start: 0,
          end: (maxVisibleSkills / categorySkills.length) * 100,
          handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
          handleSize: isMobile ? '60%' : '80%',
          handleStyle: {
            color: mainColor,
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
          }
        }
      ] : undefined,
      calculatedHeight,
      series: selectedPieCategory ? [
        {
          name: t("skills.rankingView"),
          type: 'bar',
          data: categorySkills.map(skill => ({
            value: skill.percentage,
            name: skill.name,
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [{
                  offset: 0,
                  color: categoryColors[selectedPieCategory] || mainColor
                }, {
                  offset: 1,
                  color: mainColor
                }]
              },
              borderRadius: [0, 6, 6, 0],
              shadowBlur: 8,
              shadowColor: 'rgba(0,0,0,0.3)'
            }
          })),
          label: {
            show: true,
            position: 'right',
            color: mainColor,
            fontSize: isMobile ? 10 : 12,
            fontWeight: 'bold',
            formatter: '{c}%'
          }
        }
      ] : [
        {
          name: t("skills.category"),
          type: 'pie',
          radius: isMobile ? ['25%', '65%'] : ['30%', '70%'],
          center: ['50%', '60%'],
          data: categoryDistribution.map(category => ({
            value: category.value,
            name: category.name,
            skillCount: category.skillCount,
            category: category.category,
            itemStyle: {
              color: categoryColors[category.category] || mainColor,
              borderColor: '#fff',
              borderWidth: 2,
              shadowBlur: 10,
              shadowColor: 'rgba(0,0,0,0.3)'
            }
          })),
          label: {
            show: true,
            position: isMobile ? 'inside' : 'outside',
            color: mainColor,
            fontSize: isMobile ? 10 : 12,
            fontWeight: 'bold',
            formatter: function(params: any) {
              if (isMobile) {
                return `${params.data.name}\n${params.data.value}%`;
              } else {
                return `${params.data.name}\n${params.data.value}%\n(${params.data.skillCount} ${t("skills.skillsLabel")})`;
              }
            }
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 20,
              shadowOffsetX: 0,
              shadowColor: mainColor,
              scale: true,
              scaleSize: isMobile ? 1.05 : 1.1
            }
          }
        }
      ],
      xAxis: selectedPieCategory ? {
        type: 'value',
        max: 100,
        axisLabel: {
          color: mainColor,
          fontSize: isMobile ? 10 : 12,
          formatter: '{value}%'
        },
        axisLine: {
          lineStyle: {
            color: mainColor
          }
        }
      } : undefined,
      yAxis: selectedPieCategory ? {
        type: 'category',
        data: categorySkills.map(skill => skill.name),
        axisLabel: {
          color: mainColor,
          fontSize: isMobile ? 9 : 11
        },
        axisLine: {
          lineStyle: {
            color: mainColor
          }
        }
      } : undefined,
      animationEasing: 'elasticOut'
    };
  }, [filteredIcons, mainColor, selectedPieCategory, t]);

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
                  style={{ color: viewMode === "chart" ? mainColor : "var(--text_color)" }}
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
                  style={{ color: viewMode === "grid" ? mainColor : "var(--text_color)" }}
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
                  style={{ color: viewMode === "cloud" ? mainColor : "var(--text_color)" }}
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

                              <div className={styles.indicator}>{icon.name}</div>
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
                    <div className={styles.chartHeader}>
                      {selectedPieCategory && (
                        <IconButton
                          onClick={() => setSelectedPieCategory(null)}
                          className={styles.backButton}
                          style={{ color: mainColor }}
                        >
                          <FaArrowLeft />
                        </IconButton>
                      )}
                    </div>
                    <ReactECharts
                      option={chartOption}
                      style={{ 
                        height: `${chartOption.calculatedHeight}px`, 
                        width: '100%',
                        overflow: selectedPieCategory && filteredIcons.filter(icon => 
                          icon.category.toLowerCase() === selectedPieCategory.toLowerCase()
                        ).length > (isMobile ? 10 : 15) ? 'hidden' : 'visible'
                      }}
                      onEvents={{
                        'click': handleChartClick
                      }}
                      opts={{ 
                        renderer: 'canvas',
                        devicePixelRatio: isMobile ? 1 : 2 
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
