import { useCallback, useEffect, useRef, useState } from 'react';

const TARGET_VOLUME = 0.55;
const DUCKED_VOLUME = 0.2;
const FADE_STEP_MS = 40;

export function useBackgroundMusic(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const fadeInterval = useRef<number | null>(null);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [src]);

  const fadeTo = useCallback((target: number, durationMs = 800) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (fadeInterval.current) window.clearInterval(fadeInterval.current);

    const steps = Math.max(1, Math.round(durationMs / FADE_STEP_MS));
    const startVolume = audio.volume;
    const delta = (target - startVolume) / steps;
    let step = 0;

    fadeInterval.current = window.setInterval(() => {
      step += 1;
      const next = Math.min(1, Math.max(0, startVolume + delta * step));
      audio.volume = next;
      if (step >= steps) {
        audio.volume = target;
        if (fadeInterval.current) window.clearInterval(fadeInterval.current);
      }
    }, FADE_STEP_MS);
  }, []);

  const start = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio
      .play()
      .then(() => {
        setHasStarted(true);
        setIsPlaying(true);
        fadeTo(TARGET_VOLUME, 1400);
      })
      .catch(() => {
        // Autoplay restrictions — user can still use the manual play button.
      });
  }, [fadeTo]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().then(() => {
        setIsPlaying(true);
        fadeTo(TARGET_VOLUME, 500);
      });
    } else {
      fadeTo(0, 400);
      window.setTimeout(() => {
        audio.pause();
        setIsPlaying(false);
      }, 420);
    }
  }, [fadeTo]);

  const duck = useCallback(() => fadeTo(DUCKED_VOLUME, 600), [fadeTo]);
  const unduck = useCallback(() => fadeTo(TARGET_VOLUME, 600), [fadeTo]);

  const setVolume = useCallback((value: number) => {
    if (audioRef.current) audioRef.current.volume = value;
  }, []);

  return { start, toggle, duck, unduck, setVolume, isPlaying, hasStarted };
}
