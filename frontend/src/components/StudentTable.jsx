import './StudentTable.css';

function StudentTable({ estudiantes }) {
  if (!estudiantes || estudiantes.length === 0) {
    return (
      <div className="table-container">
        <h2>Listado de Estudiantes</h2>
        <p className="sin-datos">No hay estudiantes disponibles</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <h2>Listado de Estudiantes ({estudiantes.length})</h2>
      <div className="table-wrapper">
        <table className="students-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Grupo</th>
              <th>Horario Escogido</th>
            </tr>
          </thead>
          <tbody>
            {estudiantes.map((est, index) => (
              <tr key={est._id} className="table-row">
                <td className="numero-columna">{index + 1}</td>
                <td>{est.name || 'N/A'}</td>
                <td className="correo-columna">{est.email || 'N/A'}</td>
                <td className="grupo-columna">
                  <span className={`grupo-badge grupo-${est.group}`}>
                    Grupo {est.group || 'N/A'}
                  </span>
                </td>
                <td className="horario-columna">
                  {est.schedules && est.schedules.length > 0 ? (
                    <span className="horario-badge">
                      {est.schedules.join(', ')}
                    </span>
                  ) : (
                    <span className="horario-badge ninguno">Sin horario</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentTable;
