import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  fullName: string;
  email: string;
  username: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (fullName: string, email: string, username: string, password: string, avatar?: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'lorven_auth_user';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Initialize from localStorage
    try {
      const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });

  // Persist user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user]);

  const signIn = async (email: string, password: string) => {
    // Mock authentication - in real app, this would call an API
    const mockUser: User = {
      id: '1',
      fullName: 'John Doe',
      email: email,
      username: 'johndoe',
      avatar: undefined,
    };
    setUser(mockUser);
  };

  const signUp = async (
    fullName: string,
    email: string,
    username: string,
    password: string,
    avatar?: string
  ) => {
    // Mock signup - in real app, this would call an API
    const newUser: User = {
      id: Date.now().toString(),
      fullName,
      email,
      username,
      avatar,
    };
    setUser(newUser);
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
