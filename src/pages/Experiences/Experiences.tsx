import React from 'react';
import styles from './Experience.module.css';
import { motion } from 'framer-motion';
import Transition from '../../components/Transition';

const Experiences = () => {
  return (
    <Transition onAnimationComplete={() => { }}>
      <section className={`${styles.jobsSection} section`} >
        <div className={`${styles.container} container`}>
          <div className={styles.row}>
            <div className={styles.sectionTitleExperience}>
              <h2>Experiências</h2>
            </div>
          </div>
          <div className={styles.services}>
            {/* ... restante do conteúdo ... */}
          </div>
        </div>
      </section>
    </Transition>
  );
};

export default Experiences;
