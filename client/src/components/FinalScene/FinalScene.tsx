import { useMemo } from 'react';
import { motion } from 'framer-motion';
import Reveal from '../ui/Reveal';

interface FinalSceneProps {
  lines: string[];
}

export default function FinalScene({ lines }: FinalSceneProps) {
  const stars = useMemo(
    () =>
      Array.from({ length: 50 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 2,
        delay: Math.random() * 3,
      })),
    []
  );
  const hearts = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 8 + Math.random() * 6,
        glyph: i % 2 === 0 ? '♡' : '✦',
      })),
    []
  );

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-night to-night-deep px-6 py-32 text-center text-[#F1E9F5] sm:py-44">
      <div aria-hidden="true" className="absolute inset-0">
        {stars.map((s, i) => (
          <span
            key={i}
            className="absolute animate-twinkle rounded-full bg-white"
            style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, animationDelay: `${s.delay}s` }}
          />
        ))}
        {hearts.map((h, i) => (
          <motion.span
            key={i}
            className="absolute bottom-0"
            style={{ left: `${h.left}%`, fontSize: 10 + Math.random() * 14, color: i % 2 ? '#E8CBA0' : '#EFC0D0' }}
            animate={{ y: ['0vh', '-90vh'], opacity: [0, 0.7, 0] }}
            transition={{ duration: h.duration, delay: h.delay, repeat: Infinity, ease: 'linear' }}
          >
            {h.glyph}
          </motion.span>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-lg">
        {lines.map((line, i) => (
          <Reveal key={i} delay={i * 0.15}>
            <p
              className={
                i === 1
                  ? 'mb-6 font-display text-3xl text-blush-deep sm:text-4xl'
                  : i === lines.length - 1
                  ? 'mb-2 font-script text-3xl text-gold'
                  : 'mb-6 font-display text-xl sm:text-2xl'
              }
            >
              {line}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
