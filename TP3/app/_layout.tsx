import { Stack } from "expo-router";
import React from "react";
import { useFonts } from 'expo-font';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'font-principale': require('../assets/font/StoryScript-Regular.ttf'),
  });

  if (!fontsLoaded) return null;

  return (<Stack>
    <Stack.Screen name="index" options={{title:"Accueil"}}/>
    <Stack.Screen name="pages/pageCoordonnee"options={{title:"Coordonnée"}}/>
    <Stack.Screen name="pages/pageCarte"options={{title:"Carte"}}/>
  </Stack>);
}
