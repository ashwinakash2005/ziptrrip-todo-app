import { Component } from 'react';
import './ErrorBoundary.css';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-container">
            <div className="error-icon">❌</div>
            <h1 className="error-title">Oops! Something went wrong</h1>
            <p className="error-message">We encountered an unexpected error. Please try refreshing the page.</p>
            {process.env.NODE_ENV === 'development' && (
              <details className="error-details">
                <summary>Error Details</summary>
                <pre>{this.state.error?.toString()}</pre>
              </details>
            )}
            <button onClick={this.handleReset} className="error-button">Try Again</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
