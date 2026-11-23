import c4cLogo from '@/assets/clubs/c4c.svg';
import disruptLogo from '@/assets/clubs/disrupt.svg';
import eclubLogo from '@/assets/clubs/eclub.svg';
import generateLogo from '@/assets/clubs/generate.svg';
import sandboxLogo from '@/assets/clubs/sandbox.svg';
import scoutLogo from '@/assets/clubs/scout.svg';
import wiseLogo from '@/assets/clubs/wise.svg';
import offerPhoto from '@/assets/what_we_offer.svg';
import UpcomingEvents from '@/components/events/UpcomingEvents';
import { formatWhen, upcomingEvents } from '@/lib/events';
import WhatIsKaleidoscope from '@/components/about/WhatIsKaleidoscope';
import OurMission from '@/components/about/OurMission';
import WhatWeOffer from '@/components/about/WhatWeOffer';
import ClubNetwork from '@/components/clubs/ClubNetwork';
import ClubForms from '@/components/clubs/ClubForms';
// import PastEvents from '@/components/clubs/PastEvents';
// TODO: add the photo to src/assets and import it, e.g.
// import offerPhoto from '@/assets/offer-photo.jpg';

// Placeholder content. Replace with Sanity query results.
const upcoming = {
  heading: 'Upcoming Events',
  description:
    'Join us for our next events — open to all undergrads. Discover what Kaleidoscope and Khoury clubs are hosting on campus and find your community!',
  ctaLabel: 'Events Calendar',
  ctaHref: '/events',
};

// Next 6 events from src/data/events.json (synced from Notion by `npm run events`).
const events = upcomingEvents(6).map((e) => ({
  id: e.id,
  title: e.title,
  description: e.description ?? e.calendar,
  dateTime: formatWhen(e),
  location: e.location ?? '',
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
  description:
    'From funding and technical resources to campus-wide connections, Kaleidoscope helps Khoury clubs turn ideas into opportunities. Whether you’re looking to fund your next event, access tools to support your projects, collaborate with other organizations, or connect with industry professionals, we help make those opportunities possible.',
  ctaLabel: 'Check Out Our Resources',
  ctaHref: '/resources',
  image: {
    src: offerPhoto,
    alt: 'Students visiting club tables at an outdoor campus event',
  },
  items: [
    {
      id: 'funding',
      label: 'Funding & Technical Resources',
      description:
        'Access funding opportunities, including event support and annual grants, alongside software, computing resources, and other tools that help your club grow and bring projects to life.',
    },
    {
      id: 'community',
      label: 'Community & Collaboration',
      description:
        'Connect with fellow Khoury organizations, meet student leaders, share ideas, and find opportunities to collaborate on events, projects, and initiatives across clubs.',
    },
    {
      id: 'promotion',
      label: 'Promotion & Visibility',
      description:
        "Get your club and its events in front of the Khoury community through promotional opportunities, club spotlights, social media, newsletters, and campus-wide events.",
    },
    {
      id: 'resources',
      label: 'Industry & Employer Connections',
      description:
        "Build relationships beyond campus through employer connections, industry networking, professional events, and opportunities to showcase your club's work to potential partners.",
    },
  ],
} as const;

// Club names are inferred from the logo file names; correct them as needed.
const network = {
  heading: 'Our Club Network',
  clubs: [
    { id: 'c4c', name: 'C4C', logoSrc: c4cLogo },
    { id: 'disrupt', name: 'Disrupt', logoSrc: disruptLogo },
    { id: 'eclub', name: 'E-Club', logoSrc: eclubLogo },
    { id: 'generate', name: 'Generate', logoSrc: generateLogo },
    { id: 'sandbox', name: 'Sandbox', logoSrc: sandboxLogo },
    { id: 'scout', name: 'Scout', logoSrc: scoutLogo },
    { id: 'wise', name: 'WISE', logoSrc: wiseLogo },
  ],
} as const;

const forms = {
  heading: 'Current Club Forms',
  highlight: 'Forms',
  intro: 'Everything your club needs to request funding, get recognized and stay up to date.',
  forms: [
    {
      id: 'club-recognition',
      title: 'Club Recognition',
      headline: 'Make your club part of Kaleidoscope',
      summary:
        'Complete this form to have your club recognized and included in the Kaleidoscope community, with access to shared resources and support.',
      items: [
        'Your club must complete this form before the start of each academic year',
        'Share your club’s current leadership and information',
        'Recognition provides access to Kaleidoscope resources',
        'Recognized clubs can apply for annual funding',
      ],
      ctaLabel: 'Responses have closed',
      ctaHref: 'https://khoury-kaleidoscope.notion.site/325de33cc3a280af99e3edf4dc1db69e?pvs=105', // Add the next application link here.
      ctaDisabled: true,
    },
    {
      id: 'events-request',
      title: 'Events Fund Request Form',
      headline: 'Up to $7 per person',
      summary: 'Request funding for events that bring the Khoury community together.',
      items: [
        'Submit at least 2 weeks before the event (allow 72 hours for review)',
        'Include an itemized budget and cost per attendee',
        'Estimate attendance and explain how you will advertise',
        'Explain the event’s goals; collaborations are encouraged',
        'Acknowledge Kaleidoscope as a sponsor',
        'Within 21 days, submit an impact summary, actual expenses and 3–5 pictures',
      ],
      ctaLabel: 'Fill out form',
      ctaHref: 'https://khoury-kaleidoscope.notion.site/2f0de33cc3a28154811ade61e308a199?pvs=105',
      featured: true,
    },
    {
      id: 'club-grants',
      title: 'Club Grants',
      headline: '$500 annual grant',
      summary: 'Every Kaleidoscope-recognized club is eligible for the 2026–2027 academic year.',
      items: [
        'Deposited directly into your club’s cash index',
        'Use the funds at your club’s discretion',
        'Stay in good standing: join Club Fairs and Club Council meetings',
        'Board members can attend on behalf of the club',
        'Decisions consider participation, collaborative events and community impact',
      ],
      ctaLabel: 'Responses have closed',
      ctaHref: '', // Add the next application link here.
      ctaDisabled: true,
    },
  ],
} as const;

// const past = {
//   heading: 'Past Events',
//   highlight: 'Events',
//   stories: [
//     { id: 'story-one', quote: 'Placeholder quote about the event.', author: 'Student name', tone: 'white' },
//     { id: 'story-two', quote: 'Placeholder quote about the event.', author: 'Student name', tone: 'sky' },
//     { id: 'story-three', quote: 'Placeholder quote about the event.', author: 'Student name', tone: 'blue' },
//   ],
// } as const;

export default function Homepage() {
  return (
    <main>
      <UpcomingEvents {...upcoming} events={events} />
      <WhatIsKaleidoscope {...about} />
      <OurMission {...mission} />
      <WhatWeOffer {...offer} />
      <ClubNetwork {...network} />
      <ClubForms {...forms} />
      {/* <PastEvents {...past} />  */}
    </main>
  );
}