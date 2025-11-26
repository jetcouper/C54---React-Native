import { Link, router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text>Voici ma page 1.</Text>
      <Link style={styles.lien}  href="pages/page2">Lien vers page 2</Link>
      <Pressable onPress={() => router.push("pages/page3")}>
          <Text style={styles.lien}>
            Vers la page 3.
          </Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
  },
  lien:{
      backgroundColor:'blue',
      color:'white'
  },
});
