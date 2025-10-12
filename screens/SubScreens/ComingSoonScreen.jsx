import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { useEffect, useRef } from "react";
import colors from "../../styles/colors";

const ComingSoonScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(50)).current;
  const imageScale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.spring(slideUp, {
        toValue: 0,
        friction: 5,
        useNativeDriver: true,
      }),
      Animated.spring(imageScale, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../../assets/images/coming-soon.jpg")}
        style={[
          styles.image,
          {
            opacity: fadeAnim,
            transform: [{ scale: imageScale }],
          },
        ]}
        resizeMode="contain"
      />

      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideUp }],
          alignItems: "center",
        }}
      >
        <Text style={styles.title}>Hold On Tight 🚀</Text>
        <Text style={styles.subtitle}>
          This feature is part of our upcoming update — we’re polishing every
          detail to make your Mantis experience even better.
        </Text>

        <View style={styles.taglineBox}>
          <Text style={styles.tagline}>
            🌱 Mantis is a demo fintech project built to showcase modern
            UI/UX design.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>Back to Dashboard</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default ComingSoonScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  image: {
    width: "100%",
    height: 250,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.primary,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: colors.dark,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 18,
    paddingHorizontal: 5,
  },
  taglineBox: {
    backgroundColor: colors.light || "#EAF9F6",
    borderRadius: 10,
    padding: 12,
    marginBottom: 25,
  },
  tagline: {
    fontSize: 13,
    color: colors.secondary,
    textAlign: "center",
    fontStyle: "italic",
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 40,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
