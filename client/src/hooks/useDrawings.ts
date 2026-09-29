import { useEffect, useState } from 'react';
import type { DrawingItem } from '../types';

interface UseDrawingsResult {
  drawings: DrawingItem[];
  loading: boolean;
}

/**
 * Asks the backend which drawing files currently exist in
 * client/public/assets/drawings. If the backend isn't running, we degrade
 * to an empty list — the gallery component then shows cute placeholder
 * doodles instead, so the page never looks broken.
 */
export function useDrawings(): UseDrawingsResult {
  const [drawings, setDrawings] = useState<DrawingItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetch('/api/drawings')
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('bad response'))))
      .then((data) => {
        if (!cancelled && Array.isArray(data?.drawings)) {
          setDrawings(data.drawings);
        }
      })
      .catch(() => {
        // Backend not running — placeholder doodles will be shown instead.
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { drawings, loading };
}
