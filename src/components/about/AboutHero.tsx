import hexIcon from '@/assets/events/hex-icon.png';
import hex1 from '@/assets/events/hex-watermark-1.png';
import hex2 from '@/assets/events/hex-watermark-2.png';
import hex3 from '@/assets/events/hex-watermark-3.png';
import waveLines from '@/assets/events/wave-lines.png';
import './AboutHero.css';

type AboutHeroProps = {
  heading: string;
  subtitle: string;
};

export default function AboutHero({ heading, subtitle }: AboutHeroProps) {
  return (
    <section className="about-hero" aria-labelledby="about-hero-heading">
      <div className="about-hero__decor" aria-hidden="true">
        <img className="about-hero__wave" src={waveLines} alt="" />
        <img className="about-hero__hex about-hero__hex--top" src={hex2} alt="" />
        <img className="about-hero__hex about-hero__hex--left" src={hex1} alt="" />
        <img className="about-hero__icon about-hero__icon--left" src={hexIcon} alt="" />
        {/* Bottom-right pair hangs over the hero's bottom edge into the next section */}
        <div className="about-hero__corner">
          <img className="about-hero__hex about-hero__hex--corner" src={hex3} alt="" />
          <img className="about-hero__icon" src={hexIcon} alt="" />
        </div>
      </div>

      <div className="about-hero__inner">
        <h1 id="about-hero-heading" className="about-hero__heading">
          {heading}
        </h1>
        <p className="about-hero__subtitle">{subtitle}</p>
      </div>
    </section>
  );
}
