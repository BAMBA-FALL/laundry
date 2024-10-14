import Axios from "./caller.service";

// Récupérer tous les utilisateurs
const getAllUsers = () => {
  return Axios.get('/api/users');
}

// Récupérer un utilisateur par son ID
const getUser = (userId) => {
  return Axios.get(`/api/users/${userId}`);
}

// Supprimer un utilisateur par son ID
const deleteUser = (userId) => {
  return Axios.delete(`/api/users/${userId}`);
}

// Récupérer le profil de l'utilisateur connecté
const getUserProfile = () => {
  return Axios.get('/api/me');
}

// Mettre à jour le profil de l'utilisateur
const updateUserProfile = (updatedProfile) => {
  return Axios.put('/api/users/me', updatedProfile);
}

export const userService = {
  getAllUsers,
  getUser,
  deleteUser,
  updateUserProfile,
  getUserProfile,
}
