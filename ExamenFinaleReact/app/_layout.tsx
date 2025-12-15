import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  return (<Stack>
    <Stack.Screen name="index" options={{title:"Joueuses des Roses de Montréal"}}/>
  </Stack>);
}
