import React, { createContext, useState, ReactNode } from "react";

export const CarSelectedAmountContext = createContext<any>(null);

interface CarSelectedAmountProviderProps {
  children: ReactNode;
}

export const CarSelectedAmountProvider: React.FC<CarSelectedAmountProviderProps> = ({ children }) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  return (
    <CarSelectedAmountContext.Provider
      value={{ selectedAmount, setSelectedAmount }}
    >
      {children}
    </CarSelectedAmountContext.Provider>
  );
};
