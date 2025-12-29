import React, { Suspense } from "react";
import styles from "./Testimonials.module.css";
import Transition from "../../components/Transition/Transition";
import { useTranslation } from "react-i18next";
import { GrNotes } from "react-icons/gr";

const ParticlesB = React.lazy(
  () => import("../../components/Particles/ParticlesB")
);

const TestimonialComponent = React.lazy(
  () => import("../../components/Testimonial/TestimonialComponent")
);

const Testimonials = () => {
  const { t } = useTranslation();

  return (
    <Transition onAnimationComplete={() => {}}>
      <Suspense fallback={<div>{t("home.loading")}</div>}>
        <ParticlesB />
      </Suspense>
      <section className={styles.testimonials}>
        <h2 className={styles.heading}>
          
          {t("testimonials.title")}
          <span>{t("testimonials.text")} <GrNotes /> </span>
        </h2>
        <Suspense fallback={<div>{t("home.loading")}</div>}>
          <TestimonialComponent />
        </Suspense>
      </section>
    </Transition>
  );
};

export default Testimonials;
