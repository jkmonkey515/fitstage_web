import React, { createContext, useContext, useState, useEffect } from 'react';

interface BrandingContextType {
  logo: string | null;
  setLogo: (logo: string | null) => void;
}

const BrandingContext = createContext<BrandingContextType | undefined>(undefined);

export function BrandingProvider({ children }: { children: React.ReactNode }) {
  // Initialize logo state from localStorage
  const [logo, setLogoState] = useState<string | null>(() => {
    const savedLogo = localStorage.getItem('platformLogo');
    return savedLogo || null;
  });

  // Custom setter that updates both state and localStorage
  const setLogo = (newLogo: string | null) => {
    if (newLogo) {
      localStorage.setItem('platformLogo', newLogo);
    } else {
      localStorage.removeItem('platformLogo');
    }
    setLogoState(newLogo);
  };

  return (
    <BrandingContext.Provider value={{ logo, setLogo }}>
      {children}
    </BrandingContext.Provider>
  );
}

export function useBranding() {
  const context = useContext(BrandingContext);
  if (context === undefined) {
    throw new Error('useBranding must be used within a BrandingProvider');
  }
  return context;
}