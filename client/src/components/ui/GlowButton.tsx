import { useState, type MouseEvent, type ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../utils/cn';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

interface GlowButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'solid' | 'outline';
  children?: ReactNode;
}

export default function GlowButton({
  children,
  className,
  variant = 'solid',
  onClick,
  ...rest
}: GlowButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const ripple = { id: Date.now(), x: e.clientX - rect.left, y: e.clientY - rect.top };
    setRipples((r) => [...r, ripple]);
    window.setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== ripple.id)), 650);
    onClick?.(e);
  }

  return (
    <motion.button
      {...rest}
      onClick={handleClick}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        'relative overflow-hidden rounded-full px-8 py-4 font-display text-lg tracking-wide shadow-soft transition-shadow duration-500',
        variant === 'solid'
          ? 'bg-gradient-to-br from-rose to-rose-deep text-paper hover:shadow-[0_0_26px_6px_rgba(192,114,143,0.35)]'
          : 'border border-blush-deep bg-paper text-rose-deep hover:shadow-[0_0_18px_4px_rgba(192,114,143,0.2)]',
        className
      )}
    >
      {children}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="pointer-events-none absolute h-2 w-2 animate-ping rounded-full bg-white/60"
          style={{ left: r.x - 4, top: r.y - 4 }}
        />
      ))}
    </motion.button>
  );
}
