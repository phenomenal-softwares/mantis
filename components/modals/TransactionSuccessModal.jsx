import { useState, useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import colors from "../../styles/colors";
import DisclaimerBanner from "../UI/DisclaimerBanner";

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
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (visible) {
      setShowContent(false);
      const rand = Math.floor(1000 + Math.random() * 9000);
      const id = `TRX${Date.now()}${rand}`;
      setTransactionId(id);

      // Delay before showing modal content
      const timer = setTimeout(() => setShowContent(true), 2000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        {!showContent ? (
          // LOADING SPINNER
          <View style={styles.spinnerContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Processing...</Text>
          </View>
        ) : (
          <>
            <View style={styles.modalContent}>
              {/* Success Icon */}
              <View style={styles.iconWrapper}>
                <View style={styles.iconCircle}>
                  <Ionicons name="checkmark" size={50} color="#fff" />
                </View>
              </View>

              <Text style={styles.title}>Transaction Successful</Text>
              <Text style={styles.subtitle}>
                Your {type} has been completed successfully.
              </Text>

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

              <View style={styles.divider} />

              <Text style={styles.footerText}>
                Narration: {narration || "Nil"} {"\n"}
                Reference ID: {transactionId}{"\n"}
                Date: {new Date().toLocaleString()}
              </Text>

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[styles.actionBtn, styles.shareBtn]}
                  onPress={() => {
                    if (typeof window !== "undefined" && window.print) {
                      window.print();
                    } else {
                      alert("Sharing supported only on web demo.");
                    }
                  }}
                >
                  <Text style={styles.shareText}>Share Receipt</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionBtn, styles.doneBtn]}
                  onPress={() => navigation.replace("Dashboard")}
                >
                  <Text style={styles.doneText}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>

            <DisclaimerBanner />
          </>
        )}
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
  loadingOverlay: {
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 15,
    paddingVertical: 40,
    paddingHorizontal: 30,
    alignItems: "center",
  },
  loadingText: {
    marginTop: 15,
    fontSize: 15,
    color: colors.light,
    fontWeight: "500",
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
