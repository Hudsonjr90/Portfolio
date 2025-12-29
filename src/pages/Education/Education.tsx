import React, { Suspense } from 'react';
import styles from "./Education.module.css";
import Transition from "../../components/Transition/Transition";
import { useTranslation } from "react-i18next";
import { FaUserGraduate } from "react-icons/fa6";


const CardComponent = React.lazy(() => import('../../components/Card/CardComponent'));
const ParticlesB = React.lazy(() => import('../../components/Particles/ParticlesB'));

const Education = () => {
  const { t } = useTranslation();

  return (
    <Transition onAnimationComplete={() => {}}>
      <section className={styles.education}>
        <h2 className={styles.heading}>
          {t("education.title")}
          <span>{t("education.text")} <FaUserGraduate /></span>
        </h2>

        <Suspense fallback={<div>{t("home.loading")}</div>}>
          <ParticlesB />
          <CardComponent />
        </Suspense>
      </section>
    </Transition>
  );
}

export default Education;
