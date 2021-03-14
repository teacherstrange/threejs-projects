import { useEffect, useState } from 'react';

export const usePageVisibility = () => {
  const [isVisible, setIsVisible] = useState<boolean>(
    typeof window === 'undefined' || !window.document ? true : !document.hidden,
  );
  const onVisibilityChange = () => setIsVisible(!document.hidden);

  useEffect(() => {
    window.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      window.removeEventListener('visibilityChange', onVisibilityChange);
    };
  }, []);

  return isVisible;
};
