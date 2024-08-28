import styles from "./Experiences.module.css"

import Transition from "../../components/Transition/Transition"
import { useTranslation } from "react-i18next"

import { FaUser } from "react-icons/fa";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component"
import "react-vertical-timeline-component/style.min.css"
import ParticlesB from "../../components/Particles/ParticlesB"
import experiencesServer, { Experience } from "../../data/experiencesServer"

const TimelineElement = ({ title, subtitle, description, date }: Experience) => (
  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={{
      background: "var(--second_bg_color)",
      color: "var(--main_color)",
    }}
    contentArrowStyle={{ borderRight: "10px solid var(--second_bg_color)" }}
    date={date}
    iconStyle={{
      background: "var(--bg_color)",
      color: "var(--main_color)",
    }}
    icon={<FaUser />}
  >
    <h3 className={styles.vertical_timeline_title}>{title}</h3>
    <h4 className={styles.vertical_timeline_subtitle}>{subtitle}</h4>
    <p className={styles.vertical_timeline_description}>{description}</p>
  </VerticalTimelineElement>
)

const Experiences = () => {
  const { t } = useTranslation()

  const translatedExperiences = experiencesServer.map((experience) => ({
    ...experience,
    subtitle: t(experience.subtitle),
    description: t(experience.description),
    date: t(experience.date),
  }))

  return (
    <Transition onAnimationComplete={() => {}}>
      <ParticlesB />
      <section className={styles.experiences}>
        <h2 className={styles.heading}>
          <span>//</span>
          {t("experiences.title")}
          <span>{t("experiences.text")}</span>
        </h2>
        <VerticalTimeline>
          {translatedExperiences.map((experience, index) => (
            <TimelineElement
              key={index}
              title={experience.title}
              subtitle={experience.subtitle}
              description={experience.description}
              date={experience.date}
            />
          ))}
        </VerticalTimeline>
      </section>
    </Transition>
  )
}

export default Experiences
