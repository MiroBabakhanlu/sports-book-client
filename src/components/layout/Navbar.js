import { NavLink } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="nav">
            <div className="nav-inner">
                <div className="nav-logo">
                    <div className="lm"><i className="ti ti-bolt" /></div>
                    <div>
                        <div>AssuredBets</div>
                        <div className="logo-sub">Top Streak Generator</div>
                    </div>
                </div>
                <div className="nav-links">
                    <NavLink to="/" end className={({ isActive }) => (isActive ? 'on' : '')}>Home</NavLink>
                    <NavLink to="/streaks" className={({ isActive }) => (isActive ? 'on' : '')}>Streaks</NavLink>
                    <NavLink to="/streaks">Competitions <i className="ti ti-chevron-down" style={{ fontSize: 11 }} /></NavLink>
                    {/* No News/About/Contact pages exist yet - plain text, not dead links */}
                    <span>News</span>
                    <span>About</span>
                    <span>Contact Us</span>
                </div>
                <div className="nav-r">
                    <div style={{ fontSize: 18, cursor: 'pointer' }}>🇬🇧</div>
                    <div className="nib"><i className="ti ti-bell" /></div>
                    <div className="ntg"><i className="ti ti-brand-telegram" /></div>
                    <div className="nib"><i className="ti ti-star" /></div>
                </div>
            </div>
        </nav>
    );
}
