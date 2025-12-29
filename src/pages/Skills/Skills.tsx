import React, { useState, useEffect, useMemo, Suspense } from "react";
import styles from "./Skills.module.css";
import { motion } from "framer-motion";
import Transition from "../../components/Transition/Transition";
import { mainIcons } from "../../data/iconsServer";
import { useTranslation } from "react-i18next";
import CircularChart from "../../components/Chart/CircularChart";
import { FaLightbulb } from "react-icons/fa6";

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

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPieCategory, setSelectedPieCategory] = useState<string | null>(
    null
  );
  const [isMobile, setIsMobile] = useState(false);

  // Lógica de busca avançada - busca por categoria e habilidades (apenas desktop)
  const filteredData = useMemo(() => {
    // No mobile, sempre retorna todos os ícones (busca desabilitada)
    if (isMobile || !searchTerm.trim()) {
      return mainIcons; 
    }

    const searchLower = searchTerm.toLowerCase();
    
    const categoryMatch = categoryOptions.find(cat => 
      cat.value !== 'all' && cat.value.toLowerCase() === searchLower
    );
    
    if (categoryMatch) {
      return mainIcons.filter(icon => 
        icon.category.toLowerCase() === categoryMatch.value.toLowerCase()
      );
    }
    
    return mainIcons.filter((icon) => {
      const nameMatch = icon.name.toLowerCase().includes(searchLower);
      const categoryMatch = icon.category.toLowerCase().includes(searchLower);
      return nameMatch || categoryMatch;
    });
  }, [mainIcons, searchTerm, isMobile]);

  const circularChartData = useMemo(() => {
    if (selectedPieCategory) {
      return filteredData
        .filter(icon => icon.category.toLowerCase() === selectedPieCategory.toLowerCase())
        .sort((a, b) => b.percentage - a.percentage)
        .slice(0, 15) 
        .map(skill => ({
          name: skill.name,
          value: skill.percentage,
          category: skill.category,
          level: skill.level,
        }));
    } else {
      if (!isMobile && searchTerm.trim()) {
        const searchLower = searchTerm.toLowerCase();
        
        const categoryMatch = categoryOptions.find(cat => 
          cat.value !== 'all' && cat.value.toLowerCase() === searchLower
        );
        
        if (categoryMatch) {
          const categorySkills = filteredData.filter(icon => 
            icon.category.toLowerCase() === categoryMatch.value.toLowerCase()
          );
          
          if (categorySkills.length > 0) {
            const averagePercentage = Math.round(
              categorySkills.reduce((sum, skill) => sum + skill.percentage, 0) / categorySkills.length
            );
            
            return [{
              name: categoryMatch.label,
              value: averagePercentage,
              skillCount: categorySkills.length,
              category: categoryMatch.value,
              skills: categorySkills.sort((a, b) => b.percentage - a.percentage)
            }];
          }
        } else {
          return filteredData
            .sort((a, b) => b.percentage - a.percentage)
            .map(skill => ({
              name: skill.name,
              value: skill.percentage,
              category: skill.category,
              level: skill.level,
            }));
        }
      } else {
        return categoryOptions
          .filter(cat => cat.value !== 'all')
          .map(category => {
            const categorySkills = filteredData.filter(icon => 
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
    }
    
    return [];
  }, [filteredData, selectedPieCategory, searchTerm, categoryOptions]);

  useEffect(() => {
    function handleResize() {
      const mobile = window.innerWidth < 769;
      setIsMobile(mobile);
      
      // Limpa a busca quando muda para mobile para evitar filtros ativos sem campo visível
      if (mobile && searchTerm.trim()) {
        setSearchTerm("");
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [searchTerm]);

  const handleChartClick = (params: any) => {
    if (params.data && params.data.category) {
      setSelectedPieCategory(params.data.category);
    }
  };

  return (
    <Transition onAnimationComplete={() => {}}>
      <Suspense fallback={<div>{t("home.loading")}</div>}>
        <ParticlesB />
      </Suspense>
      <section className={styles.skills} data-tour="skills-section">
        <h2 className={styles.heading}>
           {t("skills.title")}
          <span>{t("skills.text")} <FaLightbulb /></span>
        </h2>
        {/* <div className={styles.toggleButtons} data-tour="view-toggles">
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
        </div> */}
        <motion.div
            key="chart"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className={styles.chartContainer}
            data-tour="skills-chart"
          >
            <CircularChart
              data={circularChartData}
              title={selectedPieCategory 
                ? `${selectedPieCategory.charAt(0).toUpperCase() + selectedPieCategory.slice(1)}`
                : t("skills.dashboardTitle")
              }
              subtitle={selectedPieCategory 
                ? `${circularChartData.length} ${t("skills.text")}`
                : t("skills.dashboardSubtitle", { count: filteredData.length })
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
              showSearch={!selectedPieCategory && !isMobile}
              searchValue={searchTerm}
              onSearchChange={(value) => setSearchTerm(value)}
              searchPlaceholder={t("skills.search")}
              showChartTypeToggle={true}
            />
          </motion.div>
      </section>
    </Transition>
  );
};

export default Skills;
