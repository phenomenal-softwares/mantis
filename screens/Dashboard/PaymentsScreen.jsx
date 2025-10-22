import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../styles/colors";
import { useNavigation } from "@react-navigation/native";
import { MotiView } from "moti";

const services = [
  {
    id: "1",
    title: "Mantis Transfer",
    icon: "swap-horizontal-outline",
    color: colors.primary,
    screen: "Transfer",
    type: "mantis",
  },
  {
    id: "2",
    title: "Other Banks Transfer",
    icon: "send-outline",
    color: colors.secondary,
    screen: "Transfer",
    type: "other",
  },
  {
    id: "3",
    title: "Airtime",
    icon: "call-outline",
    color: colors.accent,
    screen: "Airtime",
  },
  {
    id: "4",
    title: "Data",
    icon: "wifi-outline",
    color: colors.primary300,
    screen: "Data",
  },
  {
    id: "5",
    title: "Electricity",
    icon: "flash-outline",
    color: colors.secondary300,
    screen: "Electricity",
  },
  {
    id: "6",
    title: "Cable TV",
    icon: "tv-outline",
    color: colors.primary600,
    screen: "CableTV",
  },
  {
    id: "7",
    title: "Betting",
    icon: "game-controller-outline",
    color: colors.secondary600,
    screen: "Betting",
  },
];

const PaymentsScreen = () => {
  const navigation = useNavigation();

  const renderItem = ({ item, index }) => (
    <MotiView
      from={{ opacity: 0, scale: 0.9, translateY: 20 }}
      animate={{ opacity: 1, scale: 1, translateY: 0 }}
      transition={{ delay: index * 100, damping: 12, stiffness: 90 }}
      style={{ flex: 1 }}
    >
      <TouchableOpacity
        style={[styles.card, { backgroundColor: item.color }]}
        onPress={() =>
          navigation.navigate(item.screen, item.type ? { type: item.type } : {})
        }
        activeOpacity={0.85}
      >
        <View style={styles.iconWrapper}>
          <Ionicons name={item.icon} size={36} color="#fff" />
        </View>
        <Text style={styles.cardText}>{item.title}</Text>
      </TouchableOpacity>
    </MotiView>
  );

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.headerRow}>
        <Text style={styles.header}>Payments</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("TransactionHistory")}
          style={styles.historyButton}
        >
          <MaterialCommunityIcons
            name="history"
            size={26}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>

      {/* GRID */}
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.gridContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default PaymentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.primary,
  },
  historyButton: {
    backgroundColor: colors.warning,
    padding: 8,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  gridContainer: {
    paddingBottom: 40,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 20,
  },
  card: {
    flex: 1,
    height: 150,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 6,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 3,
    transform: [{ scale: 1 }],
  },
  iconWrapper: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 50,
    padding: 16,
    marginBottom: 12,
  },
  cardText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
    textAlign: "center",
  },
});
