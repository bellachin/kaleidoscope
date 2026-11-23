#!/usr/bin/env node
// Pulls Kaleidoscope + approved club events from Notion and writes src/data/events.json.
// Port of the official-API path of notion_calendar.py (shared by the Kaleidoscope team).
//
//   npm run events                  # current semester only
//   npm run events -- --all         # every semester
//
// Needs NOTION_API_KEY in .env (never a VITE_ variable: those ship to the browser).
// The site itself never talks to Notion; it only reads the JSON this script writes.

import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Notion databases to pull from. `dateColumn` defaults to DATE_COLUMN.
const SOURCES = [
  { dataSource: '303de33c-c3a2-802f-943f-000b55454255', label: 'Kaleidoscope Events' },
  {
    page: '2f0de33c-c3a2-81b9-a8ed-e7c58f0cfef5',
    label: 'Club Events',
    dateColumn: 'Event Date',
    status: 'Approved', // only approved club requests
  },
];

const DATE_COLUMN = 'Date';
const CURRENT_SEMESTER_COLUMN = 'Current Semester';
// Only these Notion columns are copied into the public JSON. Everything else
// (contacts, budgets, request notes) stays in Notion.
const PUBLIC_COLUMNS = {
  location: ['Location', 'Room', 'Where'],
  description: ['Description', 'Summary'],
};
const NOTION_VERSION = '2026-03-11';
const TIMEZONE = 'America/New_York';
const OUT = resolve(dirname(fileURLToPath(import.meta.url)), '../src/data/events.json');

const KEY = (process.env.NOTION_API_KEY || '').trim();
const ALL = process.argv.includes('--all');

class NotionError extends Error {
  constructor(status, text) {
    super(`Notion API error ${status}: ${text.slice(0, 300)}`);
    this.status = status;
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function api(method, path, body) {
  for (let i = 0; i < 5; i++) {
    const r = await fetch(`https://api.notion.com/v1/${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${KEY}`,
        'Notion-Version': NOTION_VERSION,
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (r.status === 429) {
      await sleep(Number(r.headers.get('Retry-After') || 1) * 1000);
      continue;
    }
    if (!r.ok) throw new NotionError(r.status, await r.text());
    return r.json();
  }
  throw new NotionError(429, 'still rate limited after 5 tries');
}

function notionId(text) {
  const m = text.match(/([0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12})$/i);
  if (!m) throw new Error(`Couldn't find a Notion id in: ${text}`);
  const h = m[1].replace(/-/g, '').toLowerCase();
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}

// A source is either a data source id, or a page containing databases.
async function dataSourceIds(src) {
  if (src.dataSource) return [notionId(src.dataSource)];
  const id = notionId(src.page);
  try {
    return (await api('GET', `databases/${id}`)).data_sources?.map((d) => d.id) ?? [];
  } catch (e) {
    if (![400, 404].includes(e.status)) throw e;
  }
  const found = [];
  let cursor;
  do {
    const data = await api(
      'GET',
      `blocks/${id}/children?page_size=100${cursor ? `&start_cursor=${cursor}` : ''}`,
    );
    for (const b of data.results) {
      if (b.type === 'child_database') {
        const db = await api('GET', `databases/${b.id}`);
        found.push(...(db.data_sources ?? []).map((d) => d.id));
      }
    }
    cursor = data.has_more ? data.next_cursor : undefined;
  } while (cursor);
  return found;
}

// ISO string -> [YYYY-MM-DD, HH:MM | null] in Boston time
const dateFmt = new Intl.DateTimeFormat('en-CA', {
  timeZone: TIMEZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
});
function splitDt(value) {
  if (!value) return [null, null];
  if (!value.includes('T')) return [value.slice(0, 10), null];
  const p = Object.fromEntries(
    dateFmt.formatToParts(new Date(value)).map((x) => [x.type, x.value]),
  );
  return [`${p.year}-${p.month}-${p.day}`, `${p.hour}:${p.minute}`];
}

function plain(prop) {
  const t = prop?.type;
  const v = prop?.[t];
  if (v == null) return '';
  if (t === 'title' || t === 'rich_text') return v.map((x) => x.plain_text ?? '').join('');
  if (t === 'select' || t === 'status') return v.name ?? '';
  if (t === 'multi_select') return v.map((x) => x.name).join(', ');
  if (t === 'formula') return v[v.type] == null ? '' : String(v[v.type]);
  if (['number', 'url', 'email', 'phone_number'].includes(t)) return String(v);
  return '';
}

function pick(props, names) {
  const lower = names.map((n) => n.toLowerCase());
  const key = Object.keys(props).find((k) => lower.includes(k.trim().toLowerCase()));
  return key ? plain(props[key]).trim() || undefined : undefined;
}

function toEvent(page, calendar, dateColumn = DATE_COLUMN) {
  const props = page.properties ?? {};
  const dates = Object.keys(props).filter((k) => props[k].type === 'date');
  const dateName =
    dates.find((k) => k.trim().toLowerCase() === dateColumn.toLowerCase()) ?? dates[0];
  const d = dateName ? props[dateName].date : null;
  if (!d?.start) return null;
  const [start, startTime] = splitDt(d.start);
  const [end, endTime] = splitDt(d.end);
  const title = plain(Object.values(props).find((p) => p.type === 'title')).trim();
  return {
    id: page.id,
    title: title || 'Untitled',
    start,
    end: end ?? start,
    startTime,
    endTime,
    calendar,
    location: pick(props, PUBLIC_COLUMNS.location),
    description: pick(props, PUBLIC_COLUMNS.description),
    // Internal only, stripped before writing
    _type: plain(props.Type),
    _status: plain(props.Status),
  };
}

async function findCurrentSemester() {
  const filter = {
    and: [
      { property: CURRENT_SEMESTER_COLUMN, formula: { checkbox: { equals: true } } },
      { property: 'Type', select: { equals: 'Semester' } },
    ],
  };
  for (const src of SOURCES) {
    try {
      for (const id of await dataSourceIds(src)) {
        const data = await api('POST', `data_sources/${id}/query`, { page_size: 10, filter });
        for (const page of data.results) {
          const ev = toEvent(page, '');
          if (ev) return { name: ev.title, start: ev.start, end: ev.end };
        }
      }
    } catch (e) {
      if (!(e instanceof NotionError)) throw e; // database without those columns
    }
  }
  return null;
}

// Fallback when Notion has no "Current Semester" row
function semesterFromToday() {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth() + 1;
  if (m >= 9) return { name: `Fall ${y}`, start: `${y}-09-01`, end: `${y}-12-31` };
  if (m <= 4) return { name: `Spring ${y}`, start: `${y}-01-01`, end: `${y}-04-30` };
  return { name: `Summer ${y}`, start: `${y}-05-01`, end: `${y}-08-31` };
}

async function collect(src, semester) {
  const events = [];
  for (const id of await dataSourceIds(src)) {
    const info = await api('GET', `data_sources/${id}`);
    const calendar =
      src.label ||
      info.title
        ?.map((t) => t.plain_text)
        .join('')
        .trim() ||
      'Notion';
    const dateCol = src.dateColumn ?? DATE_COLUMN;
    let filters = [];
    if (semester) {
      filters.push(
        { property: dateCol, date: { on_or_after: semester.start } },
        { property: dateCol, date: { on_or_before: semester.end } },
      );
    }
    if (src.status) filters.push({ property: 'Status', status: { equals: src.status } });

    let cursor;
    let count = 0;
    for (;;) {
      const body = { page_size: 100 };
      if (filters.length) body.filter = { and: filters };
      if (cursor) body.start_cursor = cursor;
      let data;
      try {
        data = await api('POST', `data_sources/${id}/query`, body);
      } catch (e) {
        if (e.status === 400 && filters.length && !cursor) {
          filters = []; // a column is missing; filter in JS below instead
          continue;
        }
        throw e;
      }
      for (const page of data.results) {
        if (page.object !== 'page') continue;
        const ev = toEvent(page, calendar, dateCol);
        if (!ev || ev._type === 'Semester') continue;
        if (src.status && ev._status !== src.status) continue;
        events.push(ev);
        count++;
      }
      if (!data.has_more) break;
      cursor = data.next_cursor;
      await sleep(350);
    }
    console.log(`  ${calendar}: ${count} events`);
  }
  return events;
}

// Same event listed by both calendars, e.g. "Sandbox & C4C - Hack Night" vs "C4C and Sandbox - Hack Night"
function nameKey(title) {
  const t = title.split(/\s+/).join(' ').toLowerCase();
  const [names, rest = ''] = t.split(/\s+[-–—]\s+/, 2);
  const parts = names
    .split(/,|&|\band\b/)
    .map((s) => s.trim())
    .filter(Boolean)
    .sort();
  return `${parts.join('|')}::${rest}`;
}

async function main() {
  if (!KEY) {
    console.error(
      'NOTION_API_KEY is not set. Add it to .env (see docs/NOTION_CALENDAR.md). events.json was not changed.',
    );
    process.exit(1);
  }

  let semester = null;
  if (!ALL) {
    semester = await findCurrentSemester();
    if (semester) console.log(`Current semester in Notion: ${semester.name}`);
    else console.warn("Couldn't find a Semester row with Current Semester checked");
  }

  let events = [];
  for (const src of SOURCES) {
    console.log(`Loading ${src.label}`);
    try {
      events.push(...(await collect(src, semester)));
    } catch (e) {
      const hint = {
        401: 'the key was rejected; check it or create a new one',
        403: "the key doesn't have permission to read this",
        404: "the key can't see this page; add the integration via ••• > Connections in Notion",
      }[e.status];
      console.error(`  Skipped: ${e.message}${hint ? `\n  Hint: ${hint}` : ''}`);
    }
  }

  events.sort((a, b) =>
    (a.start + (a.startTime ?? '')).localeCompare(b.start + (b.startTime ?? '')),
  );
  const seen = new Set();
  events = events.filter((e) => {
    const k = `${nameKey(e.title)}@${e.start}`;
    return seen.has(k) ? false : (seen.add(k), true);
  });

  if (!ALL) {
    semester ??= semesterFromToday();
    events = events.filter((e) => e.end >= semester.start && e.start <= semester.end);
    console.log(`Showing ${semester.name} (${semester.start} to ${semester.end})`);
  }

  const out = {
    generated: new Date().toISOString(),
    semester: ALL ? null : semester,
    events: events.map(({ _type, _status, ...e }) => e),
  };
  await mkdir(dirname(OUT), { recursive: true });
  await writeFile(OUT, JSON.stringify(out, null, 2) + '\n');
  console.log(`Wrote ${out.events.length} events to ${OUT}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
