'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isMobileViewport, prefersReducedMotion } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger);

function canAnimate() {
  return !prefersReducedMotion();
}

export function useRevealAnimation(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !canAnimate()) {
      if (el) gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    const {
      y = 40,
      opacity = 0,
      duration = 0.7,
      delay = 0,
      ease = 'power2.out',
      start = 'top 88%',
    } = options;

    const tween = gsap.fromTo(
      el,
      { y, opacity, force3D: true },
      {
        y: 0,
        opacity: 1,
        duration,
        delay,
        ease,
        force3D: true,
        scrollTrigger: {
          trigger: el,
          start,
          once: true,
          fastScrollEnd: true,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return ref;
}

export function useImageReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !canAnimate()) return;

    const tween = gsap.fromTo(
      el,
      { opacity: 0, y: 24, force3D: true },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power2.out',
        force3D: true,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
          fastScrollEnd: true,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return ref;
}

export function useParallax(speed = 0.3) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !canAnimate() || isMobileViewport()) return;

    const tween = gsap.to(el, {
      y: () => speed * 80,
      ease: 'none',
      force3D: true,
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.4,
        fastScrollEnd: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [speed]);

  return ref;
}

export function useLineReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !canAnimate()) return;

    const tween = gsap.fromTo(
      el,
      { scaleX: 0, transformOrigin: 'left', force3D: true },
      {
        scaleX: 1,
        duration: 0.8,
        ease: 'power2.out',
        force3D: true,
        scrollTrigger: {
          trigger: el,
          start: 'top 92%',
          once: true,
          fastScrollEnd: true,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return ref;
}

export function useStaggerReveal() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !canAnimate()) return;

    const children = container.querySelectorAll('[data-stagger]');
    if (!children.length) return;

    const tween = gsap.fromTo(
      children,
      { y: 32, opacity: 0, force3D: true },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        force3D: true,
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          once: true,
          fastScrollEnd: true,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return containerRef;
}

export function useSplitText() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !canAnimate()) return;

    const text = el.textContent;
    const words = text.split(' ');

    el.innerHTML = words
      .map(
        (word) =>
          `<span style="overflow:hidden;display:inline-block"><span style="display:inline-block;transform:translateY(110%)" class="split-word">${word}</span></span>`
      )
      .join(' ');

    const splitWords = el.querySelectorAll('.split-word');

    const tween = gsap.to(splitWords, {
      y: 0,
      duration: 0.7,
      stagger: 0.03,
      ease: 'power2.out',
      force3D: true,
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true,
        fastScrollEnd: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return ref;
}
