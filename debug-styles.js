// Script de diagnóstico para verificar diferenças de estilos
console.log('=== DIAGNÓSTICO DE ESTILOS ===');

// 1. Verificar se as CSS Variables estão sendo aplicadas
console.log('1. CSS Variables:');
const computedStyle = getComputedStyle(document.documentElement);
console.log('--bg_color:', computedStyle.getPropertyValue('--bg_color'));
console.log('--main_color:', computedStyle.getPropertyValue('--main_color'));
console.log('--text_color:', computedStyle.getPropertyValue('--text_color'));

// 2. Verificar classes no body
console.log('\n2. Classes do body:');
console.log('Body classes:', document.body.className);

// 3. Verificar links de CSS carregados
console.log('\n3. Links CSS carregados:');
const cssLinks = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
cssLinks.forEach((link, index) => {
  console.log(`CSS ${index + 1}:`, link.href);
});

// 4. Verificar se há estilos inline ou problemas de carregamento
console.log('\n4. Elementos com estilos inline suspeitos:');
const elementsWithInlineStyles = Array.from(document.querySelectorAll('[style]'));
console.log('Elementos com style inline:', elementsWithInlineStyles.length);

// 5. Verificar se há erros de rede
console.log('\n5. Verificando recursos que falharam:');
window.addEventListener('error', function(e) {
  if (e.target.tagName === 'LINK') {
    console.error('Falha ao carregar CSS:', e.target.href);
  }
}, true);

// 6. Comparar estilos específicos
console.log('\n6. Estilos computados de elementos chave:');
const navbar = document.querySelector('[class*="Navbar"]');
if (navbar) {
  const navbarStyles = getComputedStyle(navbar);
  console.log('Navbar background:', navbarStyles.backgroundColor);
  console.log('Navbar color:', navbarStyles.color);
}

// 7. Verificar tema ativo
console.log('\n7. Tema ativo:');
const hasLightMode = document.body.classList.contains('light_mode');
console.log('Modo claro ativo:', hasLightMode);
console.log('Modo escuro ativo:', !hasLightMode);

// 8. Verificar localStorage
console.log('\n8. Configurações no localStorage:');
try {
  console.log('Theme:', localStorage.getItem('theme'));
  console.log('Language:', localStorage.getItem('i18nextLng'));
} catch (e) {
  console.log('Erro ao acessar localStorage:', e.message);
}