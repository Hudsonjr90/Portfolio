import { SetStateAction, useEffect, useState, useCallback } from "react";
import styles from "./Testimonials.module.css";
import Transition from "../../components/Transition";
import { motion, AnimatePresence } from "framer-motion";
import ReactPaginate from "react-paginate";
import { useTranslation } from "react-i18next";
import { wrap } from "popmotion";
import imagesDesktop from "../../components/config/imageServer";
import imagesMobile from "../../components/config/imageServerMobile";
import Particles from "react-tsparticles";
import { Engine, IOptions } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import { useTheme } from "../../context/ThemeContext";

type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
    ? RecursivePartial<T[P]>
    : T[P];
};

const Testimonials = () => {
  const { t } = useTranslation();
  const cardItems = [
    {
      id: 1,
      title: "Rafael Araujo",
      text: "Hudson é um profissional super dedicado e comprometido com a entrega, sempre demonstrou pro-atividade, desenvoltura, bem como a iniciativa e capacidade de resolver problemas de forma objetiva e com conhecimento técnico.",
    },
    {
      id: 2,
      title: "Fellipe Menezes",
      text: "Excelente parceiro de trabalho e uma ótima pessoa! Seu senso de responsabilidade se destaca dentre os demais, nunca deixando nada pra trás ou sem solução. Aprendi muito com o Hudson e com certeza levo esses aprendizados para a vida.",
    },
    {
      id: 3,
      title: "Luís Assis",
      text: "Hudson é um excelente parceiro de trabalho, sempre buscando aprimoramento e desenvolver novas habilidades. Está sempre disposto a ajudar. Dedicado e comprometido.",
    },
    {
      id: 4,
      title: "Tássia Felicio",
      text: "Profissional exemplar! Muito dedicado, assíduo resolutivo e proativo. E de uma ótima convivência interpessoal. Super recomendo!",
    },
    {
      id: 5,
      title: "Hirvin Faria",
      text: "Ótimo Profissional, sempre buscando aprender, melhorar e dominar novos assuntos. Auxiliando a equipe na resolução de problemas.",
    },
    {
      id: 6,
      title: "André Scott",
      text: "Hudson para mim, foi um excelente instrututor. Me ensinou a manusear uma plataforma, que nem de longe é da minha área. Profissional exemplar e de extrema capacidade. tem tudo para decolar em sua carreira de Desenvolvedor.",
    },
    {
      id: 7,
      title: "Igor Tudisco",
      text: "Trabalhei com o Hudson na Vilt. Mesmo sendo um período curto, tive a oportunidade de conhecer essa pessoa maravilhosa, bem animada e colaborativa. Participamos de treinamentos e alguns desafios juntos, durantes esse tempo ele como uma pessoa mais experiente se mostrou um bom orientador e um ótimo motivador para todos a sua volta e principalmente para as pessoas mais juniores. Sempre disposto a ajudar, ele será um grande aliado dentro de qualquer equipe.",
    },
    {
      id: 8,
      title: "Jailton Moreira",
      text: "Eu tive a oportunidade de trabalhar com o Hudson. Foi uma experiência muito interessante, pois se trata de um profissional muito dedicado e competente no quesito frontend. Uma grata surpresa e super recomendo. Sucesso Hudson!",
    },
    {
      id: 9,
      title: "Paulo Alberto",
      text: "Hudson é um profissional completo, sempre pró-ativo e disposto a ajudar, mas no tempo em que trabalhamos juntos ele se destacou realmente pela sua habilidade no desenvolvimento frontend e conhecimentos de UX/UI, sempre muito detalhista. Ele se tornou uma referência para mim, tenho certeza que irá contribuir muito na equipe que venha a fazer parte!",
    },
    {
      id: 10,
      title: "Bruno Carvalho",
      text: "Trabalhar com Hudson foi uma experiência excelente. Sua compreensão do FrontEnd é evidente em cada implementação e apoio ao time. Ele é proativo, criativo e sempre busca soluções inovadoras e elegantes.",
    },
    {
      id: 11,
      title: "João Paulo",
      text: "Tive o prazer de contar com o Hudson no meu time. Um desenvolvedor focado e criativo, sempre buscando solucionar os desafios que encontramos no projeto. Proativo e disponível para ajudar os colegas de time, visando o melhor para a entrega dos objetivos!",
    },
    {
      id: 12,
      title: "Éder Fialho",
      text: "Um ótimo profissional e profundo conhecedor na parte de Front-end, não se limitando a uso de frameworks para a 'magia' acontecer. Recomendado demais!",
    },
    {
      id: 13,
      title: "Gei Batista",
      text: "Eu tive o prazer de trabalhar com o colega Hudson Kennedy na equipe de desenvolvimento da Cast, no projeto MG-Florestas e posso atestar suas habilidades excepcionais e dedicação. Hudson é um desenvolvedor front-end talentoso e apaixonado, sempre demonstrando um profundo entendimento das mais recentes tecnologias e melhores práticas. Durante nosso tempo juntos na Cast, ele desempenhou um papel fundamental no sucesso do projeto. O que mais me impressionou em Hudson é a sua capacidade de enfrentar desafios complexos com criatividade e eficiência. Sua atenção aos detalhes e comprometimento com a entrega de produtos de alta qualidade sempre o destacaram. Além de suas habilidades técnicas impressionantes, Hudson foi membro incrível da equipe. Sua comunicação clara e disposição para colaborar tornaram o ambiente de trabalho mais produtivo e agradável. Recomendo Hudson sem reservas e estou confiante de que ele continuará a ter um impacto positivo onde quer que vá. Se você está procurando um desenvolvedor front-end talentoso e comprometido, Hudson Kennedy é a escolha certa. Sinta-se à vontade para entrar em contato se precisar de informações adicionais. Atenciosamente, Gei Batista.",
    },
    {
      id: 14,
      title: "Kauanne Nunes",
      text: "Hudson foi um dos candidatos que tive o prazer de conhecer. Uma pessoa muito educada, com uma história de vida incrível e levou o nosso bate-papo de uma maneira bem descontraída, sempre explicando com muita riqueza de detalhes as suas experiências. Um excelente perfil a ser avaliado.  ",
    },
    {
      id: 15,
      title: "Deborah Montezano",
      text: "Hudson é um perfeito profissional, comprometido no que faz, sempre conclui seus projetos com excelência",
    },
  ];

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
  };

  const [currentPage, setCurrentPage] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isFlipped, setFlipped] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handlePageClick = (data: { selected: SetStateAction<number> }) => {
    setCurrentPage(data.selected);
  };

  const pageCount = Math.ceil(cardItems.length / 1);
  const imageIndex = wrap(
    0,
    windowWidth > 768 ? imagesDesktop.length : imagesMobile.length,
    currentPage
  );

  const handleMouseEnter = () => {
    setFlipped(true);
  };

  const handleMouseLeave = () => {
    setFlipped(false);
  };

  const autoChangePage = () => {
    if (!isFlipped) {
      const nextPage = (currentPage + 1) % pageCount;
      setCurrentPage(nextPage);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(autoChangePage, 5000);

    return () => clearInterval(intervalId);
  }, [currentPage, pageCount, isFlipped]);

  const particlesInit = useCallback((engine: Engine) => {
    loadFull(engine);
    return Promise.resolve();
  }, []);

  const { mainColor } = useTheme();

  const particlesConfig: RecursivePartial<IOptions> = {
    particles: {
      number: {
        value: 50,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: mainColor,
      },
      shape: {
        type: "polygon",
        stroke: {
          width: 0,
          color: mainColor,
        },
        polygon: {
          sides: 3,
        },
      },
      opacity: {
        value: 1,
        random: true,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: true,
          speed: 4.872463273808071,
          size_min: 0.1,
          sync: false,
        },
      },
      line_linked: {
        enable: false,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 4,
        direction: "top-right",
        random: false,
        straight: true,
        out_mode: "out",
        bounce: false,
        attract: { enable: false, rotateX: 600, rotateY: 1200 },
      },
    },
    interactivity: {
      events: {
        onhover: {
          enable: true,
          mode: "repulse",
        },
        onclick: {
          enable: false,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 400,
          line_linked: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3,
        },
        repulse: {
          distance: 150,
          duration: 0.4,
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,
  };

  return (
    <Transition onAnimationComplete={() => {}}>
      <Particles options={particlesConfig} init={particlesInit} />
      <section className={styles.testimonials}>
        <h2 className={styles.heading}>
          <span>//</span>
          {t("testimonials.title")}
          <span>{t("testimonials.text")}</span>
        </h2>
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: "0%" }}
          transition={{
            duration: 2,
            delay: 0.7,
            ease: [0.2, 0, 0.2, 1],
          }}
          className={`${styles.slider_container} ${
            isFlipped ? styles.flipped : ""
          }`}
        >
          <AnimatePresence initial={false}>
            <motion.div
              className={styles.flipContent}
              key={`${currentPage}-${cardItems[imageIndex].id}`}
              onMouseLeave={handleMouseLeave}
            >
              <h3>{cardItems[imageIndex].title}</h3>
              <p>{t(`testimonials.cards.${imageIndex}.text`)}</p>
            </motion.div>
            <motion.img
              key={`${currentPage}-${cardItems[imageIndex].id}-img`}
              src={
                windowWidth > 768
                  ? imagesDesktop[imageIndex]
                  : imagesMobile[imageIndex]
              }
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className={`${styles.imgCard} ${
                isFlipped ? styles.flipAnimation : ""
              }`}
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              onMouseEnter={handleMouseEnter}
            />
          </AnimatePresence>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: "80%" }}
          animate={{ opacity: 1, y: "0%" }}
          transition={{
            duration: 2,
            delay: 0.3,
            ease: [0.3, 0, 0.2, 1],
          }}
        >
          <ReactPaginate
            previousLabel={"←"}
            nextLabel={"→"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            pageRangeDisplayed={5}
            marginPagesDisplayed={0}
            onPageChange={handlePageClick}
            containerClassName={styles.pagination}
            activeClassName={styles.activePage}
            forcePage={currentPage}
          />
        </motion.div>
      </section>
    </Transition>
  );
};

export default Testimonials;
