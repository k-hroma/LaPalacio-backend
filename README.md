# LaPalacio-backend

Backend de **La Palacio**, una librería online. Este proyecto gestiona el catálogo de libros, usuarios registrados, autenticación y operaciones administrativas. Desarrollado con **Node.js**, **Express** y **MongoDB**.

## Características

- CRUD de libros
- Registro e inicio de sesión de usuarios
- Middleware de autenticación con JWT
- Panel de administración para gestionar libros (crear, editar, eliminar)
- Estructura modular con rutas, controladores y modelos separados

## Requisitos

- Node.js >= 18
- MongoDB Atlas o local
- npm

## Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/k-hroma/LaPalacio-backend.git
cd LaPalacio-backend
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
PORT=3000
MONGODB_URI=mongodb+srv://<usuario>:<contraseña>@cluster.mongodb.net/lapalacio?retryWrites=true&w=majority
JWT_SECRET=tu_clave_secreta
```

> Asegúrate de reemplazar los valores con tus credenciales reales.

4. Inicia el servidor:

```bash
npm run dev
```

El servidor estará corriendo en `http://localhost:3000`.

## Estructura del proyecto

```
src/
├── config/         # Configuración (por ejemplo conexión a la base de datos)
├── controllers/    # Lógica de negocio
├── middleware/     # Autenticación, validaciones, etc.
├── models/         # Modelos de Mongoose
├── routes/         # Endpoints de la API
├── utils/          # Funciones auxiliares
└── index.js        # Punto de entrada principal
```

## Endpoints principales

### Libros

- `GET /api/books` — Obtener todos los libros
- `GET /api/books/:id` — Obtener un libro por ID
- `POST /api/books` — Crear un nuevo libro (requiere admin)
- `PATCH /api/books/:id` — Actualizar un libro (requiere admin)
- `DELETE /api/books/:id` — Eliminar un libro (requiere admin)

### Autenticación

- `POST /api/auth/register` — Registro de usuario
- `POST /api/auth/login` — Inicio de sesión y obtención de token

## Contribuciones

Si querés colaborar, hacé un fork del repositorio, creá una rama con tus cambios y mandá un pull request.

---

© 2025 - LaPalacio. Todos los derechos reservados.
