# 🔗 Referencia Rápida para Desarrolladores

## 📦 Scripts Disponibles

### Backend
```bash
npm run dev    # Inicia servidor con nodemon (reinicia automáticamente)
npm start      # Inicia servidor normalmente
npm run seed   # Carga 22 estudiantes de ejemplo
```

### Frontend
```bash
npm run dev    # Inicia dev server en http://localhost:5173
npm run build  # Crea build de producción
npm run lint   # Ejecuta ESLint
npm run preview # Preview del build
```

---

## 🛣️ API Endpoints

### GET /api/estudiantes
**Obtener todos los estudiantes**
```bash
curl http://localhost:5000/api/estudiantes
```
**Respuesta:**
```json
{
  "success": true,
  "total": 22,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "nombre": "Juan Pérez",
      "correo": "juan@email.com",
      "grupo": 1,
      "horario": "10:00-12:00"
    },
    // ... más estudiantes
  ]
}
```

---

### GET /api/estadisticas
**Obtener estadísticas de votos**
```bash
curl http://localhost:5000/api/estadisticas
```
**Respuesta:**
```json
{
  "success": true,
  "totalEstudiantes": 22,
  "horariosMasVotados": [
    { "horario": "10:00-12:00", "votos": 8 },
    { "horario": "14:00-16:00", "votos": 6 }
  ],
  "conteoCompleto": {
    "08:00-10:00": 5,
    "10:00-12:00": 8,
    "14:00-16:00": 6
  },
  "mensaje": "Consulta realizada exitosamente"
}
```

---

### POST /api/estudiantes
**Crear nuevo estudiante**
```bash
curl -X POST http://localhost:5000/api/estudiantes \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "María García",
    "correo": "maria@email.com",
    "grupo": 2,
    "horario": "14:00-16:00"
  }'
```
**Respuesta:**
```json
{
  "success": true,
  "mensaje": "Estudiante creado exitosamente",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "nombre": "María García",
    "correo": "maria@email.com",
    "grupo": 2,
    "horario": "14:00-16:00"
  }
}
```

---

## 🗄️ Estructura MongoDB

```javascript
// Colección: estudiantes
db.estudiantes.insertOne({
  _id: ObjectId(),
  nombre: String,
  correo: String,
  grupo: Number(1 o 2),
  horario: String('08:00-10:00' | '10:00-12:00' | '14:00-16:00' | 'ninguno'),
  createdAt: Date
})
```

---

## 🧩 Componentes React

### StudentTable
```jsx
import StudentTable from './components/StudentTable'

// Uso
<StudentTable estudiantes={arrayDeEstudiantes} />

// Props
estudiantes: Array<{
  _id: string,
  nombre: string,
  correo: string,
  grupo: number,
  horario: string
}>
```

### VotesStats
```jsx
import VotesStats from './components/VotesStats'

// Uso
<VotesStats datos={estadisticasDelBackend} />

// Props
datos: {
  totalEstudiantes: number,
  horariosMasVotados: Array<{horario: string, votos: number}>,
  conteoCompleto: {[horario: string]: number}
}
```

### ErrorMessage
```jsx
import ErrorMessage from './components/ErrorMessage'

// Uso
<ErrorMessage message="Descripción del error" />

// Props
message: string
```

### LoadingSpinner
```jsx
import LoadingSpinner from './components/LoadingSpinner'

// Uso
<LoadingSpinner />

// Props: ninguno
```

---

## 📡 Llamadas Axios en Frontend

```javascript
import axios from 'axios'

// Obtener estudiantes
const response = await axios.get('http://localhost:5000/api/estudiantes')
const estudiantes = response.data.data

// Obtener estadísticas
const response = await axios.get('http://localhost:5000/api/estadisticas')
const estadisticas = response.data

// Crear estudiante
const response = await axios.post('http://localhost:5000/api/estudiantes', {
  nombre: 'Juan',
  correo: 'juan@email.com',
  grupo: 1,
  horario: '10:00-12:00'
})
```

---

## 🎯 Controllers Backend

### obtenerEstudiantes()
```javascript
// Localización: controllers/votosController.js
// Endpoint: GET /api/estudiantes
// Función: Retorna todos los estudiantes de MongoDB
// Respuesta: { success, total, data }
```

### obtenerEstadisticasVotos()
```javascript
// Localización: controllers/votosController.js
// Endpoint: GET /api/estadisticas
// Función: Calcula top 2 horarios más votados
// Lógica: 
// 1. Consulta todos los estudiantes
// 2. Cuenta votos para cada horario (excluye 'ninguno')
// 3. Ordena descendente
// 4. Toma los 2 primeros
// Respuesta: { success, totalEstudiantes, horariosMasVotados, conteoCompleto }
```

### crearEstudiante()
```javascript
// Localización: controllers/votosController.js
// Endpoint: POST /api/estudiantes
// Función: Crea un nuevo estudiante en MongoDB
// Validación: Verifica que todos los campos estén presentes
// Respuesta: { success, mensaje, data }
```

---

## 📝 Estados en App.jsx

```javascript
const [estudiantes, setEstudiantes] = useState(null)
// Array de estudiantes obtenido del GET /api/estudiantes

const [votesData, setVotesData] = useState(null)
// Objeto con estadísticas del GET /api/estadisticas

const [cargando, setCargando] = useState(false)
// Boolean que indica si está haciendo peticiones

const [error, setError] = useState(null)
// String con mensaje de error (null si no hay error)
```

---

## 🔄 Flujo de consultarVotos()

```javascript
const consultarVotos = async () => {
  setCargando(true)           // Mostrar spinner
  setError(null)              // Limpiar errores anteriores
  
  try {
    // Petición 1: Obtener estudiantes
    const estudiantesRes = await axios.get('/api/estudiantes')
    setEstudiantes(estudiantesRes.data.data)
    
    // Petición 2: Obtener estadísticas
    const estadisticasRes = await axios.get('/api/estadisticas')
    setVotesData(estadisticasRes.data)
    
  } catch (err) {
    setError('Error al conectar con el servidor...')
    console.error(err)
    
  } finally {
    setCargando(false)         // Ocultar spinner
  }
}
```

---

## 🎨 Clases CSS Principales

### App.css
```css
.container          /* Contenedor principal con gradiente */
.header             /* Header con título y subtítulo */
.boton-consultar    /* Botón principal rojo */
.welcome-message    /* Mensaje inicial */
```

### StudentTable.css
```css
.table-container    /* Contenedor de la tabla */
.students-table     /* Tabla en sí */
.grupo-badge        /* Badge azul/púrpura for grupo */
.horario-badge      /* Badge para horario */
```

### VotesStats.css
```css
.stats-container    /* Contenedor principal */
.summary-card       /* Card de total estudiantes */
.horario-card       /* Card de top 2 con medallas */
.progress-bar       /* Barra de progreso */
```

---

## 🐛 Debugging

### Backend
```bash
# Ver logs en tiempo real
npm run dev

# En el código
console.log('Debug:', variable)
console.error('Error:', error)
```

### Frontend
```bash
# Abrir DevTools: F12
# Consola: Ctrl + Shift + K
# Network: Ctrl + Shift + E

# En el código
console.log('Debug:', variable)
console.error('Error:', error)
```

### MongoDB
```bash
# Conectar a Mongo CLI
mongosh

# Ver bases de datos
show databases

# Usar base de datos monitoria
use monitoria

# Ver colecciones
show collections

# Ver documentos
db.estudiantes.find()

# Contar documentos
db.estudiantes.countDocuments()

# Ver estudiante específico
db.estudiantes.findOne({ nombre: 'Juan Pérez' })
```

---

## 📋 Archivos Importantes

| Archivo | Responsabilidad |
|---------|-----------------|
| `backend/index.js` | Configuración Express, conexión MongoDB |
| `backend/models/Estudiante.js` | Esquema de datos |
| `backend/controllers/votosController.js` | Lógica de negocio |
| `backend/routes/votos.js` | Definición de rutas |
| `frontend/src/App.jsx` | Componente principal, orquestación |
| `frontend/src/App.css` | Estilos globales |
| `frontend/src/components/StudentTable.jsx` | Tabla de estudiantes |
| `frontend/src/components/VotesStats.jsx` | Estadísticas y gráficos |

---

## 🆘 Solución Rápida de Problemas

| Problema | Solución |
|----------|----------|
| "Cannot find module" | `npm install` en la carpeta |
| "MongoDB conexión rechazada" | Ejecutar `mongod` en otra terminal |
| "EADDRINUSE puerto 5000" | Cambiar PORT en `.env` |
| Tabla vacía | Ejecutar `npm run seed` |
| Botón no funciona | F12 → Ver console por errores |
| Estilos raros | Limpiar cache: Ctrl+Shift+R |
| Componente no renderiza | Props incorrectos, revisar console |

---

## 💾 Configuración Importante

### .env (Backend)
```
MONGODB_URI=mongodb://localhost:27017/monitoria
PORT=5000
```

### vite.config.js (Frontend)
```javascript
export default {
  plugins: [react()],
  // Configuración automática, no necesita cambios
}
```

### package.json (Backend)
```json
{
  "type": "commonjs",  // Importante para require()
  "dependencies": { ... },
  "devDependencies": { ... }
}
```

### package.json (Frontend)
```json
{
  "type": "module",  // ES Modules
  "dependencies": { ... }
}
```

---

## ✨ Tips Profesionales

1. **Siempre** valida datos en el backend
2. **Siempre** usa try-catch en async/await
3. **Siempre** proporciona mensajes de error útiles
4. **Separar** lógica de DB, lógica de negocio, y routes
5. **Reutilizar** componentes React
6. **Documentar** funciones complejas
7. **Usar** console.log() con etiquetas significativas
8. **Limpiar** logs antes de producción

---

## 📚 Recursos

- **MongoDB Docs:** [mongodb.com/docs](https://mongodb.com/docs)
- **Express Docs:** [expressjs.com](https://expressjs.com)
- **React Docs:** [react.dev](https://react.dev)
- **Axios Docs:** [axios-http.com](https://axios-http.com)
- **Vite Docs:** [vitejs.dev](https://vitejs.dev)
