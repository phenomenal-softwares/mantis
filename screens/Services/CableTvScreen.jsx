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

import { cablePackages } from "../../data/cablePackages";

const CableTvScreen = () => {
  const navigation = useNavigation();
  const { balance, setBalance } = useContext(BalanceContext);
  const { addTransaction } = useContext(TransactionHistoryContext);
  const { addNotification } = useContext(NotificationContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [smartCardNumber, setSmartCardNumber] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const providers = [
    {
      id: "dstv",
      name: "DStv",
      img: require("../../assets/cable/dstv.webp"),
      bg: "#0B4DA2", // deep blue
    },
    {
      id: "gotv",
      name: "GOtv",
      img: require("../../assets/cable/gotv.webp"),
      bg: "#F4B400", // warm yellow
    },
    {
      id: "startimes",
      name: "StarTimes",
      img: require("../../assets/cable/startimes.webp"),
      bg: "#FF7F00", // orange
    },
    {
      id: "boxoffice",
      name: "Box Office",
      img: require("../../assets/cable/boxoffice.webp"),
      bg: "#C2185B", // wine red
    },
    {
      id: "showmax",
      name: "Showmax",
      img: require("../../assets/cable/showmax.webp"),
      bg: "#1C1C1C", // dark gray
    },
  ];

  const isFormComplete =
    selectedProvider && selectedPackage && smartCardNumber.length === 11;
  const topUpId = `TV-${Math.random()
    .toString(36)
    .substring(4, 10)
    .toUpperCase()}`;
  const amount = selectedPackage ? selectedPackage.price : 0;
  const size = selectedPackage
    ? selectedPackage.provider + " " + selectedPackage.name
    : "";

  const handleProceed = () => {
    if (!selectedProvider || !selectedPackage || !smartCardNumber) {
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
      mode: "Cable TV Subscription",
      amount: amount,
      description: `${size} Subscription (${selectedProvider.name})`,
      recipient: smartCardNumber,
      status: "Successful",
    });

    // Add notification
    addNotification({
      title: "Cable TV Subscription Successful",
      message: `${size} subscription for ${smartCardNumber} (${selectedProvider.name})`,
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
        <Text style={styles.headerTitle}>Cable TV Subsription</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* Select Provider */}
      <Text style={styles.sectionTitle}>Select TV Provider</Text>

      {/* Dropdown Container */}
      <View style={styles.dropdownContainer}>
        <TouchableOpacity
          style={styles.dropdownHeader}
          onPress={() => setDropdownOpen(!dropdownOpen)}
          activeOpacity={0.8}
        >
          {selectedProvider ? (
            <>
              <Image
                source={selectedProvider.img}
                style={styles.dropdownLogo}
                resizeMode="contain"
              />
              <Text style={styles.dropdownText}>{selectedProvider.name}</Text>
            </>
          ) : (
            <Text style={styles.dropdownPlaceholder}>Choose Provider</Text>
          )}
          <Text style={styles.dropdownArrow}>
            <MaterialIcons
              name={dropdownOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"}
              size={26}
              color="#028174"
              style={styles.dropdownArrow}
            />
          </Text>
        </TouchableOpacity>

        {dropdownOpen && (
          <View style={styles.dropdownList}>
            {providers.map((prov) => (
              <TouchableOpacity
                key={prov.id}
                style={[
                  styles.dropdownItem,
                  selectedProvider?.id === prov.id && {
                    backgroundColor: prov.color + "22",
                    borderColor: prov.color,
                  },
                ]}
                onPress={() => {
                  setSelectedProvider(prov);
                  setDropdownOpen(false);
                  setSelectedPackage(null);
                }}
              >
                <Image
                  source={prov.img}
                  style={styles.dropdownLogo}
                  resizeMode="contain"
                />
                <Text style={styles.dropdownItemText}>{prov.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Smartcard Number */}
      <TextInput
        placeholder="Enter Smartcard / IUC Number"
        value={smartCardNumber}
        onChangeText={setSmartCardNumber}
        keyboardType="numeric"
        maxLength={11}
        style={styles.input}
      />

      {/* Select Package */}
      {selectedProvider && (
        <>
          <Text style={styles.sectionTitle}>
            Select {selectedProvider.name} Package
          </Text>

          <View style={styles.amountRow}>
            {cablePackages
              .filter((pkg) => pkg.provider === selectedProvider.name)
              .map((pkg) => {
                const providerColor = selectedProvider.bg || "#028174"; // fallback color
                const isSelected = selectedPackage?.id === pkg.id;

                return (
                  <TouchableOpacity
                    key={pkg.id}
                    style={[
                      styles.amountBtn,
                      { backgroundColor: providerColor + "22" }, // light tint of provider color
                      isSelected && { backgroundColor: providerColor },
                    ]}
                    onPress={() => setSelectedPackage(pkg)}
                  >
                    <Text
                      style={[
                        styles.amountText,
                        isSelected && { color: "#fff" },
                      ]}
                    >
                      {pkg.name}
                    </Text>
                    <Text
                      style={[
                        styles.amountSub,
                        isSelected && { color: "#f1f1f1" },
                      ]}
                    >
                      {pkg.channels} Channels • ₦{pkg.price.toLocaleString()}
                    </Text>
                    {pkg.description ? (
                      <Text
                        style={[
                          styles.amountDesc,
                          isSelected && { color: "#eaeaea" },
                        ]}
                      >
                        {pkg.description}
                      </Text>
                    ) : null}
                  </TouchableOpacity>
                );
              })}
          </View>
        </>
      )}

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
        recipient={smartCardNumber}
        provider="TV Provider"
        bank={selectedProvider?.name}
        accountNumber={topUpId}
        type="Cable TV Subscription"
        narration="Cable TV Subscription"
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
  dropdownContainer: {
    marginVertical: 10,
  },

  dropdownHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },

  dropdownLogo: {
    width: 28,
    height: 28,
    marginRight: 10,
  },

  dropdownText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "#222",
  },

  dropdownPlaceholder: {
    flex: 1,
    fontSize: 16,
    color: "#888",
  },

  dropdownArrow: {
    fontSize: 16,
    color: "#555",
  },

  dropdownList: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 6,
    borderWidth: 1,
    borderColor: "#ccc",
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },

  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  dropdownItemText: {
    fontSize: 15,
    color: "#333",
    fontWeight: "500",
  },

  // Package grid
  amountRow: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  amountBtn: {
    width: "48%",
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },

  amountSelected: {
    borderColor: "#00b894",
    backgroundColor: "#e6fff3",
  },

  amountText: {
    fontWeight: "700",
    fontSize: 14,
    color: "#333",
  },

  amountSub: {
    fontSize: 13,
    color: "#666",
    marginVertical: 4,
  },

  amountDesc: {
    fontSize: 12,
    color: "#999",
    fontStyle: "italic",
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

export default CableTvScreen;
