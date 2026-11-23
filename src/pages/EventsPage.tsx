import EventsCalendar from '@/components/events/EventsCalendar';
import { eventsData } from '@/lib/events';
import './EventsPage.css';

export default function EventsPage() {
  const { events, semester, generated, sample } = eventsData;
  return (
    <main className="events-page">
      <h1 className="events-page__heading">Events Calendar</h1>
      <p className="events-page__intro">
        Kaleidoscope events and approved Khoury club events
        {semester ? ` for ${semester.name}` : ''}.
      </p>
      <EventsCalendar events={events} semester={semester} />
      <p className="events-page__meta">
        {sample
          ? 'Showing sample events until the Notion sync is set up.'
          : generated &&
            `Last updated ${new Date(generated).toLocaleDateString('en-US', { dateStyle: 'long' })}.`}
      </p>
    </main>
  );
}
