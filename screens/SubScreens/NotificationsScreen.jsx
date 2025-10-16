import { useEffect, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { NotificationContext } from "../../contexts/NotificationContext";
import { useNavigation } from "@react-navigation/native";

const NotificationsScreen = () => {
  const { notifications, markAsRead, markAllAsRead } = useContext(NotificationContext);
  const navigation = useNavigation();

  useEffect(() => {
    // Mark all as read once screen is focused
    const unsubscribe = navigation.addListener("focus", () => {
      markAllAsRead();
    });
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }) => {
    const icon =
      item.type === "success"
        ? "checkmark-circle"
        : item.type === "promo"
        ? "gift-outline"
        : item.type === "warning"
        ? "alert-circle-outline"
        : "information-circle-outline";

    return (
      <TouchableOpacity
        style={[
          styles.card,
          { backgroundColor: item.read ? "#f4f4f4" : "#fff" },
        ]}
        onPress={() => markAsRead(item.id)}
        activeOpacity={0.8}
      >
        <View style={styles.iconWrapper}>
          <Ionicons name={icon} size={26} color="#028174" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.message}>{item.message}</Text>
          <Text style={styles.date}>
            {new Date(item.date).toLocaleString()}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={26} color="#028174" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 26 }} />
      </View>

      {notifications.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="notifications-off-outline" size={60} color="#aaa" />
          <Text style={styles.emptyText}>No notifications yet</Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fb",
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#028174",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 1,
  },
  iconWrapper: {
    backgroundColor: "#e5f8f6",
    padding: 10,
    borderRadius: 30,
    marginRight: 12,
  },
  title: {
    fontWeight: "600",
    fontSize: 15,
    color: "#0a6b8b",
  },
  message: {
    fontSize: 13,
    color: "#444",
  },
  date: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    marginTop: 8,
    fontSize: 14,
    color: "#777",
  },
  listContent: {
    paddingBottom: 40,
  },
});
