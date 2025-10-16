import { useContext } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NotificationContext } from "../../contexts/NotificationContext";
import { user } from "../../data/user";

const HomeHeader = () => {
  const navigation = useNavigation();
  const firstName = user.fullName.split(" ")[0];
  const { hasUnread } = useContext(NotificationContext);

  return (
    <View style={styles.container}>
      {/* Left Section — Avatar + Greeting */}
      <TouchableOpacity
        style={styles.avatarContainer}
        onPress={() => navigation.navigate("Profile")}
      >
        <Image source={user.profileImage} style={styles.avatar} />
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>Hello,</Text>
          <Text style={styles.nameText}>{firstName}</Text>
        </View>
      </TouchableOpacity>

      {/* Right Section — Support + Notifications */}
      <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Support")}
          style={styles.iconButton}
        >
          <Feather name="headphones" size={24} color="#028174" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Notifications")}
          style={[styles.iconButton, { position: "relative" }]}
        >
          <Ionicons name="notifications-outline" size={24} color="#028174" />
          {hasUnread && (
            <View
              style={{
                position: "absolute",
                top: 1,
                right: 1,
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: "#ff3b30",
                borderWidth: 1.5,
                borderColor: "#fff",
              }}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 50,
  },
  greetingContainer: {
    marginLeft: 10,
  },
  greetingText: {
    fontSize: 14,
    color: "#888",
  },
  nameText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0a6b8b",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginLeft: 15,
  },
});
