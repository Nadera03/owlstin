
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type BiomeType = 'tropical' | 'savanna' | 'tundra' | 'desert' | 'forest';

interface BiomeContextType {
  currentBiome: BiomeType;
  setCurrentBiome: (biome: BiomeType) => void;
}

const BiomeContext = createContext<BiomeContextType | undefined>(undefined);

export const BiomeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentBiome, setCurrentBiome] = useState<BiomeType>('tropical');

  return (
    <BiomeContext.Provider value={{ currentBiome, setCurrentBiome }}>
      {children}
    </BiomeContext.Provider>
  );
};

export const useBiome = (): BiomeContextType => {
  const context = useContext(BiomeContext);
  if (context === undefined) {
    throw new Error('useBiome must be used within a BiomeProvider');
  }
  return context;
};
