import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "appointments";

// Guardar citas
export const saveAppointments = async (appointments) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
  } catch (error) {
    console.error("Error guardando citas:", error);
  }
};

// Cargar citas
export const loadAppointments = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error cargando citas:", error);
    return [];
  }
};

// Agregar cita
export const addAppointment = async (appointment) => {
  try {
    const appointments = await loadAppointments();
    const updated = [...appointments, appointment];
    await saveAppointments(updated);
    return updated;
  } catch (error) {
    console.error("Error agregando cita:", error);
    return [];
  }
};

// Editar cita
export const editAppointment = async (index, updatedAppointment) => {
  try {
    const appointments = await loadAppointments();
    if (index < 0 || index >= appointments.length) return appointments;
    appointments[index] = updatedAppointment;
    await saveAppointments(appointments);
    return appointments;
  } catch (error) {
    console.error("Error editando cita:", error);
    return [];
  }
};

// Eliminar cita
export const deleteAppointment = async (index) => {
  try {
    const appointments = await loadAppointments();
    const updated = appointments.filter((_, i) => i !== index);
    await saveAppointments(updated);
    return updated;
  } catch (error) {
    console.error("Error eliminando cita:", error);
    return [];
  }
};
