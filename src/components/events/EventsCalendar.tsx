import { useEffect, useMemo, useRef, useState } from 'react';
import {
  type CalendarEvent,
  type Semester,
  formatDay,
  formatTime,
  formatWhen,
  parseDay,
  ymd,
} from '@/lib/events';
import './EventsCalendar.css';

interface EventsCalendarProps {
  events: CalendarEvent[];
  /** When set, month navigation stays inside the semester. */
  semester?: Semester | null;
}

/** One modifier class per Notion calendar; extend in EventsCalendar.css if more are added. */
const CALENDAR_CLASS: Record<string, string> = {
  'Kaleidoscope Events': 'cal--kaleidoscope',
  'Club Events': 'cal--club',
};
const calClass = (c: string) => CALENDAR_CLASS[c] ?? 'cal--other';

const firstOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MAX_PER_DAY = 3;

type Dialog =
  { kind: 'event'; event: CalendarEvent } | { kind: 'day'; day: string; events: CalendarEvent[] };

/** Month-view calendar of events pulled from Notion (see scripts/fetch-notion-events.mjs). */
export default function EventsCalendar({ events, semester }: EventsCalendarProps) {
  const minMonth = semester ? firstOfMonth(parseDay(semester.start)) : null;
  const maxMonth = semester ? firstOfMonth(parseDay(semester.end)) : null;
  const clamp = (m: Date) =>
    minMonth && m < minMonth ? minMonth : maxMonth && m > maxMonth ? maxMonth : m;

  const [month, setMonth] = useState(() => clamp(firstOfMonth(new Date())));
  const [hidden, setHidden] = useState<Set<string>>(new Set());
  const [dialog, setDialog] = useState<Dialog | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const calendars = useMemo(() => [...new Set(events.map((e) => e.calendar))], [events]);
  const today = ymd(new Date());

  // day (YYYY-MM-DD) -> events on that day, multi-day events on every day they span
  const byDay = useMemo(() => {
    const idx: Record<string, CalendarEvent[]> = {};
    for (const e of events) {
      if (hidden.has(e.calendar)) continue;
      const d = parseDay(e.start);
      const end = parseDay(e.end);
      for (let i = 0; d <= end && i < 400; i++, d.setDate(d.getDate() + 1)) {
        (idx[ymd(d)] ??= []).push(e);
      }
    }
    for (const list of Object.values(idx)) {
      list.sort(
        (a, b) =>
          (a.startTime ?? '').localeCompare(b.startTime ?? '') || a.title.localeCompare(b.title),
      );
    }
    return idx;
  }, [events, hidden]);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (dialog && !d.open) d.showModal();
    if (!dialog && d.open) d.close();
  }, [dialog]);

  const step = (n: number) =>
    setMonth((m) => clamp(new Date(m.getFullYear(), m.getMonth() + n, 1)));
  const canPrev = !minMonth || month > minMonth;
  const canNext = !maxMonth || month < maxMonth;

  // Build the 5–6 week grid
  const first = firstOfMonth(month);
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const cellCount = Math.ceil((first.getDay() + daysInMonth) / 7) * 7;
  const cells = Array.from({ length: cellCount }, (_, i) => {
    const d = new Date(first);
    d.setDate(1 - first.getDay() + i);
    return d;
  });
  const inMonthCount = cells
    .filter((d) => d.getMonth() === month.getMonth())
    .reduce((n, d) => n + (byDay[ymd(d)]?.length ?? 0), 0);
  const monthEnd = ymd(new Date(month.getFullYear(), month.getMonth() + 1, 0));
  const nextEvent = events
    .filter((e) => !hidden.has(e.calendar) && e.start > monthEnd)
    .map((e) => e.start)
    .sort()[0];

  const chip = (e: CalendarEvent) => (
    <button
      key={e.id}
      type="button"
      className={`cal__event ${calClass(e.calendar)}`}
      title={`${e.title}, ${formatWhen(e)}`}
      onClick={() => setDialog({ kind: 'event', event: e })}
    >
      {e.startTime && <span className="cal__event-time">{formatTime(e.startTime)}</span>}
      {e.title}
    </button>
  );

  return (
    <section className="cal" aria-label="Events calendar">
      <div className="cal__header">
        <h2 className="cal__title" aria-live="polite">
          {month.toLocaleDateString('en-US', { month: 'long' })}{' '}
          <span className="cal__year">{month.getFullYear()}</span>
        </h2>
        <div className="cal__nav">
          <button type="button" onClick={() => setMonth(clamp(firstOfMonth(new Date())))}>
            Today
          </button>
          <button
            type="button"
            onClick={() => step(-1)}
            disabled={!canPrev}
            aria-label="Previous month"
          >
            ‹
          </button>
          <button type="button" onClick={() => step(1)} disabled={!canNext} aria-label="Next month">
            ›
          </button>
        </div>
      </div>

      {calendars.length > 1 && (
        <div className="cal__legend" role="group" aria-label="Show calendars">
          {calendars.map((c) => {
            const on = !hidden.has(c);
            return (
              <button
                key={c}
                type="button"
                className={`cal__source ${calClass(c)}`}
                aria-pressed={on}
                onClick={() =>
                  setHidden((h) => {
                    const next = new Set(h);
                    if (on) next.add(c);
                    else next.delete(c);
                    return next;
                  })
                }
              >
                <span className="cal__swatch" aria-hidden="true" />
                {c}
                <span className="cal__count">{events.filter((e) => e.calendar === c).length}</span>
              </button>
            );
          })}
        </div>
      )}

      <div className="cal__grid">
        {WEEKDAYS.map((w) => (
          <div key={w} className="cal__dow">
            {w}
          </div>
        ))}
        {cells.map((d) => {
          const key = ymd(d);
          const list = byDay[key] ?? [];
          const limit = list.length > MAX_PER_DAY ? MAX_PER_DAY - 1 : MAX_PER_DAY;
          const cls = [
            'cal__day',
            d.getMonth() !== month.getMonth() && 'cal__day--out',
            key === today && 'cal__day--today',
          ]
            .filter(Boolean)
            .join(' ');
          return (
            <div
              key={key}
              className={cls}
              aria-label={d.toLocaleDateString('en-US', { dateStyle: 'full' })}
            >
              <span className="cal__num">{d.getDate()}</span>
              {list.slice(0, limit).map(chip)}
              {list.length > limit && (
                <button
                  type="button"
                  className="cal__more"
                  onClick={() => setDialog({ kind: 'day', day: key, events: list })}
                >
                  {list.length - limit} more
                </button>
              )}
            </div>
          );
        })}
      </div>

      {!events.length ? (
        <p className="cal__note">No events have been posted for this semester yet.</p>
      ) : (
        !inMonthCount && (
          <p className="cal__note">
            No events this month.{' '}
            {nextEvent && (
              <button
                type="button"
                className="cal__link"
                onClick={() => setMonth(firstOfMonth(parseDay(nextEvent)))}
              >
                Go to the next one ({formatDay(nextEvent, true)})
              </button>
            )}
          </p>
        )
      )}

      <dialog
        ref={dialogRef}
        className="cal__dialog"
        onClose={() => setDialog(null)}
        onClick={(e) => e.target === e.currentTarget && setDialog(null)}
      >
        {dialog?.kind === 'event' && (
          <div className={`cal__dialog-body ${calClass(dialog.event.calendar)}`}>
            <p className="cal__dialog-source">
              <span className="cal__swatch" aria-hidden="true" />
              {dialog.event.calendar}
            </p>
            <h3>{dialog.event.title}</h3>
            <p>{formatWhen(dialog.event)}</p>
            {dialog.event.location && <p>{dialog.event.location}</p>}
            {dialog.event.description && <p>{dialog.event.description}</p>}
          </div>
        )}
        {dialog?.kind === 'day' && (
          <div className="cal__dialog-body">
            <h3>{parseDay(dialog.day).toLocaleDateString('en-US', { dateStyle: 'full' })}</h3>
            {dialog.events.map(chip)}
          </div>
        )}
        <form method="dialog" className="cal__dialog-foot">
          <button>Close</button>
        </form>
      </dialog>
    </section>
  );
}
