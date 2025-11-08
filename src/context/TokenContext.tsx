import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface TokenTransaction {
  id: string;
  type: 'earn' | 'spend' | 'purchase';
  amount: number;
  description: string;
  timestamp: Date;
}

interface TokenContextType {
  balance: number;
  transactions: TokenTransaction[];
  spendTokens: (amount: number, description: string) => boolean;
  earnTokens: (amount: number, description: string) => void;
  purchaseTokens: (amount: number) => void;
  getToolCost: (tool: string, tier: string) => number;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

// Token costs per tool
const TOKEN_COSTS = {
  'face-swap': { base: 10, creator: 8, pro: 6 },
  'ai-avatar': { base: 10, creator: 8, pro: 6 },
  'couple-photo': { base: 15, creator: 12, pro: 9 },
  'baby-predictor': { base: 15, creator: 12, pro: 9 },
  'gender-swap': { base: 10, creator: 8, pro: 6 },
  'age-transform': { base: 10, creator: 8, pro: 6 },
  'enhance': { base: 15, creator: 12, pro: 9 },
};

const TOKEN_STORAGE_KEY = 'lorven_tokens';
const INITIAL_BONUS = 30;

export const TokenProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [balance, setBalance] = useState<number>(() => {
    try {
      const stored = localStorage.getItem(TOKEN_STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        return data.balance || INITIAL_BONUS;
      }
      return INITIAL_BONUS;
    } catch {
      return INITIAL_BONUS;
    }
  });

  const [transactions, setTransactions] = useState<TokenTransaction[]>(() => {
    try {
      const stored = localStorage.getItem(TOKEN_STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        return data.transactions || [{
          id: '1',
          type: 'earn' as const,
          amount: INITIAL_BONUS,
          description: 'Sign up bonus',
          timestamp: new Date(),
        }];
      }
      return [{
        id: '1',
        type: 'earn' as const,
        amount: INITIAL_BONUS,
        description: 'Sign up bonus',
        timestamp: new Date(),
      }];
    } catch {
      return [{
        id: '1',
        type: 'earn' as const,
        amount: INITIAL_BONUS,
        description: 'Sign up bonus',
        timestamp: new Date(),
      }];
    }
  });

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify({ balance, transactions }));
    } catch (error) {
      console.error('Failed to save token data:', error);
    }
  }, [balance, transactions]);

  const addTransaction = (type: 'earn' | 'spend' | 'purchase', amount: number, description: string) => {
    const transaction: TokenTransaction = {
      id: Date.now().toString(),
      type,
      amount,
      description,
      timestamp: new Date(),
    };
    setTransactions((prev) => [transaction, ...prev]);
  };

  const spendTokens = (amount: number, description: string): boolean => {
    if (balance >= amount) {
      setBalance((prev) => prev - amount);
      addTransaction('spend', amount, description);
      return true;
    }
    return false;
  };

  const earnTokens = (amount: number, description: string) => {
    setBalance((prev) => prev + amount);
    addTransaction('earn', amount, description);
  };

  const purchaseTokens = (amount: number) => {
    setBalance((prev) => prev + amount);
    addTransaction('purchase', amount, 'Token purchase');
  };

  const getToolCost = (tool: string, tier: string = 'base'): number => {
    const toolCosts = TOKEN_COSTS[tool as keyof typeof TOKEN_COSTS];
    if (!toolCosts) return 10; // Default cost

    if (tier === 'creator') return toolCosts.creator;
    if (tier === 'pro') return toolCosts.pro;
    return toolCosts.base;
  };

  return (
    <TokenContext.Provider
      value={{
        balance,
        transactions,
        spendTokens,
        earnTokens,
        purchaseTokens,
        getToolCost,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export const useTokens = () => {
  const context = useContext(TokenContext);
  if (context === undefined) {
    throw new Error('useTokens must be used within a TokenProvider');
  }
  return context;
};
