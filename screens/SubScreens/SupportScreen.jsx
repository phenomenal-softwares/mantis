import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import colors from "../../styles/colors";

const SupportScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back"
            size={26}
            color={colors?.text || "#333"}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Support</Text>
        <View style={{ width: 26 }} /> {/* Spacer for symmetry */}
      </View>

      <View style={styles.content}>
        <Ionicons name="headset" size={60} color="#028174" />
        <Text style={styles.title}>Customer Support</Text>
        <Text style={styles.text}>
          Need help? Our support team is here 24/7 to assist you.
        </Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.button}>
            <Feather name="message-circle" size={20} color="#fff" />
            <Text style={styles.btnText}>Chat With Us</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.secondary]}>
            <Feather name="mail" size={20} color="#028174" />
            <Text style={[styles.btnText, styles.secondaryText]}>
              Send an Email
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SupportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  /* HEADER */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#f9f9f9",
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors?.primary || "#028174",
  },

  /* CONTENT */
  content: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 15,
    color: "#0a6b8b",
  },
  text: {
    color: "#666",
    textAlign: "center",
    marginVertical: 10,
  },
  actions: {
    marginTop: 20,
    width: "100%",
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#028174",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  btnText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  secondary: {
    backgroundColor: "#e0f4f1",
  },
  secondaryText: {
    color: "#028174",
  },
});
