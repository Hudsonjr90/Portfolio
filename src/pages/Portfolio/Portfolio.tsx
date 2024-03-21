// CSS
import "./Portfolio.css";
import styles from "./Portfolio.module.css";
// HOOKS
import { useState, useEffect, useCallback } from "react";
// REACT ROUTER DOM
import { NavLink } from "react-router-dom";
// COMPONENT
import Transition from "../../components/Transition";
import { useTranslation } from "react-i18next";
import Particles from "react-tsparticles";
import { Engine, IOptions } from 'tsparticles-engine';
import { loadFull } from "tsparticles";
import { useTheme } from "../../context/ThemeContext";
// SWIPER
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
// IMAGENS
import web from "/imgs/imgProjects/web.png";
import pokedex from "/imgs/imgProjects/pokedex.png";
import memory from "/imgs/imgProjects/memory.png";
import pacman from "/imgs/imgProjects/pacman.png";
import clima from "/imgs/imgProjects/clima.png";
import clock from "/imgs/imgProjects/clock.png";
import card from "/imgs/imgProjects/card.png";
import calendar from "/imgs/imgProjects/calendar.png";
import pizza from "/imgs/imgProjects/pizza.png";
import login from "/imgs/imgProjects/login.png";
import conversor from "/imgs/imgProjects/conversor.png";



type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
      ? RecursivePartial<U>[]
      : T[P] extends object
      ? RecursivePartial<T[P]>
      : T[P];
};

const Portfolio = () => {
  const { t } = useTranslation();

  const [slidePerview, setSlidePerview] = useState<number>(3);
  const [initialSlide] = useState<number>(3);
  const [transitionCompleted, setTransitionCompleted] = useState(false);

  const data = [
    {
      id: 0,
      image: web,
      name: "React Website",
      description:
        "Website simples, seguindo orientação a objetos do Curso na Udemy",
      technologies: [
        "React",
        "Hooks",
        "React Router",
        "React Icons",
        "Typescript",
        "Styled-Components",
        "NodeJs",
        "CSS",
        "HTML",
      ],
      linkDeploy: "https://reactwebsite-puce.vercel.app",
      linkRepository: "https://github.com/Hudsonjr90/reactwebsite",
    },

    {
      id: 1,
      image: pokedex,
      name: "Pokedex React",
      description:
        "Pokedex listando pokémons e suas informações, usando lazy loading e filter.",
      technologies: [
        "React",
        "React Router Dom",
        "Context API",
        "Typescript",
        "Javascript",
        "Material UI",
        "CSS",
        "HTML",
      ],
      linkDeploy: "https://pokdex-react.vercel.app",
      linkRepository: "https://github.com/Hudsonjr90/PokedexReact",
    },

    {
      id: 2,
      image: memory,
      name: "Memory React Game",
      description:
        "Jogo criado em React, feito com Typescript, para poder praticar e exercitar um pouco mais na linguagem. Jogo simples, cujo ainda terá algumas atualizações e modificações também.",
      technologies: ["React", "Typescript", "CSS", "NodeJs", "Bootstrap"],
      linkDeploy: "https://reactmemorygame.vercel.app",
      linkRepository: "https://github.com/Hudsonjr90/Reactmemorygame",
    },
    {
      id: 3,
      image: pacman,
      name: "Pacman Game",
      description:
        "Uma homenagem histórica e uma recriação precisa do jogo de fliperama original Pac-Man.",
      technologies: ["Javascript", "Jquery", "Python", "Html", "CSS"],
      linkDeploy: "https://pacman-retro-game.vercel.app",
      linkRepository: "https://github.com/Hudsonjr90/Pacman_RetroGame",
    },
    {
      id: 4,
      image: clima,
      name: "Weather API",
      description:
        "App Criado com HTML, CSS e Javascript, consumindo a WeatherAPI, para mostrar as informações de cada cidade.",
      technologies: [
        "Javascript",
        "API Weather",
        "API CountryFlag",
        "API Unsplash",
        "Html",
        "CSS",
      ],
      linkDeploy: "https://climatempoapi.vercel.app",
      linkRepository: "https://github.com/Hudsonjr90/climatempoAPI",
    },
    {
      id: 5,
      image: clock,
      name: "React Clock",
      description:
        "Um relógio analógico e um relógio digital, feito com TypeScript e Styled-Components",
      technologies: ["React", "Typescript", "Styled-Components", "CSS", "Html"],
      linkDeploy: "https://analog-clock-dm.vercel.app",
      linkRepository: "https://github.com/Hudsonjr90/RelogioAnalogicoJs",
    },
    {
      id: 6,
      image: card,
      name: "CreditCard-Form Vue",
      description:
        "Um formulário de cartão de crédito com microinterações suaves e agradáveis. Inclui formatação de números, validação e detecção automática de tipo de cartão. Construído com vuejs e totalmente responsivo.",
      technologies: ["Vue", "Javascript", "Sass/Scss", "NodeJs", "i18n"],
      linkDeploy: "https://credit-card-form-payment.vercel.app",
      linkRepository: "https://github.com/Hudsonjr90/CreditCard-Form",
    },
    {
      id: 7,
      image: calendar,
      name: "Swiss Calendar Angular17",
      description: "Rastreador de Feriados do Cantão Suíço",
      technologies: [
        "Angular17",
        "Typescript",
        "Sass/Scss",
        "Karma",
        "Jasmine",
      ],
      linkDeploy: "https://swiss-holiday-tracker.vercel.app",
      linkRepository: "https://github.com/Hudsonjr90/swiss-holiday-tracker",
    },
    {
      id: 8,
      image: pizza,
      name: "Pizza&Tutti",
      description:
        "Landing page, da pizzaria Pizza&Tutti, uma das melhores do Rio de Janeiro.",
      technologies: ["Javascript", "Html", "Sass/Scss"],
      linkDeploy: "https://www.pizzaetutti.com.br/",
      linkRepository: "https://github.com/Hudsonjr90/Pizzaria",
    },
    {
      id: 9,
      image: login,
      name: "Login Page Screen",
      description: "Tela de login animada, feita para praticar",
      technologies: ["Javascript", "Html", "Css"],
      linkDeploy: "https://sign-in-up-form.vercel.app",
      linkRepository: "https://github.com/Hudsonjr90/Sign-in-up-Form",
    },
    {
      id: 10,
      image: conversor,
      name: "World Currency Converter",
      description: "Conversor de Moedas Mundial, feito no curso da Udemy",
      technologies: ["Javascript", "Html", "Css"],
      linkDeploy: "https://conversor-de-moedas-mundial.vercel.app",
      linkRepository: "https://github.com/Hudsonjr90/ConversorDeMoedasMundial",
    },
    // {
    //   id: 11,
    //   image: ,
    //   name: "Dashboard CRM",
    //   description: "",
    //   technologies: ["", "", "", "", "", "", "", "", "",],
    //   linkDeploy: "",
    //   linkRepository: "",
    // },
    // {
    //   id: 12,
    //   image: ,
    //   name: "",
    //   description: "",
    //   technologies: ["", "", "", "", "", "", "", "", "",],
    //   linkDeploy: "",
    //   linkRepository: "",
    // },
    // {
    //   id: 13,
    //   image: ,
    //   name: "",
    //   description: "",
    //   technologies: ["", "", "", "", "", "", "", "", "",],
    //   linkDeploy: "",
    //   linkRepository: "",
    // },
    // {
    //   id: 14,
    //   image: ,
    //   name: "",
    //   description: "",
    //   technologies: ["", "", "", "", "", "", "", "", "",],
    //   linkDeploy: "",
    //   linkRepository: "",
    // },
    // {
    //   id: 15,
    //   image: ,
    //   name: "",
    //   description: "",
    //   technologies: ["", "", "", "", "", "", "", "", "",],
    //   linkDeploy: "",
    //   linkRepository: "",
    // }
  ];

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 580) {
        setSlidePerview(1);
      } else {
        setSlidePerview(3);
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

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
    <Transition onAnimationComplete={() => setTransitionCompleted(true)}>
      {transitionCompleted && (
        <section className={styles.portfolio}>
          <Particles options={particlesConfig} init={particlesInit} />
          <h2 className={styles.heading}>
            <span>//</span> {t("projects.title")}{" "}
            <span>{t("projects.text")}</span>
          </h2>

          <Swiper
            className="animation-cards"
            modules={[EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            loop={false}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
            }}
            autoplay={true}
            slidesPerView={slidePerview}  
            pagination={{ clickable: true }}
            navigation
            initialSlide={initialSlide}
          >
            {data.map((item) => (
              <SwiperSlide key={item.id} className="teste">
                <div className={styles.portfolio_container}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className={styles.item_slide}
                  />
                  <div className={styles.portfolio_content}>
                    <h2 className={styles.name}>{item.name}</h2>
                    <p className={styles.description}>
                      {t(`projects.data.${item.id}.description`)}
                    </p>

                    <div className={styles.technologies}>
                      <h3>{t("projects.subtitle")}</h3>
                      <ul>
                        {item.technologies &&
                          item.technologies.map((tech, index) => (
                            <li key={index}>{tech}</li>
                          ))}
                      </ul>
                    </div>

                    <div className={styles.links}>
                      <NavLink
                        to={item.linkDeploy || ""}
                        className={styles.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Deploy
                      </NavLink>

                      <NavLink
                        to={item.linkRepository || ""}
                        className={styles.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Code
                      </NavLink>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      )}
    </Transition>
  );
};

export default Portfolio;
