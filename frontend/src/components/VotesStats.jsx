import './VotesStats.css';

function VotesStats({ datos }) {
  if (!datos) {
    return null;
  }

  const { horariosMasVotados, conteoCompleto, totalEstudiantes, totalVotos } = datos;

  return (
    <div className="stats-container">
      <h2>Estadísticas de Votos</h2>
      
      <div className="stats-summary">
        <div className="summary-card">
          <span className="summary-label">Total de Estudiantes</span>
          <span className="summary-value">{totalEstudiantes}</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">Total de Votos</span>
          <span className="summary-value">{totalVotos}</span>
        </div>
      </div>

      {horariosMasVotados && horariosMasVotados.length > 0 ? (
        <div className="stats-section">
          <h3>🏆 Dos Horarios Más Votados</h3>
          <div className="top-horarios">
            {horariosMasVotados.map((horario, index) => (
              <div key={index} className={`horario-card top-${index + 1}`}>
                <div className="medal">
                  {index === 0 ? '🥇' : '🥈'}
                </div>
                <div className="horario-info">
                  <p className="horario-time">{horario.horario}</p>
                  <p className="horario-votes">{horario.votos} votos</p>
                </div>
                <div className="vote-percentage">
                  {totalVotos > 0 && (
                    <span>{((horario.votos / totalVotos) * 100).toFixed(1)}%</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {conteoCompleto && Object.keys(conteoCompleto).length > 0 ? (
        <div className="stats-section">
          <h3>📊 Desglose Completo de Votos ({totalVotos})</h3>
          <div className="votes-breakdown">
            {Object.entries(conteoCompleto)
              .sort((a, b) => b[1] - a[1])
              .map(([horario, votos]) => {
                const porcentaje = totalVotos > 0 ? ((votos / totalVotos) * 100).toFixed(1) : 0;
                return (
                  <div key={horario} className="vote-item">
                    <div className="vote-label">
                      <span className="horario-name">{horario}</span>
                      <span className="vote-count">{votos} votos</span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${porcentaje}%` }}
                      />
                    </div>
                    <span className="percentage">{porcentaje}%</span>
                  </div>
                );
              })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default VotesStats;
