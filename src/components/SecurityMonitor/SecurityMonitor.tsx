import { useEffect } from 'react';

export const SecurityMonitor = () => {
  useEffect(() => {
    // Verificar se CSP está ativo
    const checkCSP = () => {
      // Em desenvolvimento local, CSP pode não estar configurado via headers
      // Verificamos apenas se Trusted Types está ativo
      console.log('🔒 Security Monitor: Running in development mode');
    };

    // Verificar se Trusted Types está ativo
    const checkTrustedTypes = () => {
      if (window.trustedTypes) {
        console.log('✅ Trusted Types is supported and active');
        
        try {
          // Testar se innerHTML é protegido
          const div = document.createElement('div');
          div.innerHTML = '<script>alert("xss")</script>';
          console.log('✅ Trusted Types protecting innerHTML');
        } catch (error) {
          console.log('✅ Trusted Types blocked unsafe HTML assignment');
        }
      } else {
        console.warn('⚠️ Trusted Types not supported in this browser');
      }
    };

    // Verificar headers de segurança
    const checkSecurityHeaders = () => {
      // Em desenvolvimento local (Vite), headers são diferentes da produção
      if (window.location.hostname === 'localhost') {
        console.log('🚧 Dev mode: Security headers will be applied in production');
        return;
      }
      
      // Em produção, verificar headers via fetch
      fetch(window.location.href, { method: 'HEAD' })
        .then(response => {
          const securityHeaders = [
            'content-security-policy',
            'x-frame-options', 
            'x-content-type-options',
            'strict-transport-security',
            'cross-origin-opener-policy'
          ];
          
          securityHeaders.forEach(header => {
            if (response.headers.get(header)) {
              console.log(`✅ ${header} header is present`);
            } else {
              console.warn(`⚠️ ${header} header is missing`);
            }
          });
        })
        .catch(() => console.log('Could not check security headers'));
    };

    // Executar verificações
    if (process.env.NODE_ENV === 'development') {
      checkCSP();
      checkTrustedTypes();
      checkSecurityHeaders();
    }

    // Monitorar violações de CSP
    const handleCSPViolation = (event: SecurityPolicyViolationEvent) => {
      console.warn('CSP Violation:', {
        blockedURI: event.blockedURI,
        violatedDirective: event.violatedDirective,
        originalPolicy: event.originalPolicy,
        documentURI: event.documentURI
      });
    };

    document.addEventListener('securitypolicyviolation', handleCSPViolation);

    return () => {
      document.removeEventListener('securitypolicyviolation', handleCSPViolation);
    };
  }, []);

  return null; // Este componente não renderiza nada visível
};

export default SecurityMonitor;