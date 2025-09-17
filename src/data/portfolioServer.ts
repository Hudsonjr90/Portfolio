// IMAGENS
import web from '/imgs/imgProjects/web.webp'
import pokedex from '/imgs/imgProjects/pokedex.webp'
import memory from '/imgs/imgProjects/memory.webp'
import pacman from '/imgs/imgProjects/pacman.webp'
import clima from '/imgs/imgProjects/clima.webp'
import clock from '/imgs/imgProjects/clock.webp'
import card from '/imgs/imgProjects/card.webp'
import calendar from '/imgs/imgProjects/calendar.webp'
import login from '/imgs/imgProjects/login.webp'
import conversor from '/imgs/imgProjects/conversor.webp'
import sorteio from '/imgs/imgProjects/sorteio.webp'
import task from '/imgs/imgProjects/task.webp'
import imc from '/imgs/imgProjects/imc.webp'
import kfc from '/imgs/imgProjects/kfc.webp'
import pokeHistory from '/imgs/imgProjects/pokehistory.webp'
import barberShop from '/imgs/imgProjects/barber.webp'

const portfolioServer = [
  {
    id: 0,
    image: web,
    name: 'React Website',
    description:
      'Website simples, seguindo orientação a objetos do Curso na Udemy',
    technologies: ['React', 'Typescript', 'Styled-Components'],
    linkDeploy: 'https://reactwebsite-puce.vercel.app',
    linkRepository: 'https://github.com/Hudsonjr90/reactwebsite',
  },
  {
    id: 1,
    image: pokedex,
    name: 'Nuxt Vue Pokedex ',
    description: 'Pokedex usando API para consultar e listar Pokemóns',
    technologies: [
      'Vue 3',
      'NuxtJs',
      'Tailwind',
      'SCSS',
      'Typescript',
      'API Rest',
    ],
    linkDeploy: 'https://nuxt-pokedex-bay.vercel.app',
    linkRepository: 'https://github.com/Hudsonjr90/NuxtPokedex',
  },
  {
    id: 2,
    image: memory,
    name: 'Memory React Game',
    description:
      'Jogo criado com React e Typescript para exercitar um pouco mais na linguagem.',
    technologies: ['React', 'Typescript', 'CSS', 'NodeJs', 'Bootstrap'],
    linkDeploy: 'https://reactmemorygame.vercel.app',
    linkRepository: 'https://github.com/Hudsonjr90/Reactmemorygame',
  },
  {
    id: 3,
    image: pacman,
    name: 'Pacman Game',
    description:
      'Uma homenagem histórica e uma recriação precisa do jogo de fliperama original Pac-Man.',
    technologies: ['Javascript', 'Jquery', 'Python', 'Html', 'CSS'],
    linkDeploy: 'https://pacman-retro-game.vercel.app',
    linkRepository: 'https://github.com/Hudsonjr90/Pacman_RetroGame',
  },
  {
    id: 4,
    image: clima,
    name: 'Weather API',
    description:
      'App Criado com HTML, CSS e Javascript, consumindo a WeatherAPI, para mostrar as informações de cada cidade.',
    technologies: ['Javascript', 'API Weather', 'Html', 'CSS'],
    linkDeploy: 'https://climatempoapi.vercel.app',
    linkRepository: 'https://github.com/Hudsonjr90/climatempoAPI',
  },
  {
    id: 5,
    image: clock,
    name: 'React Clock',
    description:
      'Um relógio analógico e um relógio digital, feito com TypeScript e Styled-Components',
    technologies: ['React', 'Typescript', 'Styled-Components'],
    linkDeploy: 'https://analog-clock-dm.vercel.app',
    linkRepository: 'https://github.com/Hudsonjr90/RelogioAnalogicoJs',
  },
  {
    id: 6,
    image: card,
    name: 'CreditCard-Form Vue',
    description:
      'Um formulário de cartão de crédito, construído com vuejs e totalmente responsivo.',
    technologies: ['Vue', 'Javascript', 'Sass/Scss'],
    linkDeploy: 'https://credit-card-form-payment.vercel.app',
    linkRepository: 'https://github.com/Hudsonjr90/CreditCard-Form',
  },
  {
    id: 7,
    image: calendar,
    name: 'Swiss Calendar Angular17',
    description: 'Rastreador de Feriados do Cantão Suíço',
    technologies: ['Angular17', 'Typescript', 'Sass/Scss'],
    linkDeploy: 'https://swiss-holiday-tracker.vercel.app',
    linkRepository: 'https://github.com/Hudsonjr90/swiss-holiday-tracker',
  },

  {
    id: 8,
    image: login,
    name: 'Login Page Screen',
    description: 'Tela de login animada, feita para praticar',
    technologies: ['Javascript', 'Html', 'Css'],
    linkDeploy: 'https://sign-in-up-form.vercel.app',
    linkRepository: 'https://github.com/Hudsonjr90/Sign-in-up-Form',
  },
  {
    id: 9,
    image: conversor,
    name: 'World Currency Converter',
    description: 'Conversor de Moedas Mundial, feito no curso da Udemy',
    technologies: ['Javascript', 'Html', 'Css'],
    linkDeploy: 'https://conversor-de-moedas-mundial.vercel.app',
    linkRepository: 'https://github.com/Hudsonjr90/ConversorDeMoedasMundial',
  },
  {
    id: 10,
    image: sorteio,
    name: 'Soccer Sort',
    description:
      'Um pequeno app web para agilizar o sorteio dos times no futebol',
    technologies: ['HTML', 'CSS', 'JS'],
    linkDeploy: 'https://sorteiodostimes.vercel.app/',
    linkRepository: 'https://github.com/Hudsonjr90/sorteiodostimes',
  },
  {
    id: 11,
    image: task,
    name: 'Task App',
    description: 'Website de um organizador de tarefas (to-do list)',
    technologies: ['React', 'Typescript', 'Tailwind', 'Redux'],
    linkDeploy: 'https://taskapp-v1.vercel.app/',
    linkRepository: 'https://github.com/Hudsonjr90/Task-app',
  },
  {
    id: 12,
    image: imc,
    name: 'IMC Calculator',
    description: 'Calculadora IMC simples, para cálculo de massa corporal',
    technologies: ['Vue3', 'Vuetify', 'Typescript'],
    linkDeploy: 'https://calcimc.vercel.app/',
    linkRepository: 'https://github.com/Hudsonjr90/Calculadora-IMC',
  },
  {
    id: 13,
    image: kfc,
    name: "KFC Landing Page",
    description: "Landing Page simples, criado através de um teste técnico",
    technologies: ["HTML", "CSS", "JS"],
    linkDeploy: "https://kfclandingpage.vercel.app",
    linkRepository: "https://github.com/Hudsonjr90/kfclandingpage",
  },
  {
    id: 14,
    image: pokeHistory,
    name: "Poke History",
    description: "Projeto para pesquisar seus pokémons favoritos e saber sobre a história do mundo destas criaturinhas",
    technologies: ["HTML", "CSS", "JS"],
    linkDeploy: "https://pokedex-hudsonjr90.vercel.app",
    linkRepository: "https://github.com/Hudsonjr90/PokeHistory",
  },
  {
    id: 15,
    image: barberShop,
    name: "Barber shop",
    description: "Um site para um barbearia, com agendamento online.",
    technologies: ["NextJs", "React", "Sass", "Typescript", "Prisma", "NestJs"],
    linkDeploy: "",
    linkRepository: "",
  },
  // {
  //   id: 16,
  //   image: ,
  //   name: "",
  //   description: "",
  //   technologies: ["", "", "", "", "", "", "", "", "",],
  //   linkDeploy: "",
  //   linkRepository: "",
  // }
  // {
  //   id: 17,
  //   image: ,
  //   name: "",
  //   description: "",
  //   technologies: ["", "", "", "", "", "", "", "", "",],
  //   linkDeploy: "",
  //   linkRepository: "",
  // }
  // {
  //   id: 18,
  //   image: ,
  //   name: "",
  //   description: "",
  //   technologies: ["", "", "", "", "", "", "", "", "",],
  //   linkDeploy: "",
  //   linkRepository: "",
  // }
  // {
  //   id: 19,
  //   image: ,
  //   name: "",
  //   description: "",
  //   technologies: ["", "", "", "", "", "", "", "", "",],
  //   linkDeploy: "",
  //   linkRepository: "",
  // }
]

export default portfolioServer
