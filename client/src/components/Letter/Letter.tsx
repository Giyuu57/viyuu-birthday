import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Reveal from '../ui/Reveal';
import type { SiteContent } from '../../types';

interface LetterProps {
  content: SiteContent['letter'];
  onOpen?: () => void;
  onClose?: () => void;
}

const LETTER_SRC = '/assets/handwritten-letter.png';

export default function Letter({ content, onOpen, onClose }: LetterProps) {
  const [open, setOpen] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  function handleOpen() {
    setOpen(true);
    onOpen?.();
  }
  function handleClose() {
    setOpen(false);
    onClose?.();
  }

  return (
    <section className="mx-auto max-w-xl px-6 py-28 text-center">
      <Reveal>
        <h2 className="font-display text-3xl text-rose-deep sm:text-4xl">{content.title}</h2>
        <p className="mt-2 italic text-plum-soft">{content.subtitle}</p>
      </Reveal>

      <Reveal delay={0.15}>
        <div
          role="button"
          tabIndex={0}
          onClick={handleOpen}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleOpen()}
          className="relative mx-auto mt-14 aspect-[8/5] w-[min(80vw,320px)] cursor-pointer"
          style={{ perspective: 800 }}
        >
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blush-deep to-lavender-deep shadow-soft" />
          <motion.div
            animate={{ rotateX: open ? 180 : 0 }}
            transition={{ duration: 0.9, ease: [0.22, 0.68, 0, 1] }}
            style={{ transformOrigin: 'top', transformStyle: 'preserve-3d' }}
            className="absolute inset-0 z-[3] rounded-t-xl bg-gradient-to-br from-blush to-lavender"
          >
            <div
              className="h-full w-full"
              style={{ clipPath: 'polygon(0 0, 100% 0, 50% 58%)' }}
            />
          </motion.div>
          <AnimatePresence>
            {!open && (
              <motion.div
                exit={{ opacity: 0 }}
                className="absolute left-1/2 top-[44%] z-[4] flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-rose-deep text-paper shadow"
              >
                ♡
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div
            animate={{
              y: open ? '-46%' : 0,
              height: open ? '230%' : '0%',
            }}
            transition={{ duration: 1, ease: [0.22, 0.68, 0, 1], delay: open ? 0.35 : 0 }}
            className="absolute left-[8%] right-[8%] top-[6%] z-[2] overflow-hidden rounded-md bg-paper shadow-lg"
          >
            {!imgFailed ? (
              <img
                src={LETTER_SRC}
                alt="Handwritten letter"
                onError={() => setImgFailed(true)}
                className="h-full w-full object-contain"
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-2 border border-dashed border-blush-deep p-6 text-center">
                <span className="font-script text-2xl text-rose-deep">Your letter will live here</span>
                <p className="text-sm text-plum-soft">
                  Add <code>handwritten-letter.png</code> to <code>client/public/assets/</code> and it'll
                  slide right out of this envelope.
                </p>
              </div>
            )}
          </motion.div>
        </div>
        <p className="mt-4 text-sm italic text-plum-soft">{content.hint}</p>
        {open && (
          <button
            onClick={handleClose}
            className="mt-4 font-script text-lg text-rose-deep/80 underline decoration-dashed underline-offset-4"
          >
            close the letter
          </button>
        )}
      </Reveal>
    </section>
  );
}
