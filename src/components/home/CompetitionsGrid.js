import { Link } from 'react-router-dom';

export default function CompetitionsGrid({ leagues }) {
    return (
        <div>
            <div className="hsec" style={{ marginBottom: 12 }}>
                <h2 className="hsec-t"><i className="ti ti-trophy" style={{ fontSize: 19 }} />Browse by competition</h2>
                <Link className="hsec-a" to="/streaks">
                    All competitions <i className="ti ti-arrow-right" style={{ fontSize: 13 }} />
                </Link>
            </div>
            <div className="comps">
                {leagues.map((l) => (
                    <Link key={l.id} className="comp" to={`/streaks?leagues=${l.id}`}>
                        {l.flag ? <img className="comp-flag" src={l.flag} alt={l.country} /> : <div className="comp-flag" />}
                        <div className="comp-n">{l.name}</div>
                        <div className="comp-c">{l.streak_count} streaks</div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
