import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { user } from "../../data/user";
import colors from "../../styles/colors";

import PromoCarousel from "../../components/UI/PromoCarousel";

const ProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={26} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
        <View style={{ width: 26 }} /> {/* Spacer for symmetry */}
      </View>

      {/* Profile Info */}
      <View style={styles.content}>
        <Image source={user.profileImage} style={styles.avatar} />
        <Text style={styles.name}>{user.fullName}</Text>
        <Text style={styles.username}>@{user.username}</Text>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Phone</Text>
          <Text style={styles.value}>{user.phone}</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Bank</Text>
          <Text style={styles.value}>{user.account.bankName}</Text>
        </View>
      </View>

      {/* Promo Carousel */}
      <PromoCarousel />
    </View>
  );
};

export default ProfileScreen;

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
    color: colors.primary,
  },

  /* BODY */
  content: {
    alignItems: "center",
    padding: 20,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0a6b8b",
  },
  username: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  infoBox: {
    width: "100%",
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  label: {
    fontSize: 12,
    color: "#888",
  },
  value: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
});
