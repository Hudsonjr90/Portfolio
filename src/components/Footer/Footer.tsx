import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import {
  whatsappTheme,
  emailTheme,
  linkedinTheme,
  githubTheme,
} from "../../context/ThemeContext";
import { ThemeProvider } from "@mui/material/styles";
import {
  FaWhatsapp,
  FaLinkedin,
  FaGithub,
  FaRegCopyright,
  FaHeadset
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import IconButton from "@mui/material/IconButton";
import { motion } from "framer-motion";
import styles from "./Footer.module.css";
import { getCurrentYear } from "../../utils/functions";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.footer
      className={styles.footer}
      data-tour="footer"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0.2, 0, 0.2, 1],
      }}
    >
      <motion.div 
        className={styles.socialMedia}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2,
              delayChildren: 0.3,
            },
          },
        }}
      >
      <motion.div
        className={styles.branding}
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        animate={isLoaded ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.8 }}
        transition={{
          duration: 0.6,
          delay: 1.1, 
          ease: "easeOut",
        }}
        whileHover={{ 
          scale: 1.1,
          transition: { duration: 0.3 }
        }}
      >
        <FaHeadset />
        {t("footer.title")}
      </motion.div> 
        <motion.div
          variants={{
            hidden: { 
              opacity: 0, 
              y: 30,
              scale: 0.5,
              rotate: -45 
            },
            visible: { 
              opacity: 1, 
              y: 0,
              scale: 1,
              rotate: 0,
              transition: {
                type: "spring",
                stiffness: 120,
                damping: 8,
              },
            },
          }}
        >
          <ThemeProvider theme={whatsappTheme}>
            <NavLink
              to="https://api.whatsapp.com/send?phone=5521969609121"
              className={styles.whatsapp}
              target="_blank"
            >
              <Tooltip
                TransitionComponent={Zoom}
                title="Whatsapp"
                placement="top"
                arrow
              >
                <IconButton>
                  <FaWhatsapp className={styles.icon} />
                </IconButton>
              </Tooltip>
            </NavLink>
          </ThemeProvider>
        </motion.div>

        <motion.div
          variants={{
            hidden: { 
              opacity: 0, 
              y: 30,
              scale: 0.5,
              rotate: -45 
            },
            visible: { 
              opacity: 1, 
              y: 0,
              scale: 1,
              rotate: 0,
              transition: {
                type: "spring",
                stiffness: 120,
                damping: 8,
              },
            },
          }}
        >
          <ThemeProvider theme={emailTheme}>
            <NavLink
              to="mailto:hudsonhugo90@gmail.com?body=Olá Hudson, podemos conversar?&subject=Contato pelo Portfólio"
              className={styles.email}
              target="_blank"
            >
              <Tooltip
                TransitionComponent={Zoom}
                title="Email"
                placement="top"
                arrow
              >
                <IconButton>
                  <MdEmail className={styles.icon} />
                </IconButton>
              </Tooltip>
            </NavLink>
          </ThemeProvider>
        </motion.div>

        <motion.div
          variants={{
            hidden: { 
              opacity: 0, 
              y: 30,
              scale: 0.5,
              rotate: -45 
            },
            visible: { 
              opacity: 1, 
              y: 0,
              scale: 1,
              rotate: 0,
              transition: {
                type: "spring",
                stiffness: 120,
                damping: 8,
              },
            },
          }}
        >
          <ThemeProvider theme={linkedinTheme}>
            <NavLink
              to="https://www.linkedin.com/in/hudsonkennedyjr"
              className={styles.linkedin}
              target="_blank"
            >
              <Tooltip
                TransitionComponent={Zoom}
                title="Linkedin"
                placement="top"
                arrow
              >
                <IconButton>
                  <FaLinkedin className={styles.icon} />
                </IconButton>
              </Tooltip>
            </NavLink>
          </ThemeProvider>
        </motion.div>

        <motion.div
          variants={{
            hidden: { 
              opacity: 0, 
              y: 30,
              scale: 0.5,
              rotate: -45 
            },
            visible: { 
              opacity: 1, 
              y: 0,
              scale: 1,
              rotate: 0,
              transition: {
                type: "spring",
                stiffness: 120,
                damping: 8,
              },
            },
          }}
        >
          <ThemeProvider theme={githubTheme}>
            <NavLink
              to="https://github.com/Hudsonjr90"
              className={styles.github}
              target="_blank"
            >
              <Tooltip
                TransitionComponent={Zoom}
                title="Github"
                placement="top"
                arrow
              >
                <IconButton>
                  <FaGithub className={styles.icon} />
                </IconButton>
              </Tooltip>
            </NavLink>
          </ThemeProvider>
        </motion.div>
      </motion.div>

      <motion.div
        className={styles.branding}
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        animate={isLoaded ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.8 }}
        transition={{
          duration: 0.6,
          delay: 1.1, 
          ease: "easeOut",
        }}
        whileHover={{ 
          scale: 1.1,
          transition: { duration: 0.3 }
        }}
      >
                HK Dev <FaRegCopyright /> <span>2013 - {getCurrentYear()}</span>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;