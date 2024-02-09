// CSS
import "./Portfolio.css";
import styles from "./Portfolio.module.css";
// HOOKS
import { useState, useEffect, useRef } from "react";
// REACT ROUTER DOM
import { NavLink } from "react-router-dom";
// COMPONENT
import Transition from "../../components/Transition";
// SWIPER
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
// IMAGENS
import web from "/imgs/web.png";
import pokedex from "/imgs/pokedex.png";
import memory from "/imgs/memory.png";
import pacman from "/imgs/pacman.png";
import clima from "/imgs/clima.png";
import clock from "/imgs/clock.png";
import card from "/imgs/card.png";

const Portfolio = () => {
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
      name: "Jogo Da Memória React",
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
      technologies: [
        "Javascript",
        "Jquery",
        "Python",
        "Html",
        "CSS",
      ],
      linkDeploy: "https://pacman-retro-game.vercel.app",
      linkRepository: "https://github.com/Hudsonjr90/Pacman_RetroGame",
    },
    {
      id: 4,
      image: clima,
      name: "Clima Tempo API",
      description: "App Criado com HTML, CSS e Javascript, consumindo a WeatherAPI, para mostrar as informações de cada cidade.",
      technologies: [
        "Javascript", 
        "API Weather", 
        "API CountryFlag", 
        "API Unsplash", 
        "Html", 
        "CSS"
      ],
      linkDeploy: "https://climatempoapi.vercel.app",
      linkRepository: "https://github.com/Hudsonjr90/climatempoAPI",
    },
    {
      id: 5,
      image: clock ,
      name: "React Clock",
      description: "Um relógio analógico e um relógio digital, feito com TypeScript e Styled-Components",
      technologies: ["React", "Typescript", "Styled-Components", "CSS", "Html"],
      linkDeploy: "https://analog-clock-dm.vercel.app",
      linkRepository: "https://github.com/Hudsonjr90/RelogioAnalogicoJs",
    },
    {
      id: 6,
      image: card,
      name: "CreditCard-Form Vue",
      description: "Um formulário de cartão de crédito com microinterações suaves e agradáveis. Inclui formatação de números, validação e detecção automática de tipo de cartão. Construído com vuejs e totalmente responsivo.",
      technologies: ["Vue", "Javascript", "Sass", "NodeJs", "i18n"],
      linkDeploy: "https://credit-card-form-payment.vercel.app",
      linkRepository: "https://github.com/Hudsonjr90/CreditCard-Form",
    },
    // {
    //   id: 7,
    //   image: ,
    //   name: "",
    //   description: "",
    //   technologies: ["", "", ""],
    //   linkDeploy: "",
    //   linkRepository: "",
    // },
    // {
    //   id: 8,
    //   image: ,
    //   name: "",
    //   description: "",
    //   technologies: ["", "", ""],
    //   linkDeploy: "",
    //   linkRepository: "",
    // },
    // {
    //   id: 9,
    //   image: ,
    //   name: "",
    //   description: "",
    //   technologies: ["", "", ""],
    //   linkDeploy: "",
    //   linkRepository: "",
    // },
    // {
    //   id: 10,
    //   image: ,
    //   name: "",
    //   description: "",
    //   technologies: ["", "", ""],
    //   linkDeploy: "",
    //   linkRepository: "",
    // },
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

  return (
    <Transition onAnimationComplete={() => setTransitionCompleted(true)}>
      {transitionCompleted && (
        <section className={styles.portfolio}>
          <h2 className={styles.heading}>
            <span>//</span> Principais <span>Projetos</span>
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
                    <p className={styles.description}>{item.description}</p>

                    <div className={styles.technologies}>
                      <h3>Tecnologias Ultilizadas:</h3>
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
                        Código
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
