import data from '@/data/events.json';

/** One event as written by scripts/fetch-notion-events.mjs. */
export interface CalendarEvent {
  id: string;
  title: string;
  /** YYYY-MM-DD */
  start: string;
  /** YYYY-MM-DD (same as start for one-day events) */
  end: string;
  /** HH:MM, 24h, Boston time */
  startTime: string | null;
  endTime: string | null;
  /** Which Notion database it came from, e.g. "Club Events" */
  calendar: string;
  location?: string;
  description?: string;
}

export interface Semester {
  name: string;
  start: string;
  end: string;
}

export interface EventsData {
  /** ISO timestamp of the last Notion pull, null for sample data */
  generated: string | null;
  /** true while events.json still holds the placeholder events */
  sample?: boolean;
  semester: Semester | null;
  events: CalendarEvent[];
}

export const eventsData = data as EventsData;

const pad = (n: number) => String(n).padStart(2, '0');

export const ymd = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

/** Parse YYYY-MM-DD as a local date (new Date('2026-12-01') would be UTC midnight). */
export function parseDay(s: string) {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function formatTime(t: string | null) {
  if (!t) return '';
  const [h, m] = t.split(':').map(Number);
  const ap = h < 12 ? 'AM' : 'PM';
  return m ? `${h % 12 || 12}:${pad(m)} ${ap}` : `${h % 12 || 12} ${ap}`;
}

export function formatDay(s: string, withYear = false) {
  return parseDay(s).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    ...(withYear ? { year: 'numeric' } : {}),
  });
}

/** "Tue, Dec 1, 2026, 6 PM – 8 PM" or "Sat, Dec 5 10 AM – Sun, Dec 6 5 PM" */
export function formatWhen(e: CalendarEvent) {
  const st = formatTime(e.startTime);
  const et = formatTime(e.endTime);
  if (e.end !== e.start) {
    return `${formatDay(e.start)}${st ? ` ${st}` : ''} – ${formatDay(e.end)}${et ? ` ${et}` : ''}`;
  }
  const time = st && et ? `${st} – ${et}` : st;
  return time ? `${formatDay(e.start, true)}, ${time}` : formatDay(e.start, true);
}

/** Events that haven't ended yet, soonest first. */
export function upcomingEvents(limit: number, today = ymd(new Date())) {
  return eventsData.events
    .filter((e) => e.end >= today)
    .sort((a, b) => (a.start + (a.startTime ?? '')).localeCompare(b.start + (b.startTime ?? '')))
    .slice(0, limit);
}
