import { router } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Page2() {
  return (
    <View style={styles.container}>
      <Text>Voici ma page 2.</Text>
      <Button title="Vers page 3" onPress={() => {
        router.push("/pages/page3")
      }}>
        Vers page 3
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
  },
});