import { useEffect, useState } from "react";
import CitaForm from "../components/CitaForm";
import CitaTable from "../components/CitaTable";
import {
  cancelarCita,
  confirmarCita,
  crearCita,
  eliminarCita,
  finalizarAtencion,
  iniciarAtencion,
  listarCitas,
} from "../api/citasApi";

function CitasPage() {
  const [citas, setCitas] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const cargarCitas = async () => {
    try {
      setCargando(true);
      setError("");

      const data = await listarCitas();
      setCitas(data);
    } catch (err) {
      setError("No se pudieron cargar las citas. Verifica que el backend esté encendido.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarCitas();
  }, []);

  const mostrarMensaje = (texto) => {
    setMensaje(texto);
    setError("");

    setTimeout(() => {
      setMensaje("");
    }, 3000);
  };

  const obtenerMensajeError = (err) => {
    if (err.response && err.response.data) {
      if (err.response.data.message) {
        return err.response.data.message;
      }

      if (err.response.data.messages) {
        return Object.values(err.response.data.messages).join(", ");
      }
    }

    return "Ocurrió un error inesperado.";
  };

  const manejarCrearCita = async (cita) => {
    try {
      setCargando(true);
      const response = await crearCita(cita);

      mostrarMensaje(response.mensaje || "Cita creada correctamente.");
      await cargarCitas();
    } catch (err) {
      setError(obtenerMensajeError(err));
    } finally {
      setCargando(false);
    }
  };

  const manejarConfirmar = async (id) => {
    try {
      setCargando(true);
      const response = await confirmarCita(id);

      mostrarMensaje(response.mensaje || "Cita confirmada correctamente.");
      await cargarCitas();
    } catch (err) {
      setError(obtenerMensajeError(err));
    } finally {
      setCargando(false);
    }
  };

  const manejarCancelar = async (id) => {
    try {
      setCargando(true);
      const response = await cancelarCita(id);

      mostrarMensaje(response.mensaje || "Cita cancelada correctamente.");
      await cargarCitas();
    } catch (err) {
      setError(obtenerMensajeError(err));
    } finally {
      setCargando(false);
    }
  };

  const manejarIniciarAtencion = async (id) => {
    try {
      setCargando(true);
      const response = await iniciarAtencion(id);

      mostrarMensaje(response.mensaje || "Atención iniciada correctamente.");
      await cargarCitas();
    } catch (err) {
      setError(obtenerMensajeError(err));
    } finally {
      setCargando(false);
    }
  };

  const manejarFinalizarAtencion = async (id) => {
    try {
      setCargando(true);
      const response = await finalizarAtencion(id);

      mostrarMensaje(response.mensaje || "Atención finalizada correctamente.");
      await cargarCitas();
    } catch (err) {
      setError(obtenerMensajeError(err));
    } finally {
      setCargando(false);
    }
  };

  const manejarEliminar = async (id) => {
    const confirmar = window.confirm("¿Seguro que deseas eliminar esta cita?");

    if (!confirmar) {
      return;
    }

    try {
      setCargando(true);
      await eliminarCita(id);

      mostrarMensaje("Cita eliminada correctamente.");
      await cargarCitas();
    } catch (err) {
      setError(obtenerMensajeError(err));
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className="page">
      <header className="hero">
        <div>
          <p className="eyebrow">Sistema clínico</p>
          <h1>Sistema de Citas Médicas</h1>
          <p>
            Administra citas médicas, confirma pacientes, inicia atenciones y
            finaliza consultas de manera sencilla.
          </p>
        </div>
      </header>

      {mensaje && <div className="alert alert-success">{mensaje}</div>}
      {error && <div className="alert alert-error">{error}</div>}

      <CitaForm onCrearCita={manejarCrearCita} cargando={cargando} />

      {cargando && <p className="loading">Cargando...</p>}

      <CitaTable
        citas={citas}
        onConfirmar={manejarConfirmar}
        onCancelar={manejarCancelar}
        onIniciarAtencion={manejarIniciarAtencion}
        onFinalizarAtencion={manejarFinalizarAtencion}
        onEliminar={manejarEliminar}
        cargando={cargando}
      />
    </main>
  );
}

export default CitasPage;