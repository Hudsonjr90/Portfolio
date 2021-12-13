//animação maquina de escrever
function typeWriter(elemento) {
   const textoArray = elemento.innerHTML.split('');
   elemento.innerHTML = '';
   textoArray.forEach((letra, i) => {
      setTimeout(() => elemento.innerHTML += letra, 80 * i);
   });
}
const titulo = document.querySelector('h1');
typeWriter(titulo);

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
      setTimeout(() =>{
         document.querySelector(".fade-out-effect").classList.remove("active");
      },300)
   }
   //attach an event handle to document
   document.addEventListener("click", (event) => {
      if(event.target.classList.contains('link-item')){
         /*make sure event.target.hash has a value before overridding default behavior*/
         if(event.target.hash !==""){
            //prevent default anchor click behavior
            event.preventDefault();
            const hash = event.target.hash;
            //deactive existing active 'section'
            document.querySelector(".section.active").classList.add("hide");
            document.querySelector(".section.active").classList.remove("active");
            //active new 'section'
            document.querySelector(hash).classList.add("active");
            document.querySelector(hash).classList.remove("hide");
            //deactivate existing active navigation menu 'link-item'
            navMenu.querySelector(".active").classList.add("outer-shadow","hover-in-shadow");
            navMenu.querySelector(".active").classList.remove("active","inner-shadow");
            //activate new navigation menu 'link-item'
            if(navMenu.classList.contains("open")){
               event.target.classList.add("active", "inner-shadow");
               event.target.classList.remove("outer-shadow", "hover-in-shadow");
               //hide navigation menu
               hideNavMenu();
            }
            else {
               let navItems = navMenu.querySelectorAll(".link-item");
               navItems.forEach((item) => {
                  if(hash === item.hash) {
                     //activate new navigation menu 'link-item'
                     item.classList.add("active", "inner-shadow");
                     item.classList.remove("outer-shadow", "hover-in-shadow");
                  }
               })
               fadeOutEffect();
            }
            //add hash (#) to url
            window.location.hash = hash;
         }
      }
   })

})();


/*---------------------about section tabs-----------------------*/ 
(() => {
         const aboutSection = document.querySelector(".about-section"),
         tabsContainer = document.querySelector(".about-tabs")
         
         tabsContainer.addEventListener("click", (event) => {
            if(event.target.classList.contains("tab-item") &&
            !event.target.classList.contains("active")){
               const target = event.target.getAttribute("data-target");
               //desativar 'tab-item' q esta ativo
               tabsContainer.querySelector(".active").classList.remove("outer-shadow", "active");
               //ativar novo 'tab-item'
               event.target.classList.add("active", "outer-shadow");
               //desativar 'tab-content' q esta ativo
               aboutSection.querySelector(".tab-content.active").classList.remove("active");
               //ativar novo 'tab-item'
               aboutSection.querySelector(target).classList.add("active");
            }
         })
}) ();

function bodyScrollingToggle(){
   document.body.classList.toggle("stop-scrolling");
}

/*---------------------portfolio filter e popup-----------------------*/ 

(() => {

   const filterContainer = document.querySelector(".portfolio-filter"),
   portfolioItemsContainer = document.querySelector(".portfolio-items"),
   portfolioItems = document.querySelectorAll(".portfolio-item");
   popup = document.querySelector(".portfolio-popup"),
   prevBtn = popup.querySelector(".pp-prev"),
   nextBtn = popup.querySelector(".pp-next"),
   closeBtn = popup.querySelector(".pp-close"),
   projectDetailsContainer = popup.querySelector(".pp-details"),
   projectDetailsBtn = popup.querySelector(".pp-projects-details-btn");
   let itemIndex, slideIndex, screenshots;

   /*--------------filter portfolio items------------------- */
   filterContainer.addEventListener("click", (event)=> {
      if(event.target.classList.contains("filter-item") &&
      !event.target.classList.contains("active")){
        // deactivate existing active 'filter-item'
        filterContainer.querySelector(".active").classList.remove("outer-shadow","active");
        // ativar novo 'filter-item'
        event.target.classList.add("active", "outer-shadow");
        const target = event.target.getAttribute("data-target");
        portfolioItems.forEach((item) =>{
         if(target === item.getAttribute("data-category") || target === 'all') {
            item.classList.remove("hide");
            item.classList.add("show");
         }
         else {
            item.classList.remove("show");
            item.classList.add("hide");
         }
        }) 
      }
   })

   portfolioItemsContainer.addEventListener("click", (event) => {
      if(event.target.closest(".portfolio-item-inner")){
         const portfolioItem = event.target.closest(".portfolio-item-inner").parentElement;
         //pegar o index do portfolioItem
         itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(
            portfolioItem);
            screenshots = portfolioItems[itemIndex].querySelector(".portfolio-item-img img").getAttribute("data-screenshots");
         //convertendo screeshots em array
         screenshots = screenshots.split(",");
         if(screenshots.length === 1) {
            prevBtn.style.display="none";
            nextBtn.style.display="none";
         }
         else {
            prevBtn.style.display="block";
            nextBtn.style.display="block";
         }
         slideIndex = 0;
         popupToggle();
         popupSlideshow();
         popupDetails();
      }
   })

   closeBtn.addEventListener("click", () => {
      popupToggle();
      if(projectDetailsContainer.classList.contains("active")){
         popupDetailsToggle();
      }
      
   })

   function popupToggle() {
      popup.classList.toggle("open");
      bodyScrollingToggle();
   }

   function popupSlideshow() {
      const imgSrc = screenshots[slideIndex];
      const popupImg = popup.querySelector(".pp-img");

      /*-----------ative o carregador até que o popupImg seja carregado----------------*/
      popup.querySelector(".pp-loader").classList.add("active");
      popupImg.src=imgSrc;
      popupImg.onload = () => {
         // loading desativado apos carregar o popupImg
         popup.querySelector(".pp-loader").classList.remove("active");
      }
      popup.querySelector(".pp-counter").innerHTML = (slideIndex + 1) + "de" + screenshots.length;
   }

   //next slide
   nextBtn.addEventListener("click", () => {
      if(slideIndex === screenshots.length - 1) {
         slideIndex = 0;
      }
      else {
         slideIndex++;
      }
      popupSlideshow();
   })

   //prev slide
   prevBtn.addEventListener("click", () => {
      if(slideIndex === 0) {
         slideIndex = screenshots.length-1;
      }
      else {
         slideIndex--;
      }
      popupSlideshow();
   })

   function popupDetails() {
      //quando portfolio-item-details nao existe
      if(!portfolioItems[itemIndex].querySelector(".portfolio-item-details")){
         projectDetailsBtn.style.display="none";
         return;/*fim da execução da função*/
      }
      projectDetailsBtn.style.display="block";
      //pegar os detalhes do projeto
      const details = portfolioItems[itemIndex].querySelector(".portfolio-item-details").innerHTML;
      popup.querySelector(".pp-project-details").innerHTML = details;
      const title = portfolioItems[itemIndex].querySelector(".portfolio-item-title").innerHTML;
      popup.querySelector(".pp-title h2").innerHTML = title;
      const category = portfolioItems[itemIndex].getAttribute("data-category");
      popup.querySelector(".pp-project-category").innerHTML = category.split("-").join("");
   }

   projectDetailsBtn.addEventListener("click", () => {
      popupDetailsToggle();
   })

   function popupDetailsToggle() {
      if(projectDetailsContainer.classList.contains("active")){
         projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
         projectDetailsBtn.querySelector("i").classList.add("fa-plus");
         projectDetailsContainer.classList.remove("active");
         projectDetailsContainer.style.maxHeight = 0 + "px";
      }
      else{
         projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
         projectDetailsBtn.querySelector("i").classList.add("fa-minus");
         projectDetailsContainer.classList.add("active");
         projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";
         popup.scrollTo(0,projectDetailsContainer.offsetTop);
      }
      
   }

})();

/*------------------hide all sections except active----------------------- */
(()=> {
   const sections = document.querySelectorAll(".section");
   sections.forEach((section) => {
      if(!section.classList.contains("active")){
         section.classList.add("hide");
      }
   })
})();

// window.addEventListener("load", () => {
//    document.querySelector(".preloader").classList.add("fade-out");
//    setTimeout(() => {
//       document.querySelector(".preloader").style.display="none";
//    },800)
// })



