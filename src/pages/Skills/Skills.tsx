import styles from "./Skills.module.css";

import { motion } from "framer-motion";
import Transition from "../../components/Transition";
import { SetStateAction, useState, useEffect } from "react";
import ReactPaginate from 'react-paginate';
import { useTranslation } from "react-i18next";

import { GrMysql } from "react-icons/gr";
import { LuSearch } from "react-icons/lu";
import { GiPineapple } from "react-icons/gi";
import { FaGitAlt, FaNpm, FaYarn, FaGithub, FaBootstrap, FaShopify, FaJira, FaDocker, FaVuejs, FaNode, FaJava, FaPhp, FaPython, FaMarkdown, FaGitlab, FaWordpress } from "react-icons/fa6";
import { SiTailwindcss, SiNextdotjs,SiFigma, SiDotnet, SiVercel, SiVite, SiMaterialdesign, SiPostgresql, SiVuetify, SiGraphql, SiWebpack, SiSwagger, SiLaravel, SiSpringboot, SiCsharp, SiElectron, SiJenkins, SiJquery, SiLess, SiSass, SiAdobephotoshop, SiGoogleanalytics, SiGoogleads, SiTerraform, SiAnsible, SiKubernetes, SiExpress, SiJest, SiJasmine,
} from "react-icons/si";
import { BiLogoTypescript, BiLogoReact,BiLogoAngular, BiLogoJavascript, BiLogoCss3, BiLogoHtml5, BiLogoFirebase, BiLogoRedux, BiLogoMongodb, BiLogoNetlify, BiLogoHeroku } from "react-icons/bi";



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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  
  const iconComponents: { [index: string]: React.ElementType } = {
    HTML: BiLogoHtml5,CSS: BiLogoCss3,JavaScript: BiLogoJavascript,React: BiLogoReact,Node: FaNode,Express: SiExpress,PostgreSQL: SiPostgresql,MySQL: GrMysql,Git: FaGitAlt,
    Typescript: BiLogoTypescript,Angular: BiLogoAngular,Firebase: BiLogoFirebase,Redux: BiLogoRedux,Vue: FaVuejs,Npm: FaNpm,Yarn: FaYarn,Sass: SiSass,Less: SiLess,Github: FaGithub,
    Bootstrap: FaBootstrap,Wordpress: FaWordpress,Shopify: FaShopify,Jira: FaJira,Docker: FaDocker,Java: FaJava,PHP: FaPhp,Python: FaPython,Markdown: FaMarkdown,Gitlab: FaGitlab,Pinia: 
    GiPineapple,Vuetify: SiVuetify,Figma: SiFigma,Tailwind: SiTailwindcss,Material: SiMaterialdesign,GraphQL: SiGraphql,Webpack: SiWebpack,Swagger: SiSwagger,Laravel: SiLaravel,
    Springboot: SiSpringboot,Csharp: SiCsharp,Electron: SiElectron, Jenkins: SiJenkins,Jquery: SiJquery,Photoshop: SiAdobephotoshop,Analytics: SiGoogleanalytics,ADS: SiGoogleads,
    Terraform: SiTerraform, Ansible: SiAnsible, Kubernetes: SiKubernetes, Jest: SiJest, Jasmine: SiJasmine, MongoDB:BiLogoMongodb, Dotnet: SiDotnet, Netlify: BiLogoNetlify, Heroku: BiLogoHeroku,
    Vercel: SiVercel, Nextjs: SiNextdotjs, Vite: SiVite
  };
  
  const icons = [
    { id: 0, name: "HTML", category: "Frontend" }, { id: 1, name: "CSS", category: "Frontend" },{ id: 2, name: "JavaScript", category: "Frontend" },
    { id: 3, name: "Angular", category: "Frontend" },{ id: 4, name: "React", category: "Frontend" },{ id: 5, name: "Vue", category: "Frontend" },
    { id: 6, name: "Npm", category: "Tools" },{ id: 7, name: "Yarn", category: "Tools" },{ id: 8, name: "Node", category: "Backend" },
    { id: 9, name: "Git", category: "Tools" },{ id: 10, name: "Github", category: "Tools" },{ id: 11, name: "Bootstrap", category: "Frontend" },
    { id: 12, name: "Wordpress", category: "Tools" },{ id: 13, name: "Shopify", category: "Tools" },{ id: 14, name: "Typescript", category: "Frontend" }, 
    { id: 15, name: "Sass", category: "Frontend" },{ id: 16, name: "Less", category: "Frontend" },{ id: 17, name: "Express", category: "Backend" },
    { id: 18, name: "Redux", category: "Frontend" },{ id: 19, name: "PostgreSQL", category: "Database" },{ id: 20, name: "Firebase", category: "Tools" },
    { id: 21, name: "MySQL", category: "Database" },{ id: 22, name: "Jira", category: "Tools" },{ id: 23, name: "PHP", category: "Backend" },
    { id: 24, name: "Python", category: "Backend" },{ id: 25, name: "Markdown", category: "Tools" },{ id: 26, name: "Java", category: "Backend" },
    { id: 27, name: "Gitlab", category: "Tools" },{ id: 28, name: "Figma", category: "Tools" },{ id: 29, name: "Pinia", category: "Frontend" },
    { id: 30, name: "Vuetify", category: "Frontend" },{ id: 31, name: "Tailwind", category: "Frontend" },{ id: 32, name: "Material", category: "Frontend" },
    { id: 33, name: "GraphQL", category: "Frontend" },{ id: 34, name: "Webpack", category: "Frontend" },{ id: 35, name: "Swagger", category: "Backend" },
    { id: 36, name: "Laravel", category: "Backend" },{ id: 37, name: "Springboot", category: "Backend" },{ id: 38, name: "Csharp", category: "Backend" },
    { id: 39, name: "Electron", category: "Tools" },{ id: 40, name: "Jenkins", category: "Tools" },{ id: 41, name: "Jquery", category: "Frontend" },
    { id: 42, name: "Photoshop", category: "Tools" },{ id: 43, name: "Analytics", category: "Tools" },{ id: 44, name: "ADS", category: "Frontend" },
    { id: 45, name: "Terraform", category: "Tools" },{ id: 46, name: "Ansible", category: "Tools" },{ id: 47, name: "Kubernetes", category: "Tools" },
    { id: 48, name: "Jest", category: "Tools" },{ id: 49, name: "Jasmine", category: "Tools" },{ id: 50, name: "MongoDB", category: "Database" },
    { id: 51, name: "Dotnet", category: "Backend" }, { id: 52, name: "Netlify", category: "Tools" },{ id: 53, name: "Heroku", category: "Tools" },
    { id: 54, name: "Vercel", category: "Tools"}, {id: 55, name: "Nextjs", category: "Frontend"}, {id: 56, name: "Vite", category: "Tools"}

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
    const categoryMatch = selectedCategory === "all" || icon.category.toLowerCase() === selectedCategory.toLowerCase();
    const searchTermMatch = icon.name.toLowerCase().includes(searchTerm.toLowerCase());
  
    return categoryMatch && searchTermMatch;
  });

  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredIcons.length / itemsPerPage);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const startIndex = currentPage * itemsPerPage;
  const visibleIcons = filteredIcons.slice(startIndex, startIndex + itemsPerPage);


  return (
    <Transition onAnimationComplete={() => {}}>
    <section className={styles.skills}>
      <h2 className={styles.heading}>
        <span>//</span> {t("skills.title")}<span>{t("skills.text")}</span>
      </h2>

      <motion.div 
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: 1, x: "0%" }}
        transition={{
          duration: 5,
          delay: 0.3,
          ease: [0.3, 0, 0.2, 1]
        }}
      className={styles.filters}>
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
              <motion.div key={icon.id} variants={item} className={styles.box_icon}>
                <span className={styles.icon_description}>{icon.name}</span>
                {IconComponent && <IconComponent className={styles.icon_hover} size={32} />}
              </motion.div>
          );
        })}
      </motion.div>
      <motion.div
     initial={{ opacity: 0, x: "100%" }}
     animate={{ opacity: 1, x: "0%" }}
     transition={{
       duration: 5,
       delay: 0.3,
       ease: [0.3, 0, 0.2, 1]
     }}>
      <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
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
