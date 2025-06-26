// services/DataContext.tsx

import React, { createContext, useContext, useState } from 'react';

type DataContextType = {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(false);
  
  return (
    <DataContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
