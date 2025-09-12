import React from "react";
import { View, Text, Button } from "react-native";

export default function AppointmentCard({ appointment, onEdit, onDelete }) {
  return (
    <View
      style={{
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
      }}
    >
      <Text>👤 {appointment.name}</Text>
      <Text>🚗 {appointment.vehicle}</Text>
      <Text>📅 {appointment.date}</Text>
      <Text>⏰ {appointment.time}</Text>
      {appointment.desc ? <Text>📝 {appointment.desc}</Text> : null}

      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <Button title="Editar" onPress={onEdit} />
        <View style={{ width: 10 }} />
        <Button title="Eliminar" color="red" onPress={onDelete} />
      </View>
    </View>
  );
}
