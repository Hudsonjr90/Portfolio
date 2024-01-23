import styles from "./Experiences.module.css";

import { motion } from "framer-motion";
import Transition from "../../components/Transition";
import { FaBriefcase } from "react-icons/fa6";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

const Experiences = () => {
  return (
    <Transition onAnimationComplete={() => {}}>
      <section className={styles.experiences}>
        <h2 className={styles.heading}>
          <span>//</span> Minhas <span>Experiências</span>
        </h2>
        <VerticalTimeline>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{
              background: "var(--bg_color)",
              color: "var(--main_color)",
            }}
            contentArrowStyle={{ borderRight: "none" }}
            date="Fevereiro 2012 - até o momento"
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
              Freelancer/Projetos Pessoais
            </h4>
            <p className={styles.vertical_timeline_description}>
              Fiz curso de informática industrial na ETERJ, e trabalhos de
              freelancer, usando Angular Js, VB.net, HTML, Javascript, Jquery,
              Bootstrap, Sass.
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{
              background: "var(--bg_color)",
              color: "var(--main_color)",
            }}
            contentArrowStyle={{ borderRight: "none" }}
            date="Fevereiro 2019 - Junho 2021"
            iconStyle={{
              background: "var(--bg_color)",
              color: "var(--main_color)",
            }}
            icon={<FaBriefcase />}
          >
            <h3 className={styles.vertical_timeline_title}>DT3 Sports</h3>
            <h4 className={styles.vertical_timeline_subtitle}>
              Analista de E-commerce / Desenvolvedor Front-end
            </h4>
            <p className={styles.vertical_timeline_description}>
              Emissão de nota fiscal, nos marketplaces, migração do site em
              Wordpress para React com NodeJs, usando hooks, redux, router
              proptypes, emailjs/browser, swiper e etc.. otimização de imagens e
              responsável pela integração do ERP Bling
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{
              background: "var(--bg_color)",
              color: "var(--main_color)",
            }}
            contentArrowStyle={{ borderRight: "none" }}
            date="Janeiro 2022 - Abril 2022"
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
              Consultor Técnico Fullstack
            </h4>
            <p className={styles.vertical_timeline_description}>
              Consultoria Fullstack, trabalhando com Java e NodeJs no Backend e
              Angular/React no Frontend usando, ng-bootstrap ngrx/effects,
              ngrx/store-devtools ngx-owl-carousel-o, sweetalert e etc... além
              de programas da Plataforma Adobe Experience Manager(AEM),
              prestando serviços para Porto, CVC e etc.
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{
              background: "var(--bg_color)",
              color: "var(--main_color)",
            }}
            contentArrowStyle={{ borderRight: "none" }}
            date="Agosto 2022 - Outubro 2023"
            iconStyle={{
              background: "var(--bg_color)",
              color: "var(--main_color)",
            }}
            icon={<FaBriefcase />}
          >
            <h3 className={styles.vertical_timeline_title}>Cast Group Informática S.A.</h3>
            <h4 className={styles.vertical_timeline_subtitle}>
              Desenvolvedor Fullstack
            </h4>
            <p className={styles.vertical_timeline_description}>
              Atuando diretamente, nas diretivas e trativas de
              manutenção/refatoração de códigos, utilizando Java com springboot,
              NodeJs com Express no Backend PostgreSQL no banco de dados,
              Typescript com Angular e React no Frontend juntamente de algumas
              bibliotecas leaflet-draw, leaflet-geosearch, leaflet-spin leaflet.
              fullscreen, ng2-currency-mask, ng2-file-upload, ngx-bootstrap,
              ngx-mask, ngx-pagination, ngx-toastr, rxjs e etc...
            </p>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </section>
    </Transition>
  );
};

export default Experiences;
