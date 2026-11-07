import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="header__brand">
        Kaleidoscope
      </Link>
      {/* TODO: nav links from Figma */}
    </header>
  );
}
