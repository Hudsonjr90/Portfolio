import styles from "./TestimonialComponent.module.css";
import { useTranslation } from "react-i18next";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import testimonialServer, { Testimonial } from "../../data/testimonialsServer";

const TimelineElement = ({ title, subtitle, img }: Testimonial) => (
  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={{
      background: "var(--second_bg_color)",
      color: "var(--main_color)",
      
    }}
    contentArrowStyle={{ borderRight: "20px solid var(--second_bg_color)" }}
    iconStyle={{
      background: "var(--main_color)",
      color: "var(--main_color)",
    }}
    icon={<img src={img} alt="mood" className={styles.testimonial_timeline_img}/>}
  >
    <h3 className={styles.testimonial_timeline_title}>{title}</h3>
    <p className={styles.testimonial_timeline_subtitle}>{subtitle}</p>
  </VerticalTimelineElement>
);

const TestimonialComponent = () => {
  const { t } = useTranslation();

  const translatedTestimonials = testimonialServer.map((testimonial) => ({
    ...testimonial,
    subtitle: t(testimonial.subtitle),
  }));

  return (
    <VerticalTimeline>
      {translatedTestimonials.map((testimonial,index) => (
        <TimelineElement
          key={index}
          subtitle={testimonial.subtitle}
          title={testimonial.title}
          img={testimonial.img}         
          />
      ))}
    </VerticalTimeline>
  );
};

export default TestimonialComponent;
