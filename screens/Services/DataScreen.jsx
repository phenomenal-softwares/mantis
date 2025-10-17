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

const DataScreen = () => {
  const navigation = useNavigation();
  const { balance, setBalance } = useContext(BalanceContext);
  const { addTransaction } = useContext(TransactionHistoryContext);
  const { addNotification } = useContext(NotificationContext);

  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const networks = [
    { id: "mtn", name: "MTN", img: require("../../assets/networks/mtn.webp") },
    {
      id: "airtel",
      name: "Airtel",
      img: require("../../assets/networks/airtel.webp"),
    },
    { id: "glo", name: "Glo", img: require("../../assets/networks/glo.webp") },
    {
      id: "9mobile",
      name: "9mobile",
      img: require("../../assets/networks/9mobile.webp"),
    },
  ];

  const dataPlans = [
    { id: 1, validity: "1 day", size: "150MB", price: 100 },
    { id: 2, validity: "3 days", size: "1GB", price: 450 },
    { id: 3, validity: "7 days", size: "1.5GB", price: 1000 },
    { id: 4, validity: "14 days", size: "3GB", price: 1500 },
    { id: 5, validity: "30 days", size: "6GB", price: 2500 },
    { id: 6, validity: "30 days", size: "10GB", price: 3500 },
    { id: 7, validity: "60 days", size: "20GB", price: 6000 },
  ];

  const isFormComplete =
    selectedNetwork && selectedPlan && phoneNumber.length === 11;
  const topUpId = `TOPUP-${Math.random()
    .toString(36)
    .substring(4, 10)
    .toUpperCase()}`;
  const amount = selectedPlan ? selectedPlan.price : 0;
  const size = selectedPlan ? selectedPlan.size : "";

  const handleProceed = () => {
    if (!selectedNetwork || !selectedPlan || !phoneNumber) {
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
      mode: "Data Purchase",
      amount: amount,
      description: `${size} Data Top-up (${selectedNetwork.name})`,
      recipient: phoneNumber,
      status: "Successful",
    });

    // Add notification
    addNotification({
      title: "Data Purchased",
      message: `${size} Data Top-up for ${phoneNumber} (${
        selectedNetwork.name
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
        <Text style={styles.headerTitle}>Buy Data</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* Phone Number */}
      <TextInput
        placeholder="Enter phone number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="numeric"
        maxLength={11}
        style={styles.input}
      />

      {/* Select Network */}
      <Text style={styles.sectionTitle}>Select Network</Text>
      <View style={styles.networkRow}>
        {networks.map((net) => (
          <TouchableOpacity
            key={net.id}
            style={[
              styles.networkItem,
              selectedNetwork?.id === net.id && styles.networkSelected,
            ]}
            onPress={() => setSelectedNetwork(net)}
          >
            <Image
              source={net.img}
              style={styles.networkLogo}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Select Data Plan</Text>
      <View style={styles.amountRow}>
        {dataPlans.map((plan) => (
          <TouchableOpacity
            key={plan.id}
            style={[
              styles.amountBtn,
              selectedPlan?.id === plan.id && styles.amountSelected,
            ]}
            onPress={() => setSelectedPlan(plan)}
          >
            <Text style={styles.amountText}>
              {plan.size} • {plan.validity}
            </Text>
            <Text style={styles.amountPrice}>
              ₦{plan.price.toLocaleString()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

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
        amount={size}
        recipient={phoneNumber}
        provider="Network"
        bank={selectedNetwork?.name}
        accountNumber={topUpId}
        type="Data Purchase"
        narration="Mobile Data Top-up"
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
  networkRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  networkItem: {
    width: 70,
    height: 70,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  networkSelected: {
    borderColor: "#028174",
    backgroundColor: "#e0f8f4",
  },
  networkLogo: {
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
    width: "48%",
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

export default DataScreen;
