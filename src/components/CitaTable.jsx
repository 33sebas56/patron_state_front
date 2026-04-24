import EstadoBadge from "./EstadoBadge";

function CitaTable({
  citas,
  onConfirmar,
  onCancelar,
  onIniciarAtencion,
  onFinalizarAtencion,
  onEliminar,
  cargando,
}) {
  const formatearFecha = (fechaHora) => {
    if (!fechaHora) {
      return "Sin fecha";
    }

    return new Date(fechaHora).toLocaleString("es-CO", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const puedeConfirmar = (estado) => estado === "SOLICITADA";
  const puedeCancelar = (estado) =>
    estado === "SOLICITADA" || estado === "CONFIRMADA";
  const puedeIniciarAtencion = (estado) => estado === "CONFIRMADA";
  const puedeFinalizarAtencion = (estado) => estado === "EN_ATENCION";

  if (citas.length === 0) {
    return (
      <section className="card">
        <h2>Citas registradas</h2>
        <p className="empty-message">Todavía no hay citas médicas registradas.</p>
      </section>
    );
  }

  return (
    <section className="card">
      <h2>Citas registradas</h2>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Paciente</th>
              <th>Médico</th>
              <th>Fecha</th>
              <th>Motivo</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {citas.map((cita) => (
              <tr key={cita.id}>
                <td>
                  <strong>{cita.nombrePaciente}</strong>
                  <span>{cita.documentoPaciente}</span>
                </td>

                <td>
                  <strong>{cita.nombreMedico}</strong>
                  <span>{cita.especialidadMedico}</span>
                </td>

                <td>{formatearFecha(cita.fechaHora)}</td>

                <td>
                  <strong>{cita.motivo}</strong>
                  {cita.observaciones && <span>{cita.observaciones}</span>}
                </td>

                <td>
                  <EstadoBadge estado={cita.estado} />
                </td>

                <td>
                  <div className="acciones">
                    {puedeConfirmar(cita.estado) && (
                      <button
                        className="btn btn-small btn-success"
                        onClick={() => onConfirmar(cita.id)}
                        disabled={cargando}
                      >
                        Confirmar
                      </button>
                    )}

                    {puedeCancelar(cita.estado) && (
                      <button
                        className="btn btn-small btn-danger"
                        onClick={() => onCancelar(cita.id)}
                        disabled={cargando}
                      >
                        Cancelar
                      </button>
                    )}

                    {puedeIniciarAtencion(cita.estado) && (
                      <button
                        className="btn btn-small btn-warning"
                        onClick={() => onIniciarAtencion(cita.id)}
                        disabled={cargando}
                      >
                        Iniciar
                      </button>
                    )}

                    {puedeFinalizarAtencion(cita.estado) && (
                      <button
                        className="btn btn-small btn-primary"
                        onClick={() => onFinalizarAtencion(cita.id)}
                        disabled={cargando}
                      >
                        Finalizar
                      </button>
                    )}

                    <button
                      className="btn btn-small btn-outline"
                      onClick={() => onEliminar(cita.id)}
                      disabled={cargando}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default CitaTable;