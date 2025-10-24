import { useState, useEffect, useRef } from "react";
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

  useEffect(() => {
    if (pin.length === 6) {
      setTimeout(() => navigation.replace("Dashboard"), 200);
    }
  }, [pin]);

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
                keyboardType="none" // prevents keyboard popup
                value={pin}
                onChangeText={handleChange}
                editable={false} // fully controlled via pad
              />

              {/* Forgot Password */}
              <TouchableOpacity>
                <Text style={styles.forgot}>Forgot password?</Text>
              </TouchableOpacity>
            </View>

            {/* Custom Number Pad */}
            <View style={styles.numberPad}>
              {[
                ["1", "2", "3"],
                ["4", "5", "6"],
                ["7", "8", "9"],
                ["←", "0", "✓"],
              ].map((row, rIdx) => (
                <View key={rIdx} style={styles.row}>
                  {row.map((key) => (
                    <TouchableOpacity
                      key={key}
                      style={[
                        styles.key,
                        key === "←" && {
                          backgroundColor: "rgba(255,255,255,0.15)",
                        },
                        key === "✓" && { backgroundColor: colors.accent },
                      ]}
                      onPress={() => {
                        if (key === "←") {
                          setPin((prev) => prev.slice(0, -1));
                        } else if (key === "✓") {
                          if (pin.length === 6) navigation.replace("Dashboard");
                        } else if (pin.length < 6) {
                          setPin((prev) => prev + key);
                        }
                      }}
                    >
                      <Text
                        style={[
                          styles.keyText,
                          key === "✓" && { color: "#fff", fontWeight: "700" },
                        ]}
                      >
                        {key}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
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
  numberPad: {
    marginTop: 24,
    width: 220,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  key: {
    width: 50,
    height: 50,
    borderRadius: 35,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  keyText: {
    color: colors.light,
    fontSize: 20,
    fontWeight: "600",
  },
  biometricBtn: {
    backgroundColor: colors.secondary,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginVertical: 16,
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
