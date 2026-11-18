import './MeetOurTeam.css';

export type TeamMember = {
  id: string;
  role: string;
  name?: string;
  photo?: { src: string; alt: string };
};

type MeetOurTeamProps = {
  heading: string;
  members: readonly TeamMember[];
};

export default function MeetOurTeam({ heading, members }: MeetOurTeamProps) {
  return (
    <section id="team" className="team" aria-labelledby="team-heading">
      <div className="team__inner">
        <h2 id="team-heading" className="team__heading">
          {heading}
        </h2>

        <ul className="team__grid">
          {members.map((member) => (
            <li key={member.id} className="team__member">
              {member.photo ? (
                <img src={member.photo.src} alt={member.photo.alt} className="team__photo" />
              ) : (
                <div className="team__photo team__photo--placeholder" aria-hidden="true" />
              )}
              {member.name && <p className="team__name">{member.name}</p>}
              <p className="team__role">{member.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
