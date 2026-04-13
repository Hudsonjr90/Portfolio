import styles from "./Experiences.module.css";

import Transition from "../../components/Transition/Transition";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { FaFileContract, FaChevronDown } from "react-icons/fa6";
import { AnimatePresence, motion as m } from "framer-motion";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import ParticlesB from "../../components/Particles/ParticlesB";
import experiencesServer, { Experience } from "../../data/experiencesServer";
import testimonialServer from "../../data/testimonialsServer";
import OrbitExperiences from "../../components/Experiences/OrbitExperiences";
import { motion } from "framer-motion";

interface TranslatedTestimonial {
  name: string;
  text: string;
  img: string;
  company: string;
}

interface TimelineElementProps extends Experience {
  testimonials: TranslatedTestimonial[];
  isOpen: boolean;
  onMasterToggle: () => void;
}

const TimelineElement = ({
  title,
  subtitle,
  description,
  image,
  date,
  testimonials,
  isOpen,
  onMasterToggle,
}: TimelineElementProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (!isOpen) setExpandedIndex(null);
  }, [isOpen]);

  const handleToggle = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
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

      {testimonials.length > 0 && (
        <div className={styles.timeline_testimonials}>
          <button
            className={styles.timeline_testimonials_master}
            onClick={onMasterToggle}
            aria-expanded={isOpen}
          >
            <FaChevronDown
              className={`${styles.timeline_testimonial_chevron} ${
                isOpen ? styles.chevron_open : ""
              }`}
            />
            {t("menu.testimonials")} ({testimonials.length})
          </button>

          <AnimatePresence>
            {isOpen && (
              <m.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className={styles.timeline_testimonials_list}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className={styles.timeline_testimonial_item}>
                    <button
                      className={styles.timeline_testimonial_header}
                      onClick={() => handleToggle(index)}
                      aria-expanded={expandedIndex === index}
                    >
                      <img
                        src={testimonial.img}
                        alt={testimonial.name}
                        className={styles.timeline_testimonial_avatar}
                      />
                      <strong className={styles.timeline_testimonial_name}>
                        {testimonial.name}
                      </strong>
                      <FaChevronDown
                        className={`${styles.timeline_testimonial_chevron} ${
                          expandedIndex === index ? styles.chevron_open : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {expandedIndex === index && (
                        <m.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className={styles.timeline_testimonial_body}
                        >
                          <p className={styles.timeline_testimonial_text}>
                            {testimonial.text}
                          </p>
                        </m.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </m.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </VerticalTimelineElement>
  );
};

const Experiences = () => {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);
  const [openTestimonialIndex, setOpenTestimonialIndex] = useState<number | null>(null);

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

  const translatedTestimonials: TranslatedTestimonial[] = testimonialServer
    .filter((testimonial) => testimonial.company)
    .map((testimonial) => ({
      name: testimonial.title,
      text: t(testimonial.subtitle),
      img: testimonial.img,
      company: testimonial.company!,
    }));

  const mobileExperiences = [...translatedExperiences].reverse();

  return (
    <Transition onAnimationComplete={() => {}}>
      <ParticlesB />

      <section className={styles.experiences}>
        <h2 className={styles.heading}>
          {t("experiences.title")}
          <span>
            {t("experiences.text")} <FaFileContract />
          </span>
        </h2>

        {isMobile ? (
          <VerticalTimeline>
            {mobileExperiences.map((experience, index) => {
              const expTestimonials = translatedTestimonials.filter(
                (testimonial) => testimonial.company === experience.title
              );
              return (
                <TimelineElement
                  key={index}
                  testimonials={expTestimonials}
                  isOpen={openTestimonialIndex === index}
                  onMasterToggle={() =>
                    setOpenTestimonialIndex((prev) => (prev === index ? null : index))
                  }
                  {...experience}
                />
              );
            })}
          </VerticalTimeline>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: "0%" }}
            transition={{
              duration: 1,
              delay: 0.3,
              ease: [0.2, 0, 0.2, 1],
            }}
          >
            <OrbitExperiences
              experiences={translatedExperiences}
              testimonials={translatedTestimonials}
            />
          </motion.div>
        )}
      </section>
    </Transition>
  );
};

export default Experiences;
