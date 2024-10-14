import React, { createContext, useState, useEffect } from 'react';
import { accountService } from '../../_services/account.service'; 

// Création du contexte
export const AuthContext = createContext();

// Fournisseur du contexte
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Charger l'état de connexion à partir de localStorage au moment du rendu initial
    const savedLoginState = localStorage.getItem('isLoggedIn');
    return savedLoginState ? JSON.parse(savedLoginState) : false;
  });

  const [userId, setUserId] = useState(() => {
    // Charger l'ID utilisateur à partir de localStorage
    return localStorage.getItem('userId') || null;
  });

  // Sauvegarder dans localStorage chaque fois que l'état change
  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    const checkLoggedIn = () => {
      const isLogged = accountService.isLogged();
      setIsLoggedIn(isLogged);
      if (isLogged) {
        const storedUserId = localStorage.getItem('userId');
        setUserId(storedUserId); // Mettre à jour l'ID utilisateur à partir de localStorage
      } else {
        setUserId(null); // Réinitialiser l'ID utilisateur si déconnecté
      }
    };

    checkLoggedIn();

    // Écouter les modifications du localStorage (par ex. connexion ou déconnexion dans un autre onglet)
    window.addEventListener('storage', checkLoggedIn);

    return () => {
      window.removeEventListener('storage', checkLoggedIn);
    };
  }, []);

  const login = (id) => {
    setIsLoggedIn(true);
    setUserId(id); 
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userId', id); 
  };

  const logout = async () => {
    await accountService.logout();
    setIsLoggedIn(false);
    setUserId(null); 
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('userId'); 
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
