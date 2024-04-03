import { GrMysql } from "react-icons/gr";
import { GiPineapple } from "react-icons/gi";
import {
  FaGitAlt,
  FaNpm,
  FaYarn,
  FaGithub,
  FaBootstrap,
  FaShopify,
  FaJira,
  FaDocker,
  FaVuejs,
  FaNode,
  FaJava,
  FaPhp,
  FaPython,
  FaMarkdown,
  FaGitlab,
  FaWordpress,
} from "react-icons/fa6";
import {
  SiTailwindcss,
  SiNextdotjs,
  SiFigma,
  SiDotnet,
  SiVercel,
  SiVite,
  SiMaterialdesign,
  SiPostgresql,
  SiVuetify,
  SiGraphql,
  SiWebpack,
  SiSwagger,
  SiLaravel,
  SiSpringboot,
  SiCsharp,
  SiElectron,
  SiJenkins,
  SiJquery,
  SiLess,
  SiSass,
  SiAdobephotoshop,
  SiGoogleanalytics,
  SiGoogleads,
  SiTerraform,
  SiAnsible,
  SiKubernetes,
  SiExpress,
  SiJest,
  SiJasmine,
  SiPostman,
  SiCypress,
  SiAmazonaws,
} from "react-icons/si";
import {
  BiLogoTypescript,
  BiLogoReact,
  BiLogoAngular,
  BiLogoJavascript,
  BiLogoCss3,
  BiLogoHtml5,
  BiLogoFirebase,
  BiLogoRedux,
  BiLogoMongodb,
  BiLogoNetlify,
  BiLogoHeroku,
  BiBoltCircle,
} from "react-icons/bi";

const iconComponents: { [index: string]: React.ElementType } = {
  HTML: BiLogoHtml5,
  CSS: BiLogoCss3,
  JavaScript: BiLogoJavascript,
  React: BiLogoReact,
  Node: FaNode,
  Express: SiExpress,
  PostgreSQL: SiPostgresql,
  MySQL: GrMysql,
  Git: FaGitAlt,
  Typescript: BiLogoTypescript,
  Angular: BiLogoAngular,
  Firebase: BiLogoFirebase,
  Redux: BiLogoRedux,
  Vue: FaVuejs,
  Npm: FaNpm,
  Yarn: FaYarn,
  Sass: SiSass,
  Less: SiLess,
  Github: FaGithub,
  Bootstrap: FaBootstrap,
  Wordpress: FaWordpress,
  Shopify: FaShopify,
  Jira: FaJira,
  Docker: FaDocker,
  Java: FaJava,
  PHP: FaPhp,
  Python: FaPython,
  Markdown: FaMarkdown,
  Gitlab: FaGitlab,
  Pinia: GiPineapple,
  Vuetify: SiVuetify,
  Figma: SiFigma,
  Tailwind: SiTailwindcss,
  Material: SiMaterialdesign,
  GraphQL: SiGraphql,
  Webpack: SiWebpack,
  Swagger: SiSwagger,
  Laravel: SiLaravel,
  Springboot: SiSpringboot,
  Csharp: SiCsharp,
  Electron: SiElectron,
  Jenkins: SiJenkins,
  Jquery: SiJquery,
  Photoshop: SiAdobephotoshop,
  Analytics: SiGoogleanalytics,
  ADS: SiGoogleads,
  Terraform: SiTerraform,
  Ansible: SiAnsible,
  Kubernetes: SiKubernetes,
  Jest: SiJest,
  Jasmine: SiJasmine,
  MongoDB: BiLogoMongodb,
  Dotnet: SiDotnet,
  Netlify: BiLogoNetlify,
  Heroku: BiLogoHeroku,
  Vercel: SiVercel,
  Nextjs: SiNextdotjs,
  Vite: SiVite,
  Postman: SiPostman,
  Thunderclient: BiBoltCircle,
  Cypress: SiCypress,
  AWS: SiAmazonaws,
};

export default iconComponents;
