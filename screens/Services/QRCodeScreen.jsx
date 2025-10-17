import { useState, useEffect, useContext, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import { user } from "../../data/user";
import { useNavigation } from "@react-navigation/native";
import { showToast } from "../../hooks/useToast";

import { BalanceContext } from "../../contexts/BalanceContext";
import { TransactionHistoryContext } from "../../contexts/TransactionHistoryContext";
import { NotificationContext } from "../../contexts/NotificationContext";

import { recipients } from "../../data/recipients";

const QRCodeScreen = () => {
  const navigation = useNavigation();
  const { balance, setBalance } = useContext(BalanceContext);
  const { addTransaction } = useContext(TransactionHistoryContext);
  const { addNotification } = useContext(NotificationContext);
  const [showScanner, setShowScanner] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const scanAnim = useRef(new Animated.Value(0)).current;
  const [recipient, setRecipient] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (showScanner && !scanComplete) {
      const randomRecipient =
        recipients[Math.floor(Math.random() * recipients.length)];
      const amount =
        Math.floor((Math.random() * (50000 - 1000 + 1) + 1000) / 100) * 100; // ₦1k–₦50k, rounded to 10
      const newRecipient = { ...randomRecipient, amount };

      setRecipient(newRecipient);

      // Animate scan line
      Animated.loop(
        Animated.sequence([
          Animated.timing(scanAnim, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
          }),
          Animated.timing(scanAnim, {
            toValue: 0,
            duration: 1200,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Delay to simulate scanning result
      const timer = setTimeout(() => {
        if (!newRecipient) return;

        const { name, bank, accountNumber, amount } = newRecipient;

        if (amount > balance) {
          setError("Insufficient balance.");
          return;
        }

        // Deduct the amount
        setBalance((prev) => prev - amount);

        addTransaction({
          type: "Debit",
          mode: "Transfer",
          amount: Number(amount),
          description: `Transfer to ${bank}`,
          recipient: name || accountNumber,
          status: "Successful",
        });

        addNotification({
          title: "Transfer Successful",
          message: `₦${amount.toLocaleString()} sent to ${name}.`,
          type: "success",
          read: false,
        });

        setScanComplete(true);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [showScanner]);

  const translateY = scanAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 180], // height of scan box
  });

  const handleClose = () => {
    setShowScanner(false);
    setScanComplete(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={26} color="#028174" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My QR Code</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* QR Card */}
      <View style={styles.card}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user.fullName.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View>
            <Text style={styles.name}>{user.fullName}</Text>
            <Text style={styles.account}>{user.account.accountNumber}</Text>
          </View>
        </View>

        <View style={styles.qrContainer}>
          <QRCode value={user.id} size={160} color="#028174" />
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#028174" }]}
          onPress={() =>
            showToast(
              "success",
              "QR Copied to Clipboard",
              "You can now share your QR code."
            )
          }
        >
          <Feather name="share-2" size={20} color="#fff" />
          <Text style={styles.btnText}>Share My QR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#0a6b8b" }]}
          onPress={() => setShowScanner(true)}
        >
          <Ionicons name="scan" size={20} color="#fff" />
          <Text style={styles.btnText}>Scan to Pay</Text>
        </TouchableOpacity>
      </View>

      {/* Mock Scanner Modal */}
      <Modal visible={showScanner} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          {error ? (
            <Text style={{ color: "red", marginTop: 10 }}>{error}</Text>
          ) : !scanComplete ? (
            <>
              <Text style={styles.scanHeader}>Align QR within frame</Text>
              <View style={styles.scanBox}>
                <Animated.View
                  style={[styles.scanLine, { transform: [{ translateY }] }]}
                />
              </View>
            </>
          ) : (
            <View style={styles.successContainer}>
              <Ionicons name="checkmark-circle" size={80} color="#92de8b" />
              <Text style={styles.successText}>Payment Successful</Text>
              <Text style={styles.subText}>
                You have sent ₦{recipient.amount} to {recipient.name}
              </Text>
              <Text style={styles.subText}>
                Account: {recipient.accountNumber + " (" + recipient.bank + ")"}
              </Text>
            </View>
          )}

          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Text style={styles.closeText}>
              {scanComplete ? "Done" : "Cancel"}
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default QRCodeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fb",
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  /* HEADER */
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
    backgroundColor: "#f9f9f9",
    borderRadius: 16,
    padding: 25,
    alignItems: "center",
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#92de8b",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
    color: "#028174",
    fontWeight: "700",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  account: {
    color: "#666",
    fontSize: 14,
  },
  qrContainer: {
    marginTop: 10,
  },
  buttons: {
    flexDirection: "row",
    gap: 15,
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
    gap: 8,
  },
  btnText: {
    color: "#fff",
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    alignItems: "center",
    justifyContent: "center",
  },
  scanHeader: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 30,
    fontWeight: "500",
  },
  scanBox: {
    width: 220,
    height: 220,
    borderWidth: 2,
    borderColor: "#028174",
    borderRadius: 16,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  scanLine: {
    position: "absolute",
    width: "100%",
    height: 2,
    backgroundColor: "#92de8b",
  },
  successContainer: {
    alignItems: "center",
  },
  successText: {
    color: "#92de8b",
    fontSize: 22,
    fontWeight: "700",
    marginTop: 15,
  },
  subText: {
    color: "#fff",
    marginTop: 6,
  },
  closeButton: {
    position: "absolute",
    bottom: 60,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeText: {
    color: "#028174",
    fontWeight: "600",
  },
});
