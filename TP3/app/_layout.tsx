import { useFonts } from 'expo-font';
import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  //Ajout de la police d'écriture principale
  const [fontsLoaded] = useFonts({
    'font-principale': require('../assets/font/StoryScript-Regular.ttf'),
  });
  //Si le font n'est pas trouvé, on ne charge pas la police
  if (!fontsLoaded) return null;

  return (<Stack>
    <Stack.Screen name="index" options={{title:"Accueil"}}/>
    <Stack.Screen name="pages/pageCoordonnee"options={{title:"Coordonnée"}}/>
    <Stack.Screen name="pages/pageCarte"options={{title:"Carte"}}/>
  </Stack>);
}
