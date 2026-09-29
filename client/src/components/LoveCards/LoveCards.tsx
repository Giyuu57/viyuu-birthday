import { useState, type MouseEvent } from 'react';
import { motion } from 'framer-motion';
import Reveal from '../ui/Reveal';
import type { LoveCardData } from '../../types';

interface LoveCardsProps {
  cards: LoveCardData[];
}

function Card({ title, message }: LoveCardData) {
  const [open, setOpen] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (open) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: px * 10, y: -py * 10 });
  }

  return (
    <motion.div
      role="button"
      tabIndex={0}
      onClick={() => setOpen((o) => !o)}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setOpen((o) => !o)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      animate={{ rotateY: tilt.x, rotateX: tilt.y, y: open ? -4 : 0 }}
      transition={{ type: 'spring', stiffness: 150, damping: 14 }}
      style={{ transformStyle: 'preserve-3d', perspective: 500 }}
      className="relative min-h-[180px] cursor-pointer overflow-hidden rounded-3xl border border-rose/10 bg-paper p-7 shadow-soft transition-shadow duration-500 hover:shadow-[0_0_30px_-6px_rgba(192,114,143,0.35)]"
    >
      <motion.div
        animate={{ opacity: open ? 0 : 1 }}
        transition={{ duration: 0.35 }}
        className="flex h-full min-h-[130px] items-center font-display text-xl text-rose-deep"
      >
        {title}
      </motion.div>
      <motion.div
        initial={false}
        animate={{ opacity: open ? 1 : 0, y: open ? 0 : 8 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 flex items-center bg-gradient-to-br from-blush to-paper p-7"
      >
        <p className="text-plum">{message}</p>
      </motion.div>
    </motion.div>
  );
}

export default function LoveCards({ cards }: LoveCardsProps) {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <Reveal>
        <h2 className="mb-11 text-center font-display text-3xl text-rose-deep sm:text-4xl">
          A few little things ♡
        </h2>
      </Reveal>
      <div className="grid gap-5 sm:grid-cols-3">
        {cards.map((card, i) => (
          <Reveal key={card.title} delay={i * 0.1}>
            <Card {...card} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
