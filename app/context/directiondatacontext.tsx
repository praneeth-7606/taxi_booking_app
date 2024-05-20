

import React, { createContext, useState, ReactNode } from 'react';

interface DirectionData {
  // Define the type for your direction data
  // Adjust the type according to your actual data structure
  // For example, you might have properties like routes, distance, etc.
  // This is just a placeholder, replace it with your actual data structure
  routes: any[];
}

interface DirectionDataContextType {
  directionData: DirectionData | null;
  setDirectionData: React.Dispatch<React.SetStateAction<DirectionData | null>>;
}

export const DirectionDataContext = createContext<DirectionDataContextType | null>(null);

interface DirectionDataProviderProps {
  children: ReactNode;
}

export const DirectionDataProvider = ({ children }: DirectionDataProviderProps) => {
  const [directionData, setDirectionData] = useState<DirectionData | null>(null);

  return (
    <DirectionDataContext.Provider value={{ directionData, setDirectionData }}>
      {children}
    </DirectionDataContext.Provider>
  );
};

