import { useState, useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../styles/colors";

import { useNavigation } from "@react-navigation/native";

export default function TransactionSuccessModal({
  visible,
  onClose,
  amount,
  provider,
  bank,
  accountNumber,
  recipient,
  type,
  narration,
}) {
  const navigation = useNavigation();
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
  const rand = Math.floor(1000 + Math.random() * 9000); // 4 random digits
  const id = `TRX${Date.now()}${rand}`; // e.g., TRX17282345671234
  setTransactionId(id);
}, []);


  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          {/* Success Icon / Banner */}
          <View style={styles.iconWrapper}>
            <View style={styles.iconCircle}>
              <Text style={styles.iconText}>
                <Ionicons name="checkmark" size={50} color={colors.light} />
              </Text>
            </View>
          </View>

          {/* Title & Subtext */}
          <Text style={styles.title}>Transaction Successful</Text>
          <Text style={styles.subtitle}>
            Your {type} has been completed successfully.
          </Text>

          {/* Transaction Details */}
          <View style={styles.detailsBox}>
            <Text style={styles.amountText}>{amount}</Text>
            {recipient ? (
              <Text style={styles.recipientText}>To: {recipient}</Text>
            ) : null}
            {bank ? (
              <Text style={styles.bankText}>
                {provider}: {bank} | {accountNumber}
              </Text>
            ) : null}
          </View>

          {/* Decorative Divider */}
          <View style={styles.divider} />

          {/* Footer */}
          <Text style={styles.footerText}>
            Narration: {narration || "Nil"} {"\n"}
            Reference ID: {transactionId}{"\n"}
            Date: {new Date().toLocaleString()}
          </Text>

          {/* Buttons Row */}
          <View style={styles.buttonRow}>
            {/* Share Receipt */}
            <TouchableOpacity
              style={[styles.actionBtn, styles.shareBtn]}
              onPress={() => {
                if (typeof window !== "undefined" && window.print) {
                  window.print(); // Opens browser print/share dialogue
                } else {
                  Alert.alert(
                    "Share Unavailable",
                    "Sharing is currently supported only on web demo."
                  );
                }
              }}
            >
              <Text style={styles.shareText}>Share Receipt</Text>
            </TouchableOpacity>

            {/* Done Button */}
            <TouchableOpacity
              style={[styles.actionBtn, styles.doneBtn]}
              onPress={() => navigation.replace("Dashboard")}
            >
              <Text style={styles.doneText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 20,
    width: "100%",
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 8,
  },
  iconWrapper: {
    marginBottom: 15,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.success,
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.textPrimary || "#222",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary || "#666",
    textAlign: "center",
    marginBottom: 15,
  },
  detailsBox: {
    backgroundColor: colors.lightBackground || "#f7f7f7",
    width: "100%",
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 15,
  },
  amountText: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.primary || "#0a6b8b",
  },
  recipientText: {
    marginTop: 5,
    fontSize: 16,
    color: colors.darkGray || "#555",
  },
  bankText: {
    fontSize: 16,
    color: colors.darkGray,
  },
  divider: {
    height: 1,
    width: "80%",
    backgroundColor: "#ddd",
    marginVertical: 10,
  },
  footerText: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 24,
    gap: 10,
    width: "100%",
  },

  actionBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },

  shareBtn: {
    backgroundColor: "#E6F3FF",
  },

  shareText: {
    color: colors.primary,
    fontWeight: "600",
  },

  doneBtn: {
    backgroundColor: colors.primary,
  },

  doneText: {
    color: "#fff",
    fontWeight: "600",
  },
});
