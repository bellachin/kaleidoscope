import logo from '@/assets/kaleidoscope-logo.svg';
import './ClubNetwork.css';

type Club = {
  id: string;
  name: string;
  /** Club logo. Without one, the club's first letter is shown instead. */
  logoSrc?: string;
};

type ClubNetworkProps = {
  heading: string;
  clubs: readonly Club[];
};

// Three overlapping dashed circles around the Kaleidoscope logo (SVG units).
const CENTER = { x: 380, y: 300 };
const CIRCLE_RADIUS = 130;
const CIRCLE_OFFSET = 100;
const CIRCLES = [-90, 30, 150].map((degrees) => {
  const radians = (degrees * Math.PI) / 180;
  return {
    cx: Number((CENTER.x + CIRCLE_OFFSET * Math.cos(radians)).toFixed(1)),
    cy: Number((CENTER.y + CIRCLE_OFFSET * Math.sin(radians)).toFixed(1)),
  };
});

// Where club logos sit: each point is on one of the circles above. Extra clubs are not shown.
const NODE_SLOTS = [
  { x: 380, y: 70 },
  { x: 267, y: 135 },
  { x: 493, y: 135 },
  { x: 181, y: 285 },
  { x: 579, y: 285 },
  { x: 293, y: 480 },
  { x: 467, y: 480 },
];

export default function ClubNetwork({ heading, clubs }: ClubNetworkProps) {
  const shownClubs = clubs.slice(0, NODE_SLOTS.length);

  return (
    <section id="clubs" className="network" aria-labelledby="network-heading">
      <div className="network__inner">
        <h2 id="network-heading" className="network__heading">
          {heading}
        </h2>

        <svg
          className="network__diagram"
          viewBox="130 30 500 510"
          aria-hidden="true"
          focusable="false"
        >
          {CIRCLES.map((circle) => (
            <circle
              key={`${circle.cx}-${circle.cy}`}
              className="network__ring"
              cx={circle.cx}
              cy={circle.cy}
              r={CIRCLE_RADIUS}
            />
          ))}

          <image
            href={logo}
            x={CENTER.x - 45}
            y={CENTER.y - 45}
            width="90"
            height="90"
            preserveAspectRatio="xMidYMid meet"
          />

          {shownClubs.map((club, i) => {
            const slot = NODE_SLOTS[i];
            return (
              <g key={club.id} transform={`translate(${slot.x} ${slot.y})`}>
                <circle className="network__node" r="36" />
                {club.logoSrc ? (
                  <image
                    href={club.logoSrc}
                    x="-24"
                    y="-24"
                    width="48"
                    height="48"
                    preserveAspectRatio="xMidYMid meet"
                  />
                ) : (
                  <text className="network__initial" textAnchor="middle" dominantBaseline="central">
                    {club.name.charAt(0)}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        <ul className="network__list">
          {shownClubs.map((club) => (
            <li key={club.id}>{club.name}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
