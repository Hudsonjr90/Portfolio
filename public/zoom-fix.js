// Script de correção automática de zoom
(function() {
  'use strict';
  
  // Detecta zoom inconsistente
  const zoom = Math.round((window.outerWidth / window.innerWidth) * 100);
  const expectedZoom = 100;
  
  console.log('🔍 Zoom detectado:', zoom + '%');
  
  if (zoom !== expectedZoom && zoom > 105) {
    console.log('⚠️ Zoom inconsistente detectado! Corrigindo...');
    
    // Calcula fator de correção
    const correctionFactor = expectedZoom / zoom;
    
    // Aplica correção via CSS
    const style = document.createElement('style');
    style.id = 'zoom-correction';
    style.textContent = `
      html {
        zoom: ${correctionFactor} !important;
        font-size: 10px !important;
      }
      
      body {
        transform-origin: top left;
      }
      
      /* Força tamanhos específicos */
      h2 {
        font-size: 3.7rem !important;
      }
      
      [class*="Navbar"] a {
        font-size: 1.7rem !important;
      }
      
      p {
        font-size: 1.6rem !important;
      }
    `;
    
    document.head.appendChild(style);
    
    console.log('✅ Correção aplicada! Fator:', correctionFactor);
    console.log('✅ Zoom corrigido para:', Math.round(zoom * correctionFactor) + '%');
  } else {
    console.log('✅ Zoom está normal:', zoom + '%');
  }
})();