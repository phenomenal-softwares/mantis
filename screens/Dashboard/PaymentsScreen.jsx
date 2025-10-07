import { View, Text, StyleSheet } from "react-native";
export default function PaymentsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Payments Screen</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { color: "#333", fontSize: 18 },
});
