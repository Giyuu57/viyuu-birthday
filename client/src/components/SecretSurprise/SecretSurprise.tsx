import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { SiteContent } from '../../types';

interface SecretSurpriseProps {
  content: SiteContent['secret'];
}

/**
 * Renders as an almost-invisible inline heart meant to be dropped inside
 * existing copy (see LoveJourney usage in Home.tsx) so it reads as a subtle
 * texture in the sentence rather than an obvious button.
 */
export function SecretHeart({ content }: SecretSurpriseProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="A tiny secret"
        className="ml-1 inline-block translate-y-0.5 text-sm opacity-[0.14] transition hover:scale-125 hover:opacity-50"
      >
        ♡
      </button>
      <SecretModal content={content} open={open} onClose={() => setOpen(false)} />
    </>
  );
}

function SecretModal({ content, open, onClose }: SecretSurpriseProps & { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[130] flex items-center justify-center bg-plum/50 p-8 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 0.68, 0, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-sm rounded-2xl bg-paper p-9 text-center shadow-2xl"
          >
            <span className="mb-3 block font-script text-2xl text-rose-deep">{content.foundTitle}</span>
            {content.messageLines.map((line, i) => (
              <p key={i} className="mt-2 text-plum-soft">
                {line}
              </p>
            ))}
            <button
              onClick={onClose}
              className="mt-6 rounded-full bg-blush px-6 py-2 font-display text-rose-deep"
            >
              close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
