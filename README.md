# Frontend Usuarios — React + Apollo Client + GraphQL

Interfaz web en React que consume la API GraphQL `usuarios-graphql` (Express + MySQL) mediante Apollo Client para listar, registrar, editar y eliminar usuarios.

## Tecnologías

- React 19 + Vite
- Apollo Client 4 (`@apollo/client`, `graphql`, `rxjs`)
- CSS propio (diseño adaptable)

## Estructura

```
src/
├── main.jsx                      # ApolloClient + ApolloProvider
├── App.jsx                       # Integra formulario, tabla y mensajes
├── App.css                       # Estilos
├── graphql/
│   └── operaciones.js            # Query y mutations (users, createUser, updateUser, deleteUser)
└── components/
    ├── ListaUsuarios.jsx         # useQuery + eliminar con confirmación
    └── FormularioUsuario.jsx     # Formulario controlado para crear/editar
```

## Requisitos

- Node.js 20 o superior
- MySQL con la base `graphql_db` y la tabla `users`
- Backend `usuarios-graphql` en ejecución

## Instalación y ejecución

1. Backend (terminal 1):

   ```bash
   cd usuarios-graphql
   npm install
   npm start
   ```

2. Frontend (terminal 2):

   ```bash
   cd frontend-usuarios
   npm install
   npm run dev
   ```

3. Abrir http://localhost:5173

## Puertos

| Servicio        | Puerto | URL                             |
| --------------- | ------ | ------------------------------- |
| Frontend (Vite) | 5173   | http://localhost:5173           |
| API GraphQL     | 4000   | http://localhost:4000/graphql   |
| MySQL           | 3306   | localhost:3306                  |

## Funcionalidades

- RF1: Tabla de usuarios obtenidos con la query `users`.
- RF2: Registro con formulario controlado (`createUser`).
- RF3/RF4: Botón Editar carga los datos en el formulario y `updateUser` los actualiza.
- RF5: Eliminación con confirmación (`deleteUser`).
- RF6: Mensajes de carga, éxito y error (incluido el backend detenido).
- RF7: `refetchQueries` actualiza la tabla sin recargar el navegador.
- RF8: Diseño adaptable a pantallas pequeñas.

## Autores

- Anthony Viveros
# frontend-usuarios
