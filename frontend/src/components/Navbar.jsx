import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">✓</span>
          Todo App
        </Link>
        <ul className="navbar-menu">
          <li><Link to="/" className="nav-link">All Todos</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
