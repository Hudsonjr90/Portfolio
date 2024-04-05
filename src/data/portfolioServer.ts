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

const portfolioServer = [

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
    technologies: ["Angular17", "Typescript", "Sass/Scss", "Karma", "Jasmine"],
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
  //   name: "",
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

export default portfolioServer;
