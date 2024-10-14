import Axios from './caller.service'; 

// Créer un rendez-vous
const createAppointment = async (userId, date) => {
  try {
    const response = await Axios.post('/api/create-appointment', { userId, date });
    return response.data; 
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erreur lors de la création du rendez-vous');
  }
};

const getAllAppointments = async () => {
  try {
    const response = await Axios.get('/api/appointments');
    return response.data; 
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erreur lors de la récupération des rendez-vous');
  }
};

// Mettre à jour un rendez-vous
const updateAppointment = async (id, data) => {
  try {
    const response = await Axios.put(`/api/appointments/${id}`, data);
    return response.data; 
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erreur lors de la mise à jour du rendez-vous');
  }
};

// Supprimer un rendez-vous
const deleteAppointment = async (id) => {
  try {
    await Axios.delete(`/api/appointments/${id}`);
    return true; 
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erreur lors de la suppression du rendez-vous');
  }
};

// Obtenir les rendez-vous d'un utilisateur spécifique
const getUserAppointments = async (userId) => {
    try {
        const response = await Axios.get(`/api/appointment/${userId}`);
        return response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des rendez-vous :', error);
        throw error; // Relancez l'erreur pour la gérer dans le composant
      }
};




// Exporter les fonctions
export {
  createAppointment,
  getAllAppointments,
  updateAppointment,
  deleteAppointment,
  getUserAppointments,
};
