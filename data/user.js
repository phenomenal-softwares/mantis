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
    accountNumber: "0987654321",
    bankName: "Mantis Digital Wallet",
    tier: "Tier 3",
    lastUpdated: "2025-10-05T09:30:00Z",
  },

  // Cards
  cards: [
    {
    id: 1,
    number: "**** **** **** 4598",
    expiry: "12/27",
    type: "REGULAR",
    color: ["#0a6b8b", "#011917ff"],
    isActive: true,
  },
  {
    id: 2,
    number: "**** **** **** 0023",
    expiry: "04/29",
    type: "PREMIUM",
    color: ["#8b0a6b", "#028174"],
    isActive: true,
  },
  {
    id: 3,
    number: "**** **** **** 7810",
    expiry: "09/29",
    type: "GOLDEN",
    color: ["#8b7c0aff", "#401102ff"],
    isActive: false,
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
