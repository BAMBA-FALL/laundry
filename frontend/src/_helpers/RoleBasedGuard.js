import { Navigate } from 'react-router-dom';
import { accountService } from '../_services/account.service';

const RoleBasedGuard = ({ children, requiredRole }) => {
  const isLogged = accountService.isLogged();
  const userRole = accountService.getRole(); // Assurez-vous que `getRole` est bien défini dans votre service

  if (!isLogged) {
    return <Navigate to="/auth/login" />;
  }

  if (userRole !== requiredRole) {
    return <Navigate to="/" />; // Redirige vers la page d'accueil si le rôle ne correspond pas
  }

  return children;
};

export default RoleBasedGuard;
