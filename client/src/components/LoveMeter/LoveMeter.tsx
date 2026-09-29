import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Reveal from '../ui/Reveal';
import type { SiteContent } from '../../types';

interface LoveMeterProps {
  content: SiteContent['loveMeter'];
}

const STEPS = [10, 25, 50, 75, 100];
const STEP_DELAY = 500;

export default function LoveMeter({ content }: LoveMeterProps) {
  const [percent, setPercent] = useState(0);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [running, setRunning] = useState(false);
  const [label, setLabel] = useState('find out');
  const timers = useRef<number[]>([]);

  function run() {
    if (running) return;
    setRunning(true);
    setError(false);
    setMessage('');
    setPercent(0);
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];

    STEPS.forEach((v, i) => {
      const t = window.setTimeout(() => setPercent(v), STEP_DELAY * (i + 1));
      timers.current.push(t);
    });

    const overflowDelay = STEP_DELAY * (STEPS.length + 1);
    timers.current.push(
      window.setTimeout(() => {
        setPercent(137);
        setError(true);
        setMessage(content.overflowTitle);
      }, overflowDelay)
    );

    timers.current.push(
      window.setTimeout(() => {
        setMessage(content.overflowMessage);
        setRunning(false);
        setLabel('again?');
      }, overflowDelay + 1400)
    );
  }

  const visualWidth = Math.min(percent, 100);

  return (
    <section className="mx-auto max-w-md px-6 py-28 text-center">
      <Reveal>
        <h2 className="font-display text-3xl text-rose-deep sm:text-4xl">{content.title}</h2>
        <button
          onClick={run}
          className="mt-8 rounded-full border border-blush-deep bg-paper px-7 py-3 font-display text-lg text-rose-deep shadow-soft transition-transform hover:-translate-y-0.5"
        >
          {label}
        </button>

        <div className="mx-auto mt-9 h-4 w-full overflow-hidden rounded-full bg-blush shadow-inner">
          <motion.div
            animate={{
              width: `${visualWidth}%`,
              x: error ? [0, -4, 4, -3, 3, 0] : 0,
            }}
            transition={{ width: { duration: 0.55, ease: 'easeOut' }, x: { duration: 0.35 } }}
            className={
              error
                ? 'h-full rounded-full bg-gradient-to-r from-rose-deep to-[#8a3f5c]'
                : 'h-full rounded-full bg-gradient-to-r from-rose to-gold'
            }
          />
        </div>

        <p className="mt-4 min-h-[2.4rem] font-display text-3xl text-rose-deep">
          {percent > 0 ? `${percent}%` : ''}
        </p>
        <p className={error ? 'min-h-[2.4em] font-semibold tracking-wide text-rose-deep' : 'min-h-[2.4em] text-plum-soft'}>
          {message}
        </p>
      </Reveal>
    </section>
  );
}
