import { useContext, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { BalanceContext } from "../../contexts/BalanceContext";
import { NotificationContext } from "../../contexts/NotificationContext";
import { TransactionHistoryContext } from "../../contexts/TransactionHistoryContext";
import { useNavigation } from "@react-navigation/native";
import colors from "../../styles/colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { showToast } from "../../hooks/useToast";
import DisclaimerBanner from "../../components/UI/DisclaimerBanner";

const LoanScreen = () => {
  const { balance, setBalance, hasLoan, setHasLoan } =
    useContext(BalanceContext);
  const { addNotification } = useContext(NotificationContext);
  const { addTransaction } = useContext(TransactionHistoryContext);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const loanAmount = 50000;

  const handleBorrow = () => {
    if (hasLoan) {
      showToast(
        "error",
        "Loan Application Failed",
        "You have already borrowed the demo loan."
      );
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setBalance((prev) => prev + loanAmount);
      setHasLoan(true);
      // Log transaction
      addTransaction({
        type: "Credit",
        mode: "Loan Credit",
        amount: loanAmount,
        description: `₦${loanAmount.toLocaleString()} has been credited to your account.`,
        recipient: "User Account",
        status: "Successful",
      });

      // Add notification
      addNotification({
        title: "Loan Approved",
        message: `₦${loanAmount.toLocaleString()} has been credited to your account.`,
        type: "success",
        read: false,
      });
      setLoading(false);
      showToast(
        "success",
        "Loan Application Success",
        `₦${loanAmount.toLocaleString()} has been credited to your account.`
      );
    }, 1200);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={26} color="#028174" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Loan Services</Text>
        <View style={{ width: 26 }} />
      </View>
      <View style={styles.card}>
        <Ionicons name="cash-outline" size={40} color={colors.primary} />
        <Text style={styles.balanceLabel}>Current Balance</Text>
        <Text style={styles.balanceValue}>₦{balance.toLocaleString()}</Text>
      </View>

      <View style={styles.loanInfo}>
        <Text style={styles.infoTitle}>Loan Offer</Text>
        <Text style={styles.infoText}>
          Borrow ₦{loanAmount.toLocaleString()} instantly with no interest.{" "}
          {hasLoan
            ? "You have already borrowed this demo loan."
            : "Click below to credit your wallet."}
        </Text>
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          hasLoan && { backgroundColor: colors.gray, opacity: 0.6 },
        ]}
        onPress={handleBorrow}
        disabled={hasLoan || loading}
      >
        <Ionicons name="card-outline" size={20} color="#fff" />
        <Text style={styles.buttonText}>
          {loading
            ? "Processing..."
            : hasLoan
            ? "Loan Already Taken"
            : "Borrow ₦50,000"}
        </Text>
      </TouchableOpacity>

      <DisclaimerBanner />
    </View>
  );
};

export default LoanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
    padding: 20,
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
    backgroundColor: "#fff",
    borderRadius: 16,
    alignItems: "center",
    paddingVertical: 30,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
  },
  balanceLabel: {
    fontSize: 14,
    color: colors.darkGray,
    marginTop: 10,
  },
  balanceValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.primary,
    marginTop: 5,
  },
  loanInfo: {
    marginTop: 30,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.dark,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: colors.secondary600,
    lineHeight: 20,
  },
  button: {
    marginTop: 35,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 12,
    gap: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
