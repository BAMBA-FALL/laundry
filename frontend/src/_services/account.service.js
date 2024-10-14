import Axios from './caller.service';
import { jwtDecode } from 'jwt-decode';

const login = (credentials) => {
  return Axios.post('/api/login', credentials, { withCredentials: true })
    .then((response) => {
      const { access_token } = response.data;
      console.log('Token:', access_token); // Ajoutez ceci pour voir le token
      const decodedToken = jwtDecode(access_token);
      console.log('Token décodé:', decodedToken); // Affichez le token décodé
      const role = decodedToken.role;
      const userId = decodedToken.id; // Assurez-vous que l'ID utilisateur est présent dans le token

      // Sauvegarde du token, du rôle et de l'ID utilisateur dans localStorage
      localStorage.setItem('token', access_token);
      localStorage.setItem('role', role); 
      localStorage.setItem('userId', userId); // Stocker l'ID utilisateur
      return response;
    });
};


const register = async (userData) => {
  return Axios.post('/api/register', userData, { withCredentials: true })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error('Erreur lors de l\'enregistrement.');
      }
    });
};

const saveToken = (token) => {
  localStorage.setItem('token', token);
};

const logout = async () => {
  try {
    const response = await Axios.post('/api/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    return response.data;
  } catch (error) {
    if (error.response) {
      if (
        error.response.status === 401 &&
        error.response.data.message ===
          "Le jeton d'authentification a expiré. Veuillez vous reconnecter."
      ) {
        throw new Error(
          "Le jeton d'authentification a expiré. Veuillez vous reconnecter."
        );
      } else {
        throw new Error(error.response.data.message);
      }
    } else if (error.request) {
      throw new Error('La déconnexion a échoué. Veuillez réessayer.');
    } else {
      throw new Error('Une erreur est survenue lors de la déconnexion.');
    }
  }
};

const isLogged = () => {
  let token = localStorage.getItem('token');
  return !!token;
};

const getToken = () => {
  return localStorage.getItem('token');
};

const getUserRole = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  
  try {
    const decodedToken = jwtDecode(token);
    console.log('Token décodé:', decodedToken); 
    return decodedToken.role;
  } catch (error) {
    console.error('Token invalide', error);
    return null;
  }
};

export const accountService = {
  login,
  saveToken,
  logout,
  isLogged,
  getToken,
  getUserRole,
  register
};
