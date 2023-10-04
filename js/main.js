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
/*---------------------navegação menu-----------------------*/
(() => {
  const hamburguerBtn = document.querySelector(".hamburguer-btn"),
    navMenu = document.querySelector(".nav-menu"),
    closeNavBtn = navMenu.querySelector(".close-nav-menu");

  hamburguerBtn.addEventListener("click", showNavMenu);
  closeNavBtn.addEventListener("click", hideNavMenu);

  function showNavMenu() {
    navMenu.classList.toggle("open");
    bodyScrollingToggle();
  }

  function hideNavMenu() {
    navMenu.classList.toggle("open");
    fadeOutEffect();
    bodyScrollingToggle();
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

        navMenu
          .querySelector(".active")
          .classList.add("outer-shadow", "hover-in-shadow");
        navMenu
          .querySelector(".active")
          .classList.remove("active", "inner-shadow");

        if (navMenu.classList.contains("open")) {
          event.target.classList.add("active", "inner-shadow");
          event.target.classList.remove("outer-shadow", "hover-in-shadow");

          hideNavMenu();
        } else {
          let navItems = navMenu.querySelectorAll(".link-item");
          navItems.forEach((item) => {
            if (hash === item.hash) {
              item.classList.add("active", "inner-shadow");
              item.classList.remove("outer-shadow", "hover-in-shadow");
            }
          });
          fadeOutEffect();
        }

        window.location.hash = hash;
      }
    }
  });
})();

/*---------------------about section tabs-----------------------*/
(() => {
  const aboutSection = document.querySelector(".about-section"),
    tabsContainer = document.querySelector(".about-tabs");

  tabsContainer.addEventListener("click", (event) => {
    if (
      event.target.classList.contains("tab-item") &&
      !event.target.classList.contains("active")
    ) {
      const target = event.target.getAttribute("data-target");
      //desativar 'tab-item' q esta ativo
      tabsContainer
        .querySelector(".active")
        .classList.remove("outer-shadow", "active");
      //ativar novo 'tab-item'
      event.target.classList.add("active", "outer-shadow");
      //desativar 'tab-content' q esta ativo
      aboutSection
        .querySelector(".tab-content.active")
        .classList.remove("active");
      //ativar novo 'tab-item'
      aboutSection.querySelector(target).classList.add("active");
    }
  });
})();

function bodyScrollingToggle() {
  document.body.classList.toggle("stop-scrolling");
}

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
    bodyScrollingToggle();
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
  window.open("./assets/cv/HudsonKennedy-BR.pdf", "_blank");
  modal.style.display = "none";
});

inglesBtn.addEventListener("click", () => {
  window.open("./assets/cv/HudsonKennedy-US.pdf", "_blank");
  modal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// Função para trocar para inglês
function loadEnglishContent() {
  document.getElementById("menu-inicio").textContent = "Home";
  document.getElementById("menu-sobre").textContent = "About";
  document.getElementById("menu-portfolio").textContent = "Projects";
  document.getElementById("menu-contato").textContent = "Contact";
  document.getElementById("titulo-principal").textContent = "Hudson Kennedy";
  document.getElementById("texto-principal").textContent =
    "Fullstack Developer / Software Engineer.";
  document.getElementById("saiba-mais").textContent = "Learn more";
  document.getElementById("titulo-sobre-mim").textContent = "About Me";
  document.getElementById("texto-sobre-mim").innerHTML = `
  In contact with the technology field for over 10 years, where I started developing in VB.net. During my learning journey, I took some courses. In 2018, 
  I began my degree in Business Process Management and graduated in 2020. During this time, I continued to be involved in the technology field,
   where I started studying Java Script and Type Script to work specifically on Frontend. I also took several courses to improve myself and grow professionally.</br>
  In 2021, I started my MBA in Software Engineering and graduated in 2022. I learned a lot about Backend and so on...</br>
  In February 2023, I started my Master's degree within the Computer Science postgraduate program at Harvard University and graduated.</br>
  I will continue to enhance myself as a Fullstack Developer and Software Engineer, gaining more experience and contributing to my team!
    `;
  document.getElementById("openModalBtn").textContent = "Resume";
  document.getElementById("titulo-modal").textContent =
    "Choose the CV language";
  document.getElementById("inglesBtn").textContent = "English";
  document.getElementById("portuguesBtn").textContent = "Portuguese";
  document.getElementById("experiencias").textContent = "Experiences";
  document.getElementById("tecnologias").textContent = "Technologies";
  document.getElementById("formacao-cursos").textContent = "Education/Courses";
  document.querySelectorAll(".anos").forEach(function (element) {
    element.textContent = "Years";
  });
  document.querySelectorAll(".ano").forEach(function (element) {
    element.textContent = "Year";
  });
  document.querySelectorAll(".meses").forEach(function (element) {
    element.textContent = "Months";
  });

  document.getElementById("cast-title").textContent = "Cast Group";
  document.getElementById("cast-name").textContent =
    "Fullstack Developer/Software engineer";
  document.getElementById("cast-description").textContent =
    "Working directly with external clients on code maintenance/refactoring directives, using Angular and TypeScript on the Frontend, as well as Java with Spring Boot on the Backend and PostgresSQL as the database.";
  document.getElementById("cast-date").textContent = "August 2022 - Present";

  document.getElementById("vilt-title").textContent =
    "VILT Brazil Information Systems";
  document.getElementById("vilt-name").textContent =
    "Full Technical Consultant";
  document.getElementById("vilt-description").textContent =
    "Fullstack consulting, working with Java and Spring Boot on the Backend and Angular/React on the Frontend, using Adobe Experience Manager (AEM) programs, providing services to various clients such as Porto, CVC, and more.";
  document.getElementById("vilt-date").textContent =
    "January 2022 - April 2022";

  document.getElementById("dt3-title").textContent = "DT3 Group";
  document.getElementById("dt3-name").textContent =
    "E-commerce Analyst/Front-end Developer";
  document.getElementById("dt3-description").textContent =
    "Invoice issuance,marketplaces, website development in React.JS, image optimization and responsible for ERP Bling integration.";
  document.getElementById("dt3-date").textContent = "February 2019 - June 2021";

  document.getElementById("freela-title").textContent =
    "Appen Projects/99Freelas/Capitona Rio";
  document.getElementById("freela-name").textContent =
    "Freelancers/Personal Works";
  document.getElementById("freela-description").textContent =
    "I did some freelance work with Shopify, Wordpress using, React, VueJs, Angular, Typescript, Vanilla Js, Jquery, Bootstrap and Sass.";
  document.getElementById("freela-date").textContent =
    "February 2018- at moment";

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
  document.getElementById("text-hotsite").textContent =
    "Test project, talking about the workday and the essentiality of ergonomics in the work environment";
  document.getElementById("search-title").textContent =
    "World population survey";
  document.getElementById("search-text").textContent =
    'Simple design, for researching the world population, through the "restworld" API';
  document.getElementById("react-web").textContent =
    "Simple website, following Udemy Course class guidance";
  document.getElementById("snake-game").textContent =
    'Famous snake game, which was a hit on the old Nokia "big brick", recreated to play/run in any browser';
  document.getElementById("memory-game").textContent = "Memory Game";
  document.getElementById("memory-text").textContent =
    "Memory game made in React, to exercise Typescript.";
  document.getElementById("pizza-text").textContent =
    "Landing page, from Pizza&Tutti, one of the best in Rio de Janeiro.";
  document.getElementById("naruto-game").textContent =
    "Naruto Run Game 2d made with effects";
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
  document.getElementById("calc-title").textContent = "Flex Calculator";
  document.getElementById("calc-text").textContent =
    "Simple Javascript application, to know which fuel should be used.";
  document.getElementById("nu-text").textContent =
    "Clone Nubank page design, made with Rocketseat.";
  document.getElementById("ml-text").textContent =
    "Clone Design of the Mercado Livre page, made with Rocketseat.";
  document.getElementById("clock-title").textContent = "Analog Clock";
  document.getElementById("clock-text").textContent =
    "Analog clock with dark mode.";
  document.getElementById("imc-title").textContent = "BMI Calculator";
  document.getElementById("imc-text").textContent =
    "Basic BMI Calculator, to find out if you are overweight or not.";
  document.getElementById("math-title").textContent = "Mathematical Calculator";
  document.getElementById("math-text").textContent =
    "Math Calculator, with the main operators for calculation, with Light or Dark layout mode";
  document.getElementById("flappy-text").textContent =
    "Classic Flappy Bird game, recreated through the Udemy course class.";
  document.getElementById("clima-title").textContent = "Climate Weather API";
  document.getElementById("clima-text").textContent =
    "Simple Javascript application, to search for the climate and weather of cities around the world through the openweather API.";
  document.getElementById("form-title").textContent = "Credit Card Form";
  document.getElementById("form-text").textContent =
    "Application to fill out Credit Card form.";
  document.getElementById("fale-title").textContent = "Contact";
  document.getElementById("localiza-title").textContent = "Localization";
  document.getElementById("inicio-title").textContent = "Home";
  document.getElementById("kfc-text").textContent =
    "Landing Page, created through a technical test.";
  document.getElementById("coke-text").textContent =
    "Coca-Cola Card to practice hover and transform CSS.";
  document.getElementById("qrcode-text").textContent =
    "QR code generator made to practice methods in JavaScript.";
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
