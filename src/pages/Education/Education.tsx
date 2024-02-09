import styles from "./Education.module.css";
import Transition from "../../components/Transition";
import CardComponent from "../../components/CardComponent";


const Education = () => {
  return (
    <Transition onAnimationComplete={() => {}}>
      <section className={styles.education}>
        <h2 className={styles.heading}>
          <span>//</span> Minhas <span>Formações</span>
        </h2> 
       
         <CardComponent/>
         
     </section>
    </Transition>
  );
};

export default Education;
