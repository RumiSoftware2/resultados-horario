# 📋 Estructura del Proyecto

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                     NAVEGADOR DEL USUARIO                   │
│              http://localhost:5173 (Frontend)               │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │ HTTP Request (axios)
                           │ GET /api/votos
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                  SERVIDOR EXPRESS (Backend)                 │
│              http://localhost:5000 (Node.js)                │
│                                                              │
│  - Express.js (Router)                                       │
│  - Mongoose (MongoDB ODM)                                    │
│  - CORS Middleware                                           │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │ Consulta MongoDB
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    MONGODB DATABASE                         │
│          mongodb://localhost:27017/monitoria                │
│                                                              │
│  Colección: estudiantes                                      │
│  Documentos: {nombre, correo, grupo, horario}              │
└─────────────────────────────────────────────────────────────┘
```

## 📁 Árbol de Archivos

```
monitoria-resultados/
├── backend/
│   ├── node_modules/          (dependencias instaladas)
│   ├── index.js              ⭐ Servidor Express principal
│   ├── seed.js               📊 Script para insertar datos de prueba
│   ├── package.json          📦 Dependencias y scripts
│   ├── package-lock.json     🔒 Lock de versiones
│   ├── .env                  🔑 Variables de entorno
│   └── .gitignore            🚫 Archivos a ignorar
│
├── frontend/
│   ├── node_modules/          (dependencias instaladas)
│   ├── public/                (archivos estáticos)
│   ├── src/
│   │   ├── App.jsx           ⭐ Componente principal con botón
│   │   ├── App.css           🎨 Estilos
│   │   ├── main.jsx          ⚙️  Punto de entrada React
│   │   └── index.css         🎨 Estilos globales
│   ├── index.html            🌐 HTML raíz
│   ├── vite.config.js        ⚙️  Configuración Vite
│   ├── eslint.config.js      🔍 Configuración ESLint
│   └── package.json          📦 Dependencias y scripts
│
├── README.md                 📖 Documentación completa
└── QUICKSTART.md             🚀 Guía rápida
```

## 🔄 Flujo de Datos

### 1️⃣ Usuario hace clic en "Consultar Votos"

```javascript
// En App.jsx
const consultarVotos = async () => {
  const response = await axios.get('http://localhost:5000/api/votos')
  setVotos(response.data)
}
```

### 2️⃣ Backend procesa la solicitud

```javascript
// En index.js - Endpoint GET /api/votos
app.get('/api/votos', async (req, res) => {
  // 1. Consulta todos los estudiantes de MongoDB
  const estudiantes = await Estudiante.find();
  
  // 2. Cuenta cuántos eligieron cada horario
  const conteoHorarios = {};
  estudiantes.forEach(est => {
    if (est.horario && est.horario !== 'ninguno') {
      conteoHorarios[est.horario]++;
    }
  });
  
  // 3. Ordena de mayor a menor y toma los 2 primeros
  const horariosMasVotados = Object.entries(conteoHorarios)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2);
  
  // 4. Retorna como JSON
  res.json({
    totalEstudiantes: estudiantes.length,
    horariosMasVotados: horariosMasVotados
  });
});
```

### 3️⃣ Frontend muestra los resultados

```jsx
// En App.jsx
{votos && (
  <div>
    <p>Total: {votos.totalEstudiantes}</p>
    {votos.horariosMasVotados.map((horario, index) => (
      <div key={index}>
        <span>{index + 1}. {horario.horario}</span>
        <span>{horario.votos} votos</span>
      </div>
    ))}
  </div>
)}
```

## 🗄️ Estructura de MongoDB

### Esquema de Estudiante

```javascript
{
  _id: ObjectId,          // Generado automáticamente por MongoDB
  nombre: "Juan Pérez",   // Nombre del estudiante
  correo: "juan@email.com", // Correo electrónico
  grupo: 1,              // 1 o 2 (grupo del estudiante)
  horario: "10:00-12:00" // Uno de: "08:00-10:00", "10:00-12:00", "14:00-16:00", "ninguno"
}
```

### Opciones de Horario

```
- "08:00-10:00"  (Opción 1)
- "10:00-12:00"  (Opción 2)
- "14:00-16:00"  (Opción 3)
- "ninguno"      (Opción 4 - se ignora al contar)
```

## 📊 Ejemplo de Respuesta del API

**Request:**
```
GET http://localhost:5000/api/votos
```

**Response:**
```json
{
  "totalEstudiantes": 22,
  "horariosMasVotados": [
    {
      "horario": "10:00-12:00",
      "votos": 8
    },
    {
      "horario": "14:00-16:00",
      "votos": 6
    }
  ],
  "mensaje": "Consulta realizada exitosamente"
}
```

## 🛠️ Tecnologías Utilizadas

| Componente | Tecnología | Versión |
|-----------|-----------|---------|
| Frontend | React | 19.2.0 |
| Build Tool | Vite | 7.3.1 |
| Cliente HTTP | Axios | 1.13.6 |
| Backend | Express.js | 5.2.1 |
| Base de Datos | MongoDB | Local |
| ODM | Mongoose | 9.2.4 |
| Dev Tool | Nodemon | 3.1.14 |
| CORS | Cors | 2.8.6 |

## 🚀 Scripts Disponibles

### Backend
```bash
npm run dev     # Inicia servidor con nodemon (reinicia automáticamente)
npm start       # Inicia servidor normalmente
npm run seed    # Carga datos de ejemplo en MongoDB
```

### Frontend
```bash
npm run dev     # Inicia servidor de desarrollo
npm run build   # Construye el proyecto para producción
npm run lint    # Ejecuta ESLint
npm run preview # Preview de la build de producción
```

## 🔗 Endpoints del API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/votos` | Retorna los 2 horarios más votados |
| GET | `/api/test` | Verifica que el servidor está corriendo |

## 📝 Variables de Entorno (.env)

```
MONGODB_URI=mongodb://localhost:27017/monitoria
PORT=5000
```

## ✅ Checklist de Instalación

- [ ] MongoDB instalado y corriendo
- [ ] Backend: `npm install` realizado
- [ ] Frontend: `npm install` realizado
- [ ] Backend: `npm run seed` ejecutado (para cargar datos de ejemplo)
- [ ] Backend: `npm run dev` en ejecución
- [ ] Frontend: `npm run dev` en ejecución
- [ ] Abrir `http://localhost:5173` en el navegador
- [ ] Clic en "Consultar Votos" y ver resultados

## 🎯 Funcionalidad Principal

**Objetivo:** Mostrar los 2 horarios más votados por los estudiantes

**Lógica:**
1. Consulta la BD MongoDB
2. Cuenta cuántos estudiantes eligieron cada horario (excluyendo "ninguno")
3. Ordena de mayor a menor
4. Retorna los 2 primeros
5. Renderiza en el frontend con estilos atractivos

**Datos de Ejemplo Incluidos:**
- 22 estudiantes distribuidos en 4 opciones de horario
- 10:00-12:00: 8 votos (✅ MÁS POPULAR)
- 14:00-16:00: 6 votos (✅ 2DO MÁS POPULAR)
- 08:00-10:00: 5 votos
- ninguno: 3 votos (ignorados)
