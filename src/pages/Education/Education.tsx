import styles from "./Education.module.css";
import Transition from "../../components/Transition";
import CardComponent from "../../components/CardComponent";
import { useTranslation } from "react-i18next";


const Education = () => {
  const { t } = useTranslation();
  return (
    <Transition onAnimationComplete={() => {}}>
      <section className={styles.education}>
        <h2 className={styles.heading}>
            <span>//</span>{t("education.title")}<span>{t("education.text")}</span>
        </h2> 
       
         <CardComponent/>
         
     </section>
    </Transition>
  );
};

export default Education;
