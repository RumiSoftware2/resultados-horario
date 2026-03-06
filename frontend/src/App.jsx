import { useState } from 'react'
import axios from 'axios'
import StudentTable from './components/StudentTable'
import VotesStats from './components/VotesStats'
import ErrorMessage from './components/ErrorMessage'
import LoadingSpinner from './components/LoadingSpinner'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function App() {
  const [estudiantes, setEstudiantes] = useState(null)
  const [votesData, setVotesData] = useState(null)
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState(null)

  const consultarVotos = async () => {
    setCargando(true)
    setError(null)
    try {
      // Obtener estudiantes
      const estudiantesRes = await axios.get(`${API_URL}/api/estudiantes`)
      setEstudiantes(estudiantesRes.data.data)

      // Obtener estadísticas
      const estadisticasRes = await axios.get(`${API_URL}/api/estadisticas`)
      setVotesData(estadisticasRes.data)
    } catch (err) {
      setError('Error al conectar con el servidor. ¿Está el backend en ejecución?')
      console.error(err)
    } finally {
      setCargando(false)
    }
  }

  return (
    <>
      <div className="container">
        <header className="header">
          <div className="header-top">
            <div>
              <h1>📊 Consulta de Votos de Horarios</h1>
              <p>Selecciona los horarios preferentes de monitoria</p>
            </div>
            <a href="https://portafoliosmendo.netlify.app" target="_blank" rel="noopener noreferrer" className="contact-button">
              💼 ¿Proyectos de software? Contáctame
            </a>
          </div>
        </header>

        <div className="button-section">
          <button 
            onClick={consultarVotos} 
            disabled={cargando} 
            className="boton-consultar"
          >
            {cargando ? 'Cargando...' : '🔍 Consultar Votos'}
          </button>
        </div>

        {error && <ErrorMessage message={error} />}

        {cargando && <LoadingSpinner />}

        {!cargando && estudiantes && (
          <>
            <VotesStats datos={votesData} />
            <StudentTable estudiantes={estudiantes} />
          </>
        )}

        {!cargando && !estudiantes && !error && (
          <div className="welcome-message">
            <p>👉 Haz clic en "Consultar Votos" para ver los datos</p>
          </div>
        )}
      </div>
    </>
  )
}

export default App
