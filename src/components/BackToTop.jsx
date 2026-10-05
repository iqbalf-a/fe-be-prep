/**
 * components/BackToTop.jsx
 * ---------------------------------------------------------------------------
 * Appears after the reader has scrolled far enough for it to be useful, and
 * scrolls the reading pane (not the window) back up.
 */

import { useEffect, useState } from 'react';
import { IconArrowUp } from './ui.jsx';

export default function BackToTop({ targetId = 'main-scroll' }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const pane = document.getElementById(targetId);
    if (!pane) return undefined;

    function onScroll() {
      setVisible(pane.scrollTop > 600);
    }

    onScroll();
    pane.addEventListener('scroll', onScroll, { passive: true });
    return () => pane.removeEventListener('scroll', onScroll);
  }, [targetId]);

  if (!visible) return null;

  return (
    <button
      type="button"
      className="back-to-top fixed right-5 bottom-5 z-30 inline-flex items-center gap-1.5 rounded-full border border-line bg-panel px-4 py-2.5 text-sm font-medium text-ink shadow-float transition hover:border-brand hover:text-brand"
      onClick={() => document.getElementById(targetId)?.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <IconArrowUp width={15} height={15} />
      Atas
    </button>
  );
}