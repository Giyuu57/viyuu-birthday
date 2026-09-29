import type { Variants } from 'framer-motion';

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 0.68, 0, 1] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1, ease: 'easeOut' } },
};

export const staggerContainer = (stagger = 0.15, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 0.68, 0, 1] },
  },
};

export const cardFlip: Variants = {
  front: { rotateY: 0 },
  back: { rotateY: 180 },
};

export const floatY: Variants = {
  animate: {
    y: [0, -14, 0],
    rotate: [0, 6, 0],
    transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
  },
};
