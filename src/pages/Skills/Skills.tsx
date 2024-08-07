import React, { useState, useEffect, useMemo, Suspense } from "react";
import styles from "./Skills.module.css";
import { motion } from "framer-motion";
import Transition from "../../components/Transition/Transition";
import { iconComponents, mainIcons } from "../../data/iconsServer";
import { useTranslation } from "react-i18next";
import ProgressBar from "../../components/Progressbar/ProgressBar";
import CountUp from "react-countup";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { ThemeProvider } from "@mui/material/styles";
import ReactPaginate from "react-paginate";
import { cloudTheme, searchTheme, useTheme } from "../../context/ThemeContext";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

const WordCloud = React.lazy(
  () => import("../../components/WordCloud/WordCloud")
);
const ParticlesB = React.lazy(
  () => import("../../components/Particles/ParticlesB")
);

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

  const toggleCloud = () => {
    setShowCloud(!showCloud);
  };

  useEffect(() => {
    if (filteredIcons.length > 0 && searchTerm === "") {
      const interval = setInterval(() => {
        setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
      }, 7000);

      return () => clearInterval(interval);
    }
  }, [filteredIcons.length, totalPages, searchTerm]);

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
        <motion.span
          initial={{ opacity: 0, y: "-100%" }}
          animate={{ opacity: 1, y: "0%" }}
          transition={{
            duration: 2.5,
            delay: 0.3,
            ease: [0.3, 0, 0.2, 1],
          }}
          className={styles.toggle}
          onClick={toggleCloud}
        >
          {showCloud ? (
            <ThemeProvider theme={searchTheme}>
              <Tooltip
                TransitionComponent={Zoom}
                title={t("skills.searchable")}
                placement="top"
                arrow
              >
                <IconButton className={styles.show_search}>
                  <SearchIcon />
                </IconButton>
              </Tooltip>
            </ThemeProvider>
          ) : (
            <ThemeProvider theme={cloudTheme}>
              <Tooltip
                TransitionComponent={Zoom}
                title={t("skills.cloudWord")}
                placement="top"
                arrow
              >
                <IconButton className={styles.show_cloud}>
                  <ThunderstormIcon />
                </IconButton>
              </Tooltip>
            </ThemeProvider>
          )}
        </motion.span>

        {showCloud ? (
          <Suspense fallback={<div>Loading...</div>}>
            <WordCloud />
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
              <Select
                value={selectedCategory}
                onChange={handleCategoryChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                sx={{
                  "& .MuiSelect-select": {
                    color: mainColor,
                    fontSize: "12px",
                  },
                  "& .MuiSvgIcon-root": {
                    color: mainColor,
                    fontSize: "20px",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: mainColor,
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: mainColor,
                  },
                  "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: mainColor,
                  },
                }}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="frontend">Frontend</MenuItem>
                <MenuItem value="backend">Backend</MenuItem>
                <MenuItem value="database">Database</MenuItem>
                <MenuItem value="tools">Tools</MenuItem>
                <MenuItem value="deploy">Deploy</MenuItem>
                <MenuItem value="design">Design</MenuItem>
              </Select>
              <TextField
                value={searchTerm}
                onChange={handleSearchTermChange}
                label={t("skills.search")}
                variant="outlined"
                sx={{
                  "& .MuiInputBase-input": {
                    color: mainColor, 
                  },
                  "& .MuiSvgIcon-root": {
                    color: mainColor,
                    fontSize: "20px", 
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: mainColor, 
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: mainColor,
                  },
                  "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: mainColor,
                  },
                  "& .MuiInputLabel-root": {
                    color: mainColor,
                    fontSize: "12px",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: mainColor,
                  },
                }}
                InputProps={{
                  endAdornment: <SearchIcon />,
                }}
              />
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
                      <span className={styles.icon_description}>
                        {icon.name}
                      </span>
                      <ProgressBar
                        radius={65}
                        strokeWidth={4}
                        strokeColor={mainColor}
                        trackStrokeWidth={9}
                        trackStrokeColor="var(--second_bg_color)"
                        pointerRadius={9}
                        pointerStrokeWidth={8}
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
                          <CountUp
                            start={0}
                            end={icon.percentage}
                            duration={2.5}
                            suffix={"%"}
                          />
                        </div>
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
      </section>
    </Transition>
  );
};

export default Skills;
