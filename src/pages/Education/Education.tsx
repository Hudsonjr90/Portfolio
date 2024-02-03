import styles from "./Education.module.css";

import { motion } from "framer-motion";
import Transition from "../../components/Transition";
import CardComponent from "../../components/CardComponent";


const Education = () => {
  return (
    <Transition onAnimationComplete={() => {}}>
      <section className={styles.education}>
        <h2 className={styles.heading}>
          <span>//</span> Minhas <span>Formações</span>
        </h2> 
        <motion.div
        initial={{ opacity: 0, y: "80%" }}
        animate={{ opacity: 1, y: "0%" }}
        transition={{
          duration: 2,
          delay: 0.3,
          ease: [0.3, 0, 0.2, 1],
        }}
        >
         <CardComponent/>
        </motion.div>
         
      </section>
    </Transition>
  );
};

export default Education;
