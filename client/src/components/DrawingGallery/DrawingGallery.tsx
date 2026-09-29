import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Reveal from '../ui/Reveal';
import type { DrawingItem, SiteContent } from '../../types';

interface DrawingGalleryProps {
  content: SiteContent['gallery'];
  drawings: DrawingItem[];
  loading: boolean;
}

const PLACEHOLDER_DOODLES = [
  { emoji: '✿', cap: 'for you' },
  { emoji: '♡', cap: 'always' },
  { emoji: '✦', cap: 'my favorite' },
  { emoji: '☁', cap: 'soft day' },
  { emoji: '🎀', cap: 'little gift' },
  { emoji: '✎', cap: 'a doodle' },
];

export default function DrawingGallery({ content, drawings, loading }: DrawingGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const rotations = useMemo(
    () => Array.from({ length: Math.max(drawings.length, PLACEHOLDER_DOODLES.length) }, () => (Math.random() > 0.5 ? 1 : -1) * (2 + Math.random() * 4)),
    [drawings.length]
  );

  const usePlaceholders = !loading && drawings.length === 0;

  return (
    <section className="mx-auto max-w-4xl px-6 py-28 text-center">
      <Reveal>
        <h2 className="font-display text-3xl text-rose-deep sm:text-4xl">{content.title}</h2>
        <p className="mt-2 text-sm italic text-plum-soft">{content.hint}</p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-14 flex flex-wrap justify-center gap-6">
          {usePlaceholders
            ? PLACEHOLDER_DOODLES.map((d, i) => (
                <div
                  key={d.cap}
                  style={{ rotate: `${rotations[i]}deg` }}
                  className="w-[140px] rounded bg-paper p-3 pb-8 shadow-soft"
                >
                  <div className="flex aspect-square items-center justify-center rounded-sm bg-blush text-4xl">
                    {d.emoji}
                  </div>
                  <span className="mt-2 block font-script text-lg text-rose-deep">{d.cap}</span>
                </div>
              ))
            : drawings.map((drawing, i) => (
                <motion.button
                  key={drawing.id}
                  onClick={() => setActiveIndex(i)}
                  whileHover={{ scale: 1.05, rotate: 0, zIndex: 2 }}
                  style={{ rotate: `${rotations[i]}deg` }}
                  className="w-[140px] rounded bg-paper p-3 pb-8 shadow-soft transition-shadow"
                >
                  <div className="aspect-square overflow-hidden rounded-sm bg-blush">
                    <img src={drawing.url} alt="A little drawing" className="h-full w-full object-cover" loading="lazy" />
                  </div>
                  <span className="mt-2 block font-script text-lg text-rose-deep">✿</span>
                </motion.button>
              ))}
        </div>
      </Reveal>

      <AnimatePresence>
        {activeIndex !== null && !usePlaceholders && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveIndex(null)}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-night/70 p-8 backdrop-blur-sm"
          >
            <motion.img
              key={drawings[activeIndex].id}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 0.68, 0, 1] }}
              src={drawings[activeIndex].url}
              alt="A little drawing"
              className="max-h-[80vh] max-w-[90vw] rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setActiveIndex(null)}
              className="absolute right-6 top-6 text-2xl text-paper"
              aria-label="Close"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
