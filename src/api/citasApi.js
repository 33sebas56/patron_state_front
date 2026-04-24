import axios from "axios";

const API_URL = "http://localhost:8080/api/citas";

export const listarCitas = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const buscarCitaPorId = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const crearCita = async (cita) => {
  const response = await axios.post(API_URL, cita);
  return response.data;
};

export const actualizarCita = async (id, cita) => {
  const response = await axios.put(`${API_URL}/${id}`, cita);
  return response.data;
};

export const confirmarCita = async (id) => {
  const response = await axios.put(`${API_URL}/${id}/confirmar`);
  return response.data;
};

export const cancelarCita = async (id) => {
  const response = await axios.put(`${API_URL}/${id}/cancelar`);
  return response.data;
};

export const iniciarAtencion = async (id) => {
  const response = await axios.put(`${API_URL}/${id}/iniciar-atencion`);
  return response.data;
};

export const finalizarAtencion = async (id) => {
  const response = await axios.put(`${API_URL}/${id}/finalizar-atencion`);
  return response.data;
};

export const eliminarCita = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};