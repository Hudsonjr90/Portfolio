// IMAGENS
import web from "/imgs/imgProjects/web.webp";
import pokedex from "/imgs/imgProjects/pokedex.webp";
import memory from "/imgs/imgProjects/memory.webp";
import pacman from "/imgs/imgProjects/pacman.webp";
import clima from "/imgs/imgProjects/clima.webp";
import clock from "/imgs/imgProjects/clock.webp";
import card from "/imgs/imgProjects/card.webp";
import calendar from "/imgs/imgProjects/calendar.webp";
import login from "/imgs/imgProjects/login.webp";
import conversor from "/imgs/imgProjects/conversor.webp";
import sorteio from "/imgs/imgProjects/sorteio.webp";
import task from "/imgs/imgProjects/task.webp";
import imc from "/imgs/imgProjects/imc.webp";
import kfc from "/imgs/imgProjects/kfc.webp";
import pokeHistory from "/imgs/imgProjects/pokehistory.webp";
import barberShop from "/imgs/imgProjects/barber.webp";
import poll from "/imgs/imgProjects/poll.webp";
import nuxtNews from "/imgs/imgProjects/nuxt.webp";
import finance from "/imgs/imgProjects/finance.webp";
import onda from "/imgs/imgProjects/onda.webp";

const portfolioServer = [
  {
    id: 0,
    date: "2022-01",
    image: web,
    name: "React Website",
    descriptionKey: "projects.data.0.description",
    technologies: ["React", "Typescript", "Styled-Components"],
    linkDeploy: "https://reactwebsite-puce.vercel.app",
    linkRepository: "https://github.com/Hudsonjr90/reactwebsite",
  },
  {
    id: 1,
    date: "2023-06",
    image: pokedex,
    name: "Nuxt Vue Pokedex ",
    descriptionKey: "projects.data.1.description",
    technologies: ["NuxtJs", "Tailwind", "Typescript", "API Rest"],
    linkDeploy: "https://nuxt-pokedex-bay.vercel.app",
    linkRepository: "https://github.com/Hudsonjr90/NuxtPokedex",
  },
  {
    id: 2,
    date: "2022-03",
    image: memory,
    name: "Memory React Game",
    descriptionKey: "projects.data.2.description",
    technologies: ["React", "Typescript", "CSS", "NodeJs", "Bootstrap"],
    linkDeploy: "https://reactmemorygame.vercel.app",
    linkRepository: "https://github.com/Hudsonjr90/Reactmemorygame",
  },
  {
    id: 3,
    date: "2022-07",
    image: pacman,
    name: "Pacman Game",
    descriptionKey: "projects.data.3.description",
    technologies: ["Javascript", "Jquery", "Python", "Html", "CSS"],
    linkDeploy: "https://pacman-retro-game.vercel.app",
    linkRepository: "https://github.com/Hudsonjr90/Pacman_RetroGame",
  },
  {
    id: 4,
    date: "2021-08",
    image: clima,
    name: "Weather API",
    descriptionKey: "projects.data.4.description",
    technologies: ["Javascript", "API Weather", "Html", "CSS"],
    linkDeploy: "https://climatempoapi.vercel.app",
    linkRepository: "https://github.com/Hudsonjr90/climatempoAPI",
  },
  {
    id: 5,
    date: "2022-02",
    image: clock,
    name: "React Clock",
    descriptionKey: "projects.data.5.description",
    technologies: ["React", "Typescript", "Styled-Components"],
    linkDeploy: "https://analog-clock-dm.vercel.app",
    linkRepository: "https://github.com/Hudsonjr90/RelogioAnalogicoJs",
  },
  {
    id: 6,
    date: "2023-01",
    image: card,
    name: "CreditCard-Form Vue",
    descriptionKey: "projects.data.6.description",
    technologies: ["Vue", "Javascript", "Sass/Scss"],
    linkDeploy: "https://credit-card-form-payment.vercel.app",
    linkRepository: "https://github.com/Hudsonjr90/CreditCard-Form",
  },
  {
    id: 7,
    date: "2024-01",
    image: calendar,
    name: "Swiss Calendar Angular17",
    descriptionKey: "projects.data.7.description",
    technologies: ["Angular17", "Typescript", "Sass/Scss"],
    linkDeploy: "https://swiss-holiday-tracker.vercel.app",
    linkRepository: "https://github.com/Hudsonjr90/swiss-holiday-tracker",
  },
  {
    id: 8,
    date: "2021-06",
    image: login,
    name: "Login Page Screen",
    descriptionKey: "projects.data.8.description",
    technologies: ["Javascript", "Html", "Css"],
    linkDeploy: "https://sign-in-up-form.vercel.app",
    linkRepository: "https://github.com/Hudsonjr90/Sign-in-up-Form",
  },
  {
    id: 9,
    date: "2021-10",
    image: conversor,
    name: "World Currency Converter",
    descriptionKey: "projects.data.9.description",
    technologies: ["Javascript", "Html", "Css"],
    linkDeploy: "https://conversor-de-moedas-mundial.vercel.app",
    linkRepository: "https://github.com/Hudsonjr90/ConversorDeMoedasMundial",
  },
  {
    id: 10,
    date: "2026-03",
    image: sorteio,
    name: "Soccer Sort",
    descriptionKey: "projects.data.10.description",
    technologies: ["React", "Typescript", "MUI"],
    linkDeploy: "https://sorteiodostimes.vercel.app/",
    linkRepository: "https://github.com/Hudsonjr90/sorteiodostimes",
  },
  {
    id: 11,
    date: "2023-09",
    image: task,
    name: "Task App",
    descriptionKey: "projects.data.11.description",
    technologies: ["React", "Typescript", "Tailwind", "Redux"],
    linkDeploy: "https://taskapp-v1.vercel.app/",
    linkRepository: "https://github.com/Hudsonjr90/Task-app",
  },
  {
    id: 12,
    date: "2023-05",
    image: imc,
    name: "IMC Calculator",
    descriptionKey: "projects.data.12.description",
    technologies: ["Vue3", "Vuetify", "Typescript"],
    linkDeploy: "https://calcimc.vercel.app/",
    linkRepository: "https://github.com/Hudsonjr90/Calculadora-IMC",
  },
  {
    id: 13,
    date: "2022-09",
    image: kfc,
    name: "KFC Landing Page",
    descriptionKey: "projects.data.13.description",
    technologies: ["HTML", "CSS", "JS"],
    linkDeploy: "https://kfclandingpage.vercel.app",
    linkRepository: "https://github.com/Hudsonjr90/kfclandingpage",
  },
  {
    id: 14,
    date: "2022-11",
    image: pokeHistory,
    name: "Poke History",
    descriptionKey: "projects.data.14.description",
    technologies: ["HTML", "CSS", "JS"],
    linkDeploy: "https://pokedex-hudsonjr90.vercel.app",
    linkRepository: "https://github.com/Hudsonjr90/PokeHistory",
  },
  {
    id: 15,
    date: "2024-02",
    image: poll,
    name: "Poll App",
    descriptionKey: "projects.data.15.description",
    technologies: [
      "NestJS",
      "Fastify",
      "Prisma",
      "TypeScript",
      "React",
      "Material-UI",
      "Axios",
      "Docker",
      "PostgreSQL",
      "Websockets",
    ],
    linkDeploy: "https://poll-app-frontend-peach.vercel.app/",
    linkRepository: "https://github.com/Hudsonjr90/PollApp-Frontend",
  },
    {
    id: 16,
    date: "2024-05",
    image: nuxtNews,
    name: "Nuxt News",
    descriptionKey: "projects.data.16.description",
    technologies: [
      "Nuxt.js",
      "Vue.js",
      "Axios",
      "Tailwind CSS",
      "NewsAPI",
      "Pinia",
      "TypeScript",
      "Vite",
    ],
    linkDeploy: "https://nuxt-project-liart.vercel.app/",
    linkRepository: "https://github.com/Hudsonjr90/nuxtProject",
  },
    {
    id: 17,
    date: "2024-08",
    image: finance,
    name: "Finance App",
    descriptionKey: "projects.data.17.description",
    technologies: ["Nuxt.js", "Vue.js", "Pinia", "TypeScript", "Vite", "Quasar", "Sass", "Chart.js"],
    linkDeploy: "https://controle-financeiro-dev.vercel.app",
    linkRepository: "https://github.com/Hudsonjr90/controle-financeiro",
  },
  {
    id: 18,
    date: "2022-01",
    image: barberShop,
    name: "Barber shop",
    descriptionKey: "projects.data.18.description",
    technologies: ["NextJs", "React", "Sass", "Typescript", "Prisma", "NestJs"],
    linkDeploy: "",
    linkRepository: "",
  },
  {
    id: 19,
    date: "2025-03",
    image: onda,
    name: "Simple Banking App",
    descriptionKey: "projects.data.19.description",
    technologies: ["Next", "React", "Zustand", "TypeScript", "Vite", "Tailwind", "Sass", "Radix", "Shadcn", "Axios", "Sonner", "Zod"],
    linkDeploy: "https://ondafinance-tech.vercel.app",
    linkRepository: "https://github.com/Hudsonjr90/desafio-tech",
  }
];

export default portfolioServer;
