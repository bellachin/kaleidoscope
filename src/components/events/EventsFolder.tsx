import { useCallback, useEffect, useRef, useState } from 'react';
import Pagination from './Pagination';
import './EventsFolder.css';
import paperclip from '@/assets/events/paperclip.png';
import tabLight from '@/assets/events/folder-tab-light.svg';
import tabDark from '@/assets/events/folder-tab-dark.svg';

export interface EventItem {
  id: string;
  title: string;
  description: string;
  dateTime: string;
  location: string;
}

interface EventsFolderProps {
  events: EventItem[];
  /** Autoplay delay in ms. Set 0 to disable. */
  autoplayMs?: number;
}

const DRAG_THRESHOLD = 50;

/**
 * Folder panel of paperclipped event cards. The cards slide: dots, swipe, mouse drag,
 * arrow keys and autoplay all move between pages. `events` will come from Sanity.
 */
export default function EventsFolder({ events, autoplayMs = 6000 }: EventsFolderProps) {
  const scroller = useRef<HTMLUListElement>(null);
  const drag = useRef<{ x: number; left: number } | null>(null);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);

  const step = useCallback(() => {
    const el = scroller.current;
    if (!el) return { step: 1, gap: 0 };
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    return { step: el.clientWidth + gap, gap };
  }, []);

  const measure = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    const { step: s, gap } = step();
    setPages(Math.max(1, Math.round((el.scrollWidth + gap) / s)));
    setPage(Math.round(el.scrollLeft / s));
  }, [step]);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure, events.length]);

  const goTo = useCallback(
    (i: number) => {
      const target = ((i % pages) + pages) % pages;
      scroller.current?.scrollTo({ left: target * step().step, behavior: 'smooth' });
    },
    [pages, step],
  );

  const reducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const autoplay = autoplayMs > 0 && pages > 1 && !reducedMotion;

  // Restarts whenever the page changes (including manual changes).
  useEffect(() => {
    if (!autoplay || paused) return;
    const id = window.setTimeout(() => goTo(page + 1), autoplayMs);
    return () => window.clearTimeout(id);
  }, [autoplay, paused, page, autoplayMs, goTo]);

  // Mouse drag (touch swipe is handled natively by scrolling).
  const onPointerDown = (e: React.PointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== 'mouse') return;
    drag.current = { x: e.clientX, left: e.currentTarget.scrollLeft };
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLUListElement>) => {
    if (drag.current) e.currentTarget.scrollLeft = drag.current.left - (e.clientX - drag.current.x);
  };
  const endDrag = (e: React.PointerEvent<HTMLUListElement>) => {
    const d = drag.current;
    if (!d) return;
    drag.current = null;
    setDragging(false);
    const delta = e.clientX - d.x;
    const startPage = Math.round(d.left / step().step);
    const next =
      delta <= -DRAG_THRESHOLD
        ? startPage + 1
        : delta >= DRAG_THRESHOLD
          ? startPage - 1
          : startPage;
    goTo(Math.min(pages - 1, Math.max(0, next)));
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') goTo(Math.min(pages - 1, page + 1));
    if (e.key === 'ArrowLeft') goTo(Math.max(0, page - 1));
  };

  return (
    <section
      className="folder"
      aria-label="Upcoming event listings"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="folder__tabs" aria-hidden="true">
        <img src={tabLight} alt="" />
        {[0, 1, 2, 3].map((i) => (
          <img key={i} src={tabDark} alt="" />
        ))}
      </div>
      <div className="folder__panel">
        <ul
          className={`folder__scroller${dragging ? ' is-dragging' : ''}`}
          ref={scroller}
          tabIndex={0}
          onScroll={measure}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          {events.map((e) => (
            <li key={e.id} className="folder__card">
              <img className="folder__clip" src={paperclip} alt="" aria-hidden="true" />
              <h3 className="folder__title">{e.title}</h3>
              <p className="folder__label">{e.description}</p>
              <p className="folder__label">{e.dateTime}</p>
              <p className="folder__label">{e.location}</p>
            </li>
          ))}
        </ul>
        <div className="folder__dots">
          <Pagination
            count={pages}
            active={page}
            onSelect={goTo}
            interval={autoplay ? autoplayMs : undefined}
            paused={paused}
          />
        </div>
      </div>
    </section>
  );
}
