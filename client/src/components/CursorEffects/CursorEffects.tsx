import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface Particle {
  el: HTMLSpanElement;
  born: number;
}

const SYMBOLS = ['♡', '✦', '✧'];
const LIFETIME = 900;
const THROTTLE_MS = 90;

/**
 * A very light-weight particle layer:
 * - Desktop: tiny hearts/sparkles occasionally trail the mouse while moving.
 * - Touch: a small particle appears where you tap.
 * Kept intentionally sparse (throttled + short-lived) so it reads as a subtle
 * touch of magic rather than visual noise, and is skipped entirely if the
 * user prefers reduced motion.
 */
export default function CursorEffects() {
  const layerRef = useRef<HTMLDivElement>(null);
  const particles = useRef<Particle[]>([]);
  const lastSpawn = useRef(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const layer = layerRef.current;
    if (!layer) return;

    function spawn(x: number, y: number) {
      if (!layer) return;
      const el = document.createElement('span');
      el.textContent = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
      el.style.position = 'fixed';
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      el.style.fontSize = `${9 + Math.random() * 8}px`;
      el.style.color = Math.random() > 0.5 ? '#C0728F' : '#D5C3EE';
      el.style.pointerEvents = 'none';
      el.style.transform = 'translate(-50%, -50%)';
      el.style.opacity = '0.8';
      el.style.transition = `transform ${LIFETIME}ms cubic-bezier(.22,.68,0,1), opacity ${LIFETIME}ms ease-out`;
      el.style.zIndex = '70';
      layer.appendChild(el);

      requestAnimationFrame(() => {
        el.style.transform = `translate(-50%, -50%) translateY(-${24 + Math.random() * 20}px) scale(1.3)`;
        el.style.opacity = '0';
      });

      const record = { el, born: Date.now() };
      particles.current.push(record);
      window.setTimeout(() => {
        el.remove();
        particles.current = particles.current.filter((p) => p !== record);
      }, LIFETIME + 50);
    }

    function onPointerMove(e: PointerEvent) {
      if (e.pointerType === 'touch') return; // handled by onPointerDown instead
      const now = Date.now();
      if (now - lastSpawn.current < THROTTLE_MS) return;
      lastSpawn.current = now;
      if (Math.random() < 0.35) spawn(e.clientX, e.clientY);
    }

    function onPointerDown(e: PointerEvent) {
      if (e.pointerType !== 'touch') return;
      spawn(e.clientX, e.clientY);
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
    };
  }, [reducedMotion]);

  return <div ref={layerRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[70]" />;
}
