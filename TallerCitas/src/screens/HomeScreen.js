import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, Alert } from "react-native";
import { loadAppointments, saveAppointments, deleteAppointment } from "../storage/appointmentStorage";
import AppointmentCard from "../components/AppointmentCard";

export default function HomeScreen({ navigation }) {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    const data = await loadAppointments();
    setAppointments(data);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", fetchAppointments);
    return unsubscribe;
  }, [navigation]);

  // Eliminar cita
  const handleDelete = async (index) => {
    Alert.alert("Confirmar", "¿Seguro que deseas eliminar esta cita?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          const updated = await deleteAppointment(index);
          setAppointments(updated);
        },
      },
    ]);
  };

  // Editar cita
  const handleEdit = (appointment, index) => {
    navigation.navigate("Nueva Cita", { appointment, index });
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button title="Agregar Cita" onPress={() => navigation.navigate("Nueva Cita")} />
      <FlatList
        data={appointments}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <AppointmentCard
            appointment={item}
            onDelete={() => handleDelete(index)}
            onEdit={() => handleEdit(item, index)}
          />
        )}
        ListEmptyComponent={<Text>No hay citas registradas.</Text>}
      />
    </View>
  );
}
