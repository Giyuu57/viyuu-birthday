import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from '../ui/Reveal';
import type { SiteContent } from '../../types';

interface BirthdayCakeProps {
  content: SiteContent['birthday'];
}

interface Burst {
  id: number;
  x: number;
  y: number;
  glyph: string;
}

const BURST_GLYPHS = ['💗', '✨', '🎉', '♡', '⭐'];

export default function BirthdayCake({ content }: BirthdayCakeProps) {
  const [blown, setBlown] = useState(false);
  const [showWish, setShowWish] = useState(false);
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [shake, setShake] = useState(false);
  const [bursts, setBursts] = useState<Burst[]>([]);

  function blowOut() {
    if (blown) return;
    setBlown(true);
    setShake(true);
    window.setTimeout(() => setShake(false), 420);

    const newBursts: Burst[] = Array.from({ length: 16 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 160 - 80,
      y: Math.random() * -40 - 10,
      glyph: BURST_GLYPHS[Math.floor(Math.random() * BURST_GLYPHS.length)],
    }));
    setBursts(newBursts);
    window.setTimeout(() => setBursts([]), 1800);

    window.setTimeout(() => setShowWish(true), 500);
    window.setTimeout(() => setShowFollowUp(true), 2600);
  }

  function relight() {
    setBlown(false);
    setShowWish(false);
    setShowFollowUp(false);
    window.setTimeout(blowOut, 60);
  }

  return (
    <section className="mx-auto max-w-xl px-6 py-28 text-center sm:py-36">
      <Reveal>
        <h1 className="font-display text-4xl text-rose-deep sm:text-5xl">{content.title}</h1>
      </Reveal>

      <Reveal delay={0.15}>
        <motion.button
          type="button"
          onClick={blowOut}
          animate={shake ? { x: [0, -4, 4, -3, 3, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="relative mx-auto mt-14 block w-[min(78vw,280px)] cursor-pointer"
          aria-label="Blow out the candles"
        >
          <svg viewBox="0 0 220 200" className="w-full overflow-visible" style={{ perspective: 600 }}>
            {[70, 110, 150].map((cx, i) => (
              <g key={cx}>
                <AnimatePresence>
                  {!blown && (
                    <motion.g
                      style={{ transformOrigin: `${cx}px ${cx === 110 ? 50 : 60}px` }}
                      animate={{ scaleY: [1, 1.12, 1], rotate: [-1, 2, -1] }}
                      transition={{ duration: 1.4 + i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
                      exit={{ opacity: 0 }}
                    >
                      <ellipse cx={cx} cy={cx === 110 ? 45 : 55} rx="5" ry="10" fill="#F2A65A" />
                      <ellipse cx={cx} cy={cx === 110 ? 47 : 57} rx="2.6" ry="5" fill="#FCE2A0" />
                    </motion.g>
                  )}
                </AnimatePresence>
                <rect x={cx - 4} y={cx === 110 ? 52 : 62} width="8" height={cx === 110 ? 28 : 20} fill="#F6E1C8" />
              </g>
            ))}
            <rect x="30" y="80" width="160" height="45" rx="10" fill="#F6D9E2" />
            <rect x="30" y="80" width="160" height="14" rx="7" fill="#FBEFF3" />
            <rect x="20" y="120" width="180" height="55" rx="12" fill="#E5DAF3" />
            <rect x="20" y="120" width="180" height="16" rx="8" fill="#F0E7FA" />
            <path d="M30 175 q80 20 160 0 v10 q-80 20 -160 0 z" fill="#D5C3EE" />
          </svg>

          {/* smoke */}
          <AnimatePresence>
            {blown &&
              [0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="absolute left-1/2 top-6 h-1.5 w-1.5 rounded-full bg-plum-soft/40"
                  initial={{ opacity: 0.5, x: -6 + i * 6, y: 0, scale: 1 }}
                  animate={{ opacity: 0, y: -60, scale: 2.4 }}
                  transition={{ duration: 1.6, ease: 'easeOut' }}
                />
              ))}
          </AnimatePresence>

          {/* confetti / hearts burst */}
          <AnimatePresence>
            {bursts.map((b) => (
              <motion.span
                key={b.id}
                className="pointer-events-none absolute left-1/2 top-8 text-lg"
                initial={{ opacity: 0, x: 0, y: 0, rotate: 0, scale: 0.6 }}
                animate={{ opacity: [0, 1, 0], x: b.x, y: -160 + b.y, rotate: b.x, scale: 1 }}
                transition={{ duration: 1.7, ease: 'easeOut' }}
              >
                {b.glyph}
              </motion.span>
            ))}
          </AnimatePresence>
        </motion.button>
        <p className="mt-3 text-sm italic text-plum-soft">{content.candleHint}</p>
      </Reveal>

      <div className="mt-8 min-h-[90px]">
        <AnimatePresence>
          {showWish && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-script text-3xl text-rose-deep"
            >
              {content.wish}
            </motion.p>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {showFollowUp && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 text-plum-soft">
              {content.wishFollowUp}
            </motion.p>
          )}
        </AnimatePresence>
        {showFollowUp && (
          <button
            onClick={relight}
            className="mt-4 font-script text-lg text-rose-deep/80 underline decoration-dashed underline-offset-4 transition-opacity hover:opacity-100 opacity-75"
          >
            relight the candles ✦
          </button>
        )}
      </div>
    </section>
  );
}
