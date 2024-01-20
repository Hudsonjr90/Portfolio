import styles from "./Skills.module.css";

import { motion } from "framer-motion";
import Transition from "../../components/Transition";

import { GrMysql } from "react-icons/gr";
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
  SiFigma,
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
        <h2 className={styles.heading}>
          <span>//</span> Minhas <span>Habilidades</span>
        </h2>

        <motion.div
          className={styles.icons_container}
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={item} className={styles.box_icon}>
            <span className={styles.icon_descripition}>HTML</span>
            <BiLogoHtml5 className={styles.html} />
          </motion.div>

          <motion.div variants={item} className={styles.box_icon}>
            <span className={styles.icon_descripition}>CSS</span>
            <BiLogoCss3 className={styles.css} />
          </motion.div>

          <motion.div variants={item} className={styles.box_icon}>
            <span className={styles.icon_descripition}>Javascript</span>
            <BiLogoJavascript className={styles.javascript} />
          </motion.div>

          <motion.div variants={item} className={styles.box_icon}>
            <span className={styles.icon_descripition}>Angular</span>
            <BiLogoAngular className={styles.angular} />
          </motion.div>

          <motion.div variants={item} className={styles.box_icon}>
            <span className={styles.icon_descripition}>React</span>
            <BiLogoReact className={styles.react} />
          </motion.div>

          <motion.div variants={item} className={styles.box_icon}>
            <span className={styles.icon_descripition}>Vue</span>
            <FaVuejs className={styles.vue} />
          </motion.div>

          <motion.div variants={item} className={styles.box_icon}>
            <span className={styles.icon_descripition}>Typescript</span>
            <BiLogoTypescript className={styles.typescript} />
          </motion.div>

          <motion.div variants={item} className={styles.box_icon}>
            <span className={styles.icon_descripition}>Git</span>
            <FaGitAlt className={styles.git} />
          </motion.div>

          <motion.div variants={item} className={styles.box_icon}>
            <span className={styles.icon_descripition}>NPM</span>
            <FaNpm className={styles.npm} />
          </motion.div>

          <motion.div variants={item} className={styles.box_icon}>
            <span className={styles.icon_descripition}>YARN</span>
            <FaYarn className={styles.yarn} />
          </motion.div>

          <motion.div variants={item} className={styles.box_icon}>
            <span className={styles.icon_descripition}>Github</span>
            <FaGithub className={styles.github} />
          </motion.div>

          <motion.div variants={item} className={styles.box_icon}>
            <span className={styles.icon_descripition}>Bootstrap</span>
            <FaBootstrap className={styles.bootstrap} />
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.icons_container}
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={item} className={styles.box_icon}>
            <span className={styles.icon_descripition}>Shopify</span>
            <FaShopify className={styles.shopify} />
          </motion.div>

          <motion.div variants={item} className={styles.box_icon}>
            <span className={styles.icon_descripition}>Wordpress</span>
            <FaWordpress className={styles.wordpress} />
          </motion.div>

          <motion.div variants={item} className={styles.box_icon}>
            <span className={styles.icon_descripition}>Jquery</span>
            <SiJquery className={styles.jquery} />
          </motion.div>

          <motion.div variants={item} className={styles.box_icon}>
            <span className={styles.icon_descripition}>Node</span>
            <FaNode className={styles.node} />
          </motion.div>

          <motion.div variants={item} className={styles.box_icon}>
            <span className={styles.icon_descripition}>Markdown</span>
            <FaMarkdown className={styles.markdown} />
          </motion.div>

          <motion.div variants={item} className={styles.box_icon}>
            <span className={styles.icon_descripition}>Redux</span>
            <BiLogoRedux className={styles.redux} />
          </motion.div>

          <motion.div variants={item} className={styles.box_icon}>
            <span className={styles.icon_descripition}>Less</span>
            <SiLess className={styles.less} />
          </motion.div>

          <motion.div variants={item} className={styles.box_icon}>
            <span className={styles.icon_descripition}>Sass</span>
            <SiSass className={styles.sass} />
          </motion.div>

          <motion.div variants={item} className={styles.box_icon}>
            <span className={styles.icon_descripition}>Photoshop</span>
            <SiAdobephotoshop className={styles.photoshop} />
          </motion.div>

          <motion.div variants={item} className={styles.box_icon}>
            <span className={styles.icon_descripition}>Gitlab</span>
            <FaGitlab className={styles.gitlab} />
          </motion.div>

          <motion.div variants={item} className={styles.box_icon}>
            <span className={styles.icon_descripition}>Material</span>
            <SiMaterialdesign className={styles.materialdesign} />
          </motion.div>

          <motion.div variants={item} className={styles.box_icon}>
            <span className={styles.icon_descripition}>Figma</span>
            <SiFigma className={styles.figma} />
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.icons_container}
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={item} className={styles.box_icon}>
            <span className={styles.icon_descripition}>PostgreSQL</span>
            <SiPostgresql className={styles.postgres} />
          </motion.div>

          <motion.div variants={item} className={styles.box_icon}>
            <span className={styles.icon_descripition}>Pinia</span>
            <GiPineapple className={styles.pinia} />
          </motion.div>

          <motion.div variants={item} className={styles.box_icon}>
            <span className={styles.icon_descripition}>Vuetify</span>
            <SiVuetify className={styles.vuetify} />
          </motion.div>

          <motion.div variants={item} className={styles.box_icon}>
            <span className={styles.icon_descripition}>Java</span>
            <FaJava className={styles.java} />
          </motion.div>

          <motion.div variants={item} className={styles.box_icon}>
            <span className={styles.icon_descripition}>Analytics</span>
            <SiGoogleanalytics className={styles.googlean} />
          </motion.div>

          <motion.div variants={item} className={styles.box_icon}>
            <span className={styles.icon_descripition}>ADS</span>
            <SiGoogleads className={styles.googlead} />
          </motion.div>

          <motion.div variants={item} className={styles.box_icon}>
            <span className={styles.icon_descripition}>MySQL</span>
            <GrMysql className={styles.mysql} />
          </motion.div>

          <motion.div variants={item} className={styles.box_icon}>
            <span className={styles.icon_descripition}>Laravel</span>
            <SiLaravel className={styles.laravel} />
          </motion.div>

          <motion.div variants={item} className={styles.box_icon}>
            <span className={styles.icon_descripition}>PHP</span>
            <FaPhp className={styles.php} />
          </motion.div>

          <motion.div variants={item} className={styles.box_icon}>
            <span className={styles.icon_descripition}>GraphQL</span>
            <SiGraphql className={styles.graphql} />
          </motion.div>

          <motion.div variants={item} className={styles.box_icon}>
            <span className={styles.icon_descripition}>Webpack</span>
            <SiWebpack className={styles.webpack} />
          </motion.div>

          <motion.div variants={item} className={styles.box_icon}>
            <span className={styles.icon_descripition}>Docker</span>
            <FaDocker className={styles.docker} />
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.icons_container}
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={item} className={styles.box_icon}>
            <span className={styles.icon_descripition}>Swagger</span>
            <SiSwagger className={styles.swagger} />
          </motion.div>

          <motion.div variants={item} className={styles.box_icon}>
            <span className={styles.icon_descripition}>Springboot</span>
            <SiSpringboot className={styles.springboot} />
          </motion.div>

          <motion.div variants={item} className={styles.box_icon}>
            <span className={styles.icon_descripition}>Firebase</span>
            <BiLogoFirebase className={styles.firebase} />
          </motion.div>

          <motion.div variants={item} className={styles.box_icon}>
            <span className={styles.icon_descripition}>C#</span>
            <SiCsharp className={styles.csharp} />
          </motion.div>

          <motion.div variants={item} className={styles.box_icon}>
            <span className={styles.icon_descripition}>Python</span>
            <FaPython className={styles.python} />
          </motion.div>

          <motion.div variants={item} className={styles.box_icon}>
            <span className={styles.icon_descripition}>Tailwind</span>
            <SiTailwindcss className={styles.tailwind} />
          </motion.div>

          <motion.div variants={item} className={styles.box_icon}>
            <span className={styles.icon_descripition}>Jira</span>
            <FaJira className={styles.jira} />
          </motion.div>

          <motion.div variants={item} className={styles.box_icon}>
            <span className={styles.icon_descripition}>Electron</span>
            <SiElectron className={styles.electron} />
          </motion.div>

          <motion.div variants={item} className={styles.box_icon}>
            <span className={styles.icon_descripition}>Jenkins</span>
            <SiJenkins className={styles.jenkins} />
          </motion.div>

          <motion.div variants={item} className={styles.box_icon}>
            <span className={styles.icon_descripition}>Terraform</span>
            <SiTerraform className={styles.terraform} />
          </motion.div>

          <motion.div variants={item} className={styles.box_icon}>
            <span className={styles.icon_descripition}>Ansible</span>
            <SiAnsible className={styles.ansible} />
          </motion.div>

          <motion.div variants={item} className={styles.box_icon}>
            <span className={styles.icon_descripition}>Kubernets</span>
            <SiKubernetes className={styles.kubernetes} />
          </motion.div>
        </motion.div>
      </section>
    </Transition>
  );
};
export default Skills;
