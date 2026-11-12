import MarkedText from '@/components/ui/MarkedText';
import './PastEvents.css';

type Story = {
  id: string;
  quote: string;
  author: string;
  tone: 'white' | 'sky' | 'blue';
};

type PastEventsProps = {
  heading: string;
  highlight?: string;
  stories: readonly Story[];
};

export default function PastEvents({ heading, highlight, stories }: PastEventsProps) {
  return (
    <section id="past-events" className="past" aria-labelledby="past-heading">
      <div className="past__inner">
        <h2 id="past-heading" className="past__heading">
          <MarkedText text={heading} highlight={highlight} />
        </h2>

        <ul className="past__grid">
          {stories.map((story) => (
            <li key={story.id} className={`past__card past__card--${story.tone}`}>
              <figure className="past__figure">
                <span className="past__quote-mark" aria-hidden="true">
                  “
                </span>
                <blockquote className="past__quote">
                  <p>{story.quote}</p>
                </blockquote>
                <figcaption className="past__author">{story.author}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
