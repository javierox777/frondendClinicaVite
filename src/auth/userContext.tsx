import { JwtPayload } from 'jwt-decode';
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

interface User {
  _id: string;
  login: string;
  vigencia: string;
  fechaRegistro: string;
  nombre: string;
  professionalId: string;
}

interface UserContextType {
  user: User | null | JwtPayload;
  setUser: React.Dispatch<React.SetStateAction<User | null | JwtPayload>>;
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null | JwtPayload>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};
