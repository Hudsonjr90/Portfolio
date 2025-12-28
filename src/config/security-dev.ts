/**
 * Configuração de segurança para desenvolvimento
 * Este arquivo configura políticas de segurança durante o desenvolvimento local
 */

// Verificar se estamos em ambiente de desenvolvimento
const isDevelopment = import.meta.env.DEV;

// Configurar Content Security Policy para desenvolvimento
if (isDevelopment) {
  // Adicionar event listener para violações de CSP
  document.addEventListener('securitypolicyviolation', (e) => {
    console.warn('🔒 CSP Violation (dev):', {
      directive: e.violatedDirective,
      blocked: e.blockedURI,
      document: e.documentURI
    });
  });

  // Configurar Trusted Types policy para desenvolvimento
  if (window.trustedTypes && window.trustedTypes.createPolicy) {
    try {
      window.trustedTypes.createPolicy('dev-policy', {
        createHTML: (string: string) => string,
        createScript: (string: string) => string,
        createScriptURL: (string: string) => string
      });
    } catch (e) {
      // Policy já existe, ignorar
    }
  }

  // Log de segurança em desenvolvimento
  console.log('🔒 Security config loaded for development');
}

export {};