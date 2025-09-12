import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Alert, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { loadAppointments, addAppointment, editAppointment } from "../storage/appointmentStorage";

export default function AddAppointmentScreen({ navigation, route }) {
  const editing = route.params?.appointment ?? null;
  const index = route.params?.index ?? null;

  const [name, setName] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [date, setDate] = useState(new Date());
  const [desc, setDesc] = useState("");

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Cargar datos si estamos editando
  useEffect(() => {
    if (editing) {
      setName(editing.name);
      setVehicle(editing.vehicle);
      setDesc(editing.desc || "");
      const [day, month, year] = editing.date.split("/");
      const [hour, minute] = editing.time.split(":");
      setDate(new Date(year, month - 1, day, hour, minute));
    }
  }, [editing]);

  const formatDate = (d) =>
    `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
  const formatTime = (d) =>
    `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;

  const handleSave = async () => {
    if (!name || !vehicle) {
      Alert.alert("Error", "Todos los campos obligatorios deben llenarse");
      return;
    }

    const newAppointment = {
      name,
      vehicle,
      date: formatDate(date),
      time: formatTime(date),
      desc,
    };

    const appointments = await loadAppointments();
    const now = new Date();

    // Validar fecha no anterior a hoy
    if (date < now) {
      Alert.alert("Error", "No puedes poner una fecha/hora pasada.");
      return;
    }

    // Validar fecha + hora única
    const duplicate = appointments.some((appt, i) => {
      if (editing !== null && i === index) return false; // ignorar la cita que editamos
      return appt.date === newAppointment.date && appt.time === newAppointment.time;
    });

    if (duplicate) {
      Alert.alert("Error", "Ya existe una cita con esa fecha y hora.");
      return;
    }

    if (editing !== null) {
      await editAppointment(index, newAppointment);
    } else {
      await addAppointment(newAppointment);
    }

    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        placeholder="Nombre del cliente"
        value={name}
        onChangeText={setName}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Modelo del vehículo"
        value={vehicle}
        onChangeText={setVehicle}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />

      <Button
        title={`Fecha: ${formatDate(date)}`}
        onPress={() => setShowDatePicker(true)}
      />
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(event, selected) => {
            setShowDatePicker(false);
            if (selected) setDate(selected);
          }}
        />
      )}

      <Button
        title={`Hora: ${formatTime(date)}`}
        onPress={() => setShowTimePicker(true)}
      />
      {showTimePicker && (
        <DateTimePicker
          value={date}
          mode="time"
          is24Hour={true}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(event, selected) => {
            setShowTimePicker(false);
            if (selected) setDate(selected);
          }}
        />
      )}

      <TextInput
        placeholder="Descripción (opcional)"
        value={desc}
        onChangeText={setDesc}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />

      <Button
        title={editing ? "Guardar Cambios" : "Guardar Cita"}
        onPress={handleSave}
      />
    </View>
  );
}
