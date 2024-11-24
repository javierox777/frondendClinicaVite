import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import { decodeJwt } from './decodeJwt'; // Importa la función que decodifica el token

export interface LoggedUser {
  _id: string;
  login: string;
  vigencia: string;
  fechaRegistro: string;
  nombre: string;
  profesionalId: string;
  role: string;
}

interface UserContextType {
  user: LoggedUser | null;
  setUser: Dispatch<SetStateAction<LoggedUser | null>>;
  loading: boolean;
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<LoggedUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      const decodedUser = decodeJwt(savedToken);
      if (decodedUser) {
        setUser(decodedUser);
      }
    }
    setLoading(false);
  }, []);

  const setUserWithStorage = (
    value: LoggedUser | null | ((prevUser: LoggedUser | null) => LoggedUser | null)
  ) => {
    if (typeof value === 'function') {
      setUser((prevUser) => {
        const newValue = value(prevUser);
        if (newValue) {
          // Supón que recibes un token en algún lugar y necesitas almacenarlo
          const token = 'EL_TOKEN_DEL_BACKEND'; // Reemplaza esto con el token que recibes
          localStorage.setItem('token', token);
        } else {
          localStorage.removeItem('token');
        }
        return newValue;
      });
    } else {
      setUser(value);
      if (value) {
        // Supón que recibes un token en algún lugar y necesitas almacenarlo
        const token = 'EL_TOKEN_DEL_BACKEND'; // Reemplaza esto con el token que recibes
        localStorage.setItem('token', token);
      } else {
        localStorage.removeItem('token');
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
