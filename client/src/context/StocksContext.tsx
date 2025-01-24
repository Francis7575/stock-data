import { createContext, useState, useContext, ReactNode } from "react";

type StockContextProps = {
  purchaseInput: number;
  setPurchaseInput: (value: number) => void;
};

const StocksContext = createContext<StockContextProps | undefined>(undefined);

export const StocksProvider = ({ children }: { children: ReactNode }) => {
  const [purchaseInput, setPurchaseInput] = useState<number>(0);

  const value = {
    purchaseInput,
    setPurchaseInput,
  };
  return (
    <StocksContext.Provider value={value}>{children}</StocksContext.Provider>
  );
};

export const useStocks = (): StockContextProps => {
  const context = useContext(StocksContext);

  if (!context) {
    throw new Error("useStocks must be used within a StocksProvider");
  }

  return context;
};
