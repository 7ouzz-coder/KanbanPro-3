# KanbanPro

Aplicación de gestión de tareas KanbanPro

## Tecnologías

- Node.js y Express
- HBS
- PostgreSQL y Sequelize
- Auth jwt con encriptacion bcrypt

## Instalación

```bash
pnpm install
```

Crear archivo `.env` en la raíz:
```
DATABASE_URI=postgres://usuario:password@localhost:5432/kanbanpro
JWT_SECRET=perro_salchicha
PORT=3000
```

Poblar la base de datos:
```bash
pnpm db:seed
```

Iniciar el servidor:
```bash
pnpm start
```

## Usuarios de prueba

| Email | Password |
|-------|----------|
| ana@gmail.com | password123 |
| pedro@gmail.com | password456 |

## Endpoints principales

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/auth/register` | Registro de usuario |
| POST | `/api/auth/login` | Login, devuelve JWT |
| GET | `/api/tableros` 🔒 | Ver tableros del usuario |
| POST | `/api/tableros` 🔒 | Crear tablero |
| PUT | `/api/tableros/:id` 🔒 | Editar tablero |
| DELETE | `/api/tableros/:id` 🔒 | Eliminar tablero |
| POST | `/api/tableros/:id/listas` 🔒 | Crear lista |
| PUT | `/api/listas/:id` 🔒 | Editar lista |
| DELETE | `/api/listas/:id` 🔒 | Eliminar lista |
| POST | `/api/listas/:id/tarjetas` 🔒 | Crear tarjeta |
| PUT | `/api/tarjetas/:id` 🔒 | Editar tarjeta |
| DELETE | `/api/tarjetas/:id` 🔒 | Eliminar tarjeta |

🔒 Requiere header `Authorization: Bearer <token>`