import { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from "react-native";
import { BalanceContext } from "../../contexts/BalanceContext";
import { TransactionHistoryContext } from "../../contexts/TransactionHistoryContext";
import { NotificationContext } from "../../contexts/NotificationContext";
import TransactionSuccessModal from "../../components/modals/TransactionSuccessModal";
import colors from "../../styles/colors";
import { Feather, Ionicons } from "@expo/vector-icons";

const banks = [
  "Access Bank",
  "GTBank",
  "Zenith Bank",
  "UBA",
  "First Bank",
  "Kuda",
  "Opay",
  "PalmPay",
  "Moniepoint",
];

const TransferScreen = ({ route, navigation }) => {
  const { type } = route.params || { type: "mantis" }; // 'mantis' | 'bank'
  const { balance, setBalance } = useContext(BalanceContext);
  const { addTransaction } = useContext(TransactionHistoryContext);
  const { addNotification } = useContext(NotificationContext);
  const [bank, setBank] = useState("");
  const [showBanks, setShowBanks] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [validationMsg, setValidationMsg] = useState("");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (accountNumber.length === 0) {
      setValidationMsg("");
      setRecipient("");
    } else if (accountNumber.length < 10) {
      setValidationMsg("Account number must be 10 digits");
      setRecipient("");
    } else if (accountNumber.length > 10) {
      setValidationMsg("Account number cannot exceed 10 digits");
      setRecipient("");
    } else if (accountNumber.length === 10) {
      // Simulate recipient verification
      setValidationMsg("");
      setRecipient("BOLA AHMED TINUBU");
    }
  }, [accountNumber]);

  const handleTransfer = () => {
    const numericAmount = parseFloat(amount);
    if (!numericAmount || numericAmount <= 0) {
      setError("Enter a valid amount.");
      return;
    }

    if (numericAmount > balance) {
      setError("Insufficient balance.");
      return;
    }

    // Deduct the amount
    setBalance((prev) => prev - numericAmount);

    // Log the transaction
    addTransaction({
      type: "Debit",
      mode: "Transfer",
      amount: numericAmount,
      description:
        type === "mantis" ? "Mantis-to-Mantis Transfer" : `Transfer to ${bank}`,
      recipient: recipient || accountNumber,
      status: "Successful",
    });

    // Add notification
    addNotification({
      title: "Transfer Successful",
      message: `₦${numericAmount} sent to ${recipient}.`,
      type: "success",
      read: false,
    });

    // Show success modal
    setShowSuccessModal(true);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 80 }}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.dark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {type === "mantis" ? "Mantis Transfer" : "Other Bank Transfer"}
        </Text>
      </View>

      {/* Form */}
      <View style={styles.form}>
        {type === "bank" && (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Select Bank</Text>

            {/* Dropdown trigger */}
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setShowBanks(true)}
              activeOpacity={0.8}
            >
              <Text style={styles.dropdownText}>{bank || "Choose a bank"}</Text>
              <Feather name="chevron-down" size={20} color={colors.secondary} />
            </TouchableOpacity>

            {/* Modal dropdown list */}
            <Modal
              visible={showBanks}
              transparent
              animationType="fade"
              onRequestClose={() => setShowBanks(false)}
            >
              <TouchableOpacity
                style={styles.modalOverlay}
                activeOpacity={1}
                onPressOut={() => setShowBanks(false)}
              >
                <View style={styles.modalContainer}>
                  <ScrollView
                    style={styles.bankList}
                    contentContainerStyle={{ paddingVertical: 10 }}
                  >
                    {banks.map((b, i) => (
                      <TouchableOpacity
                        key={i}
                        style={[
                          styles.bankOption,
                          bank === b && styles.bankSelected,
                        ]}
                        onPress={() => {
                          setBank(b);
                          setShowBanks(false);
                        }}
                      >
                        <Text
                          style={[
                            styles.bankText,
                            bank === b && styles.bankTextSelected,
                          ]}
                        >
                          {b}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </TouchableOpacity>
            </Modal>
          </View>
        )}

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Account Number</Text>
          <TextInput
            style={styles.input}
            value={accountNumber}
            keyboardType="numeric"
            maxLength={10}
            placeholder="Enter account number"
            onChangeText={setAccountNumber}
          />

          {/* Validator feedback */}
          {validationMsg ? (
            <Text style={styles.validationText}>{validationMsg}</Text>
          ) : recipient ? (
            <Text style={styles.recipientText}>Recipient: {recipient}</Text>
          ) : null}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Amount</Text>
          <View style={styles.amountTextGroup}>
            <Text style={{ fontSize: 30, color: colors.primary }}>₦</Text>
            <TextInput
              style={styles.input}
              value={amount}
              keyboardType="numeric"
              placeholder="0.00"
              onChangeText={setAmount}
            />
          </View>
          {error ? (
            <Text style={{ color: "red", marginTop: 10 }}>{error}</Text>
          ) : null}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Note (optional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={note}
            placeholder="Add a note"
            multiline
            numberOfLines={3}
            onChangeText={setNote}
          />
        </View>

        <TouchableOpacity
          style={[
            styles.transferButton,
            (!amount || !accountNumber || (type === "bank" && !bank)) &&
              styles.disabledButton,
          ]}
          disabled={!amount || !accountNumber || (type === "bank" && !bank)}
          onPress={handleTransfer}
        >
          <Text style={styles.transferText}>Proceed</Text>
        </TouchableOpacity>
      </View>

      {/* Success Modal */}
      <TransactionSuccessModal
        visible={showSuccessModal}
        amount={amount}
        bank={type === "mantis" ? "MANTIS" : bank}
        accountNumber={accountNumber}
        recipient={recipient}
        type={type === "mantis" ? "Mantis-to-Mantis Transfer" : "Bank Transfer"}
        narration={note}
      />
    </ScrollView>
  );
};

export default TransferScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingTop: Platform.OS === "ios" ? 60 : 15,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.primary,
  },
  form: {
    padding: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  amountTextGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  label: {
    color: colors.secondary,
    fontSize: 16,
    marginBottom: 5,
    textTransform: "uppercase",
    fontWeight: "600",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: "600",
    color: colors.secondary600,
  },
  validationText: {
    marginTop: 5,
    color: colors.error,
    fontSize: 13,
    textAlign: "right",
  },
  recipientText: {
    marginTop: 5,
    color: colors.success,
    fontSize: 14,
    fontWeight: "500",
    textAlign: "right",
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "#ccc",
    marginTop: 8,
  },
  dropdownText: {
    fontSize: 15,
    color: colors.dark,
    fontWeight: "500",
    textTransform: "uppercase",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    maxHeight: "60%",
    backgroundColor: colors.light,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 5,
  },
  bankList: {
    width: "100%",
  },
  bankOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  bankSelected: {
    backgroundColor: colors.accent,
  },
  bankText: {
    fontSize: 15,
    color: colors.secondary300,
    fontWeight: "500",
    textTransform: "uppercase",
  },
  bankTextSelected: {
    color: colors.primary,
    fontWeight: "600",
  },
  transferButton: {
    marginTop: 10,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  transferText: {
    color: colors.light,
    fontSize: 16,
    fontWeight: "700",
  },
});
