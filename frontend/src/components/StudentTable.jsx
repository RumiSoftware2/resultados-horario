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
                <td>{est.nombre}</td>
                <td className="correo-columna">{est.correo}</td>
                <td className="grupo-columna">
                  <span className={`grupo-badge grupo-${est.grupo}`}>
                    Grupo {est.grupo}
                  </span>
                </td>
                <td className="horario-columna">
                  <span className={`horario-badge ${est.horario === 'ninguno' ? 'ninguno' : ''}`}>
                    {est.horario}
                  </span>
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
