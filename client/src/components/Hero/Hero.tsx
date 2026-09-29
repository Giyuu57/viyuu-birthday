import { useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import GlowButton from '../ui/GlowButton';
import type { SiteContent } from '../../types';

interface HeroProps {
  content: SiteContent['hero'];
  opened: boolean;
  onOpen: () => void;
}

interface Star {
  left: number;
  top: number;
  size: number;
  delay: number;
}

export default function Hero({ content, opened, onOpen }: HeroProps) {
  const stars = useMemo<Star[]>(
    () =>
      Array.from({ length: 45 }, () => ({
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
        delay: Math.random() * 6,
        duration: 6 + Math.random() * 5,
        glyph: i % 2 === 0 ? '♡' : '✦',
      })),
    []
  );

  return (
    <AnimatePresence>
      {!opened && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.1, ease: [0.22, 0.68, 0, 1] } }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden text-center"
        >
          {/* Night sky base, animates toward warm pastel on open via the exit above */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                'radial-gradient(60% 50% at 50% 30%, rgba(255,255,255,0.06), transparent 60%), linear-gradient(160deg, #241931 0%, #150F20 100%)',
              ],
            }}
          />
          <div className="absolute inset-0">
            {stars.map((s, i) => (
              <span
                key={i}
                className="absolute animate-twinkle rounded-full bg-white"
                style={{
                  left: `${s.left}%`,
                  top: `${s.top}%`,
                  width: s.size,
                  height: s.size,
                  animationDelay: `${s.delay}s`,
                }}
              />
            ))}
            {hearts.map((h, i) => (
              <motion.span
                key={i}
                className="absolute bottom-0 text-blush-deep/70"
                style={{ left: `${h.left}%`, fontSize: 12 + Math.random() * 10 }}
                animate={{ y: ['0vh', '-110vh'], opacity: [0, 0.6, 0] }}
                transition={{ duration: h.duration, delay: h.delay, repeat: Infinity, ease: 'linear' }}
              >
                {h.glyph}
              </motion.span>
            ))}
          </div>

          <div className="relative z-10 max-w-md px-8">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="block font-script text-4xl text-blush-deep sm:text-5xl"
            >
              {content.greeting}
            </motion.span>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="mt-4 font-body text-base text-lavender-deep/90 sm:text-lg"
            >
              {content.subtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="mt-11"
            >
              <GlowButton onClick={onOpen}>{content.cta}</GlowButton>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
