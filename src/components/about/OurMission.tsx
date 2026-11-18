import { useEffect, useRef } from 'react';
import logo from '@/assets/kaleidoscope-logo.svg';
import './OurMission.css';

type OurMissionProps = {
  heading: string;
  body: string;
};

type OrbitDot = { cx: number; cy: number; tone: string };

// Dots sit on one of two rings around (200, 190); inner dots are ~107 from the center.
const isInner = (dot: OrbitDot) => Math.hypot(dot.cx - 200, dot.cy - 190) < 140;

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
  const orbitRef = useRef<SVGSVGElement>(null);

  // Rotate the rings with scroll: --orbit-progress goes 0 -> 1 as the graphic crosses the viewport.
  useEffect(() => {
    const svg = orbitRef.current;
    if (!svg || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = svg.getBoundingClientRect();
      const raw = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      svg.style.setProperty('--orbit-progress', String(Math.min(1, Math.max(0, raw))));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const renderDots = (inner: boolean) =>
    ORBIT_DOTS.filter((dot) => isInner(dot) === inner).map((dot) => (
      <circle
        key={`${dot.cx}-${dot.cy}`}
        className={`mission__dot mission__dot--${dot.tone}`}
        cx={dot.cx}
        cy={dot.cy}
        r="20"
      />
    ));

  return (
    <section id="mission" className="mission" aria-labelledby="mission-heading">
      <div className="mission__inner">
        <svg
          ref={orbitRef}
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
          <g className="mission__spin mission__spin--outer">{renderDots(false)}</g>
          <g className="mission__spin mission__spin--inner">{renderDots(true)}</g>
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