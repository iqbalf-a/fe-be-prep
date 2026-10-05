/**
 * hooks/useDrawerGestures.js
 * ---------------------------------------------------------------------------
 * Touch gestures for the mobile navigation drawer:
 *   - swipe right from the left edge opens it
 *   - swipe left anywhere inside the drawer closes it
 *
 * Two rules keep the gesture from fighting the page:
 *   1. It only starts claiming a touch that begins in the left EDGE_ZONE pixels
 *      (open) or inside the drawer element (close). A touch that starts in the
 *      reading pane does nothing, so text selection and vertical scrolling are
 *      never intercepted.
 *   2. Once tracking, the gesture is only accepted when it is clearly
 *      horizontal (|dx| > |dy|) and longer than THRESHOLD pixels. Anything else
 *      is treated as a scroll and ignored.
 *
 * Listeners are passive: the handler observes, it never preventDefault, so the
 * browser keeps ownership of scrolling and pinch-to-zoom.
 */

import { useEffect } from 'react';

const EDGE_ZONE = 24;
const THRESHOLD = 48;
const SLOP = 8;

export function useDrawerGestures({ open, onOpen, onClose, drawerId = 'sidebar' }) {
  useEffect(() => {
    /** @type {{ id: number, x: number, y: number, mode: 'open' | 'close' | null } | null} */
    let gesture = null;

    function drawerElement() {
      return document.getElementById(drawerId);
    }

    function onTouchStart(event) {
      const touch = event.changedTouches[0];
      if (!touch) return;

      if (open) {
        const drawer = drawerElement();
        const insideDrawer = drawer && event.target instanceof Node && drawer.contains(event.target);
        gesture = { id: touch.identifier, x: touch.clientX, y: touch.clientY, mode: insideDrawer ? 'close' : null };
        return;
      }

      gesture =
        touch.clientX <= EDGE_ZONE
          ? { id: touch.identifier, x: touch.clientX, y: touch.clientY, mode: 'open' }
          : null;
    }

    function onTouchMove(event) {
      if (!gesture) return;
      const touch = [...event.changedTouches].find((item) => item.identifier === gesture.id);
      if (!touch) return;

      const dx = touch.clientX - gesture.x;
      const dy = touch.clientY - gesture.y;

      // Claim the gesture only once it is clearly horizontal, then finish as soon
      // as the threshold is crossed so the drawer does not keep following the
      // finger (the CSS transition animates the rest).
      if (Math.abs(dx) < SLOP || Math.abs(dx) <= Math.abs(dy)) return;

      if (gesture.mode === 'open' && dx > THRESHOLD) {
        onOpen?.();
        gesture = null;
      } else if (gesture.mode === 'close' && dx < -THRESHOLD) {
        onClose?.();
        gesture = null;
      }
    }

    function onTouchEnd(event) {
      if (!gesture) return;
      const touch = [...event.changedTouches].find((item) => item.identifier === gesture.id);
      if (touch) {
        const dx = touch.clientX - gesture.x;
        if (gesture.mode === 'open' && dx > THRESHOLD) onOpen?.();
        else if (gesture.mode === 'close' && dx < -THRESHOLD) onClose?.();
      }
      gesture = null;
    }

    function onTouchCancel() {
      gesture = null;
    }

    document.addEventListener('touchstart', onTouchStart, { passive: true });
    document.addEventListener('touchmove', onTouchMove, { passive: true });
    document.addEventListener('touchend', onTouchEnd, { passive: true });
    document.addEventListener('touchcancel', onTouchCancel, { passive: true });

    return () => {
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
      document.removeEventListener('touchcancel', onTouchCancel);
    };
  }, [open, onOpen, onClose, drawerId]);
}