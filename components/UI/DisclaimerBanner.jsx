import { useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../styles/colors";

const DisclaimerBanner = () => {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
        <Ionicons name="warning-outline" size={18} color={colors.error} />
        <Text style={styles.title}>DISCLAIMER</Text>
      </Animated.View>

      <Text style={styles.subtitle}>
        This app is a demo version. All transactions, balances, and activities are simulated for educational purposes only. No real financial operations occur here.
      </Text>
    </View>
  );
};

export default DisclaimerBanner;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.warning,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: colors.darkGray + "40",
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginVertical: 16,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.error,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 13,
    color: colors.darkGray,
    lineHeight: 18,
  },
});
