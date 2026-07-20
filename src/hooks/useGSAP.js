'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useRevealAnimation(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      y = 60,
      opacity = 0,
      duration = 1,
      delay = 0,
      ease = 'power3.out',
      start = 'top 85%',
    } = options;

    gsap.fromTo(el,
      { y, opacity },
      {
        y: 0,
        opacity: 1,
        duration,
        delay,
        ease,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === el) t.kill();
      });
    };
  }, []);

  return ref;
}

export function useImageReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.fromTo(el,
      { clipPath: 'inset(100% 0 0 0)' },
      {
        clipPath: 'inset(0% 0 0 0)',
        duration: 1.2,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === el) t.kill();
      });
    };
  }, []);

  return ref;
}

export function useParallax(speed = 0.3) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.to(el, {
      y: () => speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === el) t.kill();
      });
    };
  }, []);

  return ref;
}

export function useLineReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.fromTo(el,
      { scaleX: 0, transformOrigin: 'left' },
      {
        scaleX: 1,
        duration: 1,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === el) t.kill();
      });
    };
  }, []);

  return ref;
}

export function useStaggerReveal() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const children = container.querySelectorAll('[data-stagger]');

    gsap.fromTo(children,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === container) t.kill();
      });
    };
  }, []);

  return containerRef;
}

export function useSplitText() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const text = el.textContent;
    const words = text.split(' ');

    el.innerHTML = words.map(word =>
      `<span style="overflow:hidden;display:inline-block"><span style="display:inline-block;transform:translateY(110%)" class="split-word">${word}</span></span>`
    ).join(' ');

    const splitWords = el.querySelectorAll('.split-word');

    gsap.to(splitWords, {
      y: 0,
      duration: 0.8,
      stagger: 0.04,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === el) t.kill();
      });
    };
  }, []);

  return ref;
}
