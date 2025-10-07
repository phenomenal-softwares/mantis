export const user = {
  id: "USR001",
  fullName: "Mary Ajayi",
  username: "maryajayi",
  email: "maryajayi@mantis.com",
  phone: "+2348012345678",
  profileImage: require("../assets/avatar.png"),

  // Wallet / Account Info
  account: {
    balance: 245000.75,
    currency: "₦",
    accountNumber: "1234567890",
    bankName: "Mantis Digital Wallet",
    tier: "Tier 3",
    lastUpdated: "2025-10-05T09:30:00Z",
  },

  // Cards
  cards: [
    {
      id: "CARD1",
      type: "Debit",
      name: "Mantis Virtual Card",
      number: "**** **** **** 4123",
      expiry: "08/27",
      brand: "Visa",
      color: "#028174",
      isActive: true,
    },
    {
      id: "CARD2",
      type: "Credit",
      name: "Gold Credit Card",
      number: "**** **** **** 2890",
      expiry: "03/26",
      brand: "Mastercard",
      color: "#f2c94c",
      isActive: false,
    },
  ],

  // Loans
  loans: [
    {
      id: "LN01",
      type: "Personal Loan",
      amount: 200000,
      balance: 120000,
      interestRate: 0.1,
      dueDate: "2025-12-20",
      status: "Active",
    },
    {
      id: "LN02",
      type: "Business Loan",
      amount: 500000,
      balance: 500000,
      interestRate: 0.08,
      dueDate: "2026-05-01",
      status: "Pending Approval",
    },
  ],

  // Payments
  recentPayments: [
    {
      id: "PMT01",
      recipient: "Netflix",
      amount: 4500,
      date: "2025-10-01",
      category: "Subscription",
      status: "Completed",
      method: "Card",
    },
    {
      id: "PMT02",
      recipient: "John Smith",
      amount: 12000,
      date: "2025-09-28",
      category: "Transfer",
      status: "Completed",
      method: "Wallet",
    },
    {
      id: "PMT03",
      recipient: "Airtel Top-up",
      amount: 2000,
      date: "2025-09-25",
      category: "Airtime",
      status: "Completed",
      method: "Wallet",
    },
  ],

  // Notifications
  notifications: [
    {
      id: "NTF01",
      title: "Loan Payment Due Soon",
      message: "Your next payment of ₦25,000 is due on 15 Oct 2025.",
      date: "2025-10-04",
      read: false,
    },
    {
      id: "NTF02",
      title: "New Card Available",
      message: "You’ve successfully requested a Gold Credit Card.",
      date: "2025-09-30",
      read: true,
    },
  ],

  // Settings / Preferences
  preferences: {
    darkMode: false,
    language: "en",
    notificationsEnabled: true,
    transactionLimit: 100000,
  },
};
