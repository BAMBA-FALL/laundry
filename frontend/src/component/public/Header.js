import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importation de useNavigate
import { AuthContext } from '../../pages/Auth/AuthContext';
import './Header.css';

const Header = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate(); // Initialisation du hook useNavigate

  useEffect(() => {
    console.log('isLoggedIn a changé:', isLoggedIn);
  }, [isLoggedIn]);

  const handleLogout = async () => {
    await logout(); // Attendre que la fonction logout s'exécute
    navigate('/home'); // Rediriger vers la page "Home" après la déconnexion
  };

  return (
    <header className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/home">
          <h1 className="text-2xl font-bold">LingeExpress</h1>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            {isLoggedIn ? (
              <>
                <li>
                  <Link to="/appointmentsection" className="hover:bg-blue-700 px-3 py-1">
                    Rendez-vous
                  </Link>
                </li>
                <li>
                  <Link to="/personalinfo" className="hover:bg-blue-700 px-3 py-1 rounded">
                    Profil
                  </Link>
                </li>
                <li>
                  <Link to="/laundrystatus" className="hover:bg-blue-700 px-3 py-1 rounded">
                    Linges
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="hover:bg-red-700 px-3 py-1 rounded">
                    Déconnexion
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="hover:bg-blue-700 px-3 py-1 rounded">
                    Connexion
                  </Link>
                </li>
                <li>
                  <Link to="/signupform" className="hover:bg-green-600 px-3 py-1 rounded">
                    Inscription
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
