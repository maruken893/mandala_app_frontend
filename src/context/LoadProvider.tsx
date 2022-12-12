import React, { useState, createContext, useContext } from 'react';

const LoadContext = createContext(
  {} as {
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  }
);

const LoadProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadContext.Provider>
  );
};

export default LoadProvider;
export const useLoadContext = () => useContext(LoadContext);
