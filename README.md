# Proyecto de Consulta de Votos de Horarios

## Descripción
Aplicación web sencilla que consulta una base de datos MongoDB y muestra los dos horarios más votados/seleccionados por los estudiantes.

## Requisitos Previos
- Node.js instalado
- MongoDB instalado y en ejecución en `localhost:27017`
- Las dependencias ya están instaladas en ambas carpetas

## Estructura de la Base de Datos
La colección MongoDB debe contener documentos con la siguiente estructura:
```json
{
  "nombre": "Juan Pérez",
  "correo": "juan@email.com",
  "grupo": 1,
  "horario": "08:00-10:00"
}
```

### Opciones de Horario:
- "08:00-10:00"
- "10:00-12:00"
- "14:00-16:00"
- "ninguno" (esta opción se ignora al contar votos)

## Instalación y Ejecución

### 1. Backend (Express + MongoDB)
```bash
cd backend
npm run dev
```
El servidor estará disponible en `http://localhost:5000`

**Scripts disponibles:**
- `npm run dev` - Inicia el servidor con nodemon (reinicia automáticamente)
- `npm start` - Inicia el servidor normalmente

### 2. Frontend (React + Vite)
Abre una nueva terminal y ejecuta:
```bash
cd frontend
npm run dev
```
La aplicación estará disponible en `http://localhost:5173`

## Endpoints del Backend

### GET `/api/votos`
Retorna los dos horarios más votados con el conteo de votos.

**Respuesta exitosa:**
```json
{
  "totalEstudiantes": 50,
  "horariosMasVotados": [
    {
      "horario": "10:00-12:00",
      "votos": 20
    },
    {
      "horario": "08:00-10:00",
      "votos": 18
    }
  ],
  "mensaje": "Consulta realizada exitosamente"
}
```

### GET `/api/test`
Endpoint de prueba para verificar que el backend está funcionando.

## Cómo Usar la Aplicación

1. Asegúrate de que MongoDB está corriendo
2. Inicia el backend: `cd backend && npm run dev`
3. Inicia el frontend: `cd frontend && npm run dev`
4. Abre `http://localhost:5173` en tu navegador
5. Haz clic en el botón "Consultar Votos"
6. Verás los dos horarios más votados con el número de estudiantes que seleccionaron cada uno

## Tecnologías Utilizadas

### Backend
- Express.js - Framework web
- Mongoose - ODM para MongoDB
- Cors - Middleware para permitir peticiones desde el frontend
- Dotenv - Gestión de variables de entorno
- Nodemon - Reinicio automático durante desarrollo

### Frontend
- React - Librería de UI
- Axios - Cliente HTTP para hacer peticiones
- Vite - Build tool y dev server
- CSS3 - Estilos

## Troubleshooting

### Error: "Error al conectar con el servidor"
- Verifica que el backend está corriendo en puerto 5000
- Revisa que no hay conflictos de puerto

### Error: "MongoDB conectado"
- Asegúrate que MongoDB está instalado y corriendo
- Por defecto busca en `mongodb://localhost:27017/monitoria`
- Puedes cambiar la URL en el archivo `.env` del backend

### El botón no responde
- Abre la consola del navegador (F12) para ver errores
- Revisa la consola del backend para ver logs
