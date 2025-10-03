import { useEffect } from "react";
import { View, Image, StyleSheet, Text, ActivityIndicator } from "react-native";

export default function LoadingScreen({ onFinish }) {
  useEffect(() => {
    // Simulate async load
    const timer = setTimeout(() => {
      onFinish(); // tell parent when done
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/splash.png")} // same splash image
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.text}>Loading Mantis...</Text>
      <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#028174", // theme background
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
  },
  text: {
    color: "#fff",
    fontSize: 18,
    marginTop: 10,
  },
});
