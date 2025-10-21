import { createContext, useState } from "react";

export const BalanceContext = createContext();

export const BalanceProvider = ({ children }) => {
  // 💰 Current wallet balance
  const [balance, setBalance] = useState(248000.75);

  // 💳 Loan state — allow only one loan per user (demo)
  const [hasLoan, setHasLoan] = useState(false);

  return (
    <BalanceContext.Provider
      value={{
        balance,
        setBalance,
        hasLoan,
        setHasLoan,
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
};
