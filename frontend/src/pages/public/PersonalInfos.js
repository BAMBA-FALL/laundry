import React, { useEffect, useState, useContext } from 'react';
import { Card, List, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { userService } from '../../_services/user.service'; 
import { AuthContext } from '../Auth/AuthContext';
import { AppointmentContext } from './context/AppointmentContext';

const PersonalInfo = () => {
  const { userId } = useContext(AuthContext);
  const { fetchUserAppointments, appointments, loading: loadingAppointments, error: appointmentError } = useContext(AppointmentContext);

  const [userProfile, setUserProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [error, setError] = useState(null);

  // Récupération du profil utilisateur
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profileData = await userService.getUserProfile();
        setUserProfile(profileData.data);
      } catch (error) {
        setError("Impossible de récupérer le profil de l'utilisateur.");
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Récupération des rendez-vous
  useEffect(() => {
    const fetchAppointments = async () => {
      if (userId) {
        await fetchUserAppointments(userId);
      }
    };

    fetchAppointments();
  }, userId ); 

  return (
    <Card title="Informations personnelles" style={{ maxWidth: 600, margin: '0 auto' }}>
      {loadingProfile ? (
        <p>Chargement du profil...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <List>
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar icon={<UserOutlined />} />}
              title={`Nom : ${userProfile.name}`}
            />
          </List.Item>
          <List.Item>
            <List.Item.Meta title={`Email : ${userProfile.email}`} />
          </List.Item>
          <List.Item>
            <List.Item.Meta title={`Téléphone : ${userProfile.phone}`} />
          </List.Item>
          <List.Item>
            <List.Item.Meta title={`Adresse : ${userProfile.address}`} />
          </List.Item>
        </List>
      )}

      <h3>Mes Rendez-vous</h3>
      {loadingAppointments && <p>Chargement des rendez-vous...</p>}
      {appointments.length > 0 ? (
        <List
          dataSource={appointments}
          renderItem={(appointment) => (
            <List.Item key={appointment.id}> {/* Ajoutez une clé unique pour chaque élément */}
              <List.Item.Meta
                title={`Date : ${new Date(appointment.date).toLocaleString()}`}
                description={`Statut : ${appointment.status}`}
              />
            </List.Item>
          )}
        />
      ) : (
        !loadingAppointments && <p>Aucun rendez-vous trouvé.</p>
      )}
      {appointmentError && <p>Erreur : {appointmentError}</p>} {/* Affichage de l'erreur des rendez-vous */}
    </Card>
  );
};

export default PersonalInfo;
