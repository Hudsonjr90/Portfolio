import styles from "./Experiences.module.css";

import Transition from "../../components/Transition/Transition";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import ParticlesB from "../../components/Particles/ParticlesB";
import experiencesServer, { Experience } from "../../data/experiencesServer";
import { motion, AnimatePresence } from "framer-motion";
import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";

const TimelineElement = ({
  title,
  subtitle,
  description,
  image,
  date,
}: Experience) => (
  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={{
      background: "var(--second_bg_color)",
      color: "var(--main_color)",
    }}
    contentArrowStyle={{ borderRight: "10px solid var(--second_bg_color)" }}
    iconStyle={{
      background: "var(--bg_color)",
      color: "var(--main_color)",
    }}
    icon={
      <img src={image} alt="mood" className={styles.experiences_timeline_img} />
    }
  >
    <h3 className={styles.vertical_timeline_title}>{title}</h3>
    <h4 className={styles.vertical_timeline_subtitle}>{subtitle}</h4>
    <p className={styles.vertical_timeline_description}>{description}</p>
    <span className={styles.vertical_timeline_date}>{date}</span>
  </VerticalTimelineElement>
);

const HorizontalTimeline = ({ experiences }: { experiences: Experience[] }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0); 

  const nextExperience = () => {
    setSelectedIndex((selectedIndex + 1) % experiences.length);
  };

  const prevExperience = () => {
    setSelectedIndex(selectedIndex === 0 ? experiences.length - 1 : selectedIndex - 1);
  };

  return (
    <div className={styles.horizontal_timeline_container}>
      {/* Ícones das experiências com linha integrada */}
      <div className={styles.timeline_icons}>
        {experiences.map((experience, index) => (
          <motion.div
            key={index}
            className={`${styles.timeline_icon_wrapper} ${selectedIndex === index ? styles.active : ''}`}
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: "0%" }}
            transition={{
              duration: 1.2,
              delay: 0.2 + (index * 0.15),
              ease: [0.2, 0, 0.2, 1],
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedIndex(index)}
          >
            <div className={styles.timeline_icon}>
              <img src={experience.image} alt={experience.title} />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className={styles.experience_card_container}
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: "0%" }}
        transition={{
          duration: 1.5,
          delay: 0.8,
          ease: [0.2, 0, 0.2, 1],
        }}
      >
        <div className={styles.experience_card}>
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className={styles.card_content}
            >
              <div className={styles.card_info}>
                <h3 className={styles.card_title}>{experiences[selectedIndex].title}</h3>
                <h4 className={styles.card_subtitle}>{experiences[selectedIndex].subtitle}</h4>
                <p className={styles.card_description}>{experiences[selectedIndex].description}</p>
                <span className={styles.card_date}>{experiences[selectedIndex].date}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className={styles.navigation_arrows}>
            <button
              className={styles.nav_button}
              onClick={prevExperience}
              aria-label="Experiência anterior"
            >
              <RxDoubleArrowLeft />
            </button>
            <span className={styles.experience_counter}>
              {selectedIndex + 1} / {experiences.length}
            </span>
            <button
              className={styles.nav_button}
              onClick={nextExperience}
              aria-label="Próxima experiência"
            >
              <RxDoubleArrowRight />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Experiences = () => {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 992);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const translatedExperiences = experiencesServer.map((experience) => ({
    ...experience,
    subtitle: t(experience.subtitle),
    description: t(experience.description),
    date: t(experience.date),
  }));

  return (
    <Transition onAnimationComplete={() => {}}>
      <ParticlesB />
      <section className={styles.experiences}>
        <h2 className={styles.heading}>
          
          {t("experiences.title")}
          <span>{t("experiences.text")}</span>
        </h2>
        
        {isMobile ? (
          <VerticalTimeline>
            {translatedExperiences.map((experience, index) => (
              <TimelineElement
                key={index}
                title={experience.title}
                subtitle={experience.subtitle}
                description={experience.description}
                date={experience.date}
                image={experience.image}
              />
            ))}
          </VerticalTimeline>
        ) : (
          <HorizontalTimeline experiences={translatedExperiences} />
        )}
      </section>
    </Transition>
  );
};

export default Experiences;
