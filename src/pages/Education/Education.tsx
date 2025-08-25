import React, { Suspense } from 'react';
import styles from "./Education.module.css";
import Transition from "../../components/Transition/Transition";
import { useTranslation } from "react-i18next";
import ChatBot from '../../components/Chat/ChatBot';


const CardComponent = React.lazy(() => import('../../components/Card/CardComponent'));
const ParticlesB = React.lazy(() => import('../../components/Particles/ParticlesB'));

const Education = () => {
  const { t } = useTranslation();

  return (
    <Transition onAnimationComplete={() => {}}>
      <section className={styles.education}>
        <h2 className={styles.heading}>
          <span>//</span>
          {t("education.title")}
          <span>{t("education.text")}</span>
        </h2>

        <Suspense fallback={<div>Loading...</div>}>
          <ParticlesB />
          <CardComponent />
        </Suspense>
         <ChatBot />
      </section>
    </Transition>
  );
}

export default Education;
