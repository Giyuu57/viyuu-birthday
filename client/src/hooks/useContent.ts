import { useEffect, useState } from 'react';
import type { SiteContent } from '../types';
import { content as fallbackContent } from '../data/content';

interface UseContentResult {
  content: SiteContent;
  loading: boolean;
  source: 'api' | 'fallback';
}

/**
 * Tries to load content from the backend (`GET /api/content`) so the site
 * can be edited/persisted through the database later. If the API is
 * unreachable (or you're only running the client), it falls back instantly
 * to the local `data/content.ts` file — so the page always renders
 * immediately rather than showing a spinner while it waits.
 */
export function useContent(): UseContentResult {
  const [content, setContent] = useState<SiteContent>(fallbackContent);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<'api' | 'fallback'>('fallback');

  useEffect(() => {
    let cancelled = false;

    fetch('/api/content')
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('bad response'))))
      .then((data) => {
        if (!cancelled && data?.content) {
          setContent(data.content);
          setSource('api');
        }
      })
      .catch(() => {
        // Silent by design — the fallback content is already showing.
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { content, loading, source };
}
