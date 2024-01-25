import { SetStateAction, useState, useCallback, useEffect } from "react";
import styles from "./Testimonials.module.css";
import Transition from "../../components/Transition";
import CardComponent from "../../components/CardComponent";
//import CardCarousel from "../../components/CardCarousel";


const Testimonials = () => {

  return (
    <Transition onAnimationComplete={() => {}}>
      <section className={styles.testimonials}>
        <h2 className={styles.heading}>
          <span>//</span> Alguns <span>Depoimentos</span>
        </h2>

        <CardComponent/>
        
      </section>
    </Transition>
  );
};

export default Testimonials;
