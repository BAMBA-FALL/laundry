import React from 'react';
import { Navigate } from 'react-router-dom';
import { accountService } from '../_services/account.service';

const AuthGuard = ({ children, requiredRole }) => {
    const isLogged = accountService.isLogged();
    const userRole = accountService.getUserRole(); 

    if (!isLogged) {
       
        return <Navigate to="/home" />;
    }

    if (requiredRole && userRole !== requiredRole) {
        // Redirige vers une page d'erreur 404 pour les utilisateurs sans le rôle requis
        return <Navigate to="/home" />;
    }

    return children;
};

export default AuthGuard;
