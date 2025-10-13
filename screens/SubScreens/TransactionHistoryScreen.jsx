import { useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { TransactionHistoryContext } from "../../contexts/TransactionHistoryContext";
import { useNavigation } from "@react-navigation/native";
import colors from "../../styles/colors";

const TransactionHistoryScreen = () => {
  const { transactions } = useContext(TransactionHistoryContext);
  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    const isCredit = item.type.toLowerCase() === "credit";
    const iconName = item.mode.toLowerCase().includes("transfer")
      ? "swap-horizontal"
      : "cash-outline";

    return (
      <View style={styles.transactionCard}>
        <View style={styles.iconContainer}>
          <Ionicons name={iconName} size={28} color={colors.primary} />
        </View>

        <View style={styles.transactionInfo}>
          <Text style={styles.transactionType}>{item.type}</Text>
          <Text style={styles.transactionMode}>{item.mode}</Text>
          <Text style={styles.recipient}>{item.recipient}</Text>
          <Text style={styles.date}>
            {new Date(item.date).toLocaleString()}
          </Text>
        </View>

        <View style={styles.amountContainer}>
          <Text
            style={[styles.amount, { color: isCredit ? "#0a6b8b" : "#d9534f" }]}
          >
            {isCredit ? "+" : "-"}₦{Math.abs(item.amount).toLocaleString()}
          </Text>
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor:
                  item.status === "Successful" ? colors.success : colors.error,
              },
            ]}
          >
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={26} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transaction History</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* Empty State */}
      {transactions.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="document-text-outline" size={60} color="#aaa" />
          <Text style={styles.emptyText}>No transactions yet</Text>
        </View>
      ) : (
        <FlatList
          data={[...transactions]}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default TransactionHistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
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
    color: colors.primary,
  },
  transactionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    backgroundColor: "#e5f8f6",
    borderRadius: 40,
    padding: 10,
    marginRight: 10,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionType: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.primary300,
  },
  transactionMode: {
    fontSize: 13,
    color: colors.primary600,
  },
  recipient: {
    fontSize: 13,
    color: "#444",
  },
  date: {
    fontSize: 12,
    color: "#777",
  },
  amountContainer: {
    alignItems: "flex-end",
  },
  amount: {
    fontSize: 15,
    fontWeight: "600",
  },
  statusBadge: {
    marginTop: 4,
    borderRadius: 8,
    paddingVertical: 2,
    paddingHorizontal: 8,
    alignItems: "center",
  },
  statusText: {
    fontSize: 11,
    textTransform: "capitalize",
    color: colors.light,
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
