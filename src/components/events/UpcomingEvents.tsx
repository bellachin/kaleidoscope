import EventsFolder, { type EventItem } from './EventsFolder';
import './UpcomingEvents.css';
import hexIcon from '@/assets/events/hex-icon.png';
import hex1 from '@/assets/events/hex-watermark-1.png';
import hex2 from '@/assets/events/hex-watermark-2.png';
import hex3 from '@/assets/events/hex-watermark-3.png';

export interface UpcomingEventsProps {
  heading: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  events: EventItem[];
}

/** Props map 1:1 to the fields the Sanity document will provide. */
export default function UpcomingEvents({
  heading,
  description,
  ctaLabel,
  ctaHref,
  events,
}: UpcomingEventsProps) {
  return (
    <section className="upcoming" aria-labelledby="upcoming-events-title">
      <img className="upcoming__hex upcoming__hex--top" src={hex2} alt="" aria-hidden="true" />

      <div className="upcoming__corner" aria-hidden="true">
        <img className="upcoming__hex upcoming__hex--corner" src={hex3} alt="" />
        <img className="upcoming__icon" src={hexIcon} alt="" />
      </div>

      <div className="upcoming__inner">
        <div className="upcoming__text">
          <div className="upcoming__mark">
            <img className="upcoming__hex upcoming__hex--1" src={hex1} alt="" aria-hidden="true" />
            <img className="upcoming__icon" src={hexIcon} alt="" aria-hidden="true" />
          </div>
          <div className="upcoming__copy">
            <h2 id="upcoming-events-title" className="upcoming__title">
              {heading}
            </h2>
            <p className="upcoming__description">{description}</p>
          </div>
        </div>

        <div className="upcoming__media">
          <EventsFolder events={events} />
        </div>

        <div className="upcoming__action">
          <button
            type="button"
            className="upcoming__cta"
            onClick={() => window.location.assign(ctaHref)}
          >
            {ctaLabel} <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
