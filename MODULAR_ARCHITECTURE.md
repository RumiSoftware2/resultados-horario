# 📁 Estructura Modular del Proyecto

## 🏗️ Backend - Arquitectura Modular

```
backend/
├── models/
│   └── Estudiante.js          📊 Esquema MongoDB
├── controllers/
│   └── votosController.js     🎮 Lógica de negocio
├── routes/
│   └── votos.js               🛣️  Endpoints del API
├── index.js                   🚀 Servidor principal (Express)
├── seed.js                    📥 Script de datos de ejemplo
├── package.json               📦 Dependencias
└── .env                       🔑 Variables de entorno
```

### **Responsabilidades de Cada Módulo**

#### 🏛️ `models/Estudiante.js`
```javascript
// Define la estructura de datos en MongoDB
const estudianteSchema = new mongoose.Schema({
  nombre: String,
  correo: String,
  grupo: Number,
  horario: String,
  createdAt: Date,
});
```
**Responsabilidad:** Esquema y validación de datos

---

#### 🎮 `controllers/votosController.js`

Contiene 3 funciones principales:

| Función | Descripción |
|---------|------------|
| `obtenerEstudiantes()` | GET - Retorna todos los estudiantes |
| `obtenerEstadisticasVotos()` | GET - Calcula y retorna estadísticas |
| `crearEstudiante()` | POST - Crea un nuevo estudiante |

**Responsabilidad:** Lógica de negocio y procesamiento de datos

---

#### 🛣️ `routes/votos.js`

Define los endpoints disponibles:

```javascript
router.get('/estudiantes', obtenerEstudiantes);
router.get('/estadisticas', obtenerEstadisticasVotos);
router.post('/estudiantes', crearEstudiante);
```

**Responsabilidad:** Enrutamiento y mapeo de funciones

---

#### 🚀 `index.js`

La aplicación principal:
```javascript
// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI);

// Registrar rutas
app.use('/api', votosRoutes);

// Iniciar servidor
app.listen(PORT);
```

**Responsabilidad:** Configuración e inicialización

---

## 🎨 Frontend - Componentes Modulares

```
frontend/src/
├── components/
│   ├── StudentTable.jsx       📋 Tabla de estudiantes
│   ├── StudentTable.css       🎨 Estilos tabla
│   ├── VotesStats.jsx         📊 Estadísticas de votos
│   ├── VotesStats.css         🎨 Estilos estadísticas
│   ├── ErrorMessage.jsx       ⚠️  Mensaje de error
│   ├── ErrorMessage.css       🎨 Estilos error
│   ├── LoadingSpinner.jsx     ⏳ Spinner de carga
│   └── LoadingSpinner.css     🎨 Estilos spinner
├── App.jsx                    🏠 Componente principal
├── App.css                    🎨 Estilos globales
├── main.jsx                   ⚙️  Punto de entrada
└── index.css                  🎨 CSS global
```

### **Componentes y Sus Responsabilidades**

#### 📋 `StudentTable.jsx`
- **Responsabilidad:** Mostrar tabla de estudiantes
- **Props:** `estudiantes` (array)
- **Características:**
  - Tabla con nombre, correo, grupo, horario
  - Badges de color para grupo y horario
  - Responsive para móviles

```jsx
<StudentTable estudiantes={data} />
```

---

#### 📊 `VotesStats.jsx`
- **Responsabilidad:** Mostrar estadísticas de votos
- **Props:** `datos` (objeto con horariosMasVotados y conteoCompleto)
- **Características:**
  - Resumen total de estudiantes
  - Top 2 horarios con medallas 🥇🥈
  - Gráfico de barras de desglose completo
  - Porcentajes de cada horario

```jsx
<VotesStats datos={votesData} />
```

---

#### ⚠️ `ErrorMessage.jsx`
- **Responsabilidad:** Mostrar mensajes de error
- **Props:** `message` (string)
- **Características:**
  - Diseño destacado en rojo
  - Animación de entrada

```jsx
<ErrorMessage message="Error al conectar" />
```

---

#### ⏳ `LoadingSpinner.jsx`
- **Responsabilidad:** Indicador de carga
- **Props:** Ninguno
- **Características:**
  - Spinner animado
  - Mensaje "Cargando datos..."

```jsx
<LoadingSpinner />
```

---

#### 🏠 `App.jsx`
- **Responsabilidad:** Orquestar componentes, gestionar estado
- **Estados:**
  - `estudiantes` - Array de estudiantes
  - `votesData` - Objeto con estadísticas
  - `cargando` - Boolean
  - `error` - String
- **Funciones:**
  - `consultarVotos()` - Llamar al backend y actualizar estado

---

## 🔄 Flujo de Datos

```
┌─────────────────────────────────────────┐
│  Usuario hace clic "Consultar Votos"    │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  App.jsx: consultarVotos()              │
│  - setCargando(true)                    │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  2 Peticiones axios en paralelo:        │
│  1. GET /api/estudiantes                │
│  2. GET /api/estadisticas               │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Backend (Express):                     │
│  1. votosController.obtenerEstudiantes()│
│  2. votosController.obtenerEstadisticas│
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  MongoDB:                               │
│  - Query: find() - todos estudiantes    │
│  - Análisis: contar horarios            │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Backend retorna JSON:                  │
│  {                                      │
│    data: [...estudiantes],              │
│    horariosMasVotados: [...],           │
│    conteoCompleto: {...}                │
│  }                                      │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  App.jsx actualiza estado:              │
│  setEstudiantes(data)                   │
│  setVotesData(estadisticas)             │
│  setCargando(false)                     │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  React renderiza componentes:           │
│  - StudentTable (datos)                 │
│  - VotesStats (estadísticas)            │
└─────────────────────────────────────────┘
```

---

## 📡 API Endpoints

### GET `/api/estudiantes`
```json
{
  "success": true,
  "total": 22,
  "data": [
    {
      "_id": "...",
      "nombre": "Juan Pérez",
      "correo": "juan@email.com",
      "grupo": 1,
      "horario": "10:00-12:00"
    },
    ...
  ]
}
```

### GET `/api/estadisticas`
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

### POST `/api/estudiantes`
**Request:**
```json
{
  "nombre": "María García",
  "correo": "maria@email.com",
  "grupo": 2,
  "horario": "14:00-16:00"
}
```

**Response:**
```json
{
  "success": true,
  "mensaje": "Estudiante creado exitosamente",
  "data": { "_id": "...", "nombre": "María García", ... }
}
```

---

## 🎯 Ventajas de la Estructura Modular

### Backend
✅ **Separación de responsabilidades:** Models, Controllers, Routes  
✅ **Fácil de mantener:** Cambios localizados en archivos específicos  
✅ **Escalable:** Agregar nuevas rutas es simple  
✅ **Reutilizable:** Controllers pueden usarse en múltiples routes  
✅ **Testeable:** Cada módulo es independiente  

### Frontend
✅ **Componentes reutilizables:** StudentTable, VotesStats  
✅ **Estilos locales:** Cada componente es responsable de su CSS  
✅ **Fácil de debuggear:** Props claras y flujo de datos visible  
✅ **Mantenible:** Cambios en un componente no afectan otros  
✅ **Escalable:** Agregar nuevos componentes es simple  

---

## 🚀 Cómo Usar Cada Componente

### Backend - Agregar Nueva Funcionalidad

**1. Agregar nueva ruta:**
```javascript
// routes/votos.js
router.delete('/estudiantes/:id', eliminarEstudiante);
```

**2. Crear controller:**
```javascript
// controllers/votosController.js
const eliminarEstudiante = async (req, res) => {
  // lógica aquí
};
```

**3. Exportar:**
```javascript
module.exports = { ..., eliminarEstudiante };
```

---

### Frontend - Agregar Nuevo Componente

**1. Crear archivo JSX:**
```jsx
// components/MiComponente.jsx
function MiComponente({ prop1, prop2 }) {
  return <div>...</div>;
}
export default MiComponente;
```

**2. Crear estilos:**
```css
/* components/MiComponente.css */
.mi-componente { ... }
```

**3. Importar en App.jsx:**
```jsx
import MiComponente from './components/MiComponente';

// Usar en JSX
<MiComponente prop1={value1} prop2={value2} />
```

---

## 📋 Checklist de Comprensión

- [ ] Entiendo por qué models, controllers y routes están separados
- [ ] Puedo crear un nuevo endpoint sin problemas
- [ ] Entiendo el flujo de datos de un componente a otro
- [ ] Puedo crear un nuevo componente React modular
- [ ] Sé dónde buscar si algo falla (backend o frontend)
