// CSS
import styles from "./About.module.css";
// COMPONENT
import Transition from "../../components/Transition";
// IMAGENS
import About_img from "/imgs/hudson.png";
// FRAMER MOTION
import { motion } from "framer-motion";
import { useState } from "react";
// REACT ICONS

const About = () => {
  const hiddenMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 30px, rgba(0,0,0,1) 30px, rgba(0,0,0,1) 30px)`;
  const visibleMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 0px, rgba(0,0,0,1) 0px, rgba(0,0,0,1) 30px)`;

  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  return (
    <Transition onAnimationComplete={() => {}}>
      <section className={styles.about}>
        <div className={styles.container_img}>
          <motion.div
            initial={false}
            animate={
              isLoaded && isInView
                ? { WebkitMaskImage: visibleMask, maskImage: visibleMask }
                : { WebkitMaskImage: hiddenMask, maskImage: hiddenMask }
            }
            transition={{ duration: 1, delay: 1 }}
            viewport={{ once: true }}
            onViewportEnter={() => setIsInView(true)}
          >
            <img
              src={About_img}
              alt="about_img"
              onLoad={() => setIsLoaded(true)}
            />
          </motion.div>
        </div>

        <div>
          <motion.div
            className={styles.about_content}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1,
              delay: 0.6,
              ease: [0.2, 0, 0.2, 1],
            }}
          >
            <h2>
              <span>//</span> Quem é <span>Hudson Kennedy</span>
            </h2>

            <p>
              - Olá, me chamo Hudson Kennedy. Como Desenvolvedor Web apaixonado
              e dedicado, acumulei uma sólida experiência ao longo de 10 anos,
              complementada por habilidades interpessoais que considero
              fundamentais para o universo da programação. Especializei-me em
              tecnologias web, possuindo um conhecimento abrangente que se
              estende por diversas ferramentas e linguagens. Minha paixão pelo
              aprendizado constante e meu comprometimento em evoluir
              continuamente me impulsionam a aplicar minha vasta experiência no
              desenvolvimento de soluções web inovadoras e impactantes.
              Minha natureza comunicativa torna-me sempre pronto para desempenhar um papel vital em
              propostas inovadoras. Vamos construir algo incrível juntos!
            </p>
          </motion.div>
        </div>
      </section>
    </Transition>
  );
};

export default About;
