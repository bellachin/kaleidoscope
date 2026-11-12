import UpcomingEvents from '@/components/events/UpcomingEvents';

// Placeholder content. Replace with Sanity query results.
const upcoming = {
  heading: 'Upcoming Events',
  description:
    'Join us for our next events — open to all undergrads. Discover what Kaleidoscope and Khoury clubs are hosting on campus and find your community!',
  ctaLabel: 'Events Calendar',
  ctaHref: '#',
};

const events = [1, 2, 3, 4, 5, 6].map((n) => ({
  id: String(n),
  title: 'Event Title',
  description: 'Description',
  dateTime: 'Date / Time',
  location: 'Location',
}));

export default function Homepage() {
  return (
    <main>
      <UpcomingEvents {...upcoming} events={events} />
    </main>
  );
}
