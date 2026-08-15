'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance = null;
let initialized = false;
let tickerCallback = null;

export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function isMobileViewport() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(max-width: 767px)').matches;
}

export function shouldUseSmoothScroll() {
  return !prefersReducedMotion() && !isMobileViewport();
}

export function getLenis() {
  return lenisInstance;
}

export async function initSmoothScroll() {
  if (initialized || typeof window === 'undefined') return null;
  if (!shouldUseSmoothScroll()) return null;

  const { default: Lenis } = await import('@studio-freight/lenis');

  const lenis = new Lenis({
    duration: 1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false,
    touchMultiplier: 1.1,
  });

  lenisInstance = lenis;
  initialized = true;

  lenis.on('scroll', ScrollTrigger.update);

  ScrollTrigger.scrollerProxy(document.documentElement, {
    scrollTop(value) {
      if (arguments.length) {
        lenis.scrollTo(value, { immediate: true });
      }
      return lenis.scroll;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: document.documentElement.style.transform ? 'transform' : 'fixed',
  });

  ScrollTrigger.defaults({
    scroller: document.documentElement,
  });

  tickerCallback = (time) => {
    lenis.raf(time * 1000);
  };
  gsap.ticker.add(tickerCallback);
  gsap.ticker.lagSmoothing(0);

  ScrollTrigger.addEventListener('refresh', () => lenis.resize());
  ScrollTrigger.refresh();

  return lenis;
}

export function destroySmoothScroll() {
  if (!initialized) return;

  if (tickerCallback) {
    gsap.ticker.remove(tickerCallback);
    tickerCallback = null;
  }

  ScrollTrigger.scrollerProxy(document.documentElement, {});
  ScrollTrigger.defaults({ scroller: window });

  lenisInstance?.destroy();
  lenisInstance = null;
  initialized = false;
}
