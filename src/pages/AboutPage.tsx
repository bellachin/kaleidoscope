import AboutHero from '@/components/about/AboutHero';
import WhatIsKaleidoscope from '@/components/about/WhatIsKaleidoscope';
import OurMission from '@/components/about/OurMission';
import MeetOurTeam from '@/components/about/MeetOurTeam';
import TeamDescriptions from '@/components/about/TeamDescriptions';

// Placeholder content. Replace with Sanity query results.
const hero = {
  heading: 'About Us',
  // Draft subtitle, pending copy review.
  subtitle:
    'Meet Khoury College’s student-led club council and learn how we support student clubs.',
};

// TODO(review): The Join Us button is hidden until it has a real destination.
// To restore it, add `ctaLabel: 'Join Us'` and `ctaHref` here.
const about = {
  heading: 'What is Kaleidoscope?',
  body: 'Kaleidoscope is a student-led initiative supported by the Khoury dean’s office, dedicated to strengthening collaboration and communication between Khoury undergraduate student clubs and the broader university community. Founded in 2023, Kaleidoscope aims to empower clubs by offering access to Khoury resources, including funding, promotional support, and equitable institutional backing.',
};

const mission = {
  heading: 'Our Mission',
  body: 'Our mission is to cultivate a vibrant, connected community of students, faculty and staff, and organizations through shared opportunities and meaningful engagement.',
};

// Add `name` and `photo` (imported from src/assets) once headshots are available.
const team = {
  heading: 'Meet Our Team',
  members: [
    { id: 'president', role: 'President' },
    { id: 'marketing', role: 'Marketing Lead' },
    { id: 'employer-connections', role: 'Employer Connections Lead' },
    { id: 'software', role: 'Software Lead' },
    { id: 'operations', role: 'Operations Lead' },
    { id: 'global', role: 'Global Lead' },
  ],
} as const;

const teams = {
  heading: 'Team Descriptions',
  teams: [
    {
      id: 'operations',
      name: 'Operations Team',
      description: 'Placeholder: what Operations does.',
    },
    { id: 'global', name: 'Global', description: 'Placeholder: what Global does.' },
    {
      id: 'employer-connections',
      name: 'Employer Connections',
      description: 'Placeholder: what Employer Connections does.',
    },
    { id: 'marketing', name: 'Marketing', description: 'Placeholder: what Marketing does.' },
    // TODO(design review): Figma repeats "Global" here. Software is a plausible replacement
    // (there is a Software Lead), but the team should confirm the label before it changes.
    { id: 'global-2', name: 'Global', description: 'Placeholder: what this team does.' },
  ],
} as const;

export default function AboutPage() {
  return (
    <main className="about-page">
      <AboutHero {...hero} />

      <WhatIsKaleidoscope {...about} />
      <OurMission {...mission} />

      <MeetOurTeam {...team} />
      <TeamDescriptions {...teams} />
    </main>
  );
}
