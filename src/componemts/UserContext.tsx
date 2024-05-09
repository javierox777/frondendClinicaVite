// UserContext.tsx
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';
import { User } from '../interfaces/User';

// Define the type for user data

// Define the type for context value
type UserContextType = {
  user: User | null;
  updateUser: (userData: User | null) => void;
};

// Create a new context with a default value of null
const UserContext = createContext<UserContextType | null>(null);

// Custom hook to simplify consuming the context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// Create a context provider component
export const UserProvider: React.FC = ({ children }: PropsWithChildren) => {
  // Define state to hold user data
  const [user, setUser] = useState<User | null>(null);

  // Function to update user data
  const updateUser = (userData: User | null) => {
    setUser(userData);
  };

  // Value object to be provided by the context
  const contextValue: UserContextType = {
    user,
    updateUser,
  };

  // Provide the context value to the children components
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
