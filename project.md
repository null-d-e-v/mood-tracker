# **Proyecto Web: "MoodTrack" – Diario de Estado de Ánimo con Estadísticas**

**Descripción breve:**  
Una app web donde los usuarios pueden registrar cómo se sienten cada día, añadir notas, y luego ver gráficas y estadísticas de sus estados de ánimo a lo largo del tiempo. Tiene autenticación, base de datos, API REST (o GraphQL si quieres probar), y una interfaz amigable. Ideal para probar cositas frontend, backend, gráficas, autenticación, animaciones, diseño UI, etc.

---

## ✅ Actividades divididas por **Historias de Usuario (HU)**

### **HU1: Registro e Inicio de Sesión**

**Objetivo:** Permitir que un usuario se registre e inicie sesión de forma segura.

#### Actividades:

- [ ] Crear modelo de usuario en la base de datos (nombre, email, contraseña hasheada).
- [ ] Crear endpoints de registro e inicio de sesión.
- [ ] Usar JWT o sesiones para manejo de autenticación.
- [ ] Validaciones en backend (email único, contraseña segura).
- [ ] Crear formularios de login/register en frontend.
- [ ] Mostrar mensajes de error bonitos en el frontend.

---

### **HU2: Registrar estado de ánimo diario**

**Objetivo:** El usuario puede registrar cómo se siente hoy.

#### Actividades:

- [ ] Crear modelo de entrada emocional: fecha, estado (feliz, triste, ansioso, etc.), nota opcional, usuarioId.
- [ ] Crear endpoint para enviar un nuevo "mood" (requiere autenticación).
- [ ] Crear formulario frontend con selector de estado de ánimo (emojis, sliders o botones).
- [ ] Validar que solo se puede crear **una entrada por día** por usuario.
- [ ] Mostrar confirmación bonita cuando se guarda exitosamente.

---

### **HU3: Ver historial de estados de ánimo**

**Objetivo:** El usuario puede ver una lista cronológica de cómo se ha sentido.

#### Actividades:

- [ ] Crear endpoint para obtener el historial por usuario.
- [ ] En frontend, mostrar una lista ordenada (más reciente primero).
- [ ] Agregar íconos o colores que reflejen el mood (emoji grande, por ejemplo).
- [ ] Permitir ver la nota al hacer clic (colapsable o modal).

---

### **HU4: Ver estadísticas emocionales**

**Objetivo:** Visualizar gráficas del estado de ánimo por semana, mes, etc.

#### Actividades:

- [ ] Endpoint para obtener estadísticas (ej: conteo por tipo, promedio semanal).
- [ ] Agregar una librería de gráficas (ej: Chart.js, Recharts).
- [ ] Mostrar gráfica de barras o pastel de emociones más comunes.
- [ ] Agregar filtro por semana, mes.
- [ ] Mostrar días consecutivos con "buen" ánimo (tipo streak).

---

### **HU5: Editar o eliminar entradas**

**Objetivo:** Permitir editar una entrada (nota o estado) o eliminarla.

#### Actividades:

- [ ] Endpoints de PUT y DELETE para entradas (con autorización).
- [ ] Botones en frontend para editar o borrar (íconos sutiles).
- [ ] Usar modales para confirmar borrado.
- [ ] Validar que no se puedan editar entradas de otros usuarios.

---

### **HU6: Dark mode y UI bonita**

**Objetivo:** Añadir un modo oscuro y una interfaz atractiva.

#### Actividades:

- [ ] Implementar dark mode con toggle (usando CSS variables o Tailwind).
- [ ] Estilizar inputs, botones y mensajes.
- [ ] Añadir animaciones sutiles (ej: en hover o transiciones).
- [ ] Usar tipografías suaves, fondo con gradientes, y emojis grandes.

---

### **HU7: Deploy y acceso público**

**Objetivo:** Subir el proyecto a producción.

#### Actividades:

- [ ] Deploy del backend (Railway, Render, etc.).
- [ ] Deploy del frontend (Vercel, Netlify).
- [ ] Configurar variables de entorno.
- [ ] Verificar funcionamiento completo en producción.
- [ ] Bonus: Agregar favicon, título personalizado y metaetiquetas.

---

## 🧪 Extras opcionales para experimentar:

- [ ] Implementar GraphQL en lugar de REST.
- [ ] Autenticación con redes sociales (Google login).
- [ ] Recordatorios por email usando cron jobs.
- [ ] Progressive Web App (PWA).
- [ ] Notificaciones push.
- [ ] Guardar datos offline con IndexedDB o localStorage.
