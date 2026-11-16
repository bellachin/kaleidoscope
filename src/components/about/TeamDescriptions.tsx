import hexIcon from '@/assets/events/hex-icon.png';
import hex3 from '@/assets/events/hex-watermark-3.png';
import './TeamDescriptions.css';

export type TeamDescription = {
  id: string;
  name: string;
  description: string;
};

type TeamDescriptionsProps = {
  heading: string;
  teams: readonly TeamDescription[];
};

export default function TeamDescriptions({ heading, teams }: TeamDescriptionsProps) {
  return (
    <section id="teams" className="teams" aria-labelledby="teams-heading">
      <div className="teams__corner" aria-hidden="true">
        <img className="teams__hex" src={hex3} alt="" />
        <img className="teams__icon" src={hexIcon} alt="" />
      </div>

      <div className="teams__inner">
        <h2 id="teams-heading" className="teams__heading">
          {heading}
        </h2>

        <ul className="teams__grid">
          {teams.map((team) => (
            <li key={team.id} className="teams__item">
              <h3 className="teams__name">{team.name}</h3>
              <p className="teams__description">{team.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
