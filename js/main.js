//animação máquina de escrever
document.addEventListener("DOMContentLoaded", function() {
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

// Função para trocar para inglês
function loadEnglishContent() {
  document.getElementById('menu-inicio').textContent = 'Home';
  document.getElementById('menu-sobre').textContent = 'About';
  document.getElementById('menu-portfolio').textContent = 'Portfolio';
  document.getElementById('menu-contato').textContent = 'Contact';
  document.getElementById('titulo-principal').textContent = 'Hudson Kennedy';
    document.getElementById('texto-principal').textContent = 'Fullstack Developer / Software Engineer.';
    document.getElementById('saiba-mais').textContent = 'Learn more';
    document.getElementById('titulo-sobre-mim').textContent = 'About Me';
    document.getElementById('texto-sobre-mim').innerHTML = `
        In contact with the technology field for over 10 years, where I started developing in VB.net,
        during the learning journey, I took some courses. In 2018, I started my degree in Business
        Process Management and graduated in 2020. During this period, I continued to be in touch with
        the technology field, where I began studying JavaScript and TypeScript, to work specifically on
        the Frontend, for which I also took various courses to improve myself and evolve professionally.</br>
        In 2021, I started my MBA in Software Engineering, graduated in 2022 where I learned many things
        about Backend, and so on...</br>
        In February 2023, I started my Master's degree as part of the Computer Science graduate program
        at Harvard University and graduated.</br>
        I will continue to improve myself as a Fullstack Developer and Software Engineer, gaining more
        experience and contributing to my team!
    `;
    document.getElementById('openModalBtn').textContent = 'Resume';
    document.getElementById('titulo-modal').textContent = 'Choose the CV language';
    document.getElementById('inglesBtn').textContent = 'English';
    document.getElementById('portuguesBtn').textContent = 'Portuguese';
}

// Função para trocar para português
function loadPortugueseContent() {
  document.getElementById('menu-inicio').textContent = 'Início';
  document.getElementById('menu-sobre').textContent = 'Sobre';
  document.getElementById('menu-portfolio').textContent = 'Portfólio';
  document.getElementById('menu-contato').textContent = 'Contato';
  document.getElementById('titulo-principal').textContent = 'Hudson Kennedy';
    document.getElementById('texto-principal').textContent = 'Desenvolvedor Fullstack / Engenheiro de Software.';
    document.getElementById('saiba-mais').textContent = 'Saiba mais';
    document.getElementById('titulo-sobre-mim').textContent = 'Sobre mim';
    document.getElementById('texto-sobre-mim').innerHTML = `
        Em contato com a área de tecnologia por mais de 10 anos, onde comecei a desenvolver em VB.net,
        durante a jornada de aprendizado, fui fazendo alguns cursos, em 2018 iniciei meu Tecnólogo em
        processos gerenciais e me formei em 2020, neste período continuei em contato com a área de tecnologia,
        onde comecei a estudar Javascript e Typescript, para trabalhar especificamente no Frontend, que também fiz
        diversos cursos para me aprimorar, e evoluir profissionalmente.</br>
        Em 2021 iniciei o MBA em Engenharia de Software, me formei em 2022 onde aprendi muitas coisas sobre
        Backend e etc...</br>
        Em fevereiro de 2023 iniciei meu Mestrado que atua dentro do programa de pós-graduação em Ciência da
        Computação, na Universidade de Harvard e me formei.</br>
        Continuarei me aprimorando como Desenvolvedor Fullstack e Engenheiro de Software, adquirindo mais
        experiência e contribuindo com meu time!
    `;
    document.getElementById('openModalBtn').textContent = 'Currículo';
    document.getElementById('titulo-modal').textContent = 'Escolha o idioma do currículo';
    document.getElementById('inglesBtn').textContent = 'Inglês';
    document.getElementById('portuguesBtn').textContent = 'Português';

}


// Detectar o idioma do navegador
function detectLanguageAndLoadContent() {
const languageNavigator = navigator.language || navigator.userLanguage;

if (languageNavigator.startsWith('en')) {
    loadEnglishContent();
} else {
    loadPortugueseContent();
 }
}
detectLanguageAndLoadContent();

const openModalBtn = document.getElementById('openModalBtn');
const modal = document.getElementById('modal');
const portuguesBtn = document.getElementById('portuguesBtn');
const inglesBtn = document.getElementById('inglesBtn');


openModalBtn.addEventListener('click', () => {
  modal.style.display = 'block';
});

portuguesBtn.addEventListener('click', () => {
  window.open('./assets/cv/HudsonKennedy-BR.pdf', '_blank');
  modal.style.display = 'none';
});

inglesBtn.addEventListener('click', () => {
  window.open('./assets/cv/HudsonKennedy-US.pdf', '_blank');
  modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});
