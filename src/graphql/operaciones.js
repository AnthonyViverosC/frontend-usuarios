import { gql } from "@apollo/client";

// Los nombres coinciden con el schema del backend (usuarios-graphql):
// users, createUser, updateUser, deleteUser y UserInput { name, email }

export const OBTENER_USUARIOS = gql`
  query ObtenerUsuarios {
    users {
      id
      name
      email
    }
  }
`;

export const CREAR_USUARIO = gql`
  mutation CrearUsuario($datos: UserInput!) {
    createUser(input: $datos) {
      id
      name
      email
    }
  }
`;

export const ACTUALIZAR_USUARIO = gql`
  mutation ActualizarUsuario($id: ID!, $datos: UserInput!) {
    updateUser(id: $id, input: $datos) {
      id
      name
      email
    }
  }
`;

export const ELIMINAR_USUARIO = gql`
  mutation EliminarUsuario($id: ID!) {
    deleteUser(id: $id) {
      success
      message
    }
  }
`;
