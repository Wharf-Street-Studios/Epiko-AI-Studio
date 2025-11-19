import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CreditTransaction {
  id: string;
  type: 'earn' | 'spend' | 'purchase';
  amount: number;
  description: string;
  timestamp: Date;
  epikoTokensSpent?: number; // For purchase transactions
}

interface CreditsContextType {
  balance: number;
  transactions: CreditTransaction[];
  spendCredits: (amount: number, description: string) => boolean;
  earnCredits: (amount: number, description: string) => void;
  purchaseCredits: (credits: number, epikoTokens: number) => void;
  getToolCost: (tool: string) => number;
}

const CreditsContext = createContext<CreditsContextType | undefined>(undefined);

// AI Credits cost per tool (simplified, no tiers)
const CREDIT_COSTS = {
  'face-swap': 1,
  'ai-avatar': 2,
  'poster-maker': 3,
  'duo-portrait': 3,
  'age-transform': 2,
  'enhance': 1,
  'ar-posters': 3,
  'character-filters': 2,
};

const CREDITS_STORAGE_KEY = 'epiko_credits';
const INITIAL_FREE_CREDITS = 10; // Updated from 30 to 10 per PRD v2.0

export const CreditsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [balance, setBalance] = useState<number>(() => {
    try {
      const stored = localStorage.getItem(CREDITS_STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        return data.balance || INITIAL_FREE_CREDITS;
      }
      return INITIAL_FREE_CREDITS;
    } catch {
      return INITIAL_FREE_CREDITS;
    }
  });

  const [transactions, setTransactions] = useState<CreditTransaction[]>(() => {
    try {
      const stored = localStorage.getItem(CREDITS_STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        return data.transactions || [{
          id: '1',
          type: 'earn' as const,
          amount: INITIAL_FREE_CREDITS,
          description: 'Welcome bonus - 10 free credits',
          timestamp: new Date(),
        }];
      }
      return [{
        id: '1',
        type: 'earn' as const,
        amount: INITIAL_FREE_CREDITS,
        description: 'Welcome bonus - 10 free credits',
        timestamp: new Date(),
      }];
    } catch {
      return [{
        id: '1',
        type: 'earn' as const,
        amount: INITIAL_FREE_CREDITS,
        description: 'Welcome bonus - 10 free credits',
        timestamp: new Date(),
      }];
    }
  });

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CREDITS_STORAGE_KEY, JSON.stringify({ balance, transactions }));
    } catch (error) {
      console.error('Failed to save credits data:', error);
    }
  }, [balance, transactions]);

  const addTransaction = (
    type: 'earn' | 'spend' | 'purchase',
    amount: number,
    description: string,
    epikoTokensSpent?: number
  ) => {
    const transaction: CreditTransaction = {
      id: Date.now().toString(),
      type,
      amount,
      description,
      timestamp: new Date(),
      epikoTokensSpent,
    };
    setTransactions((prev) => [transaction, ...prev]);
  };

  const spendCredits = (amount: number, description: string): boolean => {
    if (balance >= amount) {
      setBalance((prev) => prev - amount);
      addTransaction('spend', amount, description);
      return true;
    }
    return false;
  };

  const earnCredits = (amount: number, description: string) => {
    setBalance((prev) => prev + amount);
    addTransaction('earn', amount, description);
  };

  const purchaseCredits = (credits: number, epikoTokens: number) => {
    setBalance((prev) => prev + credits);
    addTransaction('purchase', credits, `Purchased ${credits} credits`, epikoTokens);
  };

  const getToolCost = (tool: string): number => {
    return CREDIT_COSTS[tool as keyof typeof CREDIT_COSTS] || 1; // Default 1 credit
  };

  return (
    <CreditsContext.Provider
      value={{
        balance,
        transactions,
        spendCredits,
        earnCredits,
        purchaseCredits,
        getToolCost,
      }}
    >
      {children}
    </CreditsContext.Provider>
  );
};

// Legacy export for backward compatibility
export const TokenProvider = CreditsProvider;

export const useCredits = () => {
  const context = useContext(CreditsContext);
  if (context === undefined) {
    throw new Error('useCredits must be used within a CreditsProvider');
  }
  return context;
};

// Legacy export for backward compatibility
export const useTokens = useCredits;
