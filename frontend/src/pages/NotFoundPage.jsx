import { Link } from 'react-router-dom';
import './NotFoundPage.css';

function NotFoundPage() {
  return (
    <main className="not-found-page">
      <div className="not-found-container">
        <div className="not-found-icon">🔍</div>
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Page Not Found</h2>
        <p className="not-found-message">Sorry, the page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="not-found-button">← Back to Home</Link>
      </div>
    </main>
  );
}

export default NotFoundPage;
