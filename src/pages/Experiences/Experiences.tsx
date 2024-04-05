import styles from "./Experiences.module.css";

import Transition from "../../components/Transition";
import { useTranslation } from "react-i18next";

import { FaBriefcase } from "react-icons/fa6";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import Particles from "react-tsparticles";
import { Engine, IOptions } from 'tsparticles-engine';
import { loadFull } from "tsparticles";
import { useTheme } from "../../context/ThemeContext";
import { useCallback, useState } from "react";

type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
      ? RecursivePartial<U>[]
      : T[P] extends object
      ? RecursivePartial<T[P]>
      : T[P];
};

const Experiences = () => {
  const { t } = useTranslation();

  const particlesInit = useCallback((engine: Engine) => {
    loadFull(engine)
    return Promise.resolve();
}, []);

 const {mainColor} = useTheme();

 const particlesConfig: RecursivePartial<IOptions> = {
    particles: {
      number: {
        value: 50,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: mainColor
      },
      shape: {
        type: "polygon",
        stroke: {
          width: 0,
          color: mainColor
        },
        polygon: {
          sides: 3
        }
      },
      opacity: {
        value: 1,
        random: true,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: true,
          speed: 4.872463273808071,
          size_min: 0.1,
          sync: false
        }
      },
      line_linked: {
        enable: false,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 4,
        direction: "top-right",
        random: false,
        straight: true,
        out_mode: "out",
        bounce: false,
        attract: { enable: false, rotateX: 600, rotateY: 1200 }
      }
    },
    interactivity: {
      events: {
        onhover: {
          enable: true,
          mode: "repulse"
        },
        onclick: {
          enable: false,
          mode: "push"
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 400,
          line_linked: {
            opacity: 1
          }
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3
        },
        repulse: {
          distance: 150,
          duration: 0.4
        },
        push: {
          particles_nb: 4
        },
        remove: {
          particles_nb: 2
        }
      }
    },
    retina_detect: true
  }

  return (
    <Transition onAnimationComplete={() => {}}>
      <Particles options={particlesConfig} init={particlesInit} />
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
             Eterj/Capitona Rio
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
            date={t("experiences.date5")}
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

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{
              background: "var(--bg_color)",
              color: "var(--main_color)",
            }}
            contentArrowStyle={{ borderRight: "none" }}
            date={t("experiences.date7")}
            iconStyle={{
              background: "var(--bg_color)",
              color: "var(--main_color)",
            }}
            icon={<FaBriefcase />}
          >
            <h3 className={styles.vertical_timeline_title}>
              Cubo Connect
            </h3>
            <h4 className={styles.vertical_timeline_subtitle}>
              {t("experiences.subtitle6")}
            </h4>
            <p className={styles.vertical_timeline_description}>
              {t("experiences.description7")}
            </p>
          </VerticalTimelineElement>
          
        </VerticalTimeline>
      </section>
    </Transition>
  );
};

export default Experiences;
