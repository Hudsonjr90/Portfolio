import styles from "./Testimonials.module.css";

import { motion } from "framer-motion";
import Transition from "../../components/Transition";

const Testimonials = () => {
    return (
      <Transition onAnimationComplete={() => {}}>
        <section className={styles.testimonials}>
          <h2 className={styles.heading}>
            <span>//</span> Alguns <span>Depoimentos</span>
          </h2>
          </section>
          </Transition>
     );
    };

export default Testimonials ;   