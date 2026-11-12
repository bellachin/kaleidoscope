import UpcomingEvents from '@/components/events/UpcomingEvents';
import WhatIsKaleidoscope from '@/components/about/WhatIsKaleidoscope';
import OurMission from '@/components/about/OurMission';
import WhatWeOffer from '@/components/about/WhatWeOffer';
import ClubNetwork from '@/components/clubs/ClubNetwork';
import ClubForms from '@/components/clubs/ClubForms';
import PastEvents from '@/components/clubs/PastEvents';
import FeaturedBand from '@/components/ui/FeaturedBand';
// TODO: add the photo to src/assets and import it, e.g.
// import offerPhoto from '@/assets/offer-photo.jpg';

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

const about = {
  heading: 'What is Kaleidoscope?',
  body: 'Kaleidoscope is a student-led initiative supported by the Khoury dean’s office, dedicated to strengthening collaboration and communication between Khoury undergraduate student clubs and the broader university community. Founded in 2023, Kaleidoscope aims to empower clubs by offering access to Khoury resources, including funding, promotional support, and equitable institutional backing.',
  ctaLabel: 'Join Us',
  ctaHref: '#',
};

const mission = {
  heading: 'Our Mission',
  body: 'Our mission is to cultivate a vibrant, connected community of students, faculty and staff, and organizations through shared opportunities and meaningful engagement.',
};

const offer = {
  heading: 'What We Offer',
  highlight: 'We',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  ctaLabel: 'Let’s Go',
  ctaHref: '#',
  // image: { src: offerPhoto, alt: 'Students visiting club tables at an outdoor campus event' },
  items: [
    { id: 'funding', label: 'Funding' },
    { id: 'community', label: 'Community' },
    { id: 'promotion', label: 'Promotional support' },
    { id: 'resources', label: 'Resources' },
  ],
} as const;

// Placeholder clubs. Add `logoSrc` (imported from src/assets) to show a club's logo.
const network = {
  heading: 'Our Club Network',
  clubs: [
    { id: 'alpha', name: 'Alpha Club' },
    { id: 'beta', name: 'Beta Club' },
    { id: 'gamma', name: 'Gamma Club' },
    { id: 'delta', name: 'Delta Club' },
    { id: 'epsilon', name: 'Epsilon Club' },
    { id: 'zeta', name: 'Zeta Club' },
    { id: 'eta', name: 'Eta Club' },
  ],
} as const;

const formDetails = ['Detail', 'Detail', 'Detail', 'Detail', 'Detail', 'Detail'] as const;

const forms = {
  heading: 'Current Club Forms',
  highlight: 'Forms',
  intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  forms: [
    {
      id: 'form-one',
      title: 'Form Title',
      headline: 'Headline',
      summary: 'Short summary',
      items: formDetails,
      ctaLabel: 'Fill out form',
      ctaHref: '#',
    },
    {
      id: 'events-request',
      title: 'Events Request Form',
      headline: 'Up to $7 per person',
      summary: 'Short summary',
      items: formDetails,
      ctaLabel: 'Fill out form',
      ctaHref: '#',
      featured: true,
    },
    {
      id: 'club-grants',
      title: 'Club Grants',
      headline: 'Headline',
      summary: 'Short summary',
      items: formDetails,
      ctaLabel: 'Fill out form',
      ctaHref: '#',
    },
  ],
} as const;

const past = {
  heading: 'Past Events',
  highlight: 'Events',
  stories: [
    { id: 'story-one', quote: 'Placeholder quote about the event.', author: 'Student name', tone: 'white' },
    { id: 'story-two', quote: 'Placeholder quote about the event.', author: 'Student name', tone: 'sky' },
    { id: 'story-three', quote: 'Placeholder quote about the event.', author: 'Student name', tone: 'blue' },
  ],
} as const;

export default function Homepage() {
  return (
    <main>
      <UpcomingEvents {...upcoming} events={events} />
      <WhatIsKaleidoscope {...about} />
      <OurMission {...mission} />
      <WhatWeOffer {...offer} />
      <ClubNetwork {...network} />
      <FeaturedBand />
      <ClubForms {...forms} />
      <PastEvents {...past} />
    </main>
  );
}