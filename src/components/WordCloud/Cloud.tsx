import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";
import styles from "./Cloud.module.css";

const Cloud = () => {
  const { mainColor } = useTheme();

  const words = [
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
    { id: 28, name: "Figma", category: "Design", percentage: 70 },
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
    { id: 42, name: "Photoshop", category: "Design", percentage: 80 },
    { id: 43, name: "Analytics", category: "Tools", percentage: 60 },
    { id: 44, name: "ADS", category: "Tools", percentage: 60 },
    { id: 45, name: "Terraform", category: "Tools", percentage: 10 },
    { id: 46, name: "Ansible", category: "Tools", percentage: 10 },
    { id: 47, name: "Kubernetes", category: "Tools", percentage: 10 },
    { id: 48, name: "Jest", category: "Tools", percentage: 30 },
    { id: 49, name: "Jasmine", category: "Tools", percentage: 30 },
    { id: 50, name: "MongoDB", category: "Database", percentage: 10 },
    { id: 51, name: "Dotnet", category: "Backend", percentage: 30 },
    { id: 52, name: "Netlify", category: "Deploy", percentage: 60 },
    { id: 53, name: "Heroku", category: "Deploy", percentage: 60 },
    { id: 54, name: "Vercel", category: "Deploy", percentage: 60 },
    { id: 55, name: "Nextjs", category: "Frontend", percentage: 10 },
    { id: 56, name: "Vite", category: "Tools", percentage: 60 },
    { id: 57, name: "Postman", category: "Tools", percentage: 20 },
    { id: 58, name: "Thunderclient", category: "Tools", percentage: 20 },
    { id: 59, name: "Cypress", category: "Tools", percentage: 10 },
    { id: 60, name: "AWS", category: "Tools", percentage: 10 },
    { id: 61, name: "Sketch", category: "Design", percentage: 10 },
    { id: 62, name: "AdobeXD", category: "Design", percentage: 10 },
    { id: 63, name: "Nuxtjs", category: "Frontend", percentage: 10 },
    { id: 64, name: "Eslint", category: "Tools", percentage: 60 },
    { id: 65, name: "Magento", category: "Tools", percentage: 70 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: 1, x: "0%" }}
      transition={{
        duration: 2.5,
        delay: 0.3,
        ease: [0.3, 0, 0.2, 1],
      }}
      className={styles.container}
    >
      <div className={styles.circleContainer}>
        {words.map((word) => (
          <motion.div
            key={word.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={styles.word}
            style={{
              top: `${Math.random() * 90 + 5}%`,  
              left: `${Math.random() * 90 + 5}%`,
              transform: "translate(-50%, -50%)",
              fontSize: `${(word.percentage / 100) * 2 + 0.5}rem`, 
              color: mainColor,
            }}
          >
            <span>{word.name}</span>
            <div>
                <span>{word.category}</span>
            </div>
           
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Cloud;