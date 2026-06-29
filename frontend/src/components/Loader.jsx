import './Loader.css';

function Loader() {
  return (
    <div className="loader-container">
      <div className="spinner">
        <div className="spinner-circle"></div>
        <div className="spinner-circle"></div>
        <div className="spinner-circle"></div>
      </div>
      <p className="loader-text">Loading...</p>
    </div>
  );
}

export default Loader;
