import { createContext, useState } from "react";

export const TransactionHistoryContext = createContext();

export const TransactionHistoryProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([
    {
      id: "TXN001",
      type: "Debit",
      mode: "Bill Payment",
      amount: 5000,
      description: "Cable TV Subscription",
      date: "2025-10-01 10:23 AM",
      status: "Successful",
      recipient: "DSTV Nigeria",
    },
    {
      id: "TXN002",
      type: "Credit",
      mode: "Transfer",
      amount: 25000,
      description: "Deposit from Mantis Wallet",
      date: "2025-09-28 02:15 PM",
      status: "Successful",
      recipient: "Self",
    },
    {
      id: "TXN003",
      type: "Debit",
      mode: "Airtime Purchase",
      amount: 1200,
      description: "Airtime Purchase",
      date: "2025-09-25 09:12 PM",
      status: "Declined",
      recipient: "MTN 08012345678",
    },
  ]);

  // 🧩 Function to add new transaction
  const addTransaction = (txn) => {
    setTransactions((prev) => [
      {
        id: `TXN${Date.now()}`,
        date: new Date().toLocaleString(),
        status: "Successful",
        ...txn,
      },
      ...prev, // latest first
    ]);
  };

  return (
    <TransactionHistoryContext.Provider
      value={{ transactions, addTransaction }}
    >
      {children}
    </TransactionHistoryContext.Provider>
  );
};
