import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "../../styles/colors";

/**
 * Reusable component that displays a category title and a grid of services
 * @param {string} title - The category name (e.g. "Transfers")
 * @param {Array} data - List of services under this category
 * @param {Function} onPress - Optional handler when a service is pressed
 */
const ServicesSection = ({ title, data, onPress }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.serviceItem}
      onPress={() => onPress?.(item)}
      activeOpacity={0.8}
    >
      <View style={styles.iconContainer}>
        <Feather name={item.icon} size={25} color={colors.secondary} />
      </View>
      <Text style={styles.label}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={4}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        scrollEnabled={false}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
};

export default ServicesSection;

const styles = StyleSheet.create({
  section: {
    marginBottom: 25,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: 12,
  },
  grid: {
    gap: 16,
  },
  serviceItem: {
    width: "22%",
    alignItems: "center",
  },
  iconContainer: {
    backgroundColor: colors.lightAccent,
    borderRadius: 16,
    padding: 12,
    marginBottom: 6,
  },
  label: {
    fontSize: 12,
    textAlign: "center",
    color: "#333",
  },
});
