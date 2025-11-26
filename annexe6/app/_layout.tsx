import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  return (<Stack>
    <Stack.Screen name="index" options={{ title: "Accueil", headerStyle: { backgroundColor: 'yellow' } }} />
    <Stack.Screen name="pages/page2" options={{ title: "Page 2", headerStyle: { backgroundColor: 'green' } }} />
    <Stack.Screen name="pages/page3" options={{ headerShown: false, title: "Page 3", headerStyle: { backgroundColor: 'red' } }} />
  </Stack>);
}
