import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music } from 'lucide-react';

interface MusicPlayerProps {
  visible: boolean;
  isPlaying: boolean;
  onToggle: () => void;
  onVolumeChange: (v: number) => void;
}

export default function MusicPlayer({ visible, isPlaying, onToggle, onVolumeChange }: MusicPlayerProps) {
  const [showVolume, setShowVolume] = useState(false);
  const [volume, setVolume] = useState(0.55);

  function handleVolume(e: React.ChangeEvent<HTMLInputElement>) {
    const v = Number(e.target.value);
    setVolume(v);
    onVolumeChange(v);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed right-4 top-4 z-[60] flex items-center gap-2"
          onMouseLeave={() => setShowVolume(false)}
        >
          <AnimatePresence>
            {showVolume && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 90 }}
                exit={{ opacity: 0, width: 0 }}
                className="overflow-hidden rounded-full bg-paper/90 px-3 py-2 shadow-soft backdrop-blur"
              >
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={handleVolume}
                  aria-label="Volume"
                  className="h-1 w-full accent-rose-deep"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onMouseEnter={() => setShowVolume(true)}
            onClick={onToggle}
            aria-label={isPlaying ? 'Pause music' : 'Play music'}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-paper/90 text-rose-deep shadow-soft backdrop-blur"
          >
            {isPlaying ? (
              <span className="flex h-3.5 items-end gap-[3px]">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="w-[3px] rounded-full bg-rose-deep"
                    animate={{ height: [4, 14, 6, 12, 4] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
              </span>
            ) : (
              <Music size={18} />
            )}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
