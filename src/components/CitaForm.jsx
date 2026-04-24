import { useState } from "react";

function CitaForm({ onCrearCita, cargando }) {
  const [formulario, setFormulario] = useState({
    nombrePaciente: "",
    documentoPaciente: "",
    telefonoPaciente: "",
    correoPaciente: "",
    medicoId: "1",
    fechaHora: "",
    motivo: "",
    observaciones: "",
  });

  const manejarCambio = (event) => {
    const { name, value } = event.target;

    setFormulario({
      ...formulario,
      [name]: value,
    });
  };

  const limpiarFormulario = () => {
    setFormulario({
      nombrePaciente: "",
      documentoPaciente: "",
      telefonoPaciente: "",
      correoPaciente: "",
      medicoId: "1",
      fechaHora: "",
      motivo: "",
      observaciones: "",
    });
  };

  const manejarEnvio = async (event) => {
    event.preventDefault();

    const cita = {
      ...formulario,
      medicoId: Number(formulario.medicoId),
    };

    await onCrearCita(cita);
    limpiarFormulario();
  };

  return (
    <section className="card">
      <h2>Crear cita médica</h2>

      <form onSubmit={manejarEnvio} className="formulario">
        <div className="form-grid">
          <div className="form-group">
            <label>Nombre del paciente</label>
            <input
              type="text"
              name="nombrePaciente"
              value={formulario.nombrePaciente}
              onChange={manejarCambio}
              placeholder="Ej: Juan Pérez"
              required
            />
          </div>

          <div className="form-group">
            <label>Documento</label>
            <input
              type="text"
              name="documentoPaciente"
              value={formulario.documentoPaciente}
              onChange={manejarCambio}
              placeholder="Ej: 1002456789"
              required
            />
          </div>

          <div className="form-group">
            <label>Teléfono</label>
            <input
              type="text"
              name="telefonoPaciente"
              value={formulario.telefonoPaciente}
              onChange={manejarCambio}
              placeholder="Ej: 3001234567"
            />
          </div>

          <div className="form-group">
            <label>Correo</label>
            <input
              type="email"
              name="correoPaciente"
              value={formulario.correoPaciente}
              onChange={manejarCambio}
              placeholder="Ej: paciente@email.com"
            />
          </div>

          <div className="form-group">
            <label>Médico</label>
            <select
              name="medicoId"
              value={formulario.medicoId}
              onChange={manejarCambio}
              required
            >
              <option value="1">Laura Martínez - Medicina General</option>
              <option value="2">Carlos Ramírez - Cardiología</option>
              <option value="3">Ana Gómez - Pediatría</option>
              <option value="4">Jorge Torres - Dermatología</option>
            </select>
          </div>

          <div className="form-group">
            <label>Fecha y hora</label>
            <input
              type="datetime-local"
              name="fechaHora"
              value={formulario.fechaHora}
              onChange={manejarCambio}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Motivo</label>
          <input
            type="text"
            name="motivo"
            value={formulario.motivo}
            onChange={manejarCambio}
            placeholder="Ej: Dolor de cabeza"
            required
          />
        </div>

        <div className="form-group">
          <label>Observaciones</label>
          <textarea
            name="observaciones"
            value={formulario.observaciones}
            onChange={manejarCambio}
            placeholder="Observaciones adicionales"
            rows="3"
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={cargando}>
          {cargando ? "Guardando..." : "Crear cita"}
        </button>
      </form>
    </section>
  );
}

export default CitaForm;