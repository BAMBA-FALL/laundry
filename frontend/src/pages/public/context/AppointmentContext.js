import React, { createContext, useState, useContext, useEffect } from 'react';
import { createAppointment, getUserAppointments, updateAppointment, deleteAppointment } from '../../../_services/appointment.service';

// Créer le contexte
const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserAppointments = async (userId) => {
    setLoading(true);
    try {
      const userAppointments = await getUserAppointments(userId);
      setAppointments(userAppointments);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const bookAppointment = async (userId, date) => {
    setLoading(true);
    try {
      const newAppointment = await createAppointment(userId, date);
      setAppointments([...appointments, newAppointment]);
      return newAppointment;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (id) => {
    setLoading(true);
    try {
      await deleteAppointment(id);
      setAppointments(appointments.filter(app => app.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateUserAppointment = async (id, data) => {
    setLoading(true);
    try {
      const updatedAppointment = await updateAppointment(id, data);
      setAppointments(appointments.map(app => app.id === id ? updatedAppointment : app));
      return updatedAppointment;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppointmentContext.Provider value={{ 
      appointments, 
      loading, 
      error, 
      fetchUserAppointments, 
      bookAppointment, 
      cancelAppointment, 
      updateUserAppointment 
    }}>
      {children}
    </AppointmentContext.Provider>
  );
};

// Exporter le contexte
export const useAppointment = () => useContext(AppointmentContext);
export { AppointmentContext }; // Ajoutez cette ligne
