# Guía de Inicio Rápido - Proyecto Actualizado

## ✨ Que es Nuevo

✅ **Tabla de Estudiantes** - Visualiza todos los datos de los estudiantes  
✅ **Estadísticas Mejoradas** - Gráficos, medallas, porcentajes  
✅ **Backend Modular** - Separado en models, controllers, routes  
✅ **Frontend en Componentes** - Reutilizables y mantenibles  

---

## ✋ Lo que necesitas hacer:

### Paso 1: Asegúrate que MongoDB está corriendo
```bash
# En Windows, si instalaste MongoDB como servicio, debería estar corriendo
# Si no, puedes iniciar MongoDB manualmente
mongod
```

### Paso 2: Abre una terminal en la carpeta del `backend`
```bash
cd backend
```

### Paso 3: Carga datos de ejemplo en la base de datos
```bash
npm run seed
```
Verás algo como:
```
✓ Se insertaron 22 estudiantes
Resumen de datos insertados:
  - 10:00-12:00: 8 estudiantes
  - 14:00-16:00: 6 estudiantes
  - 08:00-10:00: 5 estudiantes
  - ninguno: 3 estudiantes
```

### Paso 4: Inicia el servidor backend
```bash
npm run dev
```
Verás:
```
✓ MongoDB conectado
✓ Servidor ejecutándose en puerto 5000
```

### Paso 5: Abre otra terminal en la carpeta del `frontend`
```bash
cd frontend
npm run dev
```

### Paso 6: Abre tu navegador
Ve a: `http://localhost:5173`

### Paso 7: Prueba la aplicación
Click en el botón "🔍 CONSULTAR VOTOS" y verás:

```
📋 Listado de Estudiantes (22)
┌────┬──────────────────┬──────────────┬────────┬──────────────┐
│ #  │ Nombre           │ Correo       │ Grupo  │ Horario      │
├────┼──────────────────┼──────────────┼────────┼──────────────┤
│ 1  │ Ana García       │ ana@email... │ Gr. 1  │ 08:00-10:00  │
│ 2  │ Carlos López     │ carlos@email │ Gr. 1  │ 08:00-10:00  │
│ ... │ (muchos más)    │ ...          │ ...    │ ...          │
└────┴──────────────────┴──────────────┴────────┴──────────────┘

📊 Estadísticas de Votos
Total de estudiantes: 22

🏆 Dos Horarios Más Votados
🥇 10:00-12:00 → 8 votos (36.4%)
🥈 14:00-16:00 → 6 votos (27.3%)

📈 Desglose Completo de Votos
08:00-10:00 ████░░░░░░░░░ 5 votos (22.7%)
10:00-12:00 ██████░░░░░░░ 8 votos (36.4%)
14:00-16:00 █████░░░░░░░░ 6 votos (27.3%)
```

---

## 🎯 Nuevos Endpoints del Backend

```bash
# 1. Obtener lista de estudiantes
curl http://localhost:5000/api/estudiantes
# Respuesta: { success, total, data: [{...estudiantes}] }

# 2. Obtener estadísticas
curl http://localhost:5000/api/estadisticas
# Respuesta: { success, totalEstudiantes, horariosMasVotados, conteoCompleto }

# 3. Crear nuevo estudiante
curl -X POST http://localhost:5000/api/estudiantes \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Test",
    "correo": "test@email.com",
    "grupo": 1,
    "horario": "10:00-12:00"
  }'
```

---

## 📁 Estructura de Carpetas

```
backend/
├── models/Estudiante.js          (Esquema MongoDB)
├── controllers/votosController.js (Lógica)
├── routes/votos.js               (Endpoints)
└── index.js                       (servidor)

frontend/src/
├── components/
│   ├── StudentTable.jsx           (Tabla)
│   ├── StudentTable.css
│   ├── VotesStats.jsx             (Estadísticas)
│   ├── VotesStats.css
│   ├── ErrorMessage.jsx
│   ├── ErrorMessage.css
│   ├── LoadingSpinner.jsx
│   └── LoadingSpinner.css
├── App.jsx                        (Componente principal)
└── App.css                        (Estilos globales)
```

---

## 🔧 Variables de Entorno

Si necesitas cambiar la URL de MongoDB o el puerto, edita el archivo `.env` en la carpeta backend:

```env
MONGODB_URI=mongodb://localhost:27017/monitoria
PORT=5000
```

---

## 📚 Documentación Completa

Lee los archivos de documentación para más detalles:

1. **`MODULAR_ARCHITECTURE.md`** 📘
   - Explicación detallada de la arquitectura
   - Diagrama de flujo
   - Cómo agregar nuevas funcionalidades

2. **`CAMBIOS_RESUMO.md`** 📊
   - Resumen de qué cambió
   - Antes y después
   - Nuevas características

3. **`VISTA_PREVIA.md`** 🎨
   - Cómo se ve la interfaz
   - Paleta de colores
   - Estados de la app

---

## ✅ Checklist de Ejecución

- [ ] MongoDB instalado y corriendo (`mongod`)
- [ ] Terminal 1: `cd backend && npm run seed`
- [ ] Terminal 1: `npm run dev` (backend corriendo)
- [ ] Terminal 2: `cd frontend && npm run dev` (frontend corriendo)
- [ ] Abrir `http://localhost:5173` en navegador
- [ ] Ver tabla y gráficos aparecer
- [ ] Botón responde y funciona

---

## ⚠️ Si algo no funciona

### Error: "Error al conectar con el servidor"
- ¿El backend está corriendo? (npm run dev)
- ¿MongoDB está corriendo? (mongod)
- ¿Está en el puerto 5000?

### Error: "MongoDB conectado" no aparece
- ¿MongoDB está instalado?
- ¿MongoDB está corriendo en terminal?
- Intenta: `mongod` en una terminal nueva

### Tabla vacía
- Ejecuta `npm run seed` en la carpeta backend
- Debe insertar 22 estudiantes de ejemplo

### Botón no responde
- Abre la consola del navegador (F12)
- Busca errores en rojo
- Abre el terminal del backend y busca errores

---

## 🚀 Próximos Pasos

Una vez que todo funciona:
1. Experimenta con los datos en MongoDB
2. Agrega tus propios estudiantes (POST /api/estudiantes)
3. Modifica los datos y consulta nuevamente
4. Lee la documentación completa para agregar más funciones

---

## 💡 Tips

- El botón "Consultar Votos" puede clickearse múltiples veces
- Los cambios en MongoDB se ven inmediatamente
- La tabla scroll horizontal en móviles
- Los gráficos se animan al aparecer
- Los colores se adaptan en función del grupo y horario

