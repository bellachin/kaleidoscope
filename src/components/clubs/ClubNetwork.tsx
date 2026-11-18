import { useEffect, useRef } from 'react';
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

// Which Venn circles each club slot sits on (its distance from a circle's center equals the radius).
const RING_MEMBERS = NODE_SLOTS.map((slot) =>
  CIRCLES.flatMap((circle, index) =>
    Math.abs(Math.hypot(slot.x - circle.cx, slot.y - circle.cy) - CIRCLE_RADIUS) < 3 ? [index] : [],
  ),
);

const INFLUENCE = 230; // how far (SVG units) the pointer affects a node
const LEAN = 20; // max distance a node drifts toward the pointer
const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

export default function ClubNetwork({ heading, clubs }: ClubNetworkProps) {
  const shownClubs = clubs.slice(0, NODE_SLOTS.length);
  const svgRef = useRef<SVGSVGElement>(null);
  const nodeRefs = useRef<(SVGGElement | null)[]>([]);
  const ringRefs = useRef<(SVGCircleElement | null)[]>([]);

  // Nodes float gently and lean toward the pointer; edges and labels light up as it gets close.
  // Updates go straight to the DOM each frame (no React re-renders) and only run while on screen.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      svg.classList.add('is-visible');
      return;
    }

    const count = shownClubs.length;
    const pos = NODE_SLOTS.slice(0, count).map((slot) => ({
      dx: 0,
      dy: 0,
      scale: 1,
      pull: 0,
      slot,
    }));
    let pointer: { x: number; y: number } | null = null;
    let frame = 0;

    const toSvgPoint = (event: PointerEvent) => {
      const ctm = svg.getScreenCTM();
      if (!ctm) return null;
      const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(ctm.inverse());
      return { x: point.x, y: point.y };
    };
    const onMove = (event: PointerEvent) => {
      pointer = toSvgPoint(event);
    };
    const onLeave = () => {
      pointer = null;
    };

    const tick = (time: number) => {
      pos.forEach((node, i) => {
        const { slot } = node;
        let targetX = Math.sin(time / 1400 + i * 1.7) * 5;
        let targetY = Math.cos(time / 1700 + i * 2.3) * 5;
        let pull = 0;
        if (pointer) {
          const vx = pointer.x - slot.x;
          const vy = pointer.y - slot.y;
          const dist = Math.hypot(vx, vy) || 1;
          pull = Math.max(0, 1 - dist / INFLUENCE);
          targetX += (vx / dist) * pull * LEAN;
          targetY += (vy / dist) * pull * LEAN;
        }
        node.dx = lerp(node.dx, targetX, 0.1);
        node.dy = lerp(node.dy, targetY, 0.1);
        node.pull = lerp(node.pull, pull, 0.12);
        node.scale = 1 + node.pull * 0.3;

        const x = slot.x + node.dx;
        const y = slot.y + node.dy;
        nodeRefs.current[i]?.setAttribute('transform', `translate(${x} ${y}) scale(${node.scale})`);
        nodeRefs.current[i]?.style.setProperty('--pull', node.pull.toFixed(3));
      });

      // A ring glows when the pointer is near any club sitting on it.
      CIRCLES.forEach((_, ringIndex) => {
        const strength = Math.max(
          0,
          ...pos.map((node, i) => (RING_MEMBERS[i].includes(ringIndex) ? node.pull : 0)),
        );
        const ring = ringRefs.current[ringIndex];
        if (ring) ring.style.opacity = String(0.55 + strength * 0.45);
      });

      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          svg.classList.add('is-visible');
          if (!frame) frame = requestAnimationFrame(tick);
        } else if (frame) {
          cancelAnimationFrame(frame);
          frame = 0;
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(svg);
    svg.addEventListener('pointermove', onMove);
    svg.addEventListener('pointerleave', onLeave);

    return () => {
      observer.disconnect();
      svg.removeEventListener('pointermove', onMove);
      svg.removeEventListener('pointerleave', onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [shownClubs.length]);

  return (
    <section id="clubs" className="network" aria-labelledby="network-heading">
      <div className="network__inner">
        <h2 id="network-heading" className="network__heading">
          {heading}
        </h2>

        <svg
          ref={svgRef}
          className="network__diagram"
          viewBox="130 30 500 510"
          aria-hidden="true"
          focusable="false"
        >
          {CIRCLES.map((circle, i) => (
            <circle
              key={`${circle.cx}-${circle.cy}`}
              ref={(el) => {
                ringRefs.current[i] = el;
              }}
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
              <g
                key={club.id}
                ref={(el) => {
                  nodeRefs.current[i] = el;
                }}
                className="network__item"
                transform={`translate(${slot.x} ${slot.y})`}
              >
                <g className="network__pop" style={{ transitionDelay: `${i * 90}ms` }}>
                  {club.logoSrc ? (
                    <image
                      href={club.logoSrc}
                      x="-32"
                      y="-32"
                      width="64"
                      height="64"
                      preserveAspectRatio="xMidYMid meet"
                    />
                  ) : (
                    <text
                      className="network__initial"
                      textAnchor="middle"
                      dominantBaseline="central"
                    >
                      {club.name.charAt(0)}
                    </text>
                  )}
                  <text className="network__label" textAnchor="middle" y="62">
                    {club.name}
                  </text>
                </g>
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
