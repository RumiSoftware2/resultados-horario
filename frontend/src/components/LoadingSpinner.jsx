import './LoadingSpinner.css';

function LoadingSpinner() {
  return (
    <div className="spinner-container">
      <div className="spinner" />
      <p>Cargando datos...</p>
    </div>
  );
}

export default LoadingSpinner;
