import logo from '@/assets/kaleidoscope-logo.svg';
import './OurMission.css';

type OurMissionProps = {
  heading: string;
  body: string;
};

type OrbitDot = { cx: number; cy: number; tone: string };

// Positions are in the SVG's 400 x 380 coordinate space, measured from the Figma frame.
const ORBIT_DOTS: OrbitDot[] = [
  { cx: 94, cy: 38, tone: 'sky' },
  { cx: 182, cy: 85, tone: 'navy' },
  { cx: 331, cy: 64, tone: 'bright' },
  { cx: 303, cy: 151, tone: 'steel' },
  { cx: 16, cy: 175, tone: 'cyan' },
  { cx: 102, cy: 230, tone: 'bright' },
  { cx: 246, cy: 289, tone: 'navy' },
  { cx: 374, cy: 250, tone: 'mint' },
  { cx: 93, cy: 342, tone: 'steel' },
];

export default function OurMission({ heading, body }: OurMissionProps) {
  return (
    <section id="mission" className="mission" aria-labelledby="mission-heading">
      <div className="mission__inner">
        <svg
          className="mission__orbit"
          viewBox="0 0 400 380"
          aria-hidden="true"
          focusable="false"
        >
          <circle className="mission__ring" cx="200" cy="190" r="183" />
          <circle className="mission__ring" cx="200" cy="190" r="107" />
          <image
            href={logo}
            x="158"
            y="148"
            width="84"
            height="84"
            preserveAspectRatio="xMidYMid meet"
          />
          {ORBIT_DOTS.map((dot) => (
            <circle
              key={`${dot.cx}-${dot.cy}`}
              className={`mission__dot mission__dot--${dot.tone}`}
              cx={dot.cx}
              cy={dot.cy}
              r="20"
            />
          ))}
        </svg>

        <div className="mission__copy">
          <h2 id="mission-heading" className="mission__heading">
            {heading}
          </h2>
          <p className="mission__body">{body}</p>
        </div>
      </div>
    </section>
  );
}