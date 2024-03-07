import styles from "./Skills.module.css";

import { motion } from "framer-motion";
import Transition from "../../components/Transition";
import { SetStateAction, useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useTranslation } from "react-i18next";
import ProgressBar from "react-customizable-progressbar";
import CountUp from "react-countup";

import { GrMysql } from "react-icons/gr";
import { LuSearch } from "react-icons/lu";
import { GiPineapple } from "react-icons/gi";
import {
  FaGitAlt,
  FaNpm,
  FaYarn,
  FaGithub,
  FaBootstrap,
  FaShopify,
  FaJira,
  FaDocker,
  FaVuejs,
  FaNode,
  FaJava,
  FaPhp,
  FaPython,
  FaMarkdown,
  FaGitlab,
  FaWordpress,
} from "react-icons/fa6";
import {
  SiTailwindcss,
  SiNextdotjs,
  SiFigma,
  SiDotnet,
  SiVercel,
  SiVite,
  SiMaterialdesign,
  SiPostgresql,
  SiVuetify,
  SiGraphql,
  SiWebpack,
  SiSwagger,
  SiLaravel,
  SiSpringboot,
  SiCsharp,
  SiElectron,
  SiJenkins,
  SiJquery,
  SiLess,
  SiSass,
  SiAdobephotoshop,
  SiGoogleanalytics,
  SiGoogleads,
  SiTerraform,
  SiAnsible,
  SiKubernetes,
  SiExpress,
  SiJest,
  SiJasmine,
  SiPostman,
} from "react-icons/si";
import {
  BiLogoTypescript,
  BiLogoReact,
  BiLogoAngular,
  BiLogoJavascript,
  BiLogoCss3,
  BiLogoHtml5,
  BiLogoFirebase,
  BiLogoRedux,
  BiLogoMongodb,
  BiLogoNetlify,
  BiLogoHeroku,
  BiBoltCircle,
} from "react-icons/bi";

const Skills = () => {
  const { t } = useTranslation();

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

  const item = {
    hidden: { x: 80, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
    },
  };

  const iconComponents: { [index: string]: React.ElementType } = {
    HTML: BiLogoHtml5,
    CSS: BiLogoCss3,
    JavaScript: BiLogoJavascript,
    React: BiLogoReact,
    Node: FaNode,
    Express: SiExpress,
    PostgreSQL: SiPostgresql,
    MySQL: GrMysql,
    Git: FaGitAlt,
    Typescript: BiLogoTypescript,
    Angular: BiLogoAngular,
    Firebase: BiLogoFirebase,
    Redux: BiLogoRedux,
    Vue: FaVuejs,
    Npm: FaNpm,
    Yarn: FaYarn,
    Sass: SiSass,
    Less: SiLess,
    Github: FaGithub,
    Bootstrap: FaBootstrap,
    Wordpress: FaWordpress,
    Shopify: FaShopify,
    Jira: FaJira,
    Docker: FaDocker,
    Java: FaJava,
    PHP: FaPhp,
    Python: FaPython,
    Markdown: FaMarkdown,
    Gitlab: FaGitlab,
    Pinia: GiPineapple,
    Vuetify: SiVuetify,
    Figma: SiFigma,
    Tailwind: SiTailwindcss,
    Material: SiMaterialdesign,
    GraphQL: SiGraphql,
    Webpack: SiWebpack,
    Swagger: SiSwagger,
    Laravel: SiLaravel,
    Springboot: SiSpringboot,
    Csharp: SiCsharp,
    Electron: SiElectron,
    Jenkins: SiJenkins,
    Jquery: SiJquery,
    Photoshop: SiAdobephotoshop,
    Analytics: SiGoogleanalytics,
    ADS: SiGoogleads,
    Terraform: SiTerraform,
    Ansible: SiAnsible,
    Kubernetes: SiKubernetes,
    Jest: SiJest,
    Jasmine: SiJasmine,
    MongoDB: BiLogoMongodb,
    Dotnet: SiDotnet,
    Netlify: BiLogoNetlify,
    Heroku: BiLogoHeroku,
    Vercel: SiVercel,
    Nextjs: SiNextdotjs,
    Vite: SiVite,
    Postman: SiPostman,
    Thunderclient: BiBoltCircle,
  };

  const icons = [
    { id: 0, name: "HTML", category: "Frontend", percentage: 100 },
    { id: 1, name: "CSS", category: "Frontend", percentage: 100 },
    { id: 2, name: "JavaScript", category: "Frontend", percentage: 80 },
    { id: 3, name: "Angular", category: "Frontend", percentage: 80 },
    { id: 4, name: "React", category: "Frontend", percentage: 80 },
    { id: 5, name: "Vue", category: "Frontend", percentage: 80 },
    { id: 6, name: "Npm", category: "Tools", percentage: 80 },
    { id: 7, name: "Yarn", category: "Tools", percentage: 80 },
    { id: 8, name: "Node", category: "Backend", percentage: 70 },
    { id: 9, name: "Git", category: "Tools", percentage: 80 },
    { id: 10, name: "Github", category: "Tools", percentage: 80 },
    { id: 11, name: "Bootstrap", category: "Frontend", percentage: 80 },
    { id: 12, name: "Wordpress", category: "Tools", percentage: 80 },
    { id: 13, name: "Shopify", category: "Tools", percentage: 80 },
    { id: 14, name: "Typescript", category: "Frontend", percentage: 80 },
    { id: 15, name: "Sass", category: "Frontend", percentage: 80 },
    { id: 16, name: "Less", category: "Frontend", percentage: 80 },
    { id: 17, name: "Express", category: "Backend", percentage: 30 },
    { id: 18, name: "Redux", category: "Frontend", percentage: 60 },
    { id: 19, name: "PostgreSQL", category: "Database", percentage: 30 },
    { id: 20, name: "Firebase", category: "Tools", percentage: 30 },
    { id: 21, name: "MySQL", category: "Database", percentage: 30 },
    { id: 22, name: "Jira", category: "Tools", percentage: 70 },
    { id: 23, name: "PHP", category: "Backend", percentage: 30 },
    { id: 24, name: "Python", category: "Backend", percentage: 10 },
    { id: 25, name: "Markdown", category: "Tools", percentage: 30 },
    { id: 26, name: "Java", category: "Backend", percentage: 10 },
    { id: 27, name: "Gitlab", category: "Tools", percentage: 50 },
    { id: 28, name: "Figma", category: "Tools", percentage: 70 },
    { id: 29, name: "Pinia", category: "Frontend", percentage: 40 },
    { id: 30, name: "Vuetify", category: "Frontend", percentage: 50 },
    { id: 31, name: "Tailwind", category: "Frontend", percentage: 30 },
    { id: 32, name: "Material", category: "Frontend", percentage: 30 },
    { id: 33, name: "GraphQL", category: "Frontend", percentage: 10 },
    { id: 34, name: "Webpack", category: "Frontend", percentage: 10 },
    { id: 35, name: "Swagger", category: "Backend", percentage: 10 },
    { id: 36, name: "Laravel", category: "Backend", percentage: 30 },
    { id: 37, name: "Springboot", category: "Backend", percentage: 10 },
    { id: 38, name: "Csharp", category: "Backend", percentage: 10 },
    { id: 39, name: "Electron", category: "Tools", percentage: 40 },
    { id: 40, name: "Jenkins", category: "Tools", percentage: 10 },
    { id: 41, name: "Jquery", category: "Frontend", percentage: 70 },
    { id: 42, name: "Photoshop", category: "Tools", percentage: 80 },
    { id: 43, name: "Analytics", category: "Tools", percentage: 60 },
    { id: 44, name: "ADS", category: "Frontend", percentage: 60 },
    { id: 45, name: "Terraform", category: "Tools", percentage: 10 },
    { id: 46, name: "Ansible", category: "Tools", percentage: 10 },
    { id: 47, name: "Kubernetes", category: "Tools", percentage: 10 },
    { id: 48, name: "Jest", category: "Tools", percentage: 30 },
    { id: 49, name: "Jasmine", category: "Tools", percentage: 30 },
    { id: 50, name: "MongoDB", category: "Database", percentage: 10 },
    { id: 51, name: "Dotnet", category: "Backend", percentage: 30 },
    { id: 52, name: "Netlify", category: "Tools", percentage: 60 },
    { id: 53, name: "Heroku", category: "Tools", percentage: 60 },
    { id: 54, name: "Vercel", category: "Tools", percentage: 60 },
    { id: 55, name: "Nextjs", category: "Frontend", percentage: 10 },
    { id: 56, name: "Vite", category: "Tools", percentage: 60 },
    { id: 57, name: "Postman", category: "Tools", percentage: 20 },
    { id: 58, name: "Thunderclient", category: "Tools", percentage: 20 },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(0);

  // Função para lidar com a alteração da categoria selecionada
  const handleCategoryChange = (category: SetStateAction<string>) => {
    setSelectedCategory(category);
    setCurrentPage(0);
  };

  // Função para lidar com a alteração do termo de busca
  const handleSearchTermChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    setCurrentPage(0);
  }, [selectedCategory]);

  const filteredIcons = icons.filter((icon) => {
    const categoryMatch =
      selectedCategory === "all" ||
      icon.category.toLowerCase() === selectedCategory.toLowerCase();
    const searchTermMatch = icon.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return categoryMatch && searchTermMatch;
  });

  const [itemsPerPage, setItemsPerPage] = useState(14);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
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

  const startIndex = currentPage * itemsPerPage;
  const visibleIcons = filteredIcons.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <Transition onAnimationComplete={() => {}}>
      <section className={styles.skills}>
        <h2 className={styles.heading}>
          <span>//</span> {t("skills.title")}
          <span>{t("skills.text")}</span>
        </h2>

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
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <option value="all">{t("skills.select1")}</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="database">{t("skills.select2")}</option>
            <option value="tools">{t("skills.select3")}</option>
          </select>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchTermChange}
            placeholder={t("skills.search")}
          />
          <motion.div className={styles.icon_search}>
            <LuSearch />
          </motion.div>
        </motion.div>

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
                variants={item}
                className={styles.box_icon}
              >
                <span className={styles.icon_description}>{icon.name}</span>
                <ProgressBar
                  radius={65}
                  strokeWidth={4}
                  strokeColor="var(--main_color)"
                  trackStrokeWidth={9}
                  trackStrokeColor="var(--second_bg_color)"
                  pointerRadius={9}
                  pointerStrokeWidth={8}
                  pointerStrokeColor="var(--main_color)"
                  progress={icon.percentage}
                  initialAnimation={true}
                  transition="2.5s ease 0.5s"
                  trackTransition="0s ease"
                >
                  <div className={styles.icon_wrapper}>
                    {IconComponent && <IconComponent className={styles.icon} />}
                  </div>
                  <div className={styles.indicator}>
                    <CountUp
                      start={0}
                      end={icon.percentage}
                      duration={5}
                      useEasing={true}
                      suffix={"%"}
                    />
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
            onPageChange={handlePageClick}
            containerClassName={styles.pagination}
            activeClassName={styles.activePage}
            previousLabel={"<<"}
            nextLabel={">>"}
            forcePage={currentPage}
          />
        </motion.div>
      </section>
    </Transition>
  );
};
export default Skills;
