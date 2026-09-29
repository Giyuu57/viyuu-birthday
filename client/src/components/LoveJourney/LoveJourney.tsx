import { motion } from 'framer-motion';
import Reveal from '../ui/Reveal';

interface LoveJourneyProps {
  lines: string[];
}

const DECOR = ['✦', '✿', '♡', '✦'];

export default function LoveJourney({ lines }: LoveJourneyProps) {
  return (
    <section className="relative mx-auto max-w-2xl px-6 py-32 text-center sm:py-44">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {DECOR.map((glyph, i) => (
          <motion.span
            key={i}
            className="absolute text-lavender-deep/60"
            style={{
              left: `${10 + i * 25}%`,
              top: `${15 + (i % 2) * 55}%`,
              fontSize: 16 + (i % 3) * 4,
            }}
            animate={{ y: [0, -16, 0], rotate: [0, 8, 0] }}
            transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
          >
            {glyph}
          </motion.span>
        ))}
      </div>

      <div className="relative z-10 space-y-14">
        {lines.map((line, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <p
              className={
                i === lines.length - 1
                  ? 'mx-auto max-w-xs font-display text-2xl text-plum sm:text-3xl'
                  : i === 1
                  ? 'font-script text-3xl text-rose-deep sm:text-4xl'
                  : 'font-display text-2xl text-plum sm:text-3xl'
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
