// src/storage/userStorage.ts
import { jwtDecode } from 'jwt-decode';

const key = 'token';

type JwtPayload = {
    sub?: string; // Sujeto o ID del usuario
    name?: string; // Nombre del usuario
    exp?: number; // Fecha de expiración del token
    iat?: number; // Fecha de emisión del token
    // Agrega más campos si los necesitas
  };

const storeToken = async (authToken: string) => {
  try {
    await localStorage.setItem(key, authToken);
  } catch (error) {
    console.log('Error storing the auth token', error);
  }
};

const getToken = async () => {
  try {
    const authToken = await localStorage.getItem(key);
    return authToken;
  } catch (error) {
    console.log('Error getting the auth token', error);
  }
};

const getUser = async () => {
  const token = await getToken();
  if (token) {
    const decodedToken = jwtDecode(token) as JwtPayload & { profesionalId?: string, _id?: string };
    const userId =  decodedToken._id;
    const profesionalId = decodedToken.profesionalId
    return {
      ...decodedToken,
      userId,
      profesionalId
    };
  }
  return null;
};

const removeToken = async () => {
  try {
    await localStorage.removeItem(key);
  } catch (error) {
    console.log('Error removing the auth token', error);
  }
};

export default {
  storeToken,
  getToken,
  getUser,
  removeToken,
};
