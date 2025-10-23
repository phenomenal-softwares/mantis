import { useWindowDimensions, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ResponsiveWrapper({ children }) {
  const { width } = useWindowDimensions();
  const isLargeScreen = width > 768; // desktop threshold

  if (isLargeScreen) {
    // Desktop / large screen — show pseudo-device frame with warning
    return (
      <View style={styles.outerContainer}>
        <View style={styles.deviceFrame}>
          <View style={styles.innerScreen}>
            <View style={styles.warningContainer}>
              <Ionicons name="warning" size={60} color="#b91c1c" />
              <Text style={styles.warningTitle}>Desktop View Not Supported</Text>
              <Text style={styles.warningText}>
                This app is optimized for mobile and tablet devices.{"\n"}
                Please open it on a phone or resize your browser window.
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  // Normal mobile/tablet — render app directly
  return <>{children}</>;
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#e5e7eb",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },

  deviceFrame: {
    maxWidth: 480,
    width: "100%",
    backgroundColor: "#111",
    borderRadius: 36,
    padding: 8,
    boxShadow: "0 10px 30px rgba(0,0,0,0.25), 0 0 0 10px rgba(0,0,0,0.05)",
    justifyContent: "center",
    alignItems: "center",
  },

  innerScreen: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 28,
    overflow: "hidden",
    minHeight: "90vh",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  warningContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  warningTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#b91c1c",
    marginTop: 10,
    textAlign: "center",
  },

  warningText: {
    fontSize: 14,
    color: "#444",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 20,
  },
});
