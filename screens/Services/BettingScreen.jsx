import { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { BalanceContext } from "../../contexts/BalanceContext";
import { TransactionHistoryContext } from "../../contexts/TransactionHistoryContext";
import { NotificationContext } from "../../contexts/NotificationContext";

import TransactionSuccessModal from "../../components/modals/TransactionSuccessModal";
import { showToast } from "../../hooks/useToast";

const BettingScreen = () => {
  const navigation = useNavigation();
  const { balance, setBalance } = useContext(BalanceContext);
  const { addTransaction } = useContext(TransactionHistoryContext);
  const { addNotification } = useContext(NotificationContext);

  const [selectedBettingPlatform, setSelectedBettingPlatform] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [userID, setuserID] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const bettingPlatforms = [
    {
      id: "sportybet",
      name: "SportyBet",
      img: require("../../assets/betting/sportybet.webp"),
    },
    {
      id: "bet9ja",
      name: "Bet9ja",
      img: require("../../assets/betting/bet9ja.webp"),
    },
    {
      id: "1xbet",
      name: "1XBet",
      img: require("../../assets/betting/1xbet.webp"),
    },
    {
      id: "msport",
      name: "M-Sport",
      img: require("../../assets/betting/msport.webp"),
    },
    {
      id: "betking",
      name: "BetKing",
      img: require("../../assets/betting/betking.webp"),
    },
  ];

  const presetAmounts = [100, 200, 500, 1000, 2000, 3500, 5000];
  const isFormComplete =
    selectedBettingPlatform && customAmount && userID.length === 10;
  const topUpId = `TOPUP-${Math.random()
    .toString(36)
    .substring(4, 10)
    .toUpperCase()}`;

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount(amount.toString());
  };

  const handleCustomInput = (val) => {
    setCustomAmount(val);
    setSelectedAmount(null);
  };

  const handleProceed = () => {
    const amount = Number(customAmount);
    if (!selectedBettingPlatform || !amount || !userID) {
      showToast(
        "error",
        "Incomplete form",
        "Please fill all fields correctly."
      );
      return;
    }

    if (amount > balance) {
      showToast(
        "error",
        "Insufficient Balance",
        "You do not have enough balance to complete this transaction."
      );
      return;
    }

    // Update balance
    setBalance((prev) => prev - amount);

    // Add transaction
    addTransaction({
      type: "Debit",
      mode: "Betting Purchase",
      amount,
      description: `Betting top-up (${selectedBettingPlatform.name})`,
      recipient: userID,
      status: "Successful",
    });

    // Add notification
    addNotification({
      title: "Betting Purchase",
      message: `₦${amount.toLocaleString()} betting top-up paid to ${userID} (${
        selectedBettingPlatform.name
      })`,
      type: "success",
      read: false,
    });

    setShowSuccessModal(true);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={26} color="#028174" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Betting</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* Select BettingPlatform */}
      <Text style={styles.sectionTitle}>Select Betting Platform</Text>
      <View style={styles.bettingPlatformRow}>
        {bettingPlatforms.map((net) => (
          <TouchableOpacity
            key={net.id}
            style={[
              styles.bettingPlatformItem,
              selectedBettingPlatform?.id === net.id &&
                styles.bettingPlatformSelected,
            ]}
            onPress={() => setSelectedBettingPlatform(net)}
          >
            <Image
              source={net.img}
              style={styles.bettingPlatformLogo}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Phone Number */}
      <TextInput
        placeholder="Enter User ID"
        value={userID}
        onChangeText={setuserID}
        keyboardType="numeric"
        maxLength={11}
        style={styles.input}
      />

      {/* Amount Selection */}
      <Text style={styles.sectionTitle}>Select Amount</Text>
      <View style={styles.amountRow}>
        {presetAmounts.map((amt) => (
          <TouchableOpacity
            key={amt}
            style={[
              styles.amountBtn,
              selectedAmount === amt && styles.amountSelected,
            ]}
            onPress={() => handleAmountSelect(amt)}
          >
            <Text style={styles.amountText}>₦{amt}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        placeholder="Enter custom amount"
        value={customAmount}
        onChangeText={handleCustomInput}
        keyboardType="numeric"
        style={styles.input}
      />

      {/* Proceed Button */}
      <TouchableOpacity
        style={[
          styles.proceedBtn,
          !isFormComplete && { backgroundColor: "#ccc" },
        ]}
        disabled={!isFormComplete}
        onPress={handleProceed}
      >
        <Text style={styles.proceedText}>Proceed</Text>
      </TouchableOpacity>

      {/* Success Modal */}
      <TransactionSuccessModal
        visible={showSuccessModal}
        amount={"₦" + Number(customAmount)}
        recipient={userID}
        provider="Betting Platform"
        bank={selectedBettingPlatform?.name}
        accountNumber={topUpId}
        type="Betting Top-up"
        narration="Betting Purchase"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
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
  sectionTitle: {
    color: "#028174",
    fontSize: 16,
    fontWeight: "500",
    marginVertical: 10,
  },
  bettingPlatformRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
    marginBottom: 20,
  },
  bettingPlatformItem: {
    width: 70,
    height: 70,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  bettingPlatformSelected: {
    borderColor: "#028174",
    backgroundColor: "#e0f8f4",
  },
  bettingPlatformLogo: {
    width: 50,
    height: 50,
  },
  amountRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 10,
  },
  amountBtn: {
    borderWidth: 1,
    borderColor: "#ccc",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  amountSelected: {
    borderColor: "#028174",
    backgroundColor: "#d6f5ef",
  },
  amountText: {
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    color: "#028174",
    borderColor: "#ccc",
    fontSize: 16,
    fontWeight: 700,
    borderRadius: 10,
    padding: 12,
    marginVertical: 10,
  },
  proceedBtn: {
    backgroundColor: "#028174",
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  proceedText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default BettingScreen;
