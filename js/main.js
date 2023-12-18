//animação máquina de escrever
document.addEventListener("DOMContentLoaded", function () {
  const titulo = document.querySelector("h1");
  typeWriter(titulo);
});

function typeWriter(elemento) {
  const textoOriginal = elemento.innerHTML;
  let isTyping = true;

  function escreverComEfeito(texto, i) {
    if (i < texto.length && isTyping) {
      elemento.innerHTML = texto.substring(0, i + 1);
      setTimeout(() => escreverComEfeito(texto, i + 1), 50);
    } else {
      isTyping = false;
      setTimeout(() => apagarComEfeito(texto), 1000);
    }
  }

  function apagarComEfeito(texto) {
    const tamanho = elemento.innerHTML.length;
    if (tamanho > 0) {
      elemento.innerHTML = texto.substring(0, tamanho - 1);
      setTimeout(() => apagarComEfeito(texto), 30);
    } else {
      isTyping = true;
      escreverComEfeito(texto, 0);
    }
  }

  escreverComEfeito(textoOriginal, 0);
}

document.addEventListener("DOMContentLoaded", function () {
  const titulo = document.querySelector("h3");
  typeWriter(titulo);
});

function typeWriter(elemento) {
  const textoOriginal = elemento.innerHTML;
  let isTyping = true;

  function escreverComEfeito(texto, i) {
    if (i < texto.length && isTyping) {
      elemento.innerHTML = texto.substring(0, i + 1);
      setTimeout(() => escreverComEfeito(texto, i + 1), 50);
    } else {
      isTyping = false;
      setTimeout(() => apagarComEfeito(texto), 1000);
    }
  }

  function apagarComEfeito(texto) {
    const tamanho = elemento.innerHTML.length;
    if (tamanho > 0) {
      elemento.innerHTML = texto.substring(0, tamanho - 1);
      setTimeout(() => apagarComEfeito(texto), 30);
    } else {
      isTyping = true;
      escreverComEfeito(texto, 0);
    }
  }

  escreverComEfeito(textoOriginal, 0);
}

/*---------------------navegação menu-----------------------*/
(() => {
  const hamburguerBtn = document.querySelector(".hamburguer-btn"),
    navMenu = document.querySelector(".nav-menu"),
    closeNavBtn = navMenu.querySelector(".close-nav-menu");

  hamburguerBtn.addEventListener("click", showNavMenu);
  closeNavBtn.addEventListener("click", hideNavMenu);

  function showNavMenu() {
    navMenu.classList.toggle("open");
  }

  function hideNavMenu() {
    navMenu.classList.toggle("open");
    fadeOutEffect();
  }
  function fadeOutEffect() {
    document.querySelector(".fade-out-effect").classList.add("active");
    setTimeout(() => {
      document.querySelector(".fade-out-effect").classList.remove("active");
    }, 300);
  }
  //attach an event handle to document
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("link-item")) {
      if (event.target.hash !== "") {
        event.preventDefault();
        const hash = event.target.hash;

        document.querySelector(".section.active").classList.add("hide");
        document.querySelector(".section.active").classList.remove("active");

        document.querySelector(hash).classList.add("active");
        document.querySelector(hash).classList.remove("hide");

        navMenu.querySelector(".active");
        // .classList.add("outer-shadow", "hover-in-shadow");
        navMenu
          .querySelector(".active")
          .classList.remove("active", "inner-shadow-mod");

        if (navMenu.classList.contains("open")) {
          event.target.classList.add("active", "inner-shadow-mod");

          hideNavMenu();
        } else {
          let navItems = navMenu.querySelectorAll(".link-item");
          navItems.forEach((item) => {
            if (hash === item.hash) {
              item.classList.add("active", "inner-shadow-mod");
            }
          });
          fadeOutEffect();
        }

        window.location.hash = hash;
      }
    }
  });
})();

/*---------------------portfolio filter e popup-----------------------*/

(() => {
  const filterContainer = document.querySelector(".portfolio-filter"),
    portfolioItemsContainer = document.querySelector(".portfolio-items"),
    portfolioItems = document.querySelectorAll(".portfolio-item");
  (popup = document.querySelector(".portfolio-popup")),
    (prevBtn = popup.querySelector(".pp-prev")),
    (nextBtn = popup.querySelector(".pp-next")),
    (closeBtn = popup.querySelector(".pp-close")),
    (projectDetailsContainer = popup.querySelector(".pp-details")),
    (projectDetailsBtn = popup.querySelector(".pp-projects-details-btn"));
  let itemIndex, slideIndex, screenshots;

  /*--------------filter portfolio items------------------- */
  filterContainer.addEventListener("click", (event) => {
    if (
      event.target.classList.contains("filter-item") &&
      !event.target.classList.contains("active")
    ) {
      // deactivate existing active 'filter-item'
      filterContainer
        .querySelector(".active")
        .classList.remove("outer-shadow", "active");
      // ativar novo 'filter-item'
      event.target.classList.add("active", "outer-shadow");
      const target = event.target.getAttribute("data-target");
      portfolioItems.forEach((item) => {
        if (target === item.getAttribute("data-category") || target === "all") {
          item.classList.remove("hide");
          item.classList.add("show");
        } else {
          item.classList.remove("show");
          item.classList.add("hide");
        }
      });
    }
  });

  portfolioItemsContainer.addEventListener("click", (event) => {
    if (event.target.closest(".portfolio-item-inner")) {
      const portfolioItem = event.target.closest(
        ".portfolio-item-inner"
      ).parentElement;
      //pegar o index do portfolioItem
      itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(
        portfolioItem
      );
      screenshots = portfolioItems[itemIndex]
        .querySelector(".portfolio-item-img img")
        .getAttribute("data-screenshots");
      //convertendo screeshots em array
      screenshots = screenshots.split(",");
      if (screenshots.length === 1) {
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
      } else {
        prevBtn.style.display = "block";
        nextBtn.style.display = "block";
      }
      slideIndex = 0;
      popupToggle();
      popupSlideshow();
      popupDetails();
    }
  });

  closeBtn.addEventListener("click", () => {
    popupToggle();
    if (projectDetailsContainer.classList.contains("active")) {
      popupDetailsToggle();
    }
  });

  function popupToggle() {
    popup.classList.toggle("open");
  }

  function popupSlideshow() {
    const imgSrc = screenshots[slideIndex];
    const popupImg = popup.querySelector(".pp-img");

    /*-----------ative o carregador até que o popupImg seja carregado----------------*/
    popup.querySelector(".pp-loader").classList.add("active");
    popupImg.src = imgSrc;
    popupImg.onload = () => {
      // loading desativado apos carregar o popupImg
      popup.querySelector(".pp-loader").classList.remove("active");
    };
    popup.querySelector(".pp-counter").innerHTML =
      slideIndex + 1 + "de" + screenshots.length;
  }

  //next slide
  nextBtn.addEventListener("click", () => {
    if (slideIndex === screenshots.length - 1) {
      slideIndex = 0;
    } else {
      slideIndex++;
    }
    popupSlideshow();
  });

  //prev slide
  prevBtn.addEventListener("click", () => {
    if (slideIndex === 0) {
      slideIndex = screenshots.length - 1;
    } else {
      slideIndex--;
    }
    popupSlideshow();
  });

  function popupDetails() {
    //quando portfolio-item-details nao existe
    if (!portfolioItems[itemIndex].querySelector(".portfolio-item-details")) {
      projectDetailsBtn.style.display = "none";
      return; /*fim da execução da função*/
    }
    projectDetailsBtn.style.display = "block";
    //pegar os detalhes do projeto
    const details = portfolioItems[itemIndex].querySelector(
      ".portfolio-item-details"
    );
    popup.querySelector(".pp-project-details").innerHTML = details.innerHTML;
    const title = portfolioItems[itemIndex].querySelector(
      ".portfolio-item-title"
    );
    popup.querySelector(".pp-title h2").innerHTML = title.innerHTML;
    const category = portfolioItems[itemIndex].dataset.category;
    popup.querySelector(".pp-project-category").innerHTML = category.replace(
      /-/g,
      ""
    );
  }

  projectDetailsBtn.addEventListener("click", () => {
    popupDetailsToggle();
  });

  function popupDetailsToggle() {
    if (projectDetailsContainer.classList.contains("active")) {
      projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
      projectDetailsBtn.querySelector("i").classList.add("fa-plus");
      projectDetailsContainer.classList.remove("active");
      projectDetailsContainer.style.maxHeight = 0 + "px";
    } else {
      projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
      projectDetailsBtn.querySelector("i").classList.add("fa-minus");
      projectDetailsContainer.classList.add("active");
      projectDetailsContainer.style.maxHeight =
        projectDetailsContainer.scrollHeight + "px";
      popup.scrollTo(0, projectDetailsContainer.offsetTop);
    }
  }
})();

/*------------------hide all sections except active----------------------- */
(() => {
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    if (!section.classList.contains("active")) {
      section.classList.add("hide");
    }
  });
})();

/*------------------Change language function----------------------- */

// Detectar o idioma do navegador
function detectLanguageAndLoadContent() {
  const languageNavigator = navigator.language || navigator.userLanguage;

  if (languageNavigator.startsWith("en")) {
    loadEnglishContent();
  }
}
detectLanguageAndLoadContent();

const openModalBtn = document.getElementById("openModalBtn");
const modal = document.getElementById("modal");
const portuguesBtn = document.getElementById("portuguesBtn");
const inglesBtn = document.getElementById("inglesBtn");

openModalBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

portuguesBtn.addEventListener("click", () => {
  downloadFile("./assets/cv/HudsonKennedy-BR.pdf");
  modal.style.display = "none";
});

inglesBtn.addEventListener("click", () => {
  downloadFile("./assets/cv/HudsonKennedy-US.pdf");
  modal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

function downloadFile(filePath) {
  const link = document.createElement("a");
  link.href = filePath;
  link.download = filePath.split("/").pop();
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const portuguesBtnDownload = document.getElementById("portuguesBtn");
const inglesBtnDownload = document.getElementById("inglesBtn");
const toast = document.querySelector(".toast");
const closeIcon = document.querySelector(".toast .close");
const progressnotify = document.querySelector(".progress-notify");

let timer1, timer2;

portuguesBtnDownload.addEventListener("click", () => {
  toast.classList.add("active");
  progressnotify.classList.add("active");
  toast.style.display = "block";

  timer1 = setTimeout(() => {
    toast.style.display = "none";
    toast.classList.remove("active");
  }, 5000);

  timer2 = setTimeout(() => {
    toast.style.display = "none";
    progressnotify.classList.remove("active");
  }, 5300);
});

inglesBtnDownload.addEventListener("click", () => {
  toast.classList.add("active");
  progressnotify.classList.add("active");
  toast.style.display = "block";

  timer1 = setTimeout(() => {
    toast.style.display = "none";
    toast.classList.remove("active");
  }, 5000);

  timer2 = setTimeout(() => {
    toast.style.display = "none";
    progressnotify.classList.remove("active");
  }, 5300);
});

closeIcon.addEventListener("click", () => {
  toast.style.display = "none";
  toast.classList.remove("active");

  setTimeout(() => {
    progressnotify.classList.remove("active");
  }, 300);

  clearTimeout(timer1);
  clearTimeout(timer2);
  toast.style.display = "none";
});

// Função para trocar para inglês
function loadEnglishContent() {
  document.getElementById("menu-inicio").textContent = "Home";
  document.getElementById("menu-sobre").textContent = "About";
  document.getElementById("menu-jobs").textContent = "Experiences";
  document.getElementById("menu-skills").textContent = "Skills";
  document.getElementById("menu-education").textContent = "Formations";
  document.getElementById("menu-portfolio").textContent = "Projects";
  document.getElementById("menu-contato").textContent = "Contact";
  document.getElementById("menu-in-b").textContent = "Home";
  document.getElementById("menu-so-b").textContent = "About";
  document.getElementById("menu-jo-b").textContent = "Experiences";
  document.getElementById("menu-sk-b").textContent = "Skills";
  document.getElementById("menu-ed-b").textContent = "Formations";
  document.getElementById("menu-po-b").textContent = "Projects";
  document.getElementById("menu-co-b").textContent = "Contact";
  document.getElementById("texto-principal").textContent =
    "Welcome to my portfolio.";
  document.getElementById("mobile-homename").textContent =
    "Welcome to my portfolio.";
  document.getElementById("texto-principal2").textContent =
    "Fullstack Developer / Software Engineer.";
  document.getElementById("home-name1").textContent = "Fullstack Developer";
  document.getElementById("home-name2").textContent = "Software Engineer";
  document.getElementById("titulo-sobre-mim").textContent = "About Me";
  document.getElementById(
    "texto-sobre-mim"
  ).innerHTML = `Enthusiast of the best web & mobile development technologies with experience
  of more than 10 years in the area of ​​information technology, working as an analyst/developer.
  Previously I worked in a digital solutions company, where I worked directly with allocated projects,
  in code maintenance/refactoring directives and procedures,
  using Angular with Typescript on the Front-End, Java with
  Springboot in the Back-End and PostgreSQL Database.
  In addition to my training in management processes and an MBA in software engineering, I completed
  recently completed my master's degree in computer science at Harvard University, where I deepened the
  my knowledge in areas such as artificial intelligence, cloud computing and security
  information. As a fullstack developer and software engineer, my goal is to continue
  improving, acquiring more experience and contributing to my team, delivering solutions
  quality, innovative and that generate value for customers.
  Passionate about my work, I always seek to learn more about software development, architecture,
  development of new products and services with cutting-edge technology, project standards,
  distributed solutions and scalable applications.`;
  document.getElementById("openModalBtn").textContent = "Resume";
  document.getElementById("titulo-modal").textContent =
    "Choose the CV language";
  document.getElementById("inglesBtn").textContent = "English";
  document.getElementById("portuguesBtn").textContent = "Portuguese";
  document.getElementById("jobs-title").textContent = "Experiences";
  document.getElementById("skills-title").textContent = "Skills";
  document.getElementById("education-title").textContent = "Formations";
  document.querySelectorAll(".anos").forEach(function (element) {
    element.textContent = "Years";
  });
  document.querySelectorAll(".ano").forEach(function (element) {
    element.textContent = "Year";
  });
  document.querySelectorAll(".meses").forEach(function (element) {
    element.textContent = "Months";
  });

  document.getElementById("freela-title").textContent =
    "99Freelas/Capitona Rio/ETERJ";
  document.getElementById("freela-name").textContent =
    "Freelancers/Personal Works";
  document.getElementById("freela-description").textContent =
    "I took an industrial IT course at ETERJ, and freelance work, using Angular Js, VB.net, HTML, Javascript, Jquery, Bootstrap, Sass.";
  document.getElementById("freela-date").textContent =
    "February 2012 - at moment";

  document.getElementById("dt3-title").textContent = "DT3 Group";
  document.getElementById("dt3-name").textContent =
    "E-commerce Analyst/Front-end Developer";
  document.getElementById("dt3-description").textContent =
    "Invoice issuance,marketplaces, website development in React.JS, image optimization and responsible for ERP Bling integration.";
  document.getElementById("dt3-date").textContent = "February 2019 - June 2021";

  document.getElementById("vilt-title").textContent =
    "VILT Brazil Information Systems";
  document.getElementById("vilt-name").textContent =
    "Full Technical Consultant";
  document.getElementById("vilt-description").textContent =
    "Fullstack consulting, working with Java and Spring Boot on the Backend and Angular/React on the Frontend, using Adobe Experience Manager (AEM) programs, providing services to various clients such as Porto, CVC, and more.";
  document.getElementById("vilt-date").textContent =
    "January 2022 - April 2022";

  document.getElementById("cast-title").textContent = "Cast Computing S.A.";
  document.getElementById("cast-name").textContent = "Fullstack Developer";
  document.getElementById("cast-description").textContent =
    "Working directly with external clients on code maintenance/refactoring directives, using Angular and TypeScript on the Frontend, as well as Java with Spring Boot on the Backend and PostgresSQL as the database.";
  document.getElementById("cast-date").textContent =
    "August 2022 - October 2023";

  document.getElementById("newer-title").textContent = "coming soon";
  document.getElementById("newer-name").textContent = "new job title";
  document.getElementById("newer-description").textContent =
    "new opportunity that will come";
  document.getElementById("newer-date").textContent = "arriving nearly";

  document.getElementById("hour-title").textContent = "24-hour courses";
  document.getElementById("hour-description").textContent =
    "Administrative Assistant Course";

  document.getElementById("fgv-title").textContent = "FGV";
  document.getElementById("fgv-description").textContent =
    "Digital Security Course";
  document.getElementById("sebrae-title-a").textContent = "SEBRAE";
  document.getElementById("sebrae-description-a").textContent =
    "Strategic Planning Course for Entrepreneurs";
  document.getElementById("sebrae-title-b").textContent = "SEBRAE";
  document.getElementById("sebrae-description-b").textContent =
    "Financial Strategy for Growth Course";
  document.getElementById("sebrae-title-c").textContent = "SEBRAE";
  document.getElementById("sebrae-description-c").textContent =
    "Digital Marketing for Entrepreneurs";
  document.getElementById("sebrae-title-d").textContent = "SEBRAE";
  document.getElementById("sebrae-description-d").textContent =
    "Customer Success Course (How to Win and Keep Customers)";
  document.getElementById("sebrae-title-e").textContent = "SEBRAE";
  document.getElementById("sebrae-description-e").textContent =
    "Financial Management Course";
  document.getElementById("sebrae-title-f").textContent = "SEBRAE";
  document.getElementById("sebrae-description-f").textContent =
    "Business Financial Education Course";
  document.getElementById("iv-title").textContent = "IV2 College";
  document.getElementById("iv-description").textContent =
    "M.E.R.N (MongoDB/Express/React/Node) ";
  document.getElementById("udemy-title").textContent = "Udemy";
  document.getElementById("udemy-description").textContent =
    "Basic to Advanced Javascript and Typescript Course";
  document.getElementById("vuejs-title").textContent = "VueJs Brazil";
  document.getElementById("vuejs-description").textContent =
    "Vuejs Course - Basic to Advanced";
  document.getElementById("adobe-title-a").textContent = "Adobe Profissional";
  document.getElementById("adobe-description-a").textContent =
    "AEM - Business Practitioner";
  document.getElementById("adobe-title-b").textContent = "Adobe Profissional";
  document.getElementById("adobe-description-b").textContent =
    "AEM - Front-end Developer";
  document.getElementById("dio-title-a").textContent = "Digital Innovation";
  document.getElementById("dio-description-a").textContent =
    "Component Architecture and front-end complexity management";
  document.getElementById("dio-title-b").textContent = "Digital Innovation";
  document.getElementById("dio-description-b").textContent =
    "Working with Components in React";
  document.getElementById("unica-title").textContent = "Single College of MG";
  document.getElementById("unica-description").textContent =
    "Postgraduate in Software Engineering";
  document.getElementById("harvard-title").textContent = "Harvard University";
  document.getElementById("harvard-description").textContent =
    "Masters degree which operates within graduate program in Science Computer";

  document.querySelectorAll(".estacio-title").forEach(function (element) {
    element.textContent = "Estacio de Sá college";
  });
  document.querySelectorAll(".estacio-description").forEach(function (element) {
    element.textContent = "Technologist Management Processeses";
  });

  document.getElementById("portfolio-title").textContent = "Projects";

  document.querySelectorAll(".project-title").forEach(function (element) {
    element.textContent = "Project view";
  });
  document.querySelectorAll(".brief").forEach(function (element) {
    element.textContent = "Project Brief";
  });
  document.querySelectorAll(".information").forEach(function (element) {
    element.textContent = "Project Information";
  });
  document.querySelectorAll(".tech-use").forEach(function (element) {
    element.textContent = "Technologies used";
  });
  document.querySelectorAll(".acessar").forEach(function (element) {
    element.textContent = "Acess";
  });
  document.getElementById("all-title").textContent = "All";
  document.getElementById("react-web").textContent =
    "Simple Reactjs website, following Udemy Course class guidance from OOP (Object Oriented Programming";
  document.getElementById("memory-game").textContent = "Memory Game";
  document.getElementById("memory-text").textContent =
    "Memory game made in React, to exercise Typescript.";
  document.getElementById("pizza-text").textContent =
    "Landing page, from Pizza&Tutti, one of the best in Rio de Janeiro.";
  document.getElementById("poke-text").textContent =
    "Pokedex listing some pokemons and informations.";
  document.getElementById("graph-title").textContent = "Chart Js";
  document.getElementById("graph-text").textContent =
    "Simple chart made to examples";
  document.getElementById("sort-title").textContent = "Soccer draw";
  document.getElementById("sort-text").textContent =
    "Simple application to draw soccer teams.";
  document.getElementById("login-title").textContent = "Animated login screen";
  document.getElementById("login-text").textContent =
    "Animated login screen made to practice";
  document.getElementById("conversor-title").textContent = "Currency Converter";
  document.getElementById("conversor-text").textContent =
    "World Currency Converter, made from Udemy course.";
  document.getElementById("ml-text").textContent =
    "Clone Design of the Mercado Livre page, made with Rocketseat.";
  document.getElementById("clock-title").textContent = "Analog Clock";
  document.getElementById("clock-text").textContent =
    "Analog clock with dark mode.";
  document.getElementById("imc-title").textContent = "BMI Calculator";
  document.getElementById("imc-text").textContent =
    "Basic BMI Calculator, to find out if you are overweight or not.";
  document.getElementById("flappy-text").textContent =
    "Classic Flappy Bird game, recreated through the Udemy course class.";
  document.getElementById("pacman-text").textContent = "Retro Game of Pacman";
  document.getElementById("clima-title").textContent = "Climate Weather API";
  document.getElementById("clima-text").textContent =
    "Simple Javascript application, to search for the climate and weather of cities around the world through the openweather API.";
  document.getElementById("form-title").textContent = "VueJs Credit Card Form";
  document.getElementById("form-text").textContent =
    "Application to fill out Credit Card form.";
  document.getElementById("fale-title").textContent = "Contact";
  document.getElementById("localiza-title").textContent = "Localization";
  document.getElementById("inicio-title").textContent = "Home";
  document.getElementById("kfc-text").textContent =
    "Landing Page, created through a technical test.";
  document.getElementById("coke-text").textContent =
    "Coca-Cola Card to practice hover and transform CSS.";
  document.getElementById("micro-text").textContent =
    "Home Page of Microsoft Corporation";
  document.getElementById("qrcode-text").textContent =
    "QR code generator made to practice methods in JavaScript.";
  document.getElementById("whats-title").textContent = "Talk on the WhatsApp";
  document.getElementById("mail-title").textContent = "Send an email";
  document.getElementById("dino-text").textContent =
    "Classic Dino Game, from Google Chrome.";
  document.getElementById("math-title").textContent = "Math Calculator";
  document.getElementById("math-text").textContent = "Basic math calculator.";
  document.getElementById("dash-text").textContent =
    "Dashboard with 3 category selects updated in cascade.";
  document.getElementById("text-btn1").textContent = "File";
  document.getElementById("text-btn2").textContent = "Downloaded";
  document.getElementById("swiss-title").textContent =
    "Angular17 Swiss Calendar";
  document.getElementById("swiss-text").textContent =
    "Swiss Canton Holiday Tracker";
}

/*------------------button play function----------------------- */

let buttonPlay = document.getElementById("button-play");
let buttonPause = document.getElementById("button-pause");
let isSpeaking = false;

// Função para atualizar o ícone do botão
function updatePlayButtonIcon(isPlaying) {
  if (isPlaying) {
    buttonPlay.querySelector("i").classList.remove("fa-circle-play");
    buttonPlay.querySelector("i").classList.add("fa-circle-pause");
    buttonPlay.setAttribute("title", "Pause");
  } else {
    buttonPlay.querySelector("i").classList.remove("fa-circle-pause");
    buttonPlay.querySelector("i").classList.add("fa-circle-play");
    buttonPlay.setAttribute("title", "Play");
  }
}

// Função para detectar o idioma do navegador e selecionar a voz apropriada
function selectVoiceByLanguage() {
  const userLang = navigator.language || navigator.userLanguage;
  let voice = "Brazilian Portuguese Male"; // Voz padrão para português

  if (userLang.startsWith("en")) {
    // Se o idioma do navegador for inglês, use uma voz em inglês
    voice = "US English Male"; // Exemplo de voz em inglês
  }

  return voice;
}

buttonPlay.addEventListener("click", () => {
  if (!isSpeaking) {
    let textoSobreMim = document.getElementById("texto-sobre-mim").textContent;

    // Use a API Text-to-Speech do Google para ler o texto em inglês ou português
    const synthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(textoSobreMim);

    // Defina a voz com base no idioma do navegador
    utterance.lang = selectVoiceByLanguage();

    utterance.rate = 1;

    synthesis.speak(utterance);

    isSpeaking = true;
    updatePlayButtonIcon(true);

    // Adicione um ouvinte de evento para detectar a conclusão da fala
    utterance.onend = () => {
      isSpeaking = false;
      updatePlayButtonIcon(false);
    };
  } else {
    // Pausar a fala
    window.speechSynthesis.cancel();
    isSpeaking = false;
    updatePlayButtonIcon(false);
  }
});

buttonPause.addEventListener("click", () => {
  // Pausar a fala
  window.speechSynthesis.pause();
  isSpeaking = false;
  updatePlayButtonIcon(false);
});

// Função para rolar suavemente para o topo da página
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Rola suavemente
  });
}

// Adicione um ouvinte de evento de clique a todos os botões com a classe "scroll-button"
const scrollButtons = document.querySelectorAll(".scroll-button");
scrollButtons.forEach((button) => {
  button.addEventListener("click", scrollToTop);
});

// Verifique a posição da janela e exiba ou oculte os botões com base na largura da tela
function toggleScrollButtons() {
  // Itera por todos os botões com a classe "scroll-button"
  scrollButtons.forEach((button) => {
    if (window.matchMedia("(max-width: 767px)").matches) {
      if (window.scrollY >= 200) {
        button.style.display = "block";
      } else {
        button.style.display = "none";
      }
    } else {
      button.style.display = "none";
    }
  });
}

// Adicione um ouvinte de evento de rolagem para mostrar/ocultar os botões
window.addEventListener("scroll", toggleScrollButtons);

// Adicione um ouvinte de evento de redimensionamento da tela
window.addEventListener("resize", toggleScrollButtons);

// Chame a função uma vez para verificar o estado inicial da página
toggleScrollButtons();

// Selecione o elemento do botão
const botaoHome = document.querySelector(".home-view");

// Função para verificar a largura da tela e mostrar/ocultar o botão
function atualizarExibicaoBotao() {
  if (window.innerWidth <= 767) {
    botaoHome.style.display = "block"; // Mostrar o botão em telas menores
  } else {
    botaoHome.style.display = "none"; // Ocultar o botão em telas maiores
  }
}

// Chame a função inicialmente e sempre que a janela for redimensionada
atualizarExibicaoBotao();
window.addEventListener("resize", atualizarExibicaoBotao);

// Captura todos os itens do menu
const menuItems = document.querySelectorAll(".menu-button");

// Função para remover a classe inner-shadow de todos os itens do menu, exceto o item fornecido
function removeInnerShadowFromAllExcept(selectedItem) {
  menuItems.forEach((item) => {
    if (item !== selectedItem) {
      item.classList.remove("inner-shadow", "active");
    }
  });
}

// Adiciona um evento de clique a cada item do menu
menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    // Remove a classe inner-shadow de todos os itens do menu, exceto o item clicado
    removeInnerShadowFromAllExcept(item);

    // Adiciona a classe inner-shadow ao item do menu clicado
    item.classList.add("inner-shadow", "active");
  });
});

// Função para abrir link do WhatsApp com mensagem personalizada
function openWhatsApp() {
  var message = encodeURIComponent(
    "Olá Hudson, gostaria de fazer um orçamento!"
  );
  var whatsappLink =
    "https://api.whatsapp.com/send?phone=5521969609121&text=" + message;
  window.open(whatsappLink, "_blank");
}

// Função para abrir link de e-mail com mensagem personalizada
function openEmail() {
  var subject = encodeURIComponent("Orçamento");
  var body = encodeURIComponent("Olá Hudson, gostaria de fazer um orçamento!");
  var emailLink =
    "mailto:hudsonhugo90@gmail.com?subject=" + subject + "&body=" + body;
  window.open(emailLink, "_blank");
}

// Adiciona eventos aos links
document
  .getElementById("whatsapp-link")
  .addEventListener("click", openWhatsApp);
document.getElementById("email-link").addEventListener("click", openEmail);

const scrollers = document.querySelectorAll(".scroller");

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  scrollers.forEach((scroller) => {
    scroller.setAttribute("data-animated", true);

    const scrollerInner = scroller.querySelector(".scroller__inner");

    Array.from(scrollerInner.children).forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    });
  });
}

window.addEventListener("scroll", () => {
  const menuContainer = document.querySelector(".menu-container");

  const scrollThreshold = 100;

  if (window.scrollY > scrollThreshold) {
    menuContainer.classList.add("scrolled");
  } else {
    menuContainer.classList.remove("scrolled");
  }
});
