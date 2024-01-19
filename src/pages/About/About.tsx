// CSS
import styles from "./About.module.css"
// COMPONENT
import Transition from "../../components/Transition";
// IMGAGENS
import About_img from "../../../public/imgs/hudson.png";
// FRAMER MOTION
import { motion } from "framer-motion";
// REACT ICONS


const About = () => {
  return (
    <Transition onAnimationComplete={() => { }}>
      <section className={styles.about}>
        <div className={styles.container_img_skills}>
          <motion.div
            initial={{ opacity: 0, y: "80%" }}
            animate={{ opacity: 1, y: "0%" }}
            transition={{
              duration: 2,
              delay: 0.3,
              ease: [0.3, 0, 0.2, 1]
            }}
          >
            <img src={About_img} alt="about_img" />
          </motion.div>

        </div>

        <div>
          <motion.div className={styles.about_content}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1,
              delay: 0.6,
              ease: [0.2, 0, 0.2, 1]
            }}
          >
            <h2><span>//</span> Quem é <span>Hudson Kennedy</span></h2>

            <p>
              - Olá, me chamo Hudson Kennedy.
              Sou Desenvolvedor web apaixonado e dedicado, com uma sólida experiência de 10 anos, trago de bagagem softs skills que julgo serem importantes para area de programação. Possuo um amplo conhecimento em tecnologias web. Entusiasmado em aprender e evoluir constantemente, estou comprometido em aplicar minha experiência para criar soluções web inovadoras e impactantes. Determinado a contribuir ativamente para projetos desafiadores e colaborar em equipes dinâmicas.
              Comunicativo por natureza, estou sempre pronto para desempenhar um papel em soluções inovadoras.
              Vamos construir algo incrível juntos!
            </p>
          </motion.div>
        </div>
      </section>
    </Transition>
  );
};

export default About;