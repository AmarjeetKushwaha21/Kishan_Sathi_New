import { memo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default memo(function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
});