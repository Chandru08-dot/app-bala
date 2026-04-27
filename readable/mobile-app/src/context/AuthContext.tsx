import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher';
  readingProfile: {
    difficulty: number;
    fontSize: number;
    lineSpacing: number;
    wordSpacing: number;
  };
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, role: 'student' | 'teacher') => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error loading user:', error);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in real app, this would call API
    const mockUser: User = {
      id: '1',
      name: 'Student Name',
      email,
      role: 'student',
      readingProfile: {
        difficulty: 1,
        fontSize: 16,
        lineSpacing: 1.5,
        wordSpacing: 0.2,
      },
    };
    setUser(mockUser);
    await AsyncStorage.setItem('user', JSON.stringify(mockUser));
    return true;
  };

  const register = async (name: string, email: string, password: string, role: 'student' | 'teacher'): Promise<boolean> => {
    const mockUser: User = {
      id: Date.now().toString(),
      name,
      email,
      role,
      readingProfile: {
        difficulty: 1,
        fontSize: 16,
        lineSpacing: 1.5,
        wordSpacing: 0.2,
      },
    };
    setUser(mockUser);
    await AsyncStorage.setItem('user', JSON.stringify(mockUser));
    return true;
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};