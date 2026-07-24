import gsap from 'gsap';

export const staggerReveal = (elements: string | Element | Element[], options?: gsap.TweenVars) => {
  return gsap.from(elements, {
    y: 80,
    opacity: 0,
    duration: 1,
    stagger: 0.15,
    ease: 'power3.out',
    ...options,
  });
};

export const fadeInUp = (elements: string | Element | Element[], options?: gsap.TweenVars) => {
  return gsap.from(elements, {
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
    ...options,
  });
};

export const parallaxScroll = (element: string | Element, options?: gsap.TweenVars) => {
  return gsap.to(element, {
    yPercent: -20,
    ease: 'none',
    scrollTrigger: {
      trigger: element as gsap.DOMTarget,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
    ...options,
  });
};

export const splitTextReveal = (element: string | Element, options?: gsap.TweenVars) => {
  return gsap.from(element, {
    y: '100%',
    opacity: 0,
    duration: 1.2,
    ease: 'power4.out',
    ...options,
  });
};

export const scaleIn = (elements: string | Element | Element[], options?: gsap.TweenVars) => {
  return gsap.from(elements, {
    scale: 0.8,
    opacity: 0,
    duration: 0.8,
    ease: 'back.out(1.7)',
    ...options,
  });
};

export const slideInLeft = (elements: string | Element | Element[], options?: gsap.TweenVars) => {
  return gsap.from(elements, {
    x: -100,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    ...options,
  });
};

export const slideInRight = (elements: string | Element | Element[], options?: gsap.TweenVars) => {
  return gsap.from(elements, {
    x: 100,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    ...options,
  });
};
