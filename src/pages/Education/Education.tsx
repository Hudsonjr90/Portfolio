import styles from "./Education.module.css"
import Transition from "../../components/Transition/Transition"
import CardComponent from "../../components/Card/CardComponent"
import { useTranslation } from "react-i18next"
import ParticlesB from "../../components/Particles/ParticlesB"



const Education = () => {
  const { t } = useTranslation()


  return (
    <Transition onAnimationComplete={() => {}}>
      <section className={styles.education}>
        <h2 className={styles.heading}>
          <span>//</span>
          {t("education.title")}
          <span>{t("education.text")}</span>
        </h2>
        <ParticlesB />

        <CardComponent />
      </section>
    </Transition>
  )
}

export default Education
