import styles from "./Skills.module.css";

import { motion } from "framer-motion";
import Transition from "../../components/Transition";

import { FaGitAlt } from "react-icons/fa6";
import { GrMysql } from "react-icons/gr";
import { SiCanva, SiTailwindcss } from "react-icons/si";
import {
  BiLogoTypescript,
  BiLogoReact,
  BiLogoAngular,
  BiLogoJavascript,
  BiLogoCss3,
  BiLogoHtml5,
  BiLogoFirebase,
  BiLogoRedux,
} from "react-icons/bi";

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

const Skills = () => {
  return (
    <Transition onAnimationComplete={() => {}}>
      <section className={styles.skills}>
      <h2 className={styles.heading}><span>//</span> Minhas <span>Habilidades</span></h2>

          <motion.div
            className={styles.icons_container}
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={item} className={styles.box_icon}>
              <span className={styles.icon_descripition}>React</span>
              <BiLogoReact className={styles.react} />
            </motion.div>

            <motion.div variants={item} className={styles.box_icon}>
              <span className={styles.icon_descripition}>Angular</span>
              <BiLogoAngular className={styles.react} />
            </motion.div>

            <motion.div variants={item} className={styles.box_icon}>
              <span className={styles.icon_descripition}>Redux</span>
              <BiLogoRedux className={styles.redux} />
            </motion.div>

            <motion.div variants={item} className={styles.box_icon}>
              <span className={styles.icon_descripition}>Typescript</span>
              <BiLogoTypescript className={styles.typescript} />
            </motion.div>

            <motion.div variants={item} className={styles.box_icon}>
              <span className={styles.icon_descripition}>Javascript</span>
              <BiLogoJavascript className={styles.javascript} />
            </motion.div>

            <motion.div variants={item} className={styles.box_icon}>
              <span className={styles.icon_descripition}>MySQL</span>
              <GrMysql className={styles.mysql} />
            </motion.div>

            <motion.div variants={item} className={styles.box_icon}>
              <span className={styles.icon_descripition}>Tailwind</span>
              <SiTailwindcss className={styles.tailwind} />
            </motion.div>

            <motion.div variants={item} className={styles.box_icon}>
              <span className={styles.icon_descripition}>Git</span>
              <FaGitAlt className={styles.git} />
            </motion.div>

            <motion.div variants={item} className={styles.box_icon}>
              <span className={styles.icon_descripition}>CSS</span>
              <BiLogoCss3 className={styles.css} />
            </motion.div>

            <motion.div variants={item} className={styles.box_icon}>
              <span className={styles.icon_descripition}>HTML</span>
              <BiLogoHtml5 className={styles.html} />
            </motion.div>

            <motion.div variants={item} className={styles.box_icon}>
              <span className={styles.icon_descripition}>Firebase</span>
              <BiLogoFirebase className={styles.firebase} />
            </motion.div>

            <motion.div variants={item} className={styles.box_icon}>
              <span className={styles.icon_descripition}>Canva</span>
              <SiCanva className={styles.canva} />
            </motion.div>
          </motion.div>
      </section>
    </Transition>
  );
};
export default Skills;
