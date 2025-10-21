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

const ElectricityScreen = () => {
  const navigation = useNavigation();
  const { balance, setBalance } = useContext(BalanceContext);
  const { addTransaction } = useContext(TransactionHistoryContext);
  const { addNotification } = useContext(NotificationContext);

  const [selectedBiller, setSelectedBiller] = useState(null);
  const [paymentItem, setPaymentItem] = useState("");
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [meterNumber, setMeterNumber] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const biller = [
    {
      id: "ikeja",
      name: "Ikeja Electricity",
      img: require("../../assets/electricity/ikeja.webp"),
    },
    {
      id: "ibadan",
      name: "Ibadan Electricity",
      img: require("../../assets/electricity/ibadan.webp"),
    },
    {
      id: "abuja",
      name: "Abuja Electricity",
      img: require("../../assets/electricity/abuja.webp"),
    },
    {
      id: "eko",
      name: "Eko Electricity",
      img: require("../../assets/electricity/eko.webp"),
    },
    {
      id: "port-harcourt",
      name: "Port Harcourt Electricity",
      img: require("../../assets/electricity/port-harcourt.webp"),
    },
    {
      id: "aba",
      name: "Aba Power",
      img: require("../../assets/electricity/aba.webp"),
    },
  ];

  const paymentItems = [
    { id: "prepaid", name: "Prepaid" },
    { id: "postpaid", name: "Postpaid" },
  ];
  const presetAmounts = [600, 1000, 2000, 3000, 5000, 50000];
  const isFormComplete =
    selectedBiller && paymentItem && customAmount && meterNumber.length === 11;
  const topUpId = Math.random().toString(36).substring(4, 10).toUpperCase();

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
    if (!selectedBiller || !paymentItem || !amount || !meterNumber) {
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
      mode: `Electricity Payment (${paymentItem.name.toUpperCase()})`,
      amount,
      description: `Electricity Bill Payment for ${meterNumber}`,
      recipient: selectedBiller.name,
      status: "Successful",
    });

    // Add notification
    addNotification({
      title: "Electricity Payment Successful",
      message: `₦${amount.toLocaleString()} electricity bill paid for ${meterNumber} (${
        selectedBiller.name
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
        <Text style={styles.headerTitle}>Electricity</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* Select Biller */}
      <Text style={styles.sectionTitle}>Select Biller</Text>
      <View style={styles.billerRow}>
        {biller.map((net) => (
          <TouchableOpacity
            key={net.id}
            style={[
              styles.billerItem,
              selectedBiller?.id === net.id && styles.billerSelected,
            ]}
            onPress={() => setSelectedBiller(net)}
          >
            <Image
              source={net.img}
              style={styles.billerLogo}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Payment Item Selection */}
      <Text style={styles.sectionTitle}>Select Payment Item</Text>
      <View style={styles.amountRow}>
        {paymentItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.paymentItemBtn,
              paymentItem?.id === item.id && styles.amountSelected,
            ]}
            onPress={() => setPaymentItem(item)}
          >
            <Text style={styles.amountText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Meter Number */}
      <TextInput
        placeholder="Enter meter number"
        value={meterNumber}
        onChangeText={setMeterNumber}
        keyboardType="numeric"
        maxLength={11}
        style={styles.input}
      />

      {/* Amount Selection */}
      <Text style={styles.sectionTitle}>Select or Enter Amount</Text>
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
        recipient={meterNumber}
        provider="Biller"
        bank={selectedBiller?.name}
        accountNumber={topUpId}
        type={
          paymentItem?.name
            ? `${paymentItem.name.toUpperCase()} Electricity Payment`
            : "Electricity Payment"
        }
        narration="Electricity Bill Payment"
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
  billerRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-evenly",
    gap: 10,
    marginBottom: 20,
  },
  billerItem: {
    width: 90,
    height: 70,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  billerSelected: {
    borderColor: "#028174",
    backgroundColor: "#e0f8f4",
  },
  billerLogo: {
    width: "100%",
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
  paymentItemBtn: {
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
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

export default ElectricityScreen;
