'use client';

import { useEffect } from 'react';
import { destroySmoothScroll, initSmoothScroll } from '@/lib/motion';

export default function SmoothScroll({ children }) {
  useEffect(() => {
    let lenis = null;

    initSmoothScroll().then((instance) => {
      lenis = instance;
    });

    return () => {
      destroySmoothScroll();
      lenis = null;
    };
  }, []);

  return <>{children}</>;
}
