import styles from "./Experiences.module.css";

import Transition from "../../components/Transition";
import { useTranslation } from "react-i18next";

import { FaBriefcase } from "react-icons/fa6";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

const Experiences = () => {
  const { t } = useTranslation();
  return (
    <Transition onAnimationComplete={() => {}}>
      <section className={styles.experiences}>
        <h2 className={styles.heading}>
          <span>//</span>
          {t("experiences.title")}
          <span>{t("experiences.text")}</span>
        </h2>
        <VerticalTimeline>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{
              background: "var(--bg_color)",
              color: "var(--main_color)",
            }}
            contentArrowStyle={{ borderRight: "none" }}
            date={t("experiences.date1")}
            iconStyle={{
              background: "var(--bg_color)",
              color: "var(--main_color)",
            }}
            icon={<FaBriefcase />}
          >
            <h3 className={styles.vertical_timeline_title}>
              99Freelas/Capitona Rio/Eterj
            </h3>
            <h4 className={styles.vertical_timeline_subtitle}>
              {t("experiences.subtitle1")}
            </h4>
            <p className={styles.vertical_timeline_description}>
              {t("experiences.description1")}
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{
              background: "var(--bg_color)",
              color: "var(--main_color)",
            }}
            contentArrowStyle={{ borderRight: "none" }}
            date={t("experiences.date2")}
            iconStyle={{
              background: "var(--bg_color)",
              color: "var(--main_color)",
            }}
            icon={<FaBriefcase />}
          >
            <h3 className={styles.vertical_timeline_title}>DT3 Sports</h3>
            <h4 className={styles.vertical_timeline_subtitle}>
              {t("experiences.subtitle2")}
            </h4>
            <p className={styles.vertical_timeline_description}>
              {t("experiences.description2")}
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{
              background: "var(--bg_color)",
              color: "var(--main_color)",
            }}
            contentArrowStyle={{ borderRight: "none" }}
            date={t("experiences.date3")}
            iconStyle={{
              background: "var(--bg_color)",
              color: "var(--main_color)",
            }}
            icon={<FaBriefcase />}
          >
            <h3 className={styles.vertical_timeline_title}>
              VILT Brasil Sistemas de Informação
            </h3>
            <h4 className={styles.vertical_timeline_subtitle}>
              {t("experiences.subtitle3")}
            </h4>
            <p className={styles.vertical_timeline_description}>
              {t("experiences.description3")}
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{
              background: "var(--bg_color)",
              color: "var(--main_color)",
            }}
            contentArrowStyle={{ borderRight: "none" }}
            date={t("experiences.date4")}
            iconStyle={{
              background: "var(--bg_color)",
              color: "var(--main_color)",
            }}
            icon={<FaBriefcase />}
          >
            <h3 className={styles.vertical_timeline_title}>
              Atlas Technologies
            </h3>
            <h4 className={styles.vertical_timeline_subtitle}>
              {t("experiences.subtitle4")}
            </h4>
            <p className={styles.vertical_timeline_description}>
              {t("experiences.description4")}
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{
              background: "var(--bg_color)",
              color: "var(--main_color)",
            }}
            contentArrowStyle={{ borderRight: "none" }}
            date={t("experiences.date4")}
            iconStyle={{
              background: "var(--bg_color)",
              color: "var(--main_color)",
            }}
            icon={<FaBriefcase />}
          >
            <h3 className={styles.vertical_timeline_title}>
              Cast Group Informática S.A.
            </h3>
            <h4 className={styles.vertical_timeline_subtitle}>
              {t("experiences.subtitle5")}
            </h4>
            <p className={styles.vertical_timeline_description}>
              {t("experiences.description5")}
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{
              background: "var(--bg_color)",
              color: "var(--main_color)",
            }}
            contentArrowStyle={{ borderRight: "none" }}
            date={t("experiences.date6")}
            iconStyle={{
              background: "var(--bg_color)",
              color: "var(--main_color)",
            }}
            icon={<FaBriefcase />}
          >
            <h3 className={styles.vertical_timeline_title}>
              Terapia de bolso - TDB
            </h3>
            <h4 className={styles.vertical_timeline_subtitle}>
              {t("experiences.subtitle6")}
            </h4>
            <p className={styles.vertical_timeline_description}>
              {t("experiences.description6")}
            </p>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </section>
    </Transition>
  );
};

export default Experiences;
