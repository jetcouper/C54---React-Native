import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  return (<Stack>
    <Stack.Screen name="index" options={{title:"Accueil"}}/>
    <Stack.Screen name="pages/pageCoordonnee"options={{title:"Coordonnée"}}/>
  </Stack>);
}
