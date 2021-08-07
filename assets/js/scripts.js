var btnMobile = document.getElementById('btn-mobile');

function toggleMenu(event) {
   if (event.type === 'touchstart') event.preventDefault();

   var nav = document.getElementById('nav');
   nav.classList.toggle('active');

   var active = nav.classList.contains('active');

   event.currentTarget.setAttribute('aria-expanded', active);

   if (active) {
      event.currentTarget.setAttribute('aria-label', 'Abrir Menu');
   } else {
      event.currentTarget.setAttribute('aria-label', 'Fechar Menu');
   }
}

btnMobile.addEventListener("click", toggleMenu);
btnMobile.addEventListener("touchstart", toggleMenu);



//animação maquina de escrever
function typeWriter(elemento) {
   var textoArray = elemento.innerHTML.split('');
   elemento.innerHTML = '';
   textoArray.forEach((letra, i) => {
      setTimeout(() => elemento.innerHTML += letra, 90 * i);
   });
}
var titulo = document.querySelector('h3');
typeWriter(titulo);


/*carrosel*/
document.addEventListener('DOMContentLoaded', function() {
   var elems = document.querySelectorAll('.carousel');
   var instances = M.Carousel.init(elems);
 });

 var instance = M.Carousel.init({
   fullWidth: true
 });