import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity, useWindowDimensions, StyleSheet } from "react-native";
import { platillos } from "../data/platillos";

export default function HomeScreen({ navigation }) {
  const { width, height } = useWindowDimensions();
  const isHorizontal = width > height; // detecta orientación

  return (
    <View style={styles.container}>
      <FlatList
        data={platillos}
        key={isHorizontal ? "h" : "v"} // Fuerza re-render al cambiar orientación
        numColumns={isHorizontal ? 2 : 1} // 2 columnas horizontal, 1 vertical
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Detalles", { platillo: item })}
          >
            <Image source={{ uri: item.foto }} style={styles.image} resizeMode="cover" />
            <Text style={styles.title}>{item.nombre}</Text>
            <Text numberOfLines={2} style={styles.description}>{item.descripcion}</Text>
            <Text style={styles.price}>${item.precio.toFixed(2)}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#fff" },
  card: { flex: 1, margin: 5, padding: 10, borderRadius: 10, backgroundColor: "#f8f8f8", elevation: 3 },
  image: { width: "100%", height: 150, borderRadius: 10, marginBottom: 5 },
  title: { fontSize: 18, fontWeight: "bold" },
  description: { fontSize: 14, color: "#555" },
  price: { fontSize: 16, fontWeight: "600", marginTop: 5 }
});
