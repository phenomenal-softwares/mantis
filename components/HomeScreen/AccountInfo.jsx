import { useState, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { user } from "../../data/user";
import { useNavigation } from "@react-navigation/native";
import { BalanceContext } from "../../contexts/BalanceContext";
import colors from "../../styles/colors";

export default function AccountInfo({ onViewTransactions }) {
  const { balance } = useContext(BalanceContext);
  const [showBalance, setShowBalance] = useState(true);
  const navigation = useNavigation();

  const handleViewTransactions = () => {
    navigation.navigate("TransactionHistory");
  };

  return (
    <View style={styles.container}>
      {/* Top Row: Label + Eye Icon */}
      <View style={styles.topRow}>
        <Text style={styles.label}>Available Balance</Text>
        <TouchableOpacity onPress={() => setShowBalance(!showBalance)}>
          <Ionicons
            name={showBalance ? "eye-outline" : "eye-off-outline"}
            size={22}
            color={colors.accent || "#555"}
          />
        </TouchableOpacity>
      </View>

      {/* Balance */}
      <Text style={styles.balance}>
        {showBalance
          ? `${user.account.currency}${balance.toLocaleString()}`
          : "•••••••"}
      </Text>

      {/* Account Info Row */}
      <View style={styles.accountRow}>
        <View style={styles.accountCol}>
          <Text style={styles.smallLabel}>Account Number</Text>
          <Text style={styles.value}>{user.account.accountNumber}</Text>
        </View>

        <View style={styles.accountCol}>
          <Text style={styles.smallLabel}>Tier</Text>
          <Text style={styles.value}>{user.account.tier}</Text>
        </View>
      </View>

      {/* Bank Name */}
      <Text style={styles.bankName}>{user.account.bankName}</Text>

      {/* Transactions Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleViewTransactions}
        activeOpacity={0.8}
      >
        <Ionicons name="swap-horizontal-outline" size={18} color="#fff" />
        <Text style={styles.btnText}>View Transactions</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    padding: 20,
    borderRadius: 16,
    marginVertical: 15,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    color: "#fff",
    fontSize: 14,
    opacity: 0.8,
  },
  balance: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.accent,
    marginVertical: 6,
  },
  accountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  accountCol: {
    flex: 1,
  },
  smallLabel: {
    fontSize: 12,
    color: "#e0f2f1",
    opacity: 0.8,
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  bankName: {
    marginTop: 8,
    fontSize: 13,
    color: "#d1f7ef",
    fontStyle: "italic",
  },
  button: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.accent,
    borderRadius: 12,
    paddingVertical: 10,
    gap: 6,
  },
  btnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
