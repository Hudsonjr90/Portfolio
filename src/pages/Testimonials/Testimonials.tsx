import { SetStateAction, useState, useCallback, useEffect } from "react";
import styles from "./Testimonials.module.css";
import Transition from "../../components/Transition";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import images from "../../components/config/imageServer";


const Testimonials = () => {
  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
      };
    }
  };
  
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };
  

    const [[page, direction], setPage] = useState([0, 0]);
  
    const imageIndex = wrap(0, images.length, page);
  
    const paginate = (newDirection: number) => {
      setPage([page + newDirection, newDirection]);
    };
  
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

export default Testimonials;
