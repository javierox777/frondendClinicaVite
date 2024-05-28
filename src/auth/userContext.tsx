import { JwtPayload } from 'jwt-decode';
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

export interface LoggedUser {
  _id: string;
  login: string;
  vigencia: string;
  fechaRegistro: string;
  nombre: string;
  profesionalId: string;
}

interface UserContextType {
  user: LoggedUser | null | JwtPayload;
  setUser: React.Dispatch<React.SetStateAction<LoggedUser | null | JwtPayload>>;
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<LoggedUser | null | JwtPayload>(null);

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
