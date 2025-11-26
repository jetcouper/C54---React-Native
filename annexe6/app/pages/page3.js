import { router } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Page3() {
  return (
    <View style={styles.container}>
      <Text>Voici ma page 3.</Text>
      <Button title="Vers page index" onPress={() => {
        router.push("/")
      }}>
        Vers page index
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