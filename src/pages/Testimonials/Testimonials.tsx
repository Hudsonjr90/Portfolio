import React, { Suspense } from "react";
import styles from "./Testimonials.module.css";
import Transition from "../../components/Transition/Transition";
import { useTranslation } from "react-i18next";
import TestimonialComponent from "../../components/Card/TestimonialComponent";

const ParticlesB = React.lazy(
  () => import("../../components/Particles/ParticlesB")
);

const Testimonials = () => {
  const { t } = useTranslation();


  return (
    <Transition onAnimationComplete={() => {}}>
      <Suspense fallback={<div>Loading...</div>}>
        <ParticlesB />
      </Suspense>
      <section className={styles.testimonials}>
        <h2 className={styles.heading}>
          <span>//</span>
          {t("testimonials.title")}
          <span>{t("testimonials.text")}</span>
        </h2>
        <TestimonialComponent/>
      </section>
    </Transition>
  );
};

export default Testimonials;
