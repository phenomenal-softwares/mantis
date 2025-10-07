import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { user } from "../../data/user";
import { Feather, Ionicons } from "@expo/vector-icons";
import colors from "../../styles/colors";
import { useNavigation } from "@react-navigation/native";

const NotificationsScreen = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <View style={[styles.notification, !item.read && styles.unread]}>
      <Feather
        name={item.read ? "bell" : "bell-off"}
        size={20}
        color={item.read ? "#888" : "#028174"}
      />
      <View style={styles.textBox}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.message}>{item.message}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
    </View>
  );

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
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 26 }} /> {/* Spacer for symmetry */}
      </View>

      
        <FlatList
          data={user.notifications}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 20 }}
        />
      
    </View>
  );
};

export default NotificationsScreen;

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

  /* NOTIFICATION ITEM */
  notification: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 15,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    marginBottom: 10,
  },
  unread: {
    backgroundColor: "#e0f4f1",
  },
  textBox: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0a6b8b",
  },
  message: {
    fontSize: 14,
    color: "#555",
    marginVertical: 3,
  },
  date: {
    fontSize: 12,
    color: "#999",
  },
});
