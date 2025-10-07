import { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import colors from "../styles/colors";
import { user } from "../data/user";

export default function LoginScreen() {
  const [pin, setPin] = useState("");
  const inputRef = useRef(null);
  const navigation = useNavigation();

  const handleChange = (text) => {
    const clean = text.replace(/[^0-9]/g, "").slice(0, 6);
    setPin(clean);
    if (clean.length === 6) {
      navigation.replace("Dashboard");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/mantis-logo.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <LinearGradient
        colors={["rgba(2,129,116,0.9)", "rgba(26,26,26,0.85)"]} // teal → dark
        style={styles.overlay}
      >
        <View style={styles.container}>
          {/* Logo Area */}
          <View style={styles.logoArea}>
            <View style={styles.logoWrapper}>
              <Image
                source={require("../assets/mantis-icon.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <View>
              <Text style={styles.logoText}>Mantis</Text>
            </View>
          </View>

          <View style={{ alignItems: "center" }}>
            {/* Avatar and welcome */}
            <View style={{ alignItems: "center" }}>
              <View style={styles.avatarWrapper}>
                <Image
                  source={require("../assets/avatar.png")}
                  style={styles.avatar}
                  resizeMode="cover"
                />
              </View>
              {/* Welcome */}
              <Text style={styles.welcome}>
                Welcome back, <Text style={styles.accent}>{user.fullName}</Text>
              </Text>
            </View>

            <View style={{ alignItems: "center" }}>
              {/* PIN Boxes */}
              <Pressable
                style={styles.pinWrapper}
                onPress={() => inputRef.current?.focus()}
              >
                {Array(6)
                  .fill(0)
                  .map((_, i) => (
                    <View key={i} style={styles.pinBox}>
                      <Text style={styles.pinDot}>{pin[i] ? "•" : ""}</Text>
                    </View>
                  ))}
              </Pressable>

              {/* Hidden Input */}
              <TextInput
                ref={inputRef}
                style={{ height: 0, width: 0, opacity: 0 }}
                keyboardType="numeric"
                value={pin}
                onChangeText={handleChange}
                maxLength={6}
              />

              {/* Forgot Password */}
              <TouchableOpacity>
                <Text style={styles.forgot}>Forgot password?</Text>
              </TouchableOpacity>
            </View>

            {/* Biometric */}
            <TouchableOpacity
              style={styles.biometricBtn}
              onPress={() => navigation.replace("Dashboard")}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FontAwesome5
                  name="fingerprint"
                  size={20}
                  color={colors.light}
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.biometricText}>
                  Sign in with Biometrics
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Tagline */}
          <View style={{ width: "100%", alignItems: "center" }}>
            <Text style={styles.tagline}>Mantis — Your Money, Simplified</Text>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    height: "100%",
  },
  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
  },
  logoArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  logoWrapper: {
    width: 50,
    height: 50,
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  logoText: {
    color: colors.light,
    fontFamily: "BrotonRegular",
    fontSize: 28,
    fontWeight: "700",
  },
  avatarWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: colors.light,
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  welcome: {
    color: colors.light,
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 32,
    textAlign: "center",
  },
  accent: {
    color: colors.accent,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  pinWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 280,
    marginBottom: 24,
  },
  pinBox: {
    width: 40,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.light,
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  pinDot: {
    color: colors.light,
    fontSize: 18,
    fontWeight: "700",
  },
  forgot: {
    color: colors.accent,
    marginTop: 8,
    textDecorationLine: "underline",
  },
  biometricBtn: {
    backgroundColor: colors.secondary,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 32,
    width: 280,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  biometricText: {
    color: colors.light,
    fontWeight: "600",
    fontSize: 16,
  },
  tagline: {
    position: "absolute",
    bottom: 24,
    color: "#e0e0e0",
    fontSize: 13,
    textAlign: "center",
  },
});
