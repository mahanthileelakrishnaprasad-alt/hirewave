import { useState, useEffect, useCallback } from 'react';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('hirewave_bookmarks') || '[]');
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('hirewave_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const isBookmarked = useCallback((id) => bookmarks.some(b => b.id === id), [bookmarks]);

  const toggle = useCallback((job) => {
    setBookmarks(prev =>
      prev.some(b => b.id === job.id)
        ? prev.filter(b => b.id !== job.id)
        : [...prev, job]
    );
  }, []);

  return { bookmarks, isBookmarked, toggle };
}