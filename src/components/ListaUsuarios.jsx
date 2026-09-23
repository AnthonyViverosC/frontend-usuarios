import { useQuery, useMutation } from "@apollo/client/react";
import { OBTENER_USUARIOS, ELIMINAR_USUARIO } from "../graphql/operaciones";

export default function ListaUsuarios({ alEditar, alNotificar }) {
  const { loading, error, data } = useQuery(OBTENER_USUARIOS);
  const [eliminarUsuario] = useMutation(ELIMINAR_USUARIO, {
    refetchQueries: [{ query: OBTENER_USUARIOS }],
  });

  if (loading) return <p className="estado">Cargando usuarios...</p>;
  if (error)
    return (
      <p className="estado error">
        Error al cargar usuarios: {error.message}. Verifique que el backend
        esté activo en http://localhost:4000/graphql.
      </p>
    );

  const eliminar = async (usuario) => {
    if (!confirm(`¿Desea eliminar a ${usuario.name}?`)) return;
    try {
      const { data } = await eliminarUsuario({
        variables: { id: Number(usuario.id) },
      });
      const resultado = data.deleteUser;
      alNotificar(resultado.success ? "exito" : "error", resultado.message);
    } catch (e) {
      alNotificar("error", `No se pudo eliminar: ${e.message}`);
    }
  };

  if (data.users.length === 0)
    return <p className="estado">No hay usuarios registrados.</p>;

  return (
    <div className="tabla-contenedor">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.users.map((usuario) => (
            <tr key={usuario.id}>
              <td data-label="ID">{usuario.id}</td>
              <td data-label="Nombre">{usuario.name}</td>
              <td data-label="Correo">{usuario.email}</td>
              <td data-label="Acciones">
                <button onClick={() => alEditar(usuario)}>Editar</button>
                <button className="peligro" onClick={() => eliminar(usuario)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
