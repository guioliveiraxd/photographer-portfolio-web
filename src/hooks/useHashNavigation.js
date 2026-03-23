import { useEffect } from 'react';

export function useHashNavigation() {
  useEffect(() => {
    const handleNavigation = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) return;

      const element = document.getElementById(hash);
      if (!element) return;

      window.setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    };

    handleNavigation();
    window.addEventListener('hashchange', handleNavigation);

    return () => window.removeEventListener('hashchange', handleNavigation);
  }, []);
}
