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
import OrbitExperiences from "../../components/Experiences/OrbitExperiences";

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
      <img
        src={image}
        alt={title}
        className={styles.experiences_timeline_img}
      />
    }
  >
    <h3 className={styles.vertical_timeline_title}>{title}</h3>
    <h4 className={styles.vertical_timeline_subtitle}>{subtitle}</h4>
    <p className={styles.vertical_timeline_description}>{description}</p>
    <span className={styles.vertical_timeline_date}>{date}</span>
  </VerticalTimelineElement>
);

const Experiences = () => {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 992);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
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
          <OrbitExperiences experiences={translatedExperiences} />
        )}
      </section>
    </Transition>
  );
};

export default Experiences;
