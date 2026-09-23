import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client/react";
import {
  CREAR_USUARIO,
  ACTUALIZAR_USUARIO,
  OBTENER_USUARIOS,
} from "../graphql/operaciones";

const inicial = { name: "", email: "" };

export default function FormularioUsuario({
  usuarioEditar,
  alTerminar,
  alNotificar,
}) {
  const [formulario, setFormulario] = useState(inicial);
  const opciones = { refetchQueries: [{ query: OBTENER_USUARIOS }] };
  const [crear, { loading: creando }] = useMutation(CREAR_USUARIO, opciones);
  const [actualizar, { loading: actualizando }] = useMutation(
    ACTUALIZAR_USUARIO,
    opciones,
  );
  const guardando = creando || actualizando;

  useEffect(() => {
    setFormulario(
      usuarioEditar
        ? { name: usuarioEditar.name, email: usuarioEditar.email }
        : inicial,
    );
  }, [usuarioEditar]);

  const cambiar = (e) =>
    setFormulario({ ...formulario, [e.target.name]: e.target.value });

  const guardar = async (e) => {
    e.preventDefault();
    const datos = {
      name: formulario.name.trim(),
      email: formulario.email.trim(),
    };
    if (!datos.name || !datos.email) {
      alNotificar("error", "Nombre y correo son obligatorios.");
      return;
    }
    try {
      if (usuarioEditar) {
        await actualizar({
          variables: { id: Number(usuarioEditar.id), datos },
        });
        alNotificar("exito", `Usuario ${datos.name} actualizado.`);
      } else {
        await crear({ variables: { datos } });
        alNotificar("exito", `Usuario ${datos.name} registrado.`);
      }
      setFormulario(inicial);
      alTerminar();
    } catch (error) {
      alNotificar("error", `No se pudo guardar: ${error.message}`);
    }
  };

  const cancelar = () => {
    setFormulario(inicial);
    alTerminar();
  };

  return (
    <form onSubmit={guardar}>
      <h2>
        {usuarioEditar ? `Editar usuario #${usuarioEditar.id}` : "Nuevo usuario"}
      </h2>
      <input
        name="name"
        placeholder="Nombre"
        value={formulario.name}
        onChange={cambiar}
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Correo"
        value={formulario.email}
        onChange={cambiar}
        required
      />
      <div className="acciones">
        <button type="submit" disabled={guardando}>
          {guardando ? "Guardando..." : usuarioEditar ? "Actualizar" : "Guardar"}
        </button>
        {usuarioEditar && (
          <button type="button" className="secundario" onClick={cancelar}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
