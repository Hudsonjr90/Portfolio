import styles from "./Education.module.css";

import { motion } from "framer-motion";
import Transition from "../../components/Transition";

const Education = () => {
    return (
      <Transition onAnimationComplete={() => {}}>
        <section className={styles.education}>
          <h2 className={styles.heading}>
            <span>//</span> Minhas <span>Formações</span>
          </h2>
          </section>
          </Transition>
     );
    };

export default Education ;   