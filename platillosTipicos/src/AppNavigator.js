import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import DetailScreen from "./screens/DetailScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Platillos" component={HomeScreen} />
        <Stack.Screen name="Detalles" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
