import { JwtPayload } from 'jwt-decode';
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
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
  setUser: Dispatch<SetStateAction<LoggedUser | null | JwtPayload>>;
  loading: boolean;
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<LoggedUser | null | JwtPayload>(null);
  const [loading, setLoading] = useState(true); // Estado de carga

  // Restaurar el estado del usuario desde localStorage al cargar el componente
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false); // Marcar que terminó de cargar
  }, []);

  const setUserWithStorage = (
    value: LoggedUser | null | JwtPayload | ((prevUser: LoggedUser | null | JwtPayload) => LoggedUser | null | JwtPayload)
  ) => {
    if (typeof value === 'function') {
      setUser((prevUser) => {
        const newValue = value(prevUser);
        if (newValue) {
          localStorage.setItem('user', JSON.stringify(newValue));
        } else {
          localStorage.removeItem('user');
        }
        return newValue;
      });
    } else {
      setUser(value);
      if (value) {
        localStorage.setItem('user', JSON.stringify(value));
      } else {
        localStorage.removeItem('user');
      }
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser: setUserWithStorage, loading }}>
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
