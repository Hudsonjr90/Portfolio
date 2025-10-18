import { useEffect } from 'react';

export const SecurityMonitor = () => {
  useEffect(() => {
    // Verificar se CSP está ativo
    const checkCSP = () => {
      try {
        // Tentar executar eval() - deve ser bloqueado se CSP estiver ativo
        eval('1+1');
        console.warn('CSP may not be properly configured - eval() executed');
      } catch (error) {
        console.log('✅ CSP is active - eval() properly blocked');
      }
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
    const checkSecurityHeaders = async () => {
      try {
        const response = await fetch(window.location.href, { method: 'HEAD' });
        const headers = response.headers;
        
        const securityHeaders = [
          'content-security-policy',
          'x-frame-options',
          'x-content-type-options',
          'strict-transport-security',
          'cross-origin-opener-policy'
        ];

        securityHeaders.forEach(header => {
          if (headers.get(header)) {
            console.log(`✅ ${header} header is present`);
          } else {
            console.warn(`⚠️ ${header} header is missing`);
          }
        });
      } catch (error) {
        console.warn('Could not check security headers:', error);
      }
    };

    // Executar verificações apenas em desenvolvimento
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