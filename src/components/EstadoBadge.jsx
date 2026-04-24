function EstadoBadge({ estado }) {
  const obtenerClaseEstado = () => {
    switch (estado) {
      case "SOLICITADA":
        return "badge badge-solicitada";
      case "CONFIRMADA":
        return "badge badge-confirmada";
      case "EN_ATENCION":
        return "badge badge-atencion";
      case "ATENDIDA":
        return "badge badge-atendida";
      case "CANCELADA":
        return "badge badge-cancelada";
      default:
        return "badge";
    }
  };

  const obtenerTextoEstado = () => {
    switch (estado) {
      case "SOLICITADA":
        return "Solicitada";
      case "CONFIRMADA":
        return "Confirmada";
      case "EN_ATENCION":
        return "En atención";
      case "ATENDIDA":
        return "Atendida";
      case "CANCELADA":
        return "Cancelada";
      default:
        return estado;
    }
  };

  return <span className={obtenerClaseEstado()}>{obtenerTextoEstado()}</span>;
}

export default EstadoBadge;