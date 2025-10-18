// Security configuration and Trusted Types implementation
declare global {
  interface Window {
    trustedTypes?: {
      createPolicy: (name: string, policy: any) => any;
      isHTML: (value: any) => boolean;
      isScript: (value: any) => boolean;
      isScriptURL: (value: any) => boolean;
    };
  }
}

// Implementação de Trusted Types para mitigar XSS baseado em DOM
export const initializeTrustedTypes = () => {
  if (typeof window !== 'undefined' && window.trustedTypes) {
    try {
      // Política para HTML seguro
      const htmlPolicy = window.trustedTypes.createPolicy('safe-html', {
        createHTML: (input: string) => {
          // Sanitizar HTML básico - remover scripts e eventos
          return input
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/on\w+\s*=\s*"[^"]*"/gi, '')
            .replace(/javascript:/gi, '');
        }
      });

      // Política para scripts seguros
      const scriptPolicy = window.trustedTypes.createPolicy('safe-script', {
        createScript: (input: string) => {
          // Apenas permitir scripts que não contenham padrões perigosos
          if (input.includes('eval(') || input.includes('Function(')) {
            console.warn('Potentially dangerous script blocked:', input);
            return '';
          }
          return input;
        }
      });

      // Política para URLs de script seguros
      const scriptURLPolicy = window.trustedTypes.createPolicy('safe-script-url', {
        createScriptURL: (input: string) => {
          // Permitir apenas URLs de fontes confiáveis
          const allowedDomains = [
            'self',
            'https://fonts.googleapis.com',
            'https://fonts.gstatic.com',
            'https://www.googletagmanager.com',
            'https://www.google-analytics.com'
          ];
          
          const url = new URL(input, window.location.origin);
          const isAllowed = allowedDomains.some(domain => 
            domain === 'self' ? url.origin === window.location.origin : url.origin === domain
          );
          
          if (!isAllowed) {
            console.warn('Script URL blocked:', input);
            return '';
          }
          
          return input;
        }
      });

      console.log('Trusted Types policies initialized successfully');
      return { htmlPolicy, scriptPolicy, scriptURLPolicy };
    } catch (error) {
      console.warn('Failed to initialize Trusted Types:', error);
    }
  } else {
    console.log('Trusted Types not supported in this browser');
  }
};

// Função para sanitizar conteúdo HTML de forma segura
export const sanitizeHTML = (html: string): string => {
  if (typeof window !== 'undefined' && window.trustedTypes) {
    try {
      const policy = window.trustedTypes.createPolicy('sanitize-html-temp', {
        createHTML: (input: string) => {
          const div = document.createElement('div');
          div.textContent = input;
          return div.innerHTML;
        }
      });
      return policy.createHTML(html);
    } catch (error) {
      console.warn('Failed to sanitize HTML with Trusted Types:', error);
    }
  }
  
  // Fallback para navegadores sem suporte a Trusted Types
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
};

// Configurações de segurança CSP
export const CSP_CONFIG = {
  'default-src': ["'self'"],
  'script-src': [
    "'self'",
    "'unsafe-inline'", // Necessário para React em desenvolvimento
    "'unsafe-eval'", // Necessário para algumas bibliotecas
    "https://fonts.googleapis.com",
    "https://www.googletagmanager.com",
    "https://www.google-analytics.com"
  ],
  'style-src': [
    "'self'",
    "'unsafe-inline'", // Necessário para CSS-in-JS
    "https://fonts.googleapis.com",
    "https://fonts.gstatic.com"
  ],
  'font-src': [
    "'self'",
    "https://fonts.gstatic.com",
    "data:"
  ],
  'img-src': [
    "'self'",
    "data:",
    "https:",
    "blob:"
  ],
  'media-src': [
    "'self'",
    "data:",
    "https:"
  ],
  'object-src': ["'none'"],
  'frame-src': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"],
  'connect-src': ["'self'", "https:"],
  'require-trusted-types-for': ["'script'"]
};

export default {
  initializeTrustedTypes,
  sanitizeHTML,
  CSP_CONFIG
};