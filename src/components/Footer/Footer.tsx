import { NavLink } from "react-router-dom";
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
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import IconButton from "@mui/material/IconButton";
import { motion } from "framer-motion";
import { getCurrentYear } from "../../utils/functions";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <motion.footer
      className={styles.footer}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0.2, 0, 0.2, 1],
      }}
    >
      <div className={styles.socialMedia}>
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
      </div>

      <motion.div
        className={styles.branding}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        HK Dev <FaRegCopyright /> <span>{getCurrentYear()}</span>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;