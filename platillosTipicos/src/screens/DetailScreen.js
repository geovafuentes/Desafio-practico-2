import React from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";

export default function DetailScreen({ route }) {
  const { platillo } = route.params;

  return (
    <FlatList
      data={platillo.ingredientes}
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={
        <View style={styles.header}>
          <Image source={{ uri: platillo.foto }} style={styles.image} resizeMode="cover" />
          <Text style={styles.title}>{platillo.nombre}</Text>
          <Text style={styles.text}>{platillo.descripcion}</Text>
          <Text style={styles.text}>Región: {platillo.region}</Text>
          <Text style={styles.text}>Categoría: {platillo.categoria}</Text>
          <Text style={styles.text}>Precio: ${platillo.precio.toFixed(2)}</Text>
          <Text style={styles.subtitle}>Ingredientes:</Text>
        </View>
      }
      renderItem={({ item }) => <Text style={styles.ingredient}>• {item}</Text>}
    />
  );
}

const styles = StyleSheet.create({
  header: { padding: 15, backgroundColor: "#fff" },
  image: { width: "100%", height: 200, borderRadius: 10, marginBottom: 10 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 5 },
  subtitle: { fontSize: 18, marginTop: 10, fontWeight: "600" },
  text: { fontSize: 16, marginVertical: 3 },
  ingredient: { fontSize: 16, marginLeft: 15, marginVertical: 2 }
});
