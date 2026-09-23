import { useEffect, useState } from "react";
import FormularioUsuario from "./components/FormularioUsuario";
import ListaUsuarios from "./components/ListaUsuarios";
import "./App.css";

export default function App() {
  const [usuarioEditar, setUsuarioEditar] = useState(null);
  const [mensaje, setMensaje] = useState(null);

  const notificar = (tipo, texto) => setMensaje({ tipo, texto });

  // El mensaje de éxito o error desaparece después de unos segundos
  useEffect(() => {
    if (!mensaje) return;
    const temporizador = setTimeout(() => setMensaje(null), 4000);
    return () => clearTimeout(temporizador);
  }, [mensaje]);

  return (
    <main className="contenedor">
      <h1>Gestión de usuarios</h1>
      {mensaje && (
        <p className={`mensaje ${mensaje.tipo}`} role="status">
          {mensaje.texto}
        </p>
      )}
      <FormularioUsuario
        usuarioEditar={usuarioEditar}
        alTerminar={() => setUsuarioEditar(null)}
        alNotificar={notificar}
      />
      <ListaUsuarios alEditar={setUsuarioEditar} alNotificar={notificar} />
    </main>
  );
}
